import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { CITY_LIST } from "@/lib/config";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Condições de uso do site da Luciano Eletrotécnica e informações sobre orçamentos e serviços.",
  alternates: { canonical: "/termos-de-uso" },
  robots: { index: false, follow: true },
};

export default function TermsOfUsePage() {
  return (
    <LegalPage
      title="Termos de Uso"
      intro={
        <>
          Bem-vindo à <strong>Luciano Eletrotécnica</strong>. Ao acessar e usar este site, você concorda com os
          termos abaixo.
        </>
      }
      sections={[
        {
          id: "servicos",
          title: "1. Serviços apresentados",
          body: (
            <p>
              O site apresenta nossos serviços de elétrica, segurança eletrônica, soluções para TV e Starlink,
              com atendimento em {CITY_LIST} (PR). As informações têm caráter informativo e podem ser atualizadas
              a qualquer momento.
            </p>
          ),
        },
        {
          id: "orcamentos",
          title: "2. Orçamentos",
          body: (
            <>
              <p>
                Os orçamentos solicitados por canais digitais são estimativas e dependem de avaliação técnica do
                local. Valores, prazos e condições de garantia são confirmados na proposta final.
              </p>
              <p>O envio do formulário não representa contratação do serviço.</p>
            </>
          ),
        },
        {
          id: "uso",
          title: "3. Uso adequado do site",
          body: (
            <p>
              Você se compromete a usar o site de forma lícita, sem tentar prejudicar seu funcionamento, acessar
              áreas restritas ou enviar informações falsas ou de terceiros sem autorização.
            </p>
          ),
        },
        {
          id: "propriedade",
          title: "4. Propriedade intelectual",
          body: (
            <p>
              Textos, logotipos, imagens e demais conteúdos do site pertencem à Luciano Eletrotécnica e são
              protegidos pela legislação de direitos autorais. Não é permitido copiá-los ou reutilizá-los sem
              autorização.
            </p>
          ),
        },
        {
          id: "links",
          title: "5. Links para outros sites",
          body: (
            <p>
              O site pode conter links para serviços de terceiros, como WhatsApp e Google. Não somos responsáveis
              pelo conteúdo nem pelas políticas desses serviços.
            </p>
          ),
        },
        {
          id: "responsabilidade",
          title: "6. Disponibilidade e responsabilidade",
          body: (
            <p>
              Trabalhamos para manter o site no ar e com informações corretas, mas não garantimos que ele esteja
              sempre disponível ou livre de erros.
            </p>
          ),
        },
        {
          id: "privacidade",
          title: "7. Privacidade",
          body: (
            <p>
              O tratamento de dados pessoais segue a <a href="/politica-de-privacidade">Política de Privacidade</a>
              .
            </p>
          ),
        },
        {
          id: "alteracoes",
          title: "8. Alterações e legislação",
          body: (
            <>
              <p>Estes termos podem ser atualizados. A data da última revisão aparece no topo da página.</p>
              <p>
                Aplica-se a legislação brasileira. Em relações de consumo, é assegurado ao consumidor o foro do seu
                domicílio.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}