export type Solution = { t: string; d: string; items: string[] };

export type Service = {
  slug: string;
  number: string;
  title: string;
  short: string;
  image?: string;
  bullets: string[];
  heroTitle: string;
  heroLead: string;
  whatsappText: string;
  solutions: Solution[];
  ctaTitle: string;
};

export const services: Service[] = [
  {
    slug: "eletrica",
    number: "01",
    title: "Elétrica",
    short: "Instalações e manutenções elétricas residenciais e comerciais.",
    image: "/servicos/eletrica.png",
    bullets: [
      "Elétrica completa para casas novas e reformas",
      "Montagem e manutenção de quadros elétricos (QDC)",
      "Troca de fiação, disjuntores e tomadas",
      "Instalação de iluminação, lustres e pendentes",
      "Adequação conforme normas técnicas",
    ],
    heroTitle: "Serviços elétricos com segurança e acabamento profissional",
    heroLead:
      "Da instalação completa à manutenção do dia a dia. Serviço organizado, dentro das normas técnicas e com garantia.",
    whatsappText: "Olá! Tenho interesse em serviços de elétrica.",
    solutions: [
      {
        t: "Instalações elétricas",
        d: "Elétrica completa para casas novas, reformas e ambientes comerciais.",
        items: [
          "Passagem de eletrodutos e fiação",
          "Pontos de tomadas e interruptores",
          "Circuitos dimensionados para a sua carga",
          "Acabamento limpo e organizado",
        ],
      },
      {
        t: "Quadros elétricos (QDC)",
        d: "O coração da instalação, montado e identificado do jeito certo.",
        items: [
          "Montagem e substituição de quadros",
          "Disjuntores, DR e DPS adequados",
          "Identificação dos circuitos",
          "Ampliação e reorganização de quadros antigos",
        ],
      },
      {
        t: "Manutenção e reparos",
        d: "Diagnóstico rápido e correção na causa do problema.",
        items: [
          "Troca de fiação, disjuntores e tomadas",
          "Curto-circuito e queda de energia",
          "Correção de sobrecargas",
          "Manutenção preventiva",
        ],
      },
      {
        t: "Iluminação e adequações",
        d: "Conforto, estética e segurança em cada ambiente.",
        items: [
          "Instalação de lustres e pendentes",
          "Iluminação embutida e fitas de LED",
          "Adequação conforme normas técnicas",
          "Orientação sobre carga e consumo",
        ],
      },
    ],
    ctaTitle: "Precisa de um eletricista de confiança?",
  },
  {
    slug: "seguranca-eletronica",
    number: "02",
    title: "Segurança eletrônica",
    short: "CFTV, alarmes e controle de acesso para residências e empresas.",
    image: "/servicos/seguranca-eletronica.png",
    bullets: [
      "Instalação de câmeras de segurança (CFTV)",
      "Sistemas de alarme residencial e comercial",
      "Controle de acesso: portões, interfones e fechaduras",
      "Configuração e orientação de uso",
      "Organização e acabamento profissional",
    ],
    heroTitle: "Segurança eletrônica instalada com capricho",
    heroLead:
      "Câmeras, alarmes e controle de acesso configurados e explicados, para você ter tranquilidade no dia a dia.",
    whatsappText: "Olá! Tenho interesse em segurança eletrônica.",
    solutions: [
      {
        t: "Câmeras de segurança (CFTV)",
        d: "Monitoramento da sua casa ou empresa, com imagens que você acompanha de onde estiver.",
        items: [
          "Instalação de câmeras internas e externas",
          "Configuração de gravação",
          "Acesso pelo celular",
          "Cabeamento organizado",
        ],
      },
      {
        t: "Alarmes",
        d: "Proteção residencial e comercial com sensores bem posicionados.",
        items: [
          "Sensores de presença e de abertura",
          "Sirene e central de alarme",
          "Configuração e testes",
          "Orientação de uso",
        ],
      },
      {
        t: "Controle de acesso",
        d: "Mais praticidade e controle sobre quem entra e sai.",
        items: [
          "Portões e automatizadores",
          "Interfones",
          "Fechaduras elétricas e eletrônicas",
          "Integração com o restante da instalação",
        ],
      },
      {
        t: "Configuração e acabamento",
        d: "Sistema instalado, configurado e explicado.",
        items: [
          "Orientação completa de uso",
          "Cabos organizados e identificados",
          "Acabamento limpo",
          "Suporte após a instalação",
        ],
      },
    ],
    ctaTitle: "Pronto para deixar seu espaço mais seguro?",
  },
  {
    slug: "solucoes-tv",
    number: "03",
    title: "Soluções para TV",
    short: "Instalação e configuração para a sua TV e sistema de som.",
    image: "/servicos/solucoes-tv.png",
    bullets: [
      "Instalação de TV na parede",
      "Antenas digitais e parabólicas",
      "Configuração de home theater",
      "Organização de cabos",
    ],
    heroTitle: "Instalação e configuração de TV profissional",
    heroLead:
      "Da fixação na parede à configuração completa do seu sistema de entretenimento. Serviço rápido, limpo e com garantia.",
    whatsappText: "Olá! Tenho interesse em soluções para TV.",
    solutions: [
      {
        t: "Instalação de TV na parede",
        d: "Fixação segura de TVs de todos os tamanhos, com suportes de qualidade.",
        items: [
          "Suportes fixos e articulados",
          "Passagem de cabos embutida",
          "Nivelamento perfeito",
          "Garantia na instalação",
        ],
      },
      {
        t: "Antenas digitais e parabólicas",
        d: "Instalação e manutenção para um sinal de qualidade.",
        items: [
          "Antenas UHF para TV digital",
          "Antenas parabólicas",
          "Orientação e ajuste de sinal",
          "Amplificadores de sinal",
        ],
      },
      {
        t: "Home theater",
        d: "Configuração completa de áudio e vídeo.",
        items: [
          "Instalação de soundbars",
          "Sistemas surround",
          "Ajuste de áudio",
          "Integração com TV e streaming",
        ],
      },
      {
        t: "Organização de cabos",
        d: "Instalação limpa, sem fios aparentes.",
        items: [
          "Canaletas e conduítes",
          "Passagem embutida na parede",
          "Identificação de cabos",
          "Acabamento profissional",
        ],
      },
    ],
    ctaTitle: "Pronto para transformar sua experiência de TV?",
  },
  {
    slug: "starlink",
    number: "04",
    title: "Starlink Residencial e Móvel",
    short: "Internet via satélite de alta velocidade para sua casa, empresa ou veículos.",
    image: "/servicos/starlink.png",
    bullets: [
      "Instalação profissional de antenas residenciais",
      "Conectividade móvel para motorhomes e embarcações",
      "Alinhamento, otimização de sinal e testes de velocidade",
      "Passagem de cabos e configuração de roteadores Wi-Fi",
    ],
    heroTitle: "Internet Starlink Residencial e Móvel com instalação profissional",
    heroLead:
      "Garanta alta velocidade e estabilidade em qualquer lugar. Instalação especializada para residências, empresas e uso itinerante.",
    whatsappText: "Olá! Tenho interesse em instalação Starlink.",
    solutions: [
      {
        t: "Starlink Residencial",
        d: "Internet via satélite de alta velocidade para locais remotos ou urbanos.",
        items: [
          "Instalação profissional da antena Starlink",
          "Alinhamento e otimização de sinal via aplicativo",
          "Passagem de cabos e proteção contra intempéries",
          "Configuração de roteadores e cobertura Wi-Fi",
        ],
      },
      {
        t: "Starlink Móvel / Itinerante",
        d: "Conectividade de alta performance para veículos, motorhomes e embarcações.",
        items: [
          "Instalação de antenas em movimento (Flat High Performance)",
          "Suportes reforçados para teto de veículos e embarcações",
          "Integração com sistemas de energia 12V/24V",
          "Testes de estabilidade de conexão em deslocamento",
        ],
      },
    ],
    ctaTitle: "Quer internet de alta velocidade em qualquer lugar?",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);