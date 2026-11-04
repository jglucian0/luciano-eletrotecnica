const WHATSAPP_HREF = "https://wa.me/5511999999999";

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-12 items-center justify-center rounded-full bg-[#25D366] px-6 font-medium text-white transition-colors hover:bg-[#1ebe5d]"
    >
      Falar no WhatsApp
    </a>
  );
}
