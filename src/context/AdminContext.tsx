import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AdminContextType, Product, CartItem, Favorite, ProductType, ProductPhase, ProductPeriod } from '@/types';
import { mockProducts } from '@/data/mockData';

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  // Initialize state from localStorage or defaults
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('lovable-products');
    return saved ? JSON.parse(saved) : mockProducts;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('lovable-cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState<Favorite[]>(() => {
    const saved = localStorage.getItem('lovable-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('lovable-admin-session') === 'true';
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<AdminContextType['activeFilters']>({
    types: [],
    areas: [],
    bancas: [],
    phases: [],
    periods: []
  });

  // Persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('lovable-products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('lovable-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('lovable-favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Product management
  const addProduct = (product: Product) => {
    const newProduct: Product = { ...product, id: Date.now().toString() };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const updated = { ...p, ...updatedProduct } as Product;
        return updated;
      }
      return p;
    }));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const getProductById = (id: string): Product | undefined => {
    return products.find(p => p.id === id);
  };

  const getProductsByType = (type: ProductType): Product[] => {
    return products.filter(p => p.type === type);
  };

  // Shopping cart management
  const addToCart = (productId: string, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item => 
          item.productId === productId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { productId, quantity, addedAt: new Date().toISOString() }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.productId === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = (): number => {
    return cart.reduce((total, item) => {
      const product = getProductById(item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  // Favorites management
  const addToFavorites = (productId: string) => {
    setFavorites(prev => [...prev, { productId, addedAt: new Date().toISOString() }]);
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites(prev => prev.filter(fav => fav.productId !== productId));
  };

  const isFavorite = (productId: string): boolean => {
    return favorites.some(fav => fav.productId === productId);
  };

  // Admin authentication
  const adminLogin = (password: string): boolean => {
    // Simple password check - in production use proper auth
    if (password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('lovable-admin-session', 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('lovable-admin-session');
  };

  // Statistics
  const getStats = () => {
    const totalProducts = products.length;
    const productsByType = products.reduce((acc, product) => {
      acc[product.type] = (acc[product.type] || 0) + 1;
      return acc;
    }, {} as Record<ProductType, number>);
    
    const totalRevenue = cart.reduce((total, item) => {
      const product = getProductById(item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
    
    const popularProducts = products
      .filter(p => p.trending || p.featured)
      .slice(0, 5);

    return {
      totalProducts,
      productsByType,
      totalRevenue,
      popularProducts
    };
  };

  const value: AdminContextType = {
    // Products
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductsByType,
    
    // Cart
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    
    // Favorites
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    
    // Admin
    isAdmin,
    adminLogin,
    adminLogout,
    
    // Search & Filters
    searchTerm,
    setSearchTerm,
    activeFilters,
    setActiveFilters,
    
    // Stats
    getStats
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};