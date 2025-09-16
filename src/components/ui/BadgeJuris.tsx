import { Scale, X } from "lucide-react";
import { motion } from "framer-motion";

interface BadgeJurisProps {
  incluiJurisprudencia: boolean;
  variant?: "default" | "compact";
}

export const BadgeJuris = ({ incluiJurisprudencia, variant = "default" }: BadgeJurisProps) => {
  const isCompact = variant === "compact";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`
        flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium transition-colors
        ${incluiJurisprudencia 
          ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
          : "bg-slate-50 text-slate-500 border border-slate-200"
        }
        ${isCompact ? "px-1.5 py-0.5" : ""}
      `}
    >
      {incluiJurisprudencia ? (
        <>
          <Scale className="w-3 h-3" />
          {!isCompact && <span>Inclui Jurisprudência</span>}
        </>
      ) : (
        <>
          <X className="w-3 h-3" />
          {!isCompact && <span>Somente Teoria</span>}
        </>
      )}
    </motion.div>
  );
};