// Core product types
export type ProductType = "deck" | "summary" | "mindmap" | "bundle";
export type ProductPhase = "pre" | "pos";
export type ProductPeriod = "15" | "30" | "45" | "60" | "90";

// Base product interface
export interface BaseProduct {
  id: string;
  title: string;
  description: string;
  banca: string;
  area: string;
  concurso?: string;
  phase: ProductPhase;
  period: ProductPeriod;
  price: number;
  version: string;
  slug: string;
  lastUpdate: string;
  tags: string[];
  featured: boolean;
  trending: boolean;
  imageUrl?: string;
  popularity?: string;
}

// Specific product types
export interface Deck extends BaseProduct {
  type: "deck";
  numCards: number;
  includesJurisprudence: boolean;
  topics: {
    name: string;
    cards: number;
    weight: "Muito Alta" | "Alta incidência" | "Média" | "Baixa";
  }[];
  previewCards: {
    front: string;
    back: string;
  }[];
}

export interface Summary extends BaseProduct {
  type: "summary";
  pages: number;
  format: "pdf" | "html";
  chapters: {
    name: string;
    pages: number;
  }[];
  hasExercises: boolean;
}

export interface MindMap extends BaseProduct {
  type: "mindmap";
  nodes: number;
  interactive: boolean;
  downloadFormats: ("png" | "pdf" | "svg")[];
  preview: {
    title: string;
    description: string;
    imageUrl: string;
  };
}

export interface Bundle extends BaseProduct {
  type: "bundle";
  products: {
    type: ProductType;
    id: string;
  }[];
  discount: number; // percentage
}

export type Product = Deck | Summary | MindMap | Bundle;

// Shopping cart
export interface CartItem {
  productId: string;
  quantity: number;
  addedAt: string;
}

// Favorites
export interface Favorite {
  productId: string;
  addedAt: string;
}

// Admin context
export interface AdminContextType {
  // Products management
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  getProductsByType: (type: ProductType) => Product[];
  
  // Shopping cart
  cart: CartItem[];
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  
  // Favorites
  favorites: Favorite[];
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  
  // Admin authentication
  isAdmin: boolean;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;
  
  // Search and filters
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeFilters: {
    types: ProductType[];
    areas: string[];
    bancas: string[];
    phases: ProductPhase[];
    periods: ProductPeriod[];
  };
  setActiveFilters: (filters: AdminContextType['activeFilters']) => void;
  
  // Statistics
  getStats: () => {
    totalProducts: number;
    productsByType: Record<ProductType, number>;
    totalRevenue: number;
    popularProducts: Product[];
  };
}