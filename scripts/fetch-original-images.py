import io
import json
import re
import time
import unicodedata
from pathlib import Path

import urllib.request
from PIL import Image
from ddgs import DDGS

ROOT = Path(r"c:\Users\user\Documents\Desarrollos GeniosTecnologicos\NewMuscle\new-muscle")
CATALOG = ROOT / "src" / "data" / "catalog-octubre.ts"
IMAGE_DIR = ROOT / "public" / "products" / "catalog"
REPORT = ROOT / "scripts" / "original-images-report.json"

STOP = {
    "sabor", "proteina", "hipocalorica", "hipercalorica", "monohidratada", "monohidrato",
    "vainilla", "chocolate", "fresa", "cookies", "suplemento", "capsulas", "servicios",
    "servicio", "tarro", "polvo", "liquida", "natural", "nuevo", "caja", "paquete",
    "display", "para", "con", "sin", "los", "las", "del", "una", "por", "and", "the",
}

AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"


def norm(value: str) -> str:
    text = unicodedata.normalize("NFKD", value or "")
    text = "".join(char for char in text if not unicodedata.combining(char))
    return text.lower()


def tokens(value: str) -> list[str]:
    words = re.findall(r"[a-z0-9]+", norm(value))
    return [word for word in words if len(word) > 3 and word not in STOP and not word.isdigit()]


def products():
    text = CATALOG.read_text(encoding="utf-8")
    pattern = re.compile(
        r'slug: "(?P<slug>[^"]+)",\n\s*name: "(?P<name>(?:\\.|[^"\\])*)",\n\s*image: "(?P<image>[^"]+)",\n\s*imageAlt: "(?P<alt>(?:\\.|[^"\\])*)"',
    )
    found = []
    for match in pattern.finditer(text):
        name = json.loads(f'"{match.group("name")}"')
        alt = json.loads(f'"{match.group("alt")}"')
        lab = alt.split(", ", 1)[1] if ", " in alt else ""
        found.append({"slug": match.group("slug"), "name": name, "image": match.group("image"), "lab": lab})
    return found


def search(query: str):
    try:
        return list(DDGS().images(query, max_results=8, safesearch="off"))
    except Exception as error:
        print("search failed", query, error)
        return []


def score(result, words: list[str]) -> float:
    haystack = norm(f"{result.get('title', '')} {result.get('image', '')}")
    if not words:
        return 0
    hits = sum(1 for word in words if word in haystack)
    width = int(result.get("width") or 0)
    if width and width < 500:
        return 0
    return hits / len(words)


def download(url: str) -> Image.Image | None:
    request = urllib.request.Request(url, headers={"User-Agent": AGENT, "Accept": "image/*,*/*"})
    try:
        with urllib.request.urlopen(request, timeout=25) as response:
            data = response.read(9_000_000)
            content_type = response.headers.get("Content-Type", "")
    except Exception as error:
        print("download failed", error)
        return None
    if "text/html" in content_type or len(data) < 20_000:
        return None
    try:
        image = Image.open(io.BytesIO(data))
        image.load()
    except Exception:
        return None
    if min(image.size) < 500:
        return None
    return image


def save(image: Image.Image, slug: str) -> Path:
    longest = max(image.size)
    if longest > 1600:
        ratio = 1600 / longest
        image = image.resize((round(image.width * ratio), round(image.height * ratio)), Image.Resampling.LANCZOS)
    destination = IMAGE_DIR / f"{slug}-original.jpg"
    if image.mode in ("RGBA", "LA") or (image.mode == "P" and "transparency" in image.info):
        background = Image.new("RGB", image.size, (255, 255, 255))
        alpha = image.convert("RGBA")
        background.paste(alpha, mask=alpha.getchannel("A"))
        image = background
    else:
        image = image.convert("RGB")
    image.save(destination, "JPEG", quality=90, optimize=True)
    return destination


def choose(item):
    words = tokens(item["name"])
    queries = [f"{item['name']} {item['lab']}".strip(), item["name"]]
    candidates = []
    seen = set()
    best_score = 0
    for query in queries:
        for result in search(query):
            value = score(result, words)
            best_score = max(best_score, value)
            url = result.get("image") or ""
            if value >= 0.5 and url and url not in seen:
                seen.add(url)
                candidates.append((value, result))
        if best_score >= 0.75 and candidates:
            break
        time.sleep(0.4)
    candidates.sort(key=lambda item: item[0], reverse=True)
    for value, result in candidates[:4]:
        image = download(result["image"])
        if image is not None:
            return save(image, item["slug"]), value
    return None, best_score


def point_catalog(saved: dict[str, str]):
    text = CATALOG.read_text(encoding="utf-8")
    for slug, filename in saved.items():
        old = f'image: "/products/catalog/{slug}.png"'
        new = f'image: "/products/catalog/{filename}"'
        if old in text:
            text = text.replace(old, new, 1)
    CATALOG.write_text(text, encoding="utf-8")


def main():
    items = products()
    report = {"saved": {}, "missed": []}
    if REPORT.exists():
        report = json.loads(REPORT.read_text(encoding="utf-8"))
    print("products", len(items), "already", len(report["saved"]))
    for index, item in enumerate(items, start=1):
        slug = item["slug"]
        existing = next(IMAGE_DIR.glob(f"{slug}-original.*"), None)
        if existing and slug in report["saved"]:
            continue
        if existing:
            report["saved"][slug] = existing.name
            continue
        path, value = choose(item)
        if path:
            report["saved"][slug] = path.name
            report["missed"] = [miss for miss in report["missed"] if miss["slug"] != slug]
            print(f"{index}/{len(items)} ok {slug} {value:.2f} {path.stat().st_size // 1024}KB")
        else:
            report["missed"] = [miss for miss in report["missed"] if miss["slug"] != slug]
            report["missed"].append({"slug": slug, "name": item["name"], "score": value})
            print(f"{index}/{len(items)} miss {slug} {value:.2f}")
        if index % 15 == 0:
            REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
            point_catalog(report["saved"])
        time.sleep(0.6)
    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    point_catalog(report["saved"])
    print("done", len(report["saved"]), "missed", len(report["missed"]))


if __name__ == "__main__":
    main()
