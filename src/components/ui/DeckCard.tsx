import { motion } from "framer-motion";
import { Clock, BookOpen, Badge, Target } from "lucide-react";
import { PriceTag } from "./PriceTag";
import { BadgeJuris } from "./BadgeJuris";

interface DeckCardProps {
  title: string;
  description: string;
  banca: string;
  area: string;
  concurso?: string;
  fase: "pre" | "pos";
  prazo: "15" | "30" | "45" | "60" | "90";
  numCards: number;
  preco: number;
  incluiJurisprudencia: boolean;
  versao: string;
  slug: string;
  ultimaAtualizacao: string;
  variant?: "default" | "featured" | "compact" | "trending";
  trendingBadge?: string;
  popularity?: string;
}

export const DeckCard = ({
  title,
  description,
  banca,
  area,
  concurso,
  fase,
  prazo,
  numCards,
  preco,
  incluiJurisprudencia,
  versao,
  slug,
  ultimaAtualizacao,
  variant = "default",
  trendingBadge,
  popularity
}: DeckCardProps) => {
  const isCompact = variant === "compact";
  const isFeatured = variant === "featured";
  const isTrending = variant === "trending";

  // Generate image path based on slug
  const imagePath = `/deck-images/${slug}.jpg`;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`
        group relative bg-gradient-card border border-slate-200 rounded-xl overflow-hidden 
        hover-lift cursor-pointer transition-smooth
        ${isFeatured ? "ring-2 ring-amber-500 shadow-editorial" : "shadow-card hover:shadow-card-hover"}
        ${isTrending ? "ring-2 ring-emerald-500/30 shadow-card-hover" : ""}
        ${isCompact ? "h-auto" : "h-full"}
      `}
      onClick={() => window.location.href = `/deck/${slug}`}
    >
      {/* Product Image */}
      <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
        <img 
          src={imagePath}
          alt={`Flashcards ${title}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            // Fallback to a gradient background with text if image fails to load
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div class="w-full h-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                  <div class="text-center text-white">
                    <h4 class="font-bold text-lg mb-1">${banca}</h4>
                    <p class="text-sm opacity-90">${area}</p>
                  </div>
                </div>
              `;
            }
          }}
        />
        
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      {/* Badge de Destaque */}
      {isFeatured && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gradient-accent text-slate-950 px-3 py-1 rounded-full text-xs font-medium">
            Destaque
          </div>
        </div>
      )}
      
      {/* Badge de Trending */}
      {isTrending && trendingBadge && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gradient-emerald text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
            {trendingBadge}
          </div>
        </div>
      )}

      <div className={`p-6 ${isCompact ? "pb-4" : ""}`}>
        {/* Header com tags */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex flex-wrap gap-2">
            <span className={`
              px-3 py-1 rounded-full text-xs font-medium transition-colors
              ${fase === "pos" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}
            `}>
              {fase === "pos" ? "Pós-edital" : "Pré-edital"}
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
              {banca}
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
              {area}
            </span>
          </div>
        </div>
        
        {/* Concurso específico para trending */}
        {isTrending && concurso && (
          <div className="mb-3">
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
              {concurso}
            </span>
          </div>
        )}

        {/* Título e Descrição */}
        <div className="mb-4">
          <h3 className="font-lexend font-semibold text-lg text-slate-950 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
            {title}
          </h3>
          {!isCompact && (
            <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Badges especiais */}
        <div className="flex items-center gap-3 mb-4">
          <BadgeJuris incluiJurisprudencia={incluiJurisprudencia} />
          <div className="flex items-center gap-1 text-slate-500 text-xs">
            <Target className="w-3 h-3" />
            <span>{prazo} dias</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <BookOpen className="w-4 h-4" />
            <span>{numCards} cards</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Clock className="w-4 h-4" />
            <span>v{versao}</span>
          </div>
        </div>

        {/* Popularity para trending */}
        {isTrending && popularity && (
          <div className="mb-4 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
            <div className="flex items-center gap-2 text-emerald-700">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">{popularity}</span>
            </div>
          </div>
        )}

        {/* Preço */}
        <div className="flex items-center justify-between">
          <PriceTag 
            preco={preco} 
            variant={isFeatured ? "featured" : isTrending ? "trending" : "default"}
            showParcelas={!isCompact}
          />
          
          {!isCompact && (
            <div className="text-xs text-slate-400">
              Atualizado em {ultimaAtualizacao}
            </div>
          )}
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            w-full mt-4 py-3 rounded-lg font-medium transition-smooth text-sm
            ${isFeatured 
              ? "bg-gradient-accent text-slate-950 hover:shadow-lg" 
              : isTrending
              ? "bg-gradient-emerald text-white hover:shadow-lg"
              : "bg-slate-950 text-white hover:bg-slate-800"
            }
          `}
        >
          Ver detalhes
        </motion.button>
      </div>
    </motion.div>
  );
};