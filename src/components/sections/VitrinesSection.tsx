import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Target, TrendingUp, Calendar } from "lucide-react";
import { DeckCard } from "@/components/ui/DeckCard";
import { useState } from "react";

// Mock data - Em produção viria do Supabase
const mockDecks = {
  preEdital: [
    {
      title: "Direito Administrativo Essencial",
      description: "Princípios, atos administrativos e licitações para concursos de nível superior",
      banca: "FGV",
      area: "Jurídica",
      fase: "pre" as const,
      prazo: "60" as const,
      numCards: 450,
      preco: 4999,
      incluiJurisprudencia: false,
      versao: "2025.1",
      slug: "direito-administrativo-fgv-pre",
      ultimaAtualizacao: "15/01/2025"
    },
    {
      title: "Português para Tribunais",
      description: "Interpretação de texto, gramática e redação oficial focado em bancas tradicionais",
      banca: "Cebraspe",
      area: "Tribunais",
      fase: "pre" as const,
      prazo: "90" as const,
      numCards: 380,
      preco: 3999,
      incluiJurisprudencia: false,
      versao: "2025.1",
      slug: "portugues-tribunais-cebraspe",
      ultimaAtualizacao: "12/01/2025"
    }
  ],
  posEdital: [
    {
      title: "Fiscal Pós-edital - Sprint 30 dias",
      description: "Curadoria intensiva com jurisprudência atualizada para provas iminentes",
      banca: "FGV",
      area: "Fiscal",
      fase: "pos" as const,
      prazo: "30" as const,
      numCards: 280,
      preco: 7999,
      incluiJurisprudencia: true,
      versao: "2025.2",
      slug: "fiscal-pos-sprint-fgv",
      ultimaAtualizacao: "10/01/2025"
    },
    {
      title: "Controle Externo com Jurisprudência",
      description: "TCU, TCEs e Tribunais de Contas com casos práticos e súmulas atualizadas",
      banca: "Cebraspe",
      area: "Controle",
      fase: "pos" as const,
      prazo: "45" as const,
      numCards: 520,
      preco: 8999,
      incluiJurisprudencia: true,
      versao: "2025.2",
      slug: "controle-externo-pos-cebraspe",
      ultimaAtualizacao: "08/01/2025"
    }
  ],
  sprint30: [
    {
      title: "Policial Civil - Última Semana",
      description: "Resumo ultracompacto para revisão final da prova",
      banca: "Vunesp",
      area: "Policial",
      fase: "pos" as const,
      prazo: "15" as const,
      numCards: 150,
      preco: 2999,
      incluiJurisprudencia: true,
      versao: "2025.2",
      slug: "policial-civil-ultima-semana",
      ultimaAtualizacao: "14/01/2025"
    }
  ],
  maisVendidos: [
    {
      title: "Direito Constitucional FGV Completo",
      description: "Teoria + jurisprudência do STF organizada por temas mais cobrados",
      banca: "FGV",
      area: "Jurídica",
      fase: "pos" as const,
      prazo: "60" as const,
      numCards: 680,
      preco: 9999,
      incluiJurisprudencia: true,
      versao: "2025.2",
      slug: "constitucional-fgv-completo",
      ultimaAtualizacao: "05/01/2025"
    }
  ]
};

const radarConcursos = [
  { orgao: "TCE-SP", status: "Edital publicado", banca: "FGV", vagas: 28, prazo: "30 dias" },
  { orgao: "TRT-15", status: "Prova marcada", banca: "Cebraspe", vagas: 45, prazo: "15 dias" },
  { orgao: "SEFAZ-RJ", status: "Autorizado", banca: "FGV", vagas: 60, prazo: "90 dias" },
  { orgao: "PC-DF", status: "Previsto", banca: "Cebraspe", vagas: 1.800, prazo: "180 dias" }
];

export const VitrinesSection = () => {
  const [activeCarousel, setActiveCarousel] = useState<string | null>(null);

  const CarouselSection = ({ 
    title, 
    subtitle, 
    icon: Icon, 
    decks, 
    id,
    variant = "default" 
  }: {
    title: string;
    subtitle: string;
    icon: any;
    decks: any[];
    id: string;
    variant?: "default" | "featured";
  }) => (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl ${variant === "featured" ? "bg-gradient-accent" : "bg-slate-100"}`}>
            <Icon className={`w-6 h-6 ${variant === "featured" ? "text-slate-950" : "text-slate-600"}`} />
          </div>
          <div>
            <h2 className="font-lexend font-bold text-2xl lg:text-3xl text-slate-950">{title}</h2>
            <p className="text-slate-600 mt-1">{subtitle}</p>
          </div>
        </div>
        <button className="text-amber-600 hover:text-amber-700 text-sm font-medium transition-colors">
          Ver todos →
        </button>
      </div>

      <div className="relative">
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {decks.map((deck, index) => (
            <motion.div
              key={deck.slug}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex-none w-80"
            >
              <DeckCard 
                {...deck} 
                variant={variant === "featured" ? "featured" : "default"}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-b from-background to-slate-50">
      <div className="container mx-auto px-4">
        
        {/* Pré-edital */}
        <CarouselSection
          title="Preparação Pré-edital"
          subtitle="Base sólida para quando o edital sair"
          icon={Target}
          decks={mockDecks.preEdital}
          id="pre-edital"
        />

        {/* Pós-edital Featured */}
        <CarouselSection
          title="Pós-edital - Foco Total"
          subtitle="Curadoria especializada para provas marcadas"
          icon={Clock}
          decks={mockDecks.posEdital}
          id="pos-edital"
          variant="featured"
        />

        {/* Sprint 30 dias */}
        <CarouselSection
          title="Sprint 30 dias"
          subtitle="Revisão intensiva para reta final"
          icon={TrendingUp}
          decks={mockDecks.sprint30}
          id="sprint-30"
        />

        {/* Radar de Concursos */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-emerald-100 rounded-xl">
              <Calendar className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="font-lexend font-bold text-2xl lg:text-3xl text-slate-950">
                Radar de Concursos
              </h2>
              <p className="text-slate-600 mt-1">Acompanhe o status dos principais editais</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {radarConcursos.map((concurso, index) => (
              <motion.div
                key={concurso.orgao}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white border border-slate-200 rounded-xl p-6 hover-lift cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-slate-950">{concurso.orgao}</h3>
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${concurso.status === "Edital publicado" ? "bg-emerald-100 text-emerald-700" :
                      concurso.status === "Prova marcada" ? "bg-amber-100 text-amber-700" :
                      concurso.status === "Autorizado" ? "bg-blue-100 text-blue-700" :
                      "bg-slate-100 text-slate-600"
                    }
                  `}>
                    {concurso.status}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>Banca:</span>
                    <span className="font-medium">{concurso.banca}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vagas:</span>
                    <span className="font-medium">{concurso.vagas}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prazo:</span>
                    <span className="font-medium text-amber-600">{concurso.prazo}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mais Vendidos */}
        <CarouselSection
          title="Mais Vendidos por Banca"
          subtitle="Os decks que mais aprovam"
          icon={TrendingUp}
          decks={mockDecks.maisVendidos}
          id="mais-vendidos"
        />

      </div>
    </section>
  );
};