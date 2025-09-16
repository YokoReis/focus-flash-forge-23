import { motion } from "framer-motion";
import { TrendingUp, Flame, Users } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { useAdmin } from "@/context/AdminContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const TrendingProductsSection = () => {
  const { products } = useAdmin();
  
  // Get trending products across all types
  const trendingProducts = products.filter(product => product.trending).slice(0, 8);

  if (trendingProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-r from-slate-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-emerald-500/5" />
      
      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center gap-2 bg-gradient-accent px-4 py-2 rounded-full">
              <TrendingUp className="w-5 h-5 text-slate-950" />
              <span className="font-lexend font-semibold text-slate-950 text-sm">
                Produtos em Alta
              </span>
            </div>
          </div>
          
          <h2 className="font-lexend text-3xl font-bold text-slate-950 mb-4">
            Os Mais Procurados da Semana
          </h2>
          
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Flashcards, resumos e mapas mentais que estão sendo mais estudados pelos concurseiros.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Carousel
            className="w-full"
            opts={{
              align: "start",
              loop: true,
              skipSnaps: false,
              dragFree: true,
            }}
          >
            <CarouselContent className="-ml-6">
              {trendingProducts.map((product, index) => (
                <CarouselItem key={product.id} className="pl-6 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="h-full"
                  >
                    <ProductCard
                      product={product}
                      variant="trending"
                    />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation */}
            <div className="hidden md:block">
              <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white shadow-lg border border-slate-200 hover:bg-slate-50 hover:shadow-xl transition-smooth" />
              <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white shadow-lg border border-slate-200 hover:bg-slate-50 hover:shadow-xl transition-smooth" />
            </div>
          </Carousel>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-8 mt-12 text-slate-600"
        >
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-medium">+15 novos produtos esta semana</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-medium">12.340+ estudantes ativos</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};