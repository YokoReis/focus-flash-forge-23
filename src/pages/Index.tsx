import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrendingProductsSection } from "@/components/sections/TrendingProductsSection";
import { ProductVitrinesSection } from "@/components/sections/ProductVitrinesSection";
import { BundleSuggester } from "@/components/sections/BundleSuggester";

const Index = () => {
  const [isBundleSuggesterOpen, setIsBundleSuggesterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection onOpenBundleSuggester={() => setIsBundleSuggesterOpen(true)} />
        <TrendingProductsSection />
        <ProductVitrinesSection />
      </main>
      
      {/* Bundle Suggester Modal */}
      <BundleSuggester 
        isOpen={isBundleSuggesterOpen}
        onClose={() => setIsBundleSuggesterOpen(false)}
      />
      
      {/* Global trigger for Bundle Suggester - can be called from hero CTA */}
      <button
        onClick={() => setIsBundleSuggesterOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-accent text-slate-950 px-6 py-3 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-smooth z-40"
      >
        🎯 Montar Pacote
      </button>
    </div>
  );
};

export default Index;
