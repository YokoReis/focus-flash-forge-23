import { motion } from "framer-motion";
import { Heart, ShoppingCart, BookOpen, FileText, Layers, Package, ExternalLink } from "lucide-react";
import { Product, ProductType } from "@/types";
import { PriceTag } from "./PriceTag";
import { BadgeJuris } from "./BadgeJuris";
import { useAdmin } from "@/context/AdminContext";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "featured" | "compact" | "trending";
}

const getProductIcon = (type: ProductType) => {
  const icons = {
    deck: BookOpen,
    summary: FileText,
    mindmap: Layers,
    bundle: Package
  };
  return icons[type];
};

const getProductTypeLabel = (type: ProductType) => {
  const labels = {
    deck: "Flashcards",
    summary: "Resumo",
    mindmap: "Mapa Mental",
    bundle: "Pacote"
  };
  return labels[type];
};

const getProductMetric = (product: Product) => {
  switch (product.type) {
    case "deck":
      return `${product.numCards} cards`;
    case "summary":
      return `${product.pages} páginas`;
    case "mindmap":
      return `${product.nodes} nós`;
    case "bundle":
      return `${product.products.length} produtos`;
    default:
      return "";
  }
};

export const ProductCard = ({ product, variant = "default" }: ProductCardProps) => {
  const { addToCart, addToFavorites, removeFromFavorites, isFavorite } = useAdmin();
  const Icon = getProductIcon(product.type);
  const isProductFavorite = isFavorite(product.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isProductFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product.id);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product.id);
  };

  const cardClasses = {
    default: "bg-white border border-slate-200 rounded-xl shadow-card hover-lift transition-smooth overflow-hidden",
    featured: "bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl shadow-elegant hover-lift transition-smooth overflow-hidden",
    compact: "bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-smooth overflow-hidden",
    trending: "bg-white border border-slate-200 rounded-xl shadow-card hover-lift transition-smooth overflow-hidden relative"
  };

  const imageClasses = variant === "compact" ? "h-32" : "h-48";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Link to={`/${product.type}/${product.slug}`} className="block h-full">
        <div className={cardClasses[variant]}>
            {/* Trending Badge */}
            {variant === "trending" && product.trending && (
              <div className="absolute top-3 left-3 bg-gradient-lime-brand text-slate-950 px-3 py-1 rounded-full text-xs font-semibold z-10">
                🔥 Em Alta
              </div>
            )}

            {/* Featured Badge */}
            {variant === "featured" && product.featured && (
              <div className="absolute top-3 right-3 bg-gradient-orange-brand text-white px-3 py-1 rounded-full text-xs font-semibold z-10">
                ⭐ Destaque
              </div>
            )}

          {/* Product Image */}
          <div className={`relative ${imageClasses} bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-slate-600">
                <Icon className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold text-sm">{product.banca}</div>
                <div className="text-xs opacity-75">{getProductTypeLabel(product.type)}</div>
              </div>
            </div>
            
            {/* Favorite Button */}
            <button
              onClick={handleFavoriteClick}
              className={`absolute top-3 right-3 p-2 rounded-full transition-colors z-10 ${
                isProductFavorite 
                  ? "bg-red-500 text-white" 
                  : "bg-white/80 text-slate-600 hover:bg-white hover:text-red-500"
              }`}
            >
              <Heart className={`w-4 h-4 ${isProductFavorite ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Product Type & Phase */}
            <div className="flex items-center gap-2 mb-3">
              <span className={`
                px-2 py-1 rounded-full text-xs font-medium
                ${product.type === "deck" ? "bg-blue-100 text-blue-700" :
                  product.type === "summary" ? "bg-green-100 text-green-700" :
                  product.type === "mindmap" ? "bg-purple-100 text-purple-700" :
                  "bg-amber-100 text-amber-700"}
              `}>
                {getProductTypeLabel(product.type)}
              </span>
              
              <span className={`
                px-2 py-1 rounded-full text-xs font-medium
                ${product.phase === "pos" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}
              `}>
                {product.phase === "pos" ? "Pós-edital" : "Pré-edital"}
              </span>
              
              {product.type === "deck" && (
                <BadgeJuris incluiJurisprudencia={product.includesJurisprudence} />
              )}
            </div>

            {/* Title */}
            <h3 className="font-lexend font-bold text-lg text-slate-950 mb-2 line-clamp-2">
              {product.title}
            </h3>

            {/* Description */}
            <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            {/* Metrics */}
            <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Icon className="w-3 h-3" />
                  <span>{getProductMetric(product)}</span>
                </div>
                {product.popularity && (
                  <div className="flex items-center gap-1">
                    <span>{product.popularity}</span>
                  </div>
                )}
              </div>
              <div className="text-slate-400">
                v{product.version}
              </div>
            </div>

            {/* Area & Banca */}
            <div className="text-xs text-slate-500 mb-4">
              <span className="font-medium">{product.area}</span>
              {product.concurso && (
                <>
                  <span className="mx-2">•</span>
                  <span>{product.concurso}</span>
                </>
              )}
            </div>

            {/* Price & Actions */}
            <div className="flex items-center justify-between">
              <PriceTag preco={product.price} variant={variant === "featured" ? "featured" : "default"} />
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddToCart}
                  className="p-2 bg-slate-100 hover:bg-lime-brand-500 hover:text-slate-950 rounded-lg transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
                
                <div className="p-2 text-slate-400">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Bundle specific info */}
            {product.type === "bundle" && (
              <div className="mt-3 pt-3 border-t border-slate-200">
                <div className="text-xs text-emerald-600 font-medium">
                  {product.discount}% de desconto no pacote
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};