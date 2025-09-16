import { 
  BookOpen, 
  FileText, 
  Layers, 
  Package, 
  Eye, 
  Download,
  Play,
  FileImage,
  CheckCircle 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Product, Deck, Summary, MindMap, Bundle } from "@/types";

interface ProductPreviewProps {
  product: Product;
  onClose?: () => void;
}

export const ProductPreview = ({ product, onClose }: ProductPreviewProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deck': return <BookOpen className="w-5 h-5" />;
      case 'summary': return <FileText className="w-5 h-5" />;
      case 'mindmap': return <Layers className="w-5 h-5" />;
      case 'bundle': return <Package className="w-5 h-5" />;
      default: return <Eye className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'deck': return 'bg-blue-100 text-blue-800';
      case 'summary': return 'bg-green-100 text-green-800';
      case 'mindmap': return 'bg-purple-100 text-purple-800';
      case 'bundle': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderDeckPreview = (deck: Deck) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{deck.numCards}</div>
            <p className="text-sm text-muted-foreground">Total de Cards</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{deck.topics.length}</div>
            <p className="text-sm text-muted-foreground">Tópicos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              {deck.includesJurisprudence ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <div className="w-5 h-5 rounded-full bg-gray-200" />
              )}
              <span className="text-sm">Jurisprudência</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {deck.topics.length > 0 && (
        <div>
          <h3 className="font-semibold mb-4">Tópicos Abordados</h3>
          <div className="space-y-3">
            {deck.topics.map((topic, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{topic.name}</h4>
                  <p className="text-sm text-slate-600">{topic.cards} cards</p>
                </div>
                <Badge variant={
                  topic.weight === "Muito Alta" ? "destructive" :
                  topic.weight === "Alta incidência" ? "default" :
                  topic.weight === "Média" ? "secondary" : "outline"
                }>
                  {topic.weight}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {deck.previewCards.length > 0 && (
        <div>
          <h3 className="font-semibold mb-4">Preview dos Cards</h3>
          <div className="grid gap-4">
            {deck.previewCards.slice(0, 3).map((card, index) => (
              <Card key={index}>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-500">
                      <p className="text-sm font-medium text-blue-900">Pergunta:</p>
                      <p className="text-blue-800">{card.front}</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded border-l-4 border-green-500">
                      <p className="text-sm font-medium text-green-900">Resposta:</p>
                      <p className="text-green-800">{card.back}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderSummaryPreview = (summary: Summary) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{summary.pages}</div>
            <p className="text-sm text-muted-foreground">Páginas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{summary.chapters.length}</div>
            <p className="text-sm text-muted-foreground">Capítulos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <FileImage className="w-5 h-5 text-purple-500" />
              <span className="font-medium">{summary.format.toUpperCase()}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {summary.chapters.length > 0 && (
        <div>
          <h3 className="font-semibold mb-4">Estrutura do Resumo</h3>
          <div className="space-y-2">
            {summary.chapters.map((chapter, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{chapter.name}</h4>
                </div>
                <div className="text-sm text-slate-600">{chapter.pages} páginas</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
        <CheckCircle className="w-5 h-5 text-green-500" />
        <span>Inclui exercícios práticos: {summary.hasExercises ? 'Sim' : 'Não'}</span>
      </div>
    </div>
  );

  const renderMindMapPreview = (mindmap: MindMap) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-600">{mindmap.nodes}</div>
            <p className="text-sm text-muted-foreground">Nós</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              {mindmap.interactive ? (
                <Play className="w-5 h-5 text-green-500" />
              ) : (
                <FileImage className="w-5 h-5 text-gray-400" />
              )}
              <span className="text-sm">{mindmap.interactive ? 'Interativo' : 'Estático'}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{mindmap.downloadFormats.length}</div>
            <p className="text-sm text-muted-foreground">Formatos</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Formatos de Download</h3>
        <div className="flex gap-2">
          {mindmap.downloadFormats.map((format) => (
            <Badge key={format} variant="outline">
              {format.toUpperCase()}
            </Badge>
          ))}
        </div>
      </div>

      {mindmap.preview.imageUrl && (
        <div className="space-y-4">
          <h3 className="font-semibold">Preview do Mapa Mental</h3>
          <Card>
            <CardContent className="pt-4">
              <img 
                src={mindmap.preview.imageUrl} 
                alt={mindmap.preview.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="mt-4">
                <h4 className="font-medium">{mindmap.preview.title}</h4>
                <p className="text-sm text-slate-600 mt-1">{mindmap.preview.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );

  const renderBundlePreview = (bundle: Bundle) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-amber-600">{bundle.products.length}</div>
            <p className="text-sm text-muted-foreground">Produtos Inclusos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{bundle.discount}%</div>
            <p className="text-sm text-muted-foreground">Desconto</p>
          </CardContent>
        </Card>
      </div>

      {bundle.products.length > 0 && (
        <div>
          <h3 className="font-semibold mb-4">Produtos do Pacote</h3>
          <div className="space-y-2">
            {bundle.products.map((product, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                {getTypeIcon(product.type)}
                <div>
                  <p className="font-medium">Produto ID: {product.id}</p>
                  <p className="text-sm text-slate-600 capitalize">{product.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderPreviewContent = () => {
    switch (product.type) {
      case 'deck':
        return renderDeckPreview(product as Deck);
      case 'summary':
        return renderSummaryPreview(product as Summary);
      case 'mindmap':
        return renderMindMapPreview(product as MindMap);
      case 'bundle':
        return renderBundlePreview(product as Bundle);
      default:
        return <div>Preview não disponível para este tipo de produto.</div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Badge className={getTypeColor(product.type)}>
              {getTypeIcon(product.type)}
              <span className="ml-1 capitalize">{product.type}</span>
            </Badge>
            {product.featured && <Badge variant="default">Destaque</Badge>}
            {product.trending && <Badge variant="destructive">Em Alta</Badge>}
          </div>
          <h1 className="font-bold text-2xl">{product.title}</h1>
          <p className="text-slate-600">{product.description}</p>
        </div>
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        )}
      </div>

      {/* Product Image */}
      {product.imageUrl && (
        <div className="aspect-video w-full max-w-2xl mx-auto">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      )}

      {/* Product Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-xl font-bold text-green-600">R$ {product.price.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground">Preço</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="font-medium">{product.banca}</div>
            <p className="text-sm text-muted-foreground">Banca</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="font-medium">{product.area}</div>
            <p className="text-sm text-muted-foreground">Área</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="font-medium capitalize">{product.phase === 'pre' ? 'Pré-edital' : 'Pós-edital'}</div>
            <p className="text-sm text-muted-foreground">Fase</p>
          </CardContent>
        </Card>
      </div>

      {/* Tags */}
      {product.tags.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
        </div>
      )}

      {/* Type-specific Preview */}
      <div className="space-y-4">
        <h2 className="font-bold text-xl">Detalhes do Produto</h2>
        {renderPreviewContent()}
      </div>
    </div>
  );
};