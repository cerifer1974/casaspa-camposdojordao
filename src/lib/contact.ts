export const CONTACT = {
  whatsappNumber: "5511947778412",
  email: null as string | null,
} as const;

const DEFAULT_WHATSAPP_MESSAGE =
  "Olá! Vi o site da Casa Spa Campos do Jordão e gostaria de consultar a disponibilidade.";

export function createWhatsAppUrl(message = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
