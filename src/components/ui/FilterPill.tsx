import { motion } from "framer-motion";
import { X } from "lucide-react";

interface FilterPillProps {
  label: string;
  count?: number;
  isActive?: boolean;
  onToggle?: () => void;
  onRemove?: () => void;
  variant?: "default" | "removable";
  className?: string;
}

export const FilterPill = ({ 
  label, 
  count, 
  isActive = false, 
  onToggle, 
  onRemove,
  variant = "default",
  className = "" 
}: FilterPillProps) => {
  const isRemovable = variant === "removable";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={isRemovable ? onRemove : onToggle}
      className={`
        group relative inline-flex items-center gap-2 px-4 py-2 rounded-full 
        bg-glass-white border transition-smooth text-sm font-medium
        ${isActive 
          ? "border-lime-brand-500 bg-lime-brand-100 text-lime-brand-700 shadow-sm" 
          : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
        }
        ${isRemovable ? "pr-2" : ""}
        ${className}
      `}
    >
      <span>{label}</span>
      
      {/* Counter badge */}
      {count !== undefined && count > 0 && !isRemovable && (
        <span className={`
          px-1.5 py-0.5 rounded-full text-xs font-medium
          ${isActive 
            ? "bg-lime-brand-500 text-white" 
            : "bg-slate-200 text-slate-600 group-hover:bg-slate-300"
          }
        `}>
          {count}
        </span>
      )}

      {/* Remove button for active filters */}
      {isRemovable && (
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="p-0.5 rounded-full hover:bg-slate-200 transition-colors"
        >
          <X className="w-3 h-3" />
        </motion.div>
      )}
    </motion.button>
  );
};