import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Edit, 
  Trash2, 
  BarChart3, 
  Package, 
  Users, 
  DollarSign,
  BookOpen,
  FileText,
  Layers,
  LogOut,
  Search,
  Filter,
  Eye
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { useAdmin } from "@/context/AdminContext";
import { ProductCard } from "@/components/ui/ProductCard";
import { Product, ProductType } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ProductForm } from "@/components/admin/ProductForm";
import { ProductPreview } from "@/components/admin/ProductPreview";

const Admin = () => {
  const { 
    products, 
    deleteProduct, 
    getStats, 
    isAdmin, 
    adminLogout,
    searchTerm,
    setSearchTerm,
    getProductsByType
  } = useAdmin();
  
  const [activeTab, setActiveTab] = useState<ProductType | "dashboard">("dashboard");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [previewingProduct, setPreviewingProduct] = useState<Product | null>(null);

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      window.location.href = '/admin/login';
    }
  }, [isAdmin]);

  const stats = getStats();
  
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.banca.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Tem certeza que deseja deletar este produto?')) {
      deleteProduct(id);
      toast("Produto deletado com sucesso!");
    }
  };

  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) return;
    
    if (window.confirm(`Deletar ${selectedProducts.length} produto(s) selecionado(s)?`)) {
      selectedProducts.forEach(id => deleteProduct(id));
      setSelectedProducts([]);
      toast(`${selectedProducts.length} produto(s) deletado(s)!`);
    }
  };

  const toggleProductSelection = (id: string) => {
    setSelectedProducts(prev => 
      prev.includes(id) 
        ? prev.filter(productId => productId !== id)
        : [...prev, id]
    );
  };

  if (!isAdmin) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Admin Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-lexend font-bold text-3xl text-slate-950 mb-2">
              Painel Administrativo
            </h1>
            <p className="text-slate-600">
              Gerencie produtos, visualize estatísticas e controle o conteúdo da plataforma
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setShowProductForm(true)}
              className="bg-gradient-accent text-slate-950 hover:shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Produto
            </Button>
            
            <Button
              variant="outline"
              onClick={adminLogout}
              className="text-slate-600 hover:text-red-600 hover:border-red-200"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Flashcards</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.productsByType.deck || 0}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resumos</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.productsByType.summary || 0}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mapas Mentais</CardTitle>
              <Layers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.productsByType.mindmap || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Actions */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {selectedProducts.length > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {selectedProducts.length} selecionado(s)
                </Badge>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleBulkDelete}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Deletar Selecionados
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Product Management Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white border border-slate-200">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-amber-100">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="deck" className="data-[state=active]:bg-blue-100">
              <BookOpen className="w-4 h-4 mr-2" />
              Flashcards ({stats.productsByType.deck || 0})
            </TabsTrigger>
            <TabsTrigger value="summary" className="data-[state=active]:bg-green-100">
              <FileText className="w-4 h-4 mr-2" />
              Resumos ({stats.productsByType.summary || 0})
            </TabsTrigger>
            <TabsTrigger value="mindmap" className="data-[state=active]:bg-purple-100">
              <Layers className="w-4 h-4 mr-2" />
              Mapas ({stats.productsByType.mindmap || 0})
            </TabsTrigger>
            <TabsTrigger value="bundle" className="data-[state=active]:bg-amber-100">
              <Package className="w-4 h-4 mr-2" />
              Pacotes ({stats.productsByType.bundle || 0})
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Content */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Produtos em Destaque</CardTitle>
                  <CardDescription>Os produtos mais populares da plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.popularProducts.slice(0, 3).map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-sm">{product.title}</h4>
                          <p className="text-xs text-slate-600">{product.banca} • {product.area}</p>
                        </div>
                        <Badge variant={product.trending ? "default" : "secondary"}>
                          {product.trending ? "Em Alta" : "Destaque"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                  <CardDescription>Operações frequentes do painel</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowProductForm(true)}
                      className="h-16 flex-col gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      Novo Produto
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-16 flex-col gap-2"
                    >
                      <BarChart3 className="w-5 h-5" />
                      Relatórios
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-16 flex-col gap-2"
                    >
                      <Users className="w-5 h-5" />
                      Usuários
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-16 flex-col gap-2"
                    >
                      <DollarSign className="w-5 h-5" />
                      Vendas
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Product Type Tabs */}
          {(["deck", "summary", "mindmap", "bundle"] as ProductType[]).map((type) => (
            <TabsContent key={type} value={type}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {getProductsByType(type).map((product) => (
                  <div key={product.id} className="relative">
                    {/* Selection checkbox */}
                    <div className="absolute top-2 left-2 z-20">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => toggleProductSelection(product.id)}
                        className="w-4 h-4 text-amber-600 bg-white border-gray-300 rounded focus:ring-amber-500"
                      />
                    </div>
                    
                    {/* Admin actions */}
                    <div className="absolute top-2 right-2 z-20 flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setPreviewingProduct(product)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setEditingProduct(product)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                    
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              
              {getProductsByType(type).length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  <Package className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                  <h3 className="text-lg font-medium mb-2">Nenhum produto encontrado</h3>
                  <p className="mb-4">Comece criando seu primeiro {type === "deck" ? "flashcard" : type === "summary" ? "resumo" : type === "mindmap" ? "mapa mental" : "pacote"}.</p>
                  <Button onClick={() => setShowProductForm(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Produto
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Product Form Modal */}
        <ProductForm
          product={editingProduct}
          isOpen={showProductForm || !!editingProduct}
          onClose={() => {
            setShowProductForm(false);
            setEditingProduct(null);
          }}
        />

        {/* Product Preview Modal */}
        {previewingProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <ProductPreview
                product={previewingProduct}
                onClose={() => setPreviewingProduct(null)}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;