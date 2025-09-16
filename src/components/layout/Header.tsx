import { motion } from "framer-motion";
import { Search, ShoppingCart, Menu, User } from "lucide-react";
import { useState } from "react";
import logoImage from "@/assets/logo.png";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-black border-b border-gray-800"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <img 
              src={logoImage} 
              alt="BASIM Resumos" 
              className="h-12 w-auto"
            />
          </motion.div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por área, banca ou órgão..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="
                  w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg 
                  bg-gray-800 text-white placeholder-gray-400
                  focus:ring-2 focus:ring-amber-500 focus:border-transparent
                  transition-smooth text-sm
                "
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search */}
            <button className="md:hidden p-2 text-white hover:text-gray-300 transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 text-white hover:text-gray-300 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </motion.button>

            {/* User Menu */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-600 hover:bg-gray-800 transition-colors"
            >
              <User className="w-4 h-4 text-white" />
              <span className="text-sm text-white">Entrar</span>
            </motion.button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-white hover:text-gray-300 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-800 py-4"
          >
            <div className="space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por área, banca ou órgão..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-smooth"
                />
              </div>
              
              {/* Mobile Navigation */}
            <motion.a
              href="/catalogo"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-xl backdrop-blur-sm hover:bg-white/20 transition-smooth text-lg"
            >
              Ver catálogo completo
            </motion.a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};