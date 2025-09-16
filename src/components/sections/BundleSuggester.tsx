import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Target, Clock, BookOpen, Check } from "lucide-react";

interface BundleSuggesterProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SuggestionResult {
  title: string;
  description: string;
  decks: string[];
  preco: number;
  precoOriginal: number;
  numCards: number;
  incluiJurisprudencia: boolean;
  tipo: "recomendado" | "economico" | "completo";
}

const areas = [
  "Fiscal", "Jurídica", "Tribunais", "Controle", "Policial", "Saúde", "Educação"
];

const bancas = [
  "FGV", "Cebraspe", "FCC", "Vunesp", "IBFC", "Quadrix", "Fundatec"
];

const fases = [
  { id: "pre", label: "Pré-edital", desc: "Preparação antecipada" },
  { id: "pos", label: "Pós-edital", desc: "Foco na prova específica" }
];

const prazos = [
  { id: "15", label: "15 dias", desc: "Revisão final" },
  { id: "30", label: "30 dias", desc: "Sprint intensivo" },
  { id: "60", label: "60 dias", desc: "Preparação sólida" },
  { id: "90", label: "90 dias", desc: "Base completa" }
];

export const BundleSuggester = ({ isOpen, onClose }: BundleSuggesterProps) => {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    area: "",
    orgao: "",
    banca: "",
    fase: "",
    prazo: ""
  });

  const [suggestions, setSuggestions] = useState<SuggestionResult[]>([]);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Gerar sugestões baseadas nas seleções
      generateSuggestions();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const generateSuggestions = () => {
    // Mock de sugestões - em produção seria uma consulta ao Supabase
    const mockSuggestions: SuggestionResult[] = [
      {
        title: `Pacote ${selections.area} Recomendado`,
        description: `Curadoria otimizada para ${selections.banca} com foco em ${selections.prazo} dias`,
        decks: ["Direito Administrativo", "Português", "Conhecimentos Específicos"],
        preco: 12999,
        precoOriginal: 16999,
        numCards: 1200,
        incluiJurisprudencia: selections.fase === "pos",
        tipo: "recomendado"
      },
      {
        title: `Alternativa Econômica`,
        description: `Essencial para ${selections.area} - ${selections.banca}`,
        decks: ["Direito Administrativo", "Português"],
        preco: 7999,
        precoOriginal: 9999,
        numCards: 800,
        incluiJurisprudencia: false,
        tipo: "economico"
      },
      {
        title: `Pacote Completo Premium`,
        description: `Cobertura total com jurisprudência e questões comentadas`,
        decks: ["Todas as disciplinas", "Jurisprudência", "Questões", "Resumos"],
        preco: 19999,
        precoOriginal: 25999,
        numCards: 2000,
        incluiJurisprudencia: true,
        tipo: "completo"
      }
    ];

    setSuggestions(mockSuggestions);
    setStep(5);
  };

  const resetSuggester = () => {
    setStep(1);
    setSelections({
      area: "",
      orgao: "",
      banca: "",
      fase: "",
      prazo: ""
    });
    setSuggestions([]);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div>
              <h2 className="font-lexend font-bold text-2xl text-slate-950">
                Montar Meu Pacote
              </h2>
              <p className="text-slate-600 mt-1">
                Encontre os decks ideais para sua prova em {step < 5 ? step : 4} passos
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress */}
          {step < 5 && (
            <div className="px-6 py-4 bg-slate-50">
              <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                <span>Passo {step} de 4</span>
                <span>{Math.round((step / 4) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-gradient-accent h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="p-6">
            {/* Step 1: Área/Órgão */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-lexend font-semibold text-xl mb-2">
                    Qual é seu objetivo?
                  </h3>
                  <p className="text-slate-600">Escolha a área de concurso</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {areas.map((area) => (
                    <button
                      key={area}
                      onClick={() => setSelections({...selections, area})}
                      className={`
                        p-4 rounded-xl border-2 transition-all text-left
                        ${selections.area === area 
                          ? "border-amber-500 bg-amber-50" 
                          : "border-slate-200 hover:border-slate-300"
                        }
                      `}
                    >
                      <div className="font-medium">{area}</div>
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700 mb-2 block">
                      Órgão específico (opcional)
                    </span>
                    <input
                      type="text"
                      placeholder="Ex: TCE-SP, SEFAZ-RJ, TRT-15..."
                      value={selections.orgao}
                      onChange={(e) => setSelections({...selections, orgao: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </label>
                </div>
              </motion.div>
            )}

            {/* Step 2: Banca */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-lexend font-semibold text-xl mb-2">
                    Qual banca organizadora?
                  </h3>
                  <p className="text-slate-600">Cada banca tem suas particularidades</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {bancas.map((banca) => (
                    <button
                      key={banca}
                      onClick={() => setSelections({...selections, banca})}
                      className={`
                        p-4 rounded-xl border-2 transition-all text-left
                        ${selections.banca === banca 
                          ? "border-amber-500 bg-amber-50" 
                          : "border-slate-200 hover:border-slate-300"
                        }
                      `}
                    >
                      <div className="font-medium">{banca}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Fase */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-lexend font-semibold text-xl mb-2">
                    Em que fase está?
                  </h3>
                  <p className="text-slate-600">Isso define o tipo de conteúdo</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fases.map((fase) => (
                    <button
                      key={fase.id}
                      onClick={() => setSelections({...selections, fase: fase.id})}
                      className={`
                        p-6 rounded-xl border-2 transition-all text-left
                        ${selections.fase === fase.id 
                          ? "border-amber-500 bg-amber-50" 
                          : "border-slate-200 hover:border-slate-300"
                        }
                      `}
                    >
                      <div className="font-semibold text-lg mb-1">{fase.label}</div>
                      <div className="text-slate-600 text-sm">{fase.desc}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Prazo */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-lexend font-semibold text-xl mb-2">
                    Quanto tempo até a prova?
                  </h3>
                  <p className="text-slate-600">Vamos ajustar a intensidade dos estudos</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {prazos.map((prazo) => (
                    <button
                      key={prazo.id}
                      onClick={() => setSelections({...selections, prazo: prazo.id})}
                      className={`
                        p-6 rounded-xl border-2 transition-all text-left
                        ${selections.prazo === prazo.id 
                          ? "border-amber-500 bg-amber-50" 
                          : "border-slate-200 hover:border-slate-300"
                        }
                      `}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-5 h-5 text-amber-600" />
                        <span className="font-semibold text-lg">{prazo.label}</span>
                      </div>
                      <div className="text-slate-600 text-sm">{prazo.desc}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 5: Resultados */}
            {step === 5 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-lexend font-semibold text-xl mb-2">
                    Suas opções personalizadas
                  </h3>
                  <p className="text-slate-600">Escolha o pacote ideal para seu perfil</p>
                </div>

                <div className="grid gap-6">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className={`
                        relative p-6 rounded-xl border-2 transition-all
                        ${suggestion.tipo === "recomendado" 
                          ? "border-amber-500 bg-amber-50 ring-2 ring-amber-200" 
                          : "border-slate-200 hover:border-slate-300"
                        }
                      `}
                    >
                      {suggestion.tipo === "recomendado" && (
                        <div className="absolute -top-3 left-6 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          🎯 Recomendado
                        </div>
                      )}

                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold text-lg">{suggestion.title}</h4>
                          <p className="text-slate-600 text-sm mt-1">{suggestion.description}</p>
                        </div>
                        <div className="text-right">
          <div className="text-2xl font-bold text-slate-950">
            R$ {(suggestion.preco / 100).toFixed(2).replace(".", ",")}
          </div>
          <div className="text-xs text-slate-500 line-through">
            De R$ {(suggestion.precoOriginal / 100).toFixed(2).replace(".", ",")}
          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-slate-500" />
                          <span>{suggestion.numCards} cards</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500" />
                          <span>{suggestion.incluiJurisprudencia ? "Com jurisprudência" : "Somente teoria"}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-sm font-medium text-slate-700 mb-2">Inclui:</div>
                        <div className="flex flex-wrap gap-2">
                          {suggestion.decks.map((deck) => (
                            <span key={deck} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                              {deck}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button className={`
                        w-full py-3 rounded-lg font-medium transition-smooth
                        ${suggestion.tipo === "recomendado"
                          ? "bg-gradient-accent text-slate-950 hover:shadow-lg"
                          : "bg-slate-950 text-white hover:bg-slate-800"
                        }
                      `}>
                        Adicionar ao carrinho
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={resetSuggester}
                    className="text-amber-600 hover:text-amber-700 font-medium"
                  >
                    ← Fazer nova consulta
                  </button>
                </div>
              </motion.div>
            )}

            {/* Navigation */}
            {step < 5 && (
              <div className="flex justify-between pt-8 border-t border-slate-200 mt-8">
                <button
                  onClick={handleBack}
                  disabled={step === 1}
                  className="px-6 py-2 text-slate-600 hover:text-slate-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Voltar
                </button>
                <button
                  onClick={handleNext}
                  disabled={
                    (step === 1 && !selections.area) ||
                    (step === 2 && !selections.banca) ||
                    (step === 3 && !selections.fase) ||
                    (step === 4 && !selections.prazo)
                  }
                  className="px-8 py-3 bg-gradient-accent text-slate-950 font-semibold rounded-lg hover:shadow-lg transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {step === 4 ? "Ver sugestões" : "Próximo →"}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};