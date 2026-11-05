import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Entenda como o site da Luciano Eletrotécnica usa cookies e o armazenamento do navegador.",
  alternates: { canonical: "/politica-de-cookies" },
  robots: { index: false, follow: true },
};

export default function CookiesPolicyPage() {
  return (
    <LegalPage
      title="Política de Cookies"
      intro={
        <>
          Esta página explica como o site da <strong>Luciano Eletrotécnica</strong> usa cookies e recursos
          semelhantes de armazenamento do navegador.
        </>
      }
      sections={[
        {
          id: "o-que-sao",
          title: "1. O que são cookies",
          body: (
            <p>
              Cookies são pequenos arquivos de texto salvos no seu dispositivo quando você visita um site. Eles
              servem, por exemplo, para lembrar preferências ou medir o uso de uma página.
            </p>
          ),
        },
        {
          id: "o-que-usamos",
          title: "2. O que usamos hoje",
          body: (
            <>
              <p>
                O site <strong>não utiliza cookies de publicidade nem ferramentas de rastreamento de terceiros</strong>.
              </p>
              <p>
                Usamos apenas um recurso técnico do navegador (armazenamento de sessão) para lembrar
                temporariamente qual serviço você escolheu, preenchendo o formulário de contato para você. Essa
                informação fica somente no seu aparelho e é apagada quando você envia o formulário ou fecha a aba.
              </p>
            </>
          ),
        },
        {
          id: "links-externos",
          title: "3. Links externos",
          body: (
            <p>
              Ao clicar em links para outros serviços, como o WhatsApp, você sai do nosso site. Esses serviços têm
              suas próprias políticas de privacidade e de cookies, sobre as quais não temos controle.
            </p>
          ),
        },
        {
          id: "gerenciamento",
          title: "4. Como gerenciar",
          body: (
            <p>
              Você pode configurar seu navegador para bloquear ou apagar cookies a qualquer momento. As instruções
              ficam nas configurações de privacidade do navegador que você usa.
            </p>
          ),
        },
        {
          id: "alteracoes",
          title: "5. Alterações",
          body: (
            <p>
              Se passarmos a usar ferramentas de análise ou publicidade, atualizaremos esta página e pediremos o
              seu consentimento quando a lei exigir.
            </p>
          ),
        },
      ]}
    />
  );
}