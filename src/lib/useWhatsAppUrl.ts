"use client";

import { usePathname } from "next/navigation";
import { WHATSAPP_URL, buildWhatsAppUrl } from "@/lib/config";
import { getService } from "@/lib/services";

/** Mensagem padrão na home; mensagem do serviço quando está em /servicos/[slug] */
export function useWhatsAppUrl() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const service = parts[0] === "servicos" && parts[1] ? getService(parts[1]) : undefined;
  return service ? buildWhatsAppUrl(service.whatsappText) : WHATSAPP_URL;
}