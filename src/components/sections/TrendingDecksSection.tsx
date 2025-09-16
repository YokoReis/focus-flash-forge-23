import { motion } from "framer-motion";
import { TrendingUp, Flame, Users } from "lucide-react";
import { DeckCard } from "@/components/ui/DeckCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Mock data para decks em alta - concursos específicos reais
const trendingDecks = [
  {
    title: "Tribunal de Justiça de São Paulo (TJSP)",
    description: "Preparação completa para o concurso do TJSP com questões atualizadas e jurisprudência recente.",
    banca: "VUNESP",
    area: "Tribunais",
    concurso: "TJSP 2024",
    fase: "pos" as const,
    prazo: "45" as const,
    numCards: 1850,
    preco: 147.90,
    incluiJurisprudencia: true,
    versao: "3.2",
    slug: "tjsp-vunesp-2024",
    ultimaAtualizacao: "15/02/2024",
    trendingBadge: "🔥 Em Alta",
    popularity: "2.847 estudando"
  },
  {
    title: "Receita Federal do Brasil (RFB)",
    description: "Deck completo para Auditor Fiscal da Receita Federal com foco em legislação tributária.",
    banca: "ESAF",
    area: "Fiscal",
    concurso: "RFB 2024",
    fase: "pre" as const,
    prazo: "90" as const,
    numCards: 2340,
    preco: 189.90,
    incluiJurisprudencia: false,
    versao: "2.8",
    slug: "rfb-esaf-2024",
    ultimaAtualizacao: "22/02/2024",
    trendingBadge: "⭐ Mais Vendido",
    popularity: "4.122 estudando"
  },
  {
    title: "Polícia Civil do Estado de São Paulo",
    description: "Preparação para Investigador e Escrivão da Polícia Civil SP com questões práticas.",
    banca: "VUNESP",
    area: "Policial",
    concurso: "PC-SP 2024",
    fase: "pos" as const,
    prazo: "30" as const,
    numCards: 1620,
    preco: 129.90,
    incluiJurisprudencia: true,
    versao: "4.1",
    slug: "pcsp-vunesp-2024",
    ultimaAtualizacao: "08/02/2024",
    trendingBadge: "📈 Crescendo",
    popularity: "1.954 estudando"
  },
  {
    title: "Prefeitura de São Paulo (PMSP)",
    description: "Concurso para Analista e Técnico da Prefeitura de São Paulo com edital atualizado.",
    banca: "FGV",
    area: "Municipal",
    concurso: "PMSP 2024",
    fase: "pos" as const,
    prazo: "60" as const,
    numCards: 1980,
    preco: 159.90,
    incluiJurisprudencia: false,
    versao: "1.5",
    slug: "pmsp-fgv-2024",
    ultimaAtualizacao: "12/02/2024",
    trendingBadge: "🚀 Novo",
    popularity: "987 estudando"
  },
  {
    title: "Tribunal Regional Federal 3ª Região",
    description: "Preparação para cargos administrativos do TRF3 com foco em direito federal.",
    banca: "FCC",
    area: "Tribunais",
    concurso: "TRF3 2024",
    fase: "pre" as const,
    prazo: "60" as const,
    numCards: 2150,
    preco: 167.90,
    incluiJurisprudencia: true,
    versao: "2.3",
    slug: "trf3-fcc-2024",
    ultimaAtualizacao: "18/02/2024",
    trendingBadge: "🔥 Em Alta",
    popularity: "1.432 estudando"
  }
];

export const TrendingDecksSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-slate-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-emerald-500/5" />
      
      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center gap-2 bg-gradient-accent px-4 py-2 rounded-full">
              <TrendingUp className="w-5 h-5 text-slate-950" />
              <span className="font-lexend font-semibold text-slate-950 text-sm">
                Decks em Alta
              </span>
            </div>
          </div>
          
          <h2 className="font-lexend text-3xl font-bold text-slate-950 mb-4">
            Os Mais Procurados da Semana
          </h2>
          
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Decks que estão sendo mais estudados pelos concurseiros. 
            Concursos com editais publicados e alta demanda.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Carousel
            className="w-full"
            opts={{
              align: "start",
              loop: true,
              skipSnaps: false,
              dragFree: true,
            }}
          >
            <CarouselContent className="-ml-6">
              {trendingDecks.map((deck, index) => (
                <CarouselItem key={deck.slug} className="pl-6 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="h-full"
                  >
                    <DeckCard
                      {...deck}
                      variant="trending"
                    />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation */}
            <div className="hidden md:block">
              <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white shadow-lg border border-slate-200 hover:bg-slate-50 hover:shadow-xl transition-smooth" />
              <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white shadow-lg border border-slate-200 hover:bg-slate-50 hover:shadow-xl transition-smooth" />
            </div>
          </Carousel>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-8 mt-12 text-slate-600"
        >
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-medium">+15 novos decks esta semana</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-medium">12.340+ estudantes ativos</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};