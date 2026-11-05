import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { CITY_LIST, CNPJ, EMAIL, PHONE_LABEL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Saiba como a Luciano Eletrotécnica coleta, usa e protege seus dados pessoais, conforme a LGPD (Lei nº 13.709/2018).",
  alternates: { canonical: "/politica-de-privacidade" },
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Política de Privacidade"
      intro={
        <>
          A <strong>Luciano Eletrotécnica</strong> respeita a sua privacidade. Esta política explica quais dados
          pessoais tratamos ao usar nosso site, para que usamos e quais são os seus direitos, conforme a Lei
          Geral de Proteção de Dados (LGPD).
        </>
      }
      sections={[
        {
          id: "controlador",
          title: "1. Quem é o responsável pelos dados",
          body: (
            <>
              <p>
                O responsável pelo tratamento dos seus dados é a <strong>Luciano Eletrotécnica</strong>
                {CNPJ ? `, CNPJ ${CNPJ}` : ""}, que atende em {CITY_LIST} (PR).
              </p>
              <p>
                Para falar sobre privacidade, escreva para <a href={`mailto:${EMAIL}`}>{EMAIL}</a> ou chame no
                WhatsApp pelo número {PHONE_LABEL}.
              </p>
            </>
          ),
        },
        {
          id: "dados",
          title: "2. Quais dados tratamos",
          body: (
            <>
              <p>Tratamos os seguintes dados:</p>
              <ul>
                <li>
                  <strong>Dados que você informa:</strong> nome, cidade, telefone, serviço de interesse e a
                  mensagem que escrever no formulário ou no WhatsApp.
                </li>
                <li>
                  <strong>Dados técnicos de navegação:</strong> endereço IP, tipo de navegador e páginas
                  acessadas, registrados pela infraestrutura de hospedagem para o funcionamento e a segurança do
                  site.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "formulario",
          title: "3. Como funciona o formulário de contato",
          body: (
            <>
              <p>
                O formulário do site <strong>não grava seus dados em um banco de dados</strong>. Ao enviar, o site
                monta uma mensagem com as informações preenchidas e abre o WhatsApp para você enviá-la a nós.
              </p>
              <p>
                A partir daí, a conversa acontece no WhatsApp e passa a seguir os termos e a política de
                privacidade do próprio WhatsApp (Meta).
              </p>
            </>
          ),
        },
        {
          id: "finalidades",
          title: "4. Para que usamos seus dados",
          body: (
            <>
              <ul>
                <li>Responder suas solicitações e preparar orçamentos de serviços;</li>
                <li>Agendar visitas técnicas, executar serviços contratados e prestar suporte;</li>
                <li>Manter a segurança e melhorar o funcionamento do site;</li>
                <li>Cumprir obrigações legais ou regulatórias.</li>
              </ul>
              <p>
                As bases legais usadas são: procedimentos preliminares relacionados a contrato a seu pedido,
                cumprimento de obrigação legal e legítimo interesse (segurança e melhoria do site), nos termos do
                art. 7º da LGPD.
              </p>
            </>
          ),
        },
        {
          id: "compartilhamento",
          title: "5. Compartilhamento",
          body: (
            <p>
              Não vendemos seus dados. Eles só são compartilhados com prestadores necessários ao funcionamento do
              serviço (como o provedor de hospedagem e o WhatsApp) e com autoridades, quando houver exigência
              legal.
            </p>
          ),
        },
        {
          id: "retencao",
          title: "6. Por quanto tempo guardamos",
          body: (
            <p>
              Guardamos os dados pelo tempo necessário para atender sua solicitação e para cumprir obrigações
              legais. Depois disso, eles são excluídos ou anonimizados, salvo quando a lei exigir a manutenção.
            </p>
          ),
        },
        {
          id: "direitos",
          title: "7. Seus direitos",
          body: (
            <>
              <p>Você pode solicitar a qualquer momento, nos termos do art. 18 da LGPD:</p>
              <ul>
                <li>Confirmação de que tratamos seus dados e acesso a eles;</li>
                <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
                <li>Anonimização, bloqueio ou eliminação de dados desnecessários;</li>
                <li>Portabilidade dos dados, quando aplicável;</li>
                <li>Informação sobre com quem compartilhamos seus dados;</li>
                <li>Revogação de consentimento, quando o tratamento depender dele.</li>
              </ul>
              <p>
                Para exercer esses direitos, fale conosco pelo e-mail <a href={`mailto:${EMAIL}`}>{EMAIL}</a> ou
                pelo WhatsApp.
              </p>
            </>
          ),
        },
        {
          id: "cookies",
          title: "8. Cookies",
          body: (
            <p>
              Para saber como o site usa cookies e o armazenamento do navegador, veja a{" "}
              <a href="/politica-de-cookies">Política de Cookies</a>.
            </p>
          ),
        },
        {
          id: "seguranca",
          title: "9. Segurança e alterações",
          body: (
            <>
              <p>
                Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não
                autorizado, perda ou alteração.
              </p>
              <p>
                Esta política pode ser atualizada. A data da última revisão aparece no topo da página.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}