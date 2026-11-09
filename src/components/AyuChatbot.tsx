import React, { useState, useRef, useEffect } from 'react';
import { FullClinicalAssessment, ClassicalReference } from '@/types/ayurveda';
import { 
  Bot, 
  Send, 
  Sparkles, 
  BookOpen, 
  User, 
  RefreshCw, 
  ShieldCheck, 
  AlertCircle,
  Copy,
  Check,
  Languages
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  citations?: ClassicalReference[];
  timestamp: string;
}

interface AyuChatbotProps {
  currentAssessment?: FullClinicalAssessment;
}

export const AyuChatbot: React.FC<AyuChatbotProps> = ({ currentAssessment }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      content: `Namaste! I am **AYU AI – Your Ayurvedic Clinical Assistant**.

I am grounded in authentic classical literature: Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya, and Madhava Nidana.

${currentAssessment ? `I have loaded the clinical profile for **${currentAssessment.patientProfile.fullName}** (Prakriti: ${currentAssessment.prakriti.classification}, Agni: ${currentAssessment.agni.classification}).` : 'No patient assessment is currently loaded. You can ask general Ayurvedic clinical questions, or load an assessment.'}

How can I assist your clinical inquiry today? You can ask in **English** or **हिन्दी**.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (userText?: string) => {
    const textToSend = userText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.content
          })),
          currentAssessment: currentAssessment || null
        })
      });

      if (!res.ok) throw new Error('Failed to get response');

      const data = await res.json();

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        content: data.reply,
        citations: data.citations || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      const fallbackMessage: Message = {
        id: `fallback-${Date.now()}`,
        sender: 'assistant',
        content: 'I apologize, but an error occurred while connecting to the knowledge engine. Please check your network or try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const quickPrompts = currentAssessment ? [
    'Explain my Prakriti and Agni classification',
    'What foods should I eat to pacify my current Vikriti?',
    'What is the classical citation for my Agni state?',
    'Can you explain this assessment in Hindi (हिन्दी)?'
  ] : [
    'What is the difference between Prakriti and Vikriti?',
    'Explain the 4 types of Agni with Charaka citations',
    'How to differentiate Amavata from Vatarakta?',
    'What are the 6 stages of Shat-Kriyakala?'
  ];

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[750px] bg-white rounded-3xl shadow-ayur border border-ayur-border overflow-hidden">
      {/* Chatbot Header */}
      <div className="bg-gradient-to-r from-ayur-deep via-ayur-primary to-ayur-deep text-white px-6 py-4 flex items-center justify-between border-b border-ayur-accent/30 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600/90 border border-indigo-400 flex items-center justify-center text-white shadow-sm">
            <Bot className="w-5 h-5 text-ayur-gold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold font-serif text-base text-white">AYU AI</h3>
              <span className="px-2 py-0.2 rounded text-[10px] font-extrabold uppercase tracking-wider bg-ayur-gold text-ayur-deep">
                Verified RAG
              </span>
            </div>
            <p className="text-xs text-ayur-sand/80">Your Classical Ayurvedic Clinical Assistant</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          {currentAssessment && (
            <span className="hidden sm:inline px-2.5 py-1 rounded-lg bg-white/10 text-ayur-goldLight border border-white/20 text-[11px] font-medium">
              Context: {currentAssessment.patientProfile.fullName.split(' ')[0]}
            </span>
          )}
          <button
            onClick={() => setMessages([messages[0]])}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-ayur-sand transition-colors"
            title="Clear Chat History"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Safety Sub-bar */}
      <div className="bg-ayur-ivory px-4 py-1.5 border-b border-ayur-border text-[11px] text-gray-600 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Grounded in authentic Samhitas • Never fabricates Sanskrit shlokas</span>
        </div>
        <div className="flex items-center gap-1 text-gray-500">
          <Languages className="w-3 h-3 text-indigo-600" />
          <span>English & हिन्दी Supported</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                isUser ? 'bg-ayur-primary text-white' : 'bg-indigo-600 text-white shadow-sm'
              }`}>
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-ayur-gold" />}
              </div>

              <div className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-2 ${
                isUser
                  ? 'bg-ayur-primary text-white rounded-tr-none'
                  : 'bg-gray-50 text-gray-900 border border-gray-200 rounded-tl-none shadow-2xs'
              }`}>
                {/* Content with basic markdown formatting */}
                <div className="whitespace-pre-wrap font-sans">
                  {m.content}
                </div>

                {/* Classical Citations attached if any */}
                {m.citations && m.citations.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-ayur-accent" />
                      <span>Retrieved Verified Classical Sources ({m.citations.length})</span>
                    </span>
                    <div className="space-y-1.5">
                      {m.citations.map((cite) => (
                        <div
                          key={cite.id}
                          className="p-2 rounded-lg bg-white border border-gray-200 text-gray-800 text-[11px] space-y-0.5"
                        >
                          <div className="flex items-center justify-between font-bold text-ayur-deep">
                            <span>{cite.samhita} {cite.sthana} Ch.{cite.chapter}:{cite.shlokaNumber}</span>
                            <span className="text-[10px] font-normal text-gray-500">{cite.category}</span>
                          </div>
                          <p className="font-serif text-gray-700 italic">"{cite.sanskritDevanagari}"</p>
                          <p className="text-gray-600 line-clamp-1">{cite.englishTranslation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timestamp and Copy */}
                <div className="flex items-center justify-between text-[10px] opacity-70 pt-1">
                  <span>{m.timestamp}</span>
                  {!isUser && (
                    <button
                      onClick={() => handleCopy(m.id, m.content)}
                      className="hover:opacity-100 flex items-center gap-0.5 text-gray-500 hover:text-gray-900"
                      title="Copy response"
                    >
                      {copiedId === m.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-ayur-gold animate-spin" />
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl rounded-tl-none p-3.5 text-xs text-gray-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-ayur-primary animate-ping"></span>
              <span>Consulting Charaka, Sushruta and Vagbhata Samhita corpus...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-4 py-2 bg-gray-50/80 border-t border-gray-200 flex items-center gap-1.5 overflow-x-auto flex-shrink-0 text-xs">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-ayur-gold" />
          <span>Suggested:</span>
        </span>
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            disabled={isLoading}
            className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-gray-700 hover:border-ayur-primary hover:text-ayur-deep text-[11px] whitespace-nowrap transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-4 bg-white border-t border-ayur-border flex items-center gap-2 flex-shrink-0">
        <input
          type="text"
          placeholder="Ask AYU AI about symptoms, Prakriti, Agni, Kostha, or Samhita verses (in English or हिन्दी)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={isLoading}
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-ayur-primary focus:border-transparent"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!input.trim() || isLoading}
          className={`p-2.5 rounded-xl font-bold transition-all ${
            input.trim() && !isLoading
              ? 'bg-ayur-primary hover:bg-ayur-deep text-white shadow-sm'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
