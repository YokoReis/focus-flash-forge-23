import { motion } from "framer-motion";
import { Search, Target, Clock, TrendingUp } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero-image.jpg";

interface HeroSectionProps {
  onOpenBundleSuggester?: () => void;
}

export const HeroSection = ({ onOpenBundleSuggester }: HeroSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative bg-gradient-hero text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Flashcards de estudo" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 to-slate-800/80" />
      </div>

      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge de Credibilidade */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-glass-white px-4 py-2 rounded-full mb-8"
          >
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span className="text-slate-700 text-sm font-medium">
              +15.000 aprovados em 2024
            </span>
          </motion.div>

          {/* Headline Principal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-lexend font-bold text-5xl lg:text-7xl leading-tight mb-6 text-balance"
          >
            Decks prontos por{" "}
            <span className="text-transparent bg-gradient-to-r from-lime-brand-500 to-orange-brand-500 bg-clip-text">
              banca, fase e prazo
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl lg:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed text-balance"
          >
            Acelere sua aprovação com flashcards curados por especialistas. 
            Estude focado no que realmente importa para sua prova.
          </motion.p>

          {/* Search Bar Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Digite sua área, banca ou órgão (ex: FGV, Tribunais, Fiscal...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="
                  w-full pl-12 pr-4 py-4 bg-white/95 backdrop-blur-sm border-0 rounded-xl 
                  text-slate-900 placeholder-slate-500 text-lg
                  focus:ring-2 focus:ring-lime-brand-500 focus:outline-none
                  shadow-2xl transition-smooth
                "
              />
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenBundleSuggester}
              className="px-8 py-4 bg-gradient-lime-brand text-slate-950 font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-smooth text-lg"
            >
              🎯 Montar meu pacote agora
            </motion.button>
            
            <motion.a
              href="/catalogo"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-xl backdrop-blur-sm hover:bg-white/20 transition-smooth text-lg"
            >
              Ver catálogo completo
            </motion.a>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Target className="w-6 h-6 text-amber-400 mr-2" />
                <span className="font-lexend font-bold text-3xl">500+</span>
              </div>
              <p className="text-slate-300">Decks especializados</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-6 h-6 text-emerald-400 mr-2" />
                <span className="font-lexend font-bold text-3xl">15</span>
              </div>
              <p className="text-slate-300">Bancas cobertas</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-amber-400 mr-2" />
                <span className="font-lexend font-bold text-3xl">87%</span>
              </div>
              <p className="text-slate-300">Taxa de aprovação</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gradient Fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};