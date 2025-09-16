import { motion } from "framer-motion";

interface PriceTagProps {
  preco: number;
  precoOriginal?: number;
  variant?: "default" | "featured" | "compact" | "trending";
  showParcelas?: boolean;
  className?: string;
}

export const PriceTag = ({ 
  preco, 
  precoOriginal, 
  variant = "default", 
  showParcelas = true,
  className = "" 
}: PriceTagProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price / 100); // Assumindo preço em centavos
  };

  const parcelas = Math.min(Math.floor(preco / 1000), 12); // Máximo 12x, mínimo R$10
  const valorParcela = preco / parcelas;

  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";
  const isTrending = variant === "trending";

  return (
    <div className={`${className}`}>
      <div className="flex items-center gap-2">
        {/* Preço original riscado */}
        {precoOriginal && (
          <span className="text-slate-400 text-sm line-through">
            {formatPrice(precoOriginal)}
          </span>
        )}
        
        {/* Preço principal */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className={`
            font-lexend font-bold
            ${isFeatured 
              ? "text-2xl text-slate-950" 
              : isTrending
                ? "text-xl text-emerald-700"
              : isCompact 
                ? "text-lg text-slate-950"
                : "text-xl text-slate-950"
            }
          `}
        >
          {formatPrice(preco)}
        </motion.div>

        {/* Badge de desconto */}
        {precoOriginal && (
          <span className="bg-emerald-500 text-white px-2 py-1 rounded text-xs font-medium">
            -{Math.round(((precoOriginal - preco) / precoOriginal) * 100)}%
          </span>
        )}
      </div>

      {/* Parcelamento */}
      {showParcelas && !isCompact && parcelas > 1 && (
        <div className="text-slate-500 text-xs mt-1">
          ou {parcelas}x de {formatPrice(valorParcela)} sem juros
        </div>
      )}

      {/* Garantia */}
      {!isCompact && (
        <div className="text-emerald-600 text-xs mt-1 font-medium">
          🛡️ Garantia 7 dias
        </div>
      )}
    </div>
  );
};