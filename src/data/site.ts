export const brand = {
  name: "New Muscle",
  tagline: "Suplementación deportiva con responsabilidad.",
  email: "hola@newmuscle.com",
  privacyEmail: "privacidad@newmuscle.com",
  hours: "Lunes a viernes, 8:00 a 18:00 (hora Colombia)",
  city: "Medellín, Colombia",
};

export const shippingPolicy = {
  title: "Envíos",
  path: "/envios",
  preparation: "Preparamos el pedido en 1 día hábil.",
  metro: "1 a 2 días hábiles en el valle de aburrá.",
  national: "3 a 4 días hábiles en ciudades cercanas.",
  fee: 8000,
  freeFrom: 350000,
  packaging: "Empaque opaco, cerrado y con el lote visible en la etiqueta.",
};

export const returnsPolicy = {
  title: "Devoluciones",
  path: "/devoluciones",
  windowDays: 30,
  refundDays: "5 a 10 días hábiles",
  condition: "El sello y el empaque original deben estar intactos.",
};

export const promoCodes = {
  blackNovember: {
    code: "NEWMUSCLE50",
    label: "Noviembre Negro",
    detail: "Hasta 10% sobre el precio de lista en la selección marcada.",
  },
  peakForce: {
    code: "PEAKFORCE",
    label: "Peak Force Week",
    detail: "Hasta 15% en recuperación y referencias de la campaña.",
  },
} as const;

export const legalNotes = {
  age: "Venta solo para mayores de 18 años.",
  health:
    "Los suplementos no diagnostican, tratan ni curan enfermedades y no sustituyen una alimentación variada ni el criterio de un profesional de la salud.",
  prices: "Precios en pesos colombianos (COP), con la oferta ya aplicada en la ficha.",
  codes:
    "NEWMUSCLE50 y PEAKFORCE identifican la campaña. No se acumulan entre sí ni con otras promociones. Compra mínima de $350.000 para usar un código.",
};
