import { motion } from "framer-motion";
import { Search, ShoppingCart, Menu, ChevronDown, BookOpen, FileText, Layers, Package } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logoImage from "@/assets/logo.png";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-black border-b border-gray-800"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center cursor-pointer"
            >
              <img 
                src={logoImage} 
                alt="BASIM Resumos" 
                className="h-12 w-auto"
              />
            </motion.div>
          </Link>

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

            {/* Products Menu */}
            <div className="hidden sm:block relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsProductsMenuOpen(!isProductsMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-600 hover:bg-gray-800 transition-colors text-white"
              >
                <span className="text-sm">Produtos</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isProductsMenuOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              {/* Products Dropdown */}
              {isProductsMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                >
                  <Link to="/catalogo?type=deck" className="flex items-center gap-3 px-4 py-2 hover:bg-lime-brand-100 transition-colors">
                    <BookOpen className="w-4 h-4 text-lime-brand-500" />
                    <span className="text-sm text-gray-700">Flashcards</span>
                  </Link>
                  <Link to="/catalogo?type=summary" className="flex items-center gap-3 px-4 py-2 hover:bg-orange-brand-100 transition-colors">
                    <FileText className="w-4 h-4 text-orange-brand-500" />
                    <span className="text-sm text-gray-700">Resumos</span>
                  </Link>
                  <Link to="/catalogo?type=mindmap" className="flex items-center gap-3 px-4 py-2 hover:bg-lime-brand-100 transition-colors">
                    <Layers className="w-4 h-4 text-lime-brand-500" />
                    <span className="text-sm text-gray-700">Mapas Mentais</span>
                  </Link>
                  <Link to="/catalogo?type=bundle" className="flex items-center gap-3 px-4 py-2 hover:bg-orange-brand-100 transition-colors">
                    <Package className="w-4 h-4 text-orange-brand-500" />
                    <span className="text-sm text-gray-700">Pacotes</span>
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 text-white hover:text-lime-brand-500 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-lime-brand-500 text-slate-950 text-xs rounded-full flex items-center justify-center font-semibold">
                2
              </span>
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