import { Product, Deck, Summary, MindMap, Bundle } from '@/types';

export const mockDecks: Deck[] = [
  {
    id: "1",
    type: "deck",
    title: "Direito Administrativo Completo FGV",
    description: "Preparação completa para concursos com foco na banca FGV. Inclui princípios, atos administrativos, licitações e jurisprudência atualizada.",
    banca: "FGV",
    area: "Jurídica",
    concurso: "TCE-RJ 2025",
    phase: "pos",
    period: "60",
    price: 14999,
    version: "2025.1",
    slug: "direito-administrativo-fgv-completo",
    lastUpdate: "15/01/2025",
    tags: ["direito", "administrativo", "fgv", "tribunais"],
    featured: true,
    trending: true,
    numCards: 680,
    includesJurisprudence: true,
    popularity: "2.847 estudando",
    topics: [
      { name: "Princípios da Administração", cards: 120, weight: "Muito Alta" },
      { name: "Atos Administrativos", cards: 180, weight: "Muito Alta" },
      { name: "Processo Administrativo", cards: 140, weight: "Alta incidência" },
      { name: "Licitações e Contratos", cards: 160, weight: "Alta incidência" },
      { name: "Responsabilidade Civil", cards: 80, weight: "Média" }
    ],
    previewCards: [
      {
        front: "Quais são os princípios expressos da Administração Pública segundo a CF/88?",
        back: "LIMPE: Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência (art. 37, caput)"
      },
      {
        front: "O que caracteriza o ato administrativo discricionário?",
        back: "Liberdade de escolha quanto ao conteúdo, destinatário, conveniência, oportunidade e forma, dentro dos limites legais."
      }
    ]
  },
  {
    id: "2",
    type: "deck",
    title: "Receita Federal - Auditor Fiscal",
    description: "Deck especializado para o concurso da Receita Federal com foco em legislação tributária e contabilidade.",
    banca: "ESAF",
    area: "Fiscal",
    concurso: "RFB 2024",
    phase: "pre",
    period: "90",
    price: 18999,
    version: "2024.8",
    slug: "receita-federal-auditor-fiscal",
    lastUpdate: "22/02/2024",
    tags: ["receita", "federal", "tributário", "esaf"],
    featured: false,
    trending: true,
    numCards: 950,
    includesJurisprudence: false,
    popularity: "4.122 estudando",
    topics: [
      { name: "Direito Tributário", cards: 320, weight: "Muito Alta" },
      { name: "Contabilidade Geral", cards: 280, weight: "Alta incidência" },
      { name: "Auditoria", cards: 200, weight: "Alta incidência" },
      { name: "Legislação Específica", cards: 150, weight: "Média" }
    ],
    previewCards: [
      {
        front: "Quais são os princípios tributários constitucionais?",
        back: "Legalidade, Anterioridade, Irretroatividade, Isonomia, Capacidade Contributiva, Vedação ao Confisco."
      }
    ]
  }
];

export const mockSummaries: Summary[] = [
  {
    id: "3",
    type: "summary",
    title: "Resumo Completo - Direito Constitucional",
    description: "Teoria condensada dos principais tópicos de Direito Constitucional com esquemas e mapas conceituais.",
    banca: "Cebraspe",
    area: "Jurídica",
    phase: "pre",
    period: "45",
    price: 4999,
    version: "2025.1",
    slug: "resumo-direito-constitucional",
    lastUpdate: "10/01/2025",
    tags: ["constitucional", "resumo", "teoria", "esquemas"],
    featured: true,
    trending: false,
    pages: 120,
    format: "pdf",
    hasExercises: true,
    chapters: [
      { name: "Princípios Constitucionais", pages: 25 },
      { name: "Direitos Fundamentais", pages: 35 },
      { name: "Organização do Estado", pages: 30 },
      { name: "Controle de Constitucionalidade", pages: 30 }
    ]
  },
  {
    id: "4",
    type: "summary",
    title: "Português para Concursos - Teoria Essencial",
    description: "Resumo completo de gramática, interpretação de texto e redação oficial focado em concursos públicos.",
    banca: "FCC",
    area: "Básica",
    phase: "pre",
    period: "30",
    price: 2999,
    version: "2025.1",
    slug: "portugues-teoria-essencial",
    lastUpdate: "05/01/2025",
    tags: ["português", "gramática", "interpretação", "redação"],
    featured: false,
    trending: true,
    pages: 80,
    format: "pdf",
    hasExercises: false,
    chapters: [
      { name: "Morfologia e Sintaxe", pages: 20 },
      { name: "Interpretação de Texto", pages: 25 },
      { name: "Redação Oficial", pages: 20 },
      { name: "Ortografia e Acentuação", pages: 15 }
    ]
  }
];

export const mockMindMaps: MindMap[] = [
  {
    id: "5",
    type: "mindmap",
    title: "Mapa Mental - Processo Civil",
    description: "Visualização completa dos procedimentos do Processo Civil com fluxogramas interativos e conexões lógicas.",
    banca: "FGV",
    area: "Jurídica",
    phase: "pos",
    period: "30",
    price: 3999,
    version: "2025.1",
    slug: "mapa-mental-processo-civil",
    lastUpdate: "08/01/2025",
    tags: ["processo", "civil", "mapa", "visual", "procedimentos"],
    featured: false,
    trending: true,
    nodes: 150,
    interactive: true,
    downloadFormats: ["png", "pdf", "svg"],
    preview: {
      title: "Estrutura do Processo Civil",
      description: "Visualização dos principais institutos processuais",
      imageUrl: "/mock-mindmap-preview.jpg"
    }
  },
  {
    id: "6",
    type: "mindmap",
    title: "Organização Administrativa do Estado",
    description: "Mapa mental completo da estrutura administrativa brasileira com órgãos, autarquias, fundações e empresas públicas.",
    banca: "Cebraspe",
    area: "Jurídica",
    phase: "pre",
    period: "45",
    price: 2999,
    version: "2025.1",
    slug: "organizacao-administrativa-estado",
    lastUpdate: "12/01/2025",
    tags: ["administrativo", "organização", "estado", "estrutura"],
    featured: true,
    trending: false,
    nodes: 120,
    interactive: false,
    downloadFormats: ["png", "pdf"],
    preview: {
      title: "Estrutura do Estado Brasileiro",
      description: "Organização administrativa completa",
      imageUrl: "/mock-mindmap-admin.jpg"
    }
  }
];

export const mockBundles: Bundle[] = [
  {
    id: "7",
    type: "bundle",
    title: "Pacote Completo - Tribunais FGV",
    description: "Combo completo para concursos de Tribunais da banca FGV: flashcards + resumos + mapas mentais com 30% de desconto.",
    banca: "FGV",
    area: "Tribunais",
    phase: "pos",
    period: "60",
    price: 29999, // Preço já com desconto aplicado
    version: "2025.1",
    slug: "pacote-completo-tribunais-fgv",
    lastUpdate: "15/01/2025",
    tags: ["pacote", "tribunais", "fgv", "completo", "combo"],
    featured: true,
    trending: true,
    products: [
      { type: "deck", id: "1" },
      { type: "summary", id: "3" },
      { type: "mindmap", id: "5" }
    ],
    discount: 30
  }
];

export const mockProducts: Product[] = [
  ...mockDecks,
  ...mockSummaries,
  ...mockMindMaps,
  ...mockBundles
];

// Filter options for the platform
export const filterOptions = {
  types: [
    { id: "deck", label: "Flashcards", count: mockDecks.length },
    { id: "summary", label: "Resumos", count: mockSummaries.length },
    { id: "mindmap", label: "Mapas Mentais", count: mockMindMaps.length },
    { id: "bundle", label: "Pacotes", count: mockBundles.length }
  ],
  areas: [
    { id: "Jurídica", label: "Jurídica", count: 45 },
    { id: "Fiscal", label: "Fiscal", count: 38 },
    { id: "Tribunais", label: "Tribunais", count: 29 },
    { id: "Básica", label: "Matérias Básicas", count: 22 },
    { id: "Policial", label: "Área Policial", count: 31 },
    { id: "Saúde", label: "Área da Saúde", count: 18 }
  ],
  bancas: [
    { id: "FGV", label: "FGV", count: 52 },
    { id: "Cebraspe", label: "Cebraspe", count: 48 },
    { id: "FCC", label: "FCC", count: 35 },
    { id: "ESAF", label: "ESAF", count: 28 },
    { id: "Vunesp", label: "Vunesp", count: 41 },
    { id: "IBFC", label: "IBFC", count: 18 }
  ],
  phases: [
    { id: "pre", label: "Pré-edital", count: 125 },
    { id: "pos", label: "Pós-edital", count: 89 }
  ],
  periods: [
    { id: "15", label: "15 dias", count: 23 },
    { id: "30", label: "30 dias", count: 45 },
    { id: "45", label: "45 dias", count: 32 },
    { id: "60", label: "60 dias", count: 78 },
    { id: "90", label: "90 dias", count: 67 }
  ]
};