type Section = {
  heading: string;
  paragraphs: string[];
};

export function InfoPage({
  eyebrow,
  title,
  lede,
  sections,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  sections: Section[];
}) {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-8">
      <p className="text-xs font-bold tracking-[0.22em] text-[#e10600] uppercase">{eyebrow}</p>
      <h1 className="font-display mt-3 text-5xl leading-[0.9] font-extrabold tracking-[-0.04em] uppercase sm:text-6xl">{title}</h1>
      <p className="mt-6 text-lg leading-relaxed text-neutral-600">{lede}</p>
      <div className="mt-10 space-y-8">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-semibold">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3 leading-relaxed text-neutral-700">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
