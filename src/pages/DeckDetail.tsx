import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Calendar, 
  DollarSign, 
  Users, 
  Clock, 
  BookOpen, 
  Target, 
  CheckCircle,
  AlertCircle,
  TrendingUp
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { PriceTag } from "@/components/ui/PriceTag";
import { BadgeJuris } from "@/components/ui/BadgeJuris";

// Mock data - em produção viria do Supabase
const mockDeckData = {
  "direito-administrativo-fgv-pre": {
    title: "Direito Administrativo Essencial",
    description: "Princípios, atos administrativos e licitações para concursos de nível superior",
    banca: "FGV",
    area: "Jurídica",
    fase: "pre" as "pre" | "pos",
    prazo: "60" as const,
    numCards: 450,
    preco: 4999,
    incluiJurisprudencia: false,
    versao: "2025.1",
    ultimaAtualizacao: "15/01/2025",
    
    // Informações detalhadas do concurso
    concurso: {
      nome: "Tribunal de Contas do Estado - RJ",
      orgao: "TCE-RJ",
      status: "Edital Publicado",
      salario: "R$ 12.500,00",
      vagas: 8,
      inscricoes: "Até 15/02/2025",
      prova: "15/04/2025",
      nivel: "Superior",
      justificativa: "O TCE-RJ tradicionalmente cobra questões elaboradas sobre princípios administrativos e regime jurídico dos atos. Nossa curadoria focou nos 80% de tópicos que mais aparecem nas provas dessa banca nos últimos 5 anos."
    },
    
    // Organização do deck
    organizacao: {
      totalCards: 450,
      topicos: [
        { nome: "Princípios da Administração Pública", cards: 85, peso: "Alta incidência" },
        { nome: "Atos Administrativos", cards: 120, peso: "Muito Alta" },
        { nome: "Processo Administrativo", cards: 75, peso: "Média" },
        { nome: "Licitações e Contratos", cards: 95, peso: "Alta incidência" },
        { nome: "Responsabilidade Civil do Estado", cards: 45, peso: "Média" },
        { nome: "Controle da Administração", cards: 30, peso: "Baixa" }
      ]
    },
    
    // Para quem se destina
    publicoAlvo: {
      perfil: "Candidatos de nível superior",
      tempo: "2-3 meses de preparação",
      conhecimento: "Básico a intermediário em Direito Administrativo",
      objetivo: "Concursos de Tribunais de Contas, Auditorias e Controladorias"
    }
  }
};

const DeckDetail = () => {
  const { slug } = useParams();
  const [activePreviewCard, setActivePreviewCard] = useState(0);
  
  const deck = mockDeckData[slug as keyof typeof mockDeckData];
  
  if (!deck) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-slate-950 mb-4">Deck não encontrado</h1>
          <Link to="/catalogo" className="text-amber-600 hover:text-amber-700">
            Voltar ao catálogo
          </Link>
        </div>
      </div>
    );
  }

  const mockPreviewCards = [
    {
      front: "Quais são os princípios expressos da Administração Pública segundo a CF/88?",
      back: "LIMPE: Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência (art. 37, caput)"
    },
    {
      front: "O que caracteriza o ato administrativo discricionário?",
      back: "Liberdade de escolha quanto ao conteúdo, destinatário, conveniência, oportunidade e forma, dentro dos limites legais."
    },
    {
      front: "Cite as modalidades de licitação previstas na Lei 14.133/21",
      back: "Concorrência, Tomada de Preços, Convite, Concurso, Leilão, Pregão e Diálogo Competitivo."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-600 mb-6">
          <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/catalogo" className="hover:text-amber-600 transition-colors">Catálogo</Link>
          <span>/</span>
          <span className="text-slate-950 font-medium">{deck.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header do Deck */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-card border border-slate-200 p-8"
            >
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 rounded-xl overflow-hidden bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0">
                  <div className="text-center text-white">
                    <h4 className="font-bold text-lg mb-1">{deck.banca}</h4>
                    <p className="text-sm opacity-90">{deck.area}</p>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${deck.fase === "pos" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}
                    `}>
                      {deck.fase === "pos" ? "Pós-edital" : "Pré-edital"}
                    </span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                      {deck.banca}
                    </span>
                    <BadgeJuris incluiJurisprudencia={deck.incluiJurisprudencia} />
                  </div>
                  
                  <h1 className="font-lexend font-bold text-3xl text-slate-950 mb-3">
                    {deck.title}
                  </h1>
                  
                  <p className="text-slate-600 text-lg leading-relaxed mb-4">
                    {deck.description}
                  </p>
                  
                  <div className="flex items-center gap-6 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{deck.numCards} flashcards</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      <span>Prazo recomendado: {deck.prazo} dias</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Versão {deck.versao}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Informações do Concurso */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-card border border-slate-200 p-8"
            >
              <h2 className="font-lexend font-bold text-2xl text-slate-950 mb-6">
                Informações do Concurso
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-950">{deck.concurso.nome}</p>
                      <p className="text-sm text-slate-600">{deck.concurso.status}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-950">{deck.concurso.salario}</p>
                      <p className="text-sm text-slate-600">Remuneração inicial</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-950">{deck.concurso.vagas} vagas</p>
                      <p className="text-sm text-slate-600">Nível {deck.concurso.nivel}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-950">Prova: {deck.concurso.prova}</p>
                      <p className="text-sm text-slate-600">Inscrições {deck.concurso.inscricoes}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-amber-800 mb-2">Por que este material?</h3>
                    <p className="text-amber-700 text-sm leading-relaxed">
                      {deck.concurso.justificativa}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Organização do Deck */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-card border border-slate-200 p-8"
            >
              <h2 className="font-lexend font-bold text-2xl text-slate-950 mb-6">
                Organização do Material
              </h2>
              
              <div className="mb-6">
                <div className="bg-slate-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-950">Total de Flashcards</span>
                    <span className="text-2xl font-bold text-amber-600">{deck.organizacao.totalCards}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-950 mb-4">Distribuição por Tópico</h3>
                  {deck.organizacao.topicos.map((topico, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-950 mb-1">{topico.nome}</h4>
                        <span className={`
                          text-xs px-2 py-1 rounded-full font-medium
                          ${topico.peso === "Muito Alta" ? "bg-red-100 text-red-700" :
                            topico.peso === "Alta incidência" ? "bg-orange-100 text-orange-700" :
                            topico.peso === "Média" ? "bg-yellow-100 text-yellow-700" :
                            "bg-green-100 text-green-700"}
                        `}>
                          {topico.peso}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-slate-950">{topico.cards}</span>
                        <span className="text-sm text-slate-600 ml-1">cards</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Preview dos Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-card border border-slate-200 p-8"
            >
              <h2 className="font-lexend font-bold text-2xl text-slate-950 mb-6">
                Preview dos Flashcards
              </h2>
              
              <div className="space-y-4">
                <div className="flex gap-2 mb-4">
                  {mockPreviewCards.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActivePreviewCard(index)}
                      className={`
                        px-3 py-1 rounded-full text-sm font-medium transition-colors
                        ${activePreviewCard === index 
                          ? "bg-amber-500 text-white" 
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }
                      `}
                    >
                      Card {index + 1}
                    </button>
                  ))}
                </div>
                
                <div className="bg-slate-50 rounded-lg p-6 min-h-[200px]">
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-slate-600 mb-2">Pergunta:</h4>
                    <p className="text-lg text-slate-950 font-medium">
                      {mockPreviewCards[activePreviewCard].front}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-slate-600 mb-2">Resposta:</h4>
                    <p className="text-slate-800 leading-relaxed">
                      {mockPreviewCards[activePreviewCard].back}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar de Compra */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-card border border-slate-200 p-6 sticky top-24"
            >
              <div className="mb-6">
                <PriceTag preco={deck.preco} variant="featured" showParcelas={true} />
              </div>
              
              <div className="space-y-4 mb-6">
                <button className="w-full bg-gradient-accent text-slate-950 font-semibold py-4 rounded-lg hover:shadow-lg transition-smooth">
                  Comprar Agora
                </button>
                
                <button className="w-full border border-slate-300 text-slate-700 font-medium py-3 rounded-lg hover:bg-slate-50 transition-smooth">
                  Adicionar ao Carrinho
                </button>
              </div>
              
              <div className="border-t border-slate-200 pt-6">
                <h3 className="font-semibold text-slate-950 mb-4">Para quem é este material?</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{deck.publicoAlvo.perfil}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">Tempo de estudo: {deck.publicoAlvo.tempo}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">Conhecimento: {deck.publicoAlvo.conhecimento}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">Foco: {deck.publicoAlvo.objetivo}</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-slate-200 pt-6 mt-6">
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>Garantia de 7 dias</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Download imediato após pagamento</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeckDetail;