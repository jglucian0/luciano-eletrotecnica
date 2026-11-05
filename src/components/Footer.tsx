import BackToTop from "@/components/BackToTop";
import Image from "next/image";
import Link from "next/link";
import WhatsAppLink from "@/components/WhatsAppLink";
import { PHONE_LABEL, EMAIL, CITIES, WHATSAPP_NUMBER } from "@/lib/config";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container footer__grid" style={{ justifyContent: "space-between" }}>
          <div>
            <Image src="/logo.png" alt="Luciano Eletrotécnica" width={150} height={36} />
            <p>Serviços elétricos e soluções técnicas com segurança, qualidade e compromisso com o seu prazo.</p>
          </div>
          <div>
            <h4>Contato</h4>
            <WhatsAppLink>WhatsApp</WhatsAppLink>
            <a href={`tel:+${WHATSAPP_NUMBER}`}>{PHONE_LABEL}</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
          <div style={{ textAlign: "right" }}>
            <h4>Atendimento</h4>
            {CITIES.length > 1 ? (
              <ul className="footer__list">
                {CITIES.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            ) : (
              <span>{CITIES[0]}</span>
            )}
            <BackToTop />
          </div>
        </div>

        <div className="container footer__bottom">
          <span>© 2026 Luciano Eletrotécnica. Todos os direitos reservados.</span>
          <div className="footer__legal-links" style={{ display: "flex", gap: "1.25rem", alignItems: "center", flexWrap: "wrap" }}>
            <Link href="/politica-de-privacidade" style={{ color: "inherit", opacity: 0.8 }}>
              Política de Privacidade
            </Link>
            <Link href="/politica-de-cookies" style={{ color: "inherit", opacity: 0.8 }}>
              Política de Cookies
            </Link>
            <Link href="/termos-de-uso" style={{ color: "inherit", opacity: 0.8 }}>
              Termos de Uso
            </Link>
          </div>
        </div>
      </footer>

      <WhatsAppLink className="wa-float" aria-label="WhatsApp" icon iconSize={28} />
    </>
  );
}