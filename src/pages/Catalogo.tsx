import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, SlidersHorizontal, Search } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { FilterPill } from "@/components/ui/FilterPill";
import { ProductCard } from "@/components/ui/ProductCard";
import { useAdmin } from "@/context/AdminContext";
import { filterOptions } from "@/data/mockData";

const Catalogo = () => {
  const { products, searchTerm, setSearchTerm } = useAdmin();
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    types: [],
    areas: [],
    bancas: [],
    phases: [],
    periods: []
  });
  const [sortBy, setSortBy] = useState("relevancia");
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = (category: string, filterId: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(filterId)
        ? prev[category].filter(id => id !== filterId)
        : [...prev[category], filterId]
    }));
  };

  const removeFilter = (category: string, filterId: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: prev[category].filter(id => id !== filterId)
    }));
  };

  const clearAllFilters = () => {
    setActiveFilters({
      types: [],
      areas: [],
      bancas: [],
      phases: [],
      periods: []
    });
  };

  const getActiveFiltersCount = () => {
    return Object.values(activeFilters).flat().length;
  };

  const FilterSection = ({ title, category, options }: {
    title: string;
    category: string;
    options: Array<{ id: string; label: string; count: number }>;
  }) => (
    <div className="mb-6">
      <h3 className="font-semibold text-slate-900 mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <FilterPill
            key={option.id}
            label={option.label}
            count={option.count}
            isActive={activeFilters[category].includes(option.id)}
            onToggle={() => toggleFilter(category, option.id)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-lexend font-bold text-4xl text-slate-950 mb-4"
          >
            Catálogo de Decks
          </motion.h1>
          <p className="text-slate-600 text-lg">
            Encontre os flashcards perfeitos para sua preparação
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white rounded-xl shadow-card border border-slate-200 p-6 mb-8">
          {/* Search */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por disciplina, área ou palavra-chave..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-smooth"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`
                flex items-center gap-2 px-4 py-3 rounded-lg border transition-smooth font-medium
                ${showFilters 
                  ? "bg-amber-50 border-amber-500 text-amber-700" 
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }
              `}
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filtros
              {getActiveFiltersCount() > 0 && (
                <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                  {getActiveFiltersCount()}
                </span>
              )}
            </button>
          </div>

          {/* Active Filters */}
          {getActiveFiltersCount() > 0 && (
            <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-slate-200">
              {Object.entries(activeFilters).map(([category, filters]) =>
                filters.map(filterId => {
                  const categoryOptions = filterOptions[category as keyof typeof filterOptions];
                  const option = categoryOptions.find(opt => opt.id === filterId);
                  return option ? (
                    <FilterPill
                      key={`${category}-${filterId}`}
                      label={option.label}
                      variant="removable"
                      onRemove={() => removeFilter(category, filterId)}
                    />
                  ) : null;
                })
              )}
              <button
                onClick={clearAllFilters}
                className="text-amber-600 hover:text-amber-700 text-sm font-medium ml-2"
              >
                Limpar todos
              </button>
            </div>
          )}

          {/* Sort */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-700">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="relevancia">Relevância</option>
                <option value="mais-vendidos">Mais Vendidos</option>
                <option value="recentes">Atualizações Recentes</option>
                <option value="preco-menor">Menor Preço</option>
                <option value="preco-maior">Maior Preço</option>
              </select>
            </div>
            <div className="text-sm text-slate-500">
              Mostrando {products.length} resultados
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          {showFilters && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-80 flex-shrink-0"
            >
              <div className="bg-white rounded-xl shadow-card border border-slate-200 p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-lexend font-semibold text-lg">Filtros</h2>
                  {getActiveFiltersCount() > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                    >
                      Limpar
                    </button>
                  )}
                </div>

                <FilterSection title="Área" category="areas" options={filterOptions.areas} />
                <FilterSection title="Banca" category="bancas" options={filterOptions.bancas} />
                <FilterSection title="Fase" category="phases" options={filterOptions.phases} />
                <FilterSection title="Prazo" category="periods" options={filterOptions.periods} />
              </div>
            </motion.aside>
          )}

          {/* Results Grid */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-slate-950 text-white font-semibold rounded-lg hover:bg-slate-800 transition-smooth">
                Carregar mais decks
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Catalogo;