import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAdmin } from "@/context/AdminContext";
import { Product, ProductType } from "@/types";
import { toast } from "sonner";

const productSchema = z.object({
  title: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  type: z.enum(["deck", "summary", "mindmap", "bundle"]),
  banca: z.string().min(1, "Selecione uma banca"),
  area: z.string().min(1, "Selecione uma área"),
  concurso: z.string().optional(),
  phase: z.enum(["pre", "pos"]),
  period: z.enum(["15", "30", "45", "60", "90"]),
  price: z.number().min(0.01, "Preço deve ser maior que 0"),
  version: z.string().min(1, "Versão é obrigatória"),
  tags: z.string(),
  featured: z.boolean().default(false),
  trending: z.boolean().default(false),
  // Deck specific
  numCards: z.number().optional(),
  includesJurisprudence: z.boolean().optional(),
  // Summary specific
  pages: z.number().optional(),
  format: z.enum(["pdf", "html"]).optional(),
  hasExercises: z.boolean().optional(),
  // MindMap specific
  nodes: z.number().optional(),
  interactive: z.boolean().optional(),
  // Bundle specific
  discount: z.number().min(0).max(100).optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductForm = ({ product, isOpen, onClose }: ProductFormProps) => {
  const { addProduct, updateProduct } = useAdmin();
  const [imagePreview, setImagePreview] = useState<string>(product?.imageUrl || '');
  
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: product?.title || '',
      description: product?.description || '',
      type: product?.type || 'deck',
      banca: product?.banca || '',
      area: product?.area || '',
      concurso: product?.concurso || '',
      phase: product?.phase || 'pre',
      period: product?.period || '30',
      price: product?.price || 0,
      version: product?.version || '1.0',
      tags: product?.tags?.join(', ') || '',
      featured: product?.featured || false,
      trending: product?.trending || false,
      numCards: (product?.type === 'deck' && 'numCards' in product) ? product.numCards : undefined,
      includesJurisprudence: (product?.type === 'deck' && 'includesJurisprudence' in product) ? product.includesJurisprudence : false,
      pages: (product?.type === 'summary' && 'pages' in product) ? product.pages : undefined,
      format: (product?.type === 'summary' && 'format' in product) ? product.format : 'pdf',
      hasExercises: (product?.type === 'summary' && 'hasExercises' in product) ? product.hasExercises : false,
      nodes: (product?.type === 'mindmap' && 'nodes' in product) ? product.nodes : undefined,
      interactive: (product?.type === 'mindmap' && 'interactive' in product) ? product.interactive : true,
      discount: (product?.type === 'bundle' && 'discount' in product) ? product.discount : undefined,
    },
  });

  const selectedType = form.watch('type');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: ProductFormData) => {
    try {
      const slug = data.title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const baseProduct = {
        title: data.title,
        description: data.description,
        banca: data.banca,
        area: data.area,
        concurso: data.concurso,
        phase: data.phase,
        period: data.period,
        price: data.price,
        version: data.version,
        slug,
        lastUpdate: new Date().toISOString(),
        tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        featured: data.featured,
        trending: data.trending,
        imageUrl: imagePreview,
      };

      let productData: Product;

      switch (data.type) {
        case 'deck':
          productData = {
            ...baseProduct,
            type: 'deck',
            numCards: data.numCards || 0,
            includesJurisprudence: data.includesJurisprudence || false,
            topics: [],
            previewCards: [],
          } as Product;
          break;
        case 'summary':
          productData = {
            ...baseProduct,
            type: 'summary',
            pages: data.pages || 0,
            format: data.format || 'pdf',
            chapters: [],
            hasExercises: data.hasExercises || false,
          } as Product;
          break;
        case 'mindmap':
          productData = {
            ...baseProduct,
            type: 'mindmap',
            nodes: data.nodes || 0,
            interactive: data.interactive || true,
            downloadFormats: ['png', 'pdf'],
            preview: {
              title: data.title,
              description: data.description,
              imageUrl: imagePreview,
            },
          } as Product;
          break;
        case 'bundle':
          productData = {
            ...baseProduct,
            type: 'bundle',
            products: [],
            discount: data.discount || 0,
          } as Product;
          break;
        default:
          throw new Error('Tipo de produto inválido');
      }

      if (product) {
        updateProduct(product.id, productData);
        toast("Produto atualizado com sucesso!");
      } else {
        addProduct(productData);
        toast("Produto criado com sucesso!");
      }
      
      onClose();
      form.reset();
      setImagePreview('');
    } catch (error) {
      toast("Erro ao salvar produto. Tente novamente.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? 'Editar Produto' : 'Novo Produto'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Imagem do Produto</Label>
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-full h-32 object-cover mx-auto rounded"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => setImagePreview('')}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Remover
                    </Button>
                  </div>
                ) : (
                  <div>
                    <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-600 mb-2">Clique para fazer upload de uma imagem</p>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="max-w-xs mx-auto"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do produto" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="deck">Flashcards</SelectItem>
                        <SelectItem value="summary">Resumo</SelectItem>
                        <SelectItem value="mindmap">Mapa Mental</SelectItem>
                        <SelectItem value="bundle">Pacote</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descrição detalhada do produto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Product Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="banca"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Banca</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: FCC, CESPE" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Área</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Direito Civil" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="concurso"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Concurso (Opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: TRT 15ª Região" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="phase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fase</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pre">Pré-edital</SelectItem>
                        <SelectItem value="pos">Pós-edital</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Período (dias)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="15">15 dias</SelectItem>
                        <SelectItem value="30">30 dias</SelectItem>
                        <SelectItem value="45">45 dias</SelectItem>
                        <SelectItem value="60">60 dias</SelectItem>
                        <SelectItem value="90">90 dias</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço (R$)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01" 
                        placeholder="0.00" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="version"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Versão</FormLabel>
                    <FormControl>
                      <Input placeholder="1.0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Type-specific fields */}
            {selectedType === 'deck' && (
              <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900">Configurações do Flashcard</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="numCards"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de Cards</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="includesJurisprudence"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Switch 
                            checked={field.value} 
                            onCheckedChange={field.onChange} 
                          />
                        </FormControl>
                        <FormLabel>Inclui Jurisprudência</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {selectedType === 'summary' && (
              <div className="space-y-4 p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-900">Configurações do Resumo</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="pages"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de Páginas</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="format"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Formato</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="html">HTML</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hasExercises"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Switch 
                            checked={field.value} 
                            onCheckedChange={field.onChange} 
                          />
                        </FormControl>
                        <FormLabel>Inclui Exercícios</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {selectedType === 'mindmap' && (
              <div className="space-y-4 p-4 bg-purple-50 rounded-lg">
                <h3 className="font-medium text-purple-900">Configurações do Mapa Mental</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="nodes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de Nós</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="interactive"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Switch 
                            checked={field.value} 
                            onCheckedChange={field.onChange} 
                          />
                        </FormControl>
                        <FormLabel>Interativo</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {selectedType === 'bundle' && (
              <div className="space-y-4 p-4 bg-amber-50 rounded-lg">
                <h3 className="font-medium text-amber-900">Configurações do Pacote</h3>
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Desconto (%)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0" 
                          max="100" 
                          placeholder="0" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (separadas por vírgula)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: direito, civil, contratos" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Settings */}
            <div className="flex gap-6">
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Switch 
                        checked={field.value} 
                        onCheckedChange={field.onChange} 
                      />
                    </FormControl>
                    <FormLabel>Produto em Destaque</FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="trending"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Switch 
                        checked={field.value} 
                        onCheckedChange={field.onChange} 
                      />
                    </FormControl>
                    <FormLabel>Produto em Alta</FormLabel>
                  </FormItem>
                )}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">
                {product ? 'Atualizar' : 'Criar'} Produto
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};