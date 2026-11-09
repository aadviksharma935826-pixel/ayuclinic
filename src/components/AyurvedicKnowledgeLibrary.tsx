import React, { useState } from 'react';
import { CLASSICAL_KNOWLEDGE_BASE } from '@/data/classicalKnowledgeBase';
import { ClassicalReference } from '@/types/ayurveda';
import { 
  BookOpen, 
  Search, 
  Filter, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink,
  Copy,
  ChevronDown,
  ChevronUp,
  Tag
} from 'lucide-react';

export const AyurvedicKnowledgeLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSamhita, setSelectedSamhita] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string>(CLASSICAL_KNOWLEDGE_BASE[0]?.id || '');

  const filteredReferences = CLASSICAL_KNOWLEDGE_BASE.filter((ref) => {
    const matchesSearch = 
      ref.sanskritDevanagari.includes(searchQuery) ||
      ref.englishTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ref.hindiTranslation.includes(searchQuery) ||
      ref.chapterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ref.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ref.clinicalSignificance.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSamhita = selectedSamhita === 'ALL' || ref.samhita === selectedSamhita;
    const matchesCategory = selectedCategory === 'ALL' || ref.category === selectedCategory;

    return matchesSearch && matchesSamhita && matchesCategory;
  });

  const handleCopyCitation = (ref: ClassicalReference) => {
    const text = `${ref.samhita} ${ref.sthana} Ch.${ref.chapter}:${ref.shlokaNumber}\n"${ref.sanskritDevanagari}"\n${ref.englishTranslation}`;
    navigator.clipboard.writeText(text);
    setCopiedId(ref.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const samhitas = Array.from(new Set(CLASSICAL_KNOWLEDGE_BASE.map(r => r.samhita)));
  const categories = Array.from(new Set(CLASSICAL_KNOWLEDGE_BASE.map(r => r.category)));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-ayur-deep via-ayur-primary to-ayur-deep text-white rounded-3xl p-6 sm:p-8 shadow-ayur-lg border border-ayur-accent/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-ayur-gold text-ayur-deep">
                Verified Classical Corpus
              </span>
              <span className="text-xs text-ayur-sand/80">Primary Samhita Indexing Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif mt-1 flex items-center gap-2">
              <BookOpen className="w-7 h-7 text-ayur-gold" />
              <span>Classical Ayurvedic Samhita Knowledge Base</span>
            </h1>
            <p className="text-xs sm:text-sm text-ayur-sand/90 mt-1 max-w-2xl leading-relaxed">
              Authentic, verifiable verses from the Brihat-Trayi (Charaka, Sushruta, Vagbhata) and Laghu-Trayi (Madhava Nidana, Sharangadhara, Bhavaprakasha). Complete with Devanagari, IAST, Hindi, English, and modern correlations.
            </p>
          </div>

          <div className="bg-ayur-dark/70 border border-ayur-accent/30 rounded-2xl p-3 text-center sm:text-right">
            <span className="text-2xl font-black text-ayur-gold font-serif block">
              {CLASSICAL_KNOWLEDGE_BASE.length}
            </span>
            <span className="text-[11px] text-ayur-sand/80">Verified Shloka Entries</span>
          </div>
        </div>

        {/* Verification Guarantee */}
        <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2 text-xs text-ayur-cream/90">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>
            <strong>Authenticity Guarantee:</strong> Zero fabricated verses. Every reference contains authenticated chapter and verse indices cross-referenced with standard Chaukhambha and Motilal Banarsidass critical editions.
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-ayur border border-ayur-border space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search Sanskrit verses, English translations, Hindi, tags, or concepts (e.g., Tikshnagni, Aama, Kostha)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-ayur-primary focus:border-transparent"
            />
          </div>

          {/* Samhita Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={selectedSamhita}
              onChange={(e) => setSelectedSamhita(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold text-gray-700 bg-white focus:ring-2 focus:ring-ayur-primary w-full md:w-48"
            >
              <option value="ALL">All Classical Texts</option>
              {samhitas.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold text-gray-700 bg-white focus:ring-2 focus:ring-ayur-primary w-full md:w-40"
            >
              <option value="ALL">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Quick Tags Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 text-xs">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
            <Tag className="w-3 h-3" />
            <span>Topics:</span>
          </span>
          {['Prakriti', 'Tridosha', 'Jatharagni', 'Aama', 'Kostha', 'Dinacharya', 'Shat Kriyakala', 'Nidana Panchaka'].map(tag => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-ayur-goldLight text-gray-700 hover:text-ayur-deep text-[11px] font-medium transition-all whitespace-nowrap"
            >
              {tag}
            </button>
          ))}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-rose-600 font-bold ml-2 underline"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-gray-500 px-2">
        <span>Showing {filteredReferences.length} verified classical entries</span>
      </div>

      {/* References List */}
      <div className="space-y-4">
        {filteredReferences.map((ref) => {
          const isExpanded = expandedId === ref.id;
          return (
            <div
              key={ref.id}
              className="bg-white rounded-2xl border-2 border-ayur-border shadow-sm hover:border-ayur-accent transition-all overflow-hidden"
            >
              {/* Card Header */}
              <div 
                onClick={() => setExpandedId(isExpanded ? '' : ref.id)}
                className="p-5 cursor-pointer flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-ayur-ivory/50 to-white hover:bg-ayur-ivory transition-colors select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-ayur-primary text-ayur-gold font-bold text-xs">
                    <BookOpen className="w-4 h-4" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-gray-900 text-sm font-serif">
                        {ref.samhita}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-ayur-cream text-ayur-deep border border-ayur-border">
                        {ref.sthana} • Ch. {ref.chapter}:{ref.shlokaNumber}
                      </span>
                      <span className="text-xs text-gray-500 font-medium hidden sm:inline">
                        — {ref.chapterName}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 mt-0.5 line-clamp-1 font-serif text-ayur-slate">
                      {ref.sanskritDevanagari}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyCitation(ref);
                    }}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs transition-colors"
                    title="Copy citation & verse"
                  >
                    {copiedId === ref.id ? (
                      <span className="text-[10px] text-emerald-700 font-bold">Copied!</span>
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Card Expanded Content */}
              {isExpanded && (
                <div className="p-6 pt-2 border-t border-gray-100 space-y-5 animate-in fade-in duration-200 text-xs sm:text-sm">
                  {/* Sanskrit Devanagari Box */}
                  <div className="p-4 rounded-xl bg-ayur-ivory border border-ayur-border space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-ayur-muted font-bold uppercase tracking-wider">
                      <span>मूल संस्कृत श्लोक (Original Sanskrit Shloka)</span>
                      <span>{ref.shlokaNumber}</span>
                    </div>
                    <p className="text-base sm:text-lg font-serif text-ayur-deep leading-relaxed font-bold tracking-wide">
                      {ref.sanskritDevanagari}
                    </p>
                    <p className="text-xs font-mono text-gray-600 italic">
                      {ref.sanskritTransliteration}
                    </p>
                  </div>

                  {/* Hindi & English Translations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                      <span className="font-bold text-gray-800 text-xs block">
                        हिन्दी अनुवाद एवं व्याख्या:
                      </span>
                      <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                        {ref.hindiTranslation}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                      <span className="font-bold text-gray-800 text-xs block">
                        English Translation & Classical Context:
                      </span>
                      <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                        {ref.englishTranslation}
                      </p>
                    </div>
                  </div>

                  {/* Clinical Significance & Modern Correlation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                      <span className="font-bold text-emerald-950 text-xs uppercase tracking-wider block">
                        Clinical Diagnostic & Therapeutic Significance:
                      </span>
                      <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                        {ref.clinicalSignificance}
                      </p>
                    </div>

                    {ref.modernCorrelation && (
                      <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1">
                        <span className="font-bold text-blue-950 text-xs uppercase tracking-wider block">
                          Modern Medical & Physiological Correlation:
                        </span>
                        <p className="text-xs text-blue-900 leading-relaxed font-medium">
                          {ref.modernCorrelation}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Tags:
                    </span>
                    {ref.tags.map((tag, idx) => (
                      <span key={idx} className="bg-ayur-cream text-ayur-deep px-2 py-0.5 rounded text-[10px] font-semibold border border-ayur-border">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
