import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Target, TrendingUp, Calendar, BookOpen, FileText, Layers, Package } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { useAdmin } from "@/context/AdminContext";
import { ProductType } from "@/types";
import { useState } from "react";

const radarConcursos = [
  { orgao: "TCE-SP", status: "Edital publicado", banca: "FGV", vagas: 28, prazo: "30 dias" },
  { orgao: "TRT-15", status: "Prova marcada", banca: "Cebraspe", vagas: 45, prazo: "15 dias" },
  { orgao: "SEFAZ-RJ", status: "Autorizado", banca: "FGV", vagas: 60, prazo: "90 dias" },
  { orgao: "PC-DF", status: "Previsto", banca: "Cebraspe", vagas: 1.800, prazo: "180 dias" }
];

export const ProductVitrinesSection = () => {
  const { products, getProductsByType } = useAdmin();

  const CarouselSection = ({ 
    title, 
    subtitle, 
    icon: Icon, 
    products, 
    id,
    variant = "default" 
  }: {
    title: string;
    subtitle: string;
    icon: any;
    products: any[];
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
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex-none w-80"
            >
              <ProductCard 
                product={product} 
                variant={variant === "featured" ? "featured" : "default"}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  // Get products by category
  const preEditorialProducts = products.filter(p => p.phase === "pre").slice(0, 4);
  const posEditorialProducts = products.filter(p => p.phase === "pos").slice(0, 4);
  const flashcards = getProductsByType("deck").slice(0, 4);
  const summaries = getProductsByType("summary").slice(0, 4);
  const mindmaps = getProductsByType("mindmap").slice(0, 4);
  const bundles = getProductsByType("bundle").slice(0, 4);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-slate-50">
      <div className="container mx-auto px-4">
        
        {/* Flashcards Featured */}
        <CarouselSection
          title="Flashcards Premium"
          subtitle="Memorização eficiente com repetição espaçada"
          icon={BookOpen}
          products={flashcards}
          id="flashcards"
          variant="featured"
        />

        {/* Resumos */}
        <CarouselSection
          title="Resumos Teóricos"
          subtitle="Teoria condensada e organizada"
          icon={FileText}
          products={summaries}
          id="resumos"
        />

        {/* Mapas Mentais */}
        <CarouselSection
          title="Mapas Mentais"
          subtitle="Visualização e conexões lógicas"
          icon={Layers}
          products={mindmaps}
          id="mapas-mentais"
        />

        {/* Pacotes */}
        {bundles.length > 0 && (
          <CarouselSection
            title="Pacotes Completos"
            subtitle="Combos com desconto especial"
            icon={Package}
            products={bundles}
            id="pacotes"
            variant="featured"
          />
        )}

        {/* Pré-edital */}
        <CarouselSection
          title="Preparação Pré-edital"
          subtitle="Base sólida para quando o edital sair"
          icon={Target}
          products={preEditorialProducts}
          id="pre-edital"
        />

        {/* Pós-edital */}
        <CarouselSection
          title="Pós-edital - Foco Total"
          subtitle="Curadoria especializada para provas marcadas"
          icon={Clock}
          products={posEditorialProducts}
          id="pos-edital"
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

      </div>
    </section>
  );
};