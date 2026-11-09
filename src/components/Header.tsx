import React from 'react';
import { TridoshaLogo } from './TridoshaLogo';
import { 
  Stethoscope, 
  UserCheck, 
  BookOpen, 
  Bot, 
  ShieldCheck, 
  Settings, 
  Sparkles,
  ClipboardList
} from 'lucide-react';

export type NavTab = 
  | 'home'
  | 'assessment' 
  | 'doctor-dashboard' 
  | 'knowledge-base' 
  | 'ai-assistant' 
  | 'admin';

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  userRole: 'patient' | 'doctor';
  setUserRole: (role: 'patient' | 'doctor') => void;
  onOpenNewAssessment: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  onOpenNewAssessment
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-ayur-border shadow-ayur transition-all">
      {/* Top Clinical Safety Bar */}
      <div className="bg-ayur-deep text-ayur-ivory text-xs px-4 py-1.5 flex items-center justify-between border-b border-ayur-secondary/40">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium tracking-wide">
            Charaka, Sushruta & Vagbhata Classical Samhita Engine: <strong className="text-ayur-gold font-semibold">100% Verified Citations</strong>
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-medium">
          <span className="hidden md:inline text-ayur-sand/80">
            Clinical Decision Support System (CDSS) • Non-Autonomous
          </span>
          <div className="flex items-center gap-1.5 bg-ayur-primary/60 px-2.5 py-0.5 rounded-full border border-ayur-accent/30">
            <ShieldCheck className="w-3.5 h-3.5 text-ayur-gold" />
            <span>Medically Responsible</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Identity */}
          <div 
            className="cursor-pointer transition-transform hover:opacity-95"
            onClick={() => setActiveTab('home')}
          >
            <TridoshaLogo size="md" />
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'home'
                  ? 'text-ayur-deep bg-ayur-goldLight/60 font-bold'
                  : 'text-gray-600 hover:text-ayur-deep hover:bg-gray-100'
              }`}
            >
              Overview
            </button>

            <button
              onClick={() => setActiveTab('assessment')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'assessment'
                  ? 'text-ayur-deep bg-ayur-goldLight/70 font-bold border border-ayur-accent/40'
                  : 'text-gray-600 hover:text-ayur-deep hover:bg-gray-100'
              }`}
            >
              <ClipboardList className="w-4 h-4 text-ayur-primary" />
              <span>Assessment</span>
            </button>

            <button
              onClick={() => setActiveTab('doctor-dashboard')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'doctor-dashboard'
                  ? 'text-ayur-deep bg-ayur-goldLight/70 font-bold border border-ayur-accent/40'
                  : 'text-gray-600 hover:text-ayur-deep hover:bg-gray-100'
              }`}
            >
              <Stethoscope className="w-4 h-4 text-emerald-700" />
              <span>Doctor CDSS</span>
            </button>

            <button
              onClick={() => setActiveTab('knowledge-base')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'knowledge-base'
                  ? 'text-ayur-deep bg-ayur-goldLight/70 font-bold border border-ayur-accent/40'
                  : 'text-gray-600 hover:text-ayur-deep hover:bg-gray-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>Samhita Library</span>
            </button>

            <button
              onClick={() => setActiveTab('ai-assistant')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'ai-assistant'
                  ? 'text-ayur-deep bg-ayur-goldLight/70 font-bold border border-ayur-accent/40'
                  : 'text-gray-600 hover:text-ayur-deep hover:bg-gray-100'
              }`}
            >
              <Bot className="w-4 h-4 text-indigo-600" />
              <span>Ayu AI</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-indigo-100 text-indigo-700">RAG</span>
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`p-2 rounded-lg text-sm transition-all ${
                activeTab === 'admin'
                  ? 'text-ayur-deep bg-ayur-goldLight/60 font-bold'
                  : 'text-gray-500 hover:text-ayur-deep hover:bg-gray-100'
              }`}
              title="Admin & Scoring Algorithm Config"
            >
              <Settings className="w-4 h-4" />
            </button>
          </nav>

          {/* Action & Role Switcher */}
          <div className="flex items-center gap-3">
            {/* Quick Role Toggle */}
            <div className="bg-ayur-cream/80 p-1 rounded-xl flex items-center border border-ayur-border text-xs">
              <button
                onClick={() => setUserRole('patient')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1 ${
                  userRole === 'patient'
                    ? 'bg-white shadow-sm text-ayur-deep font-bold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Patient</span>
              </button>
              <button
                onClick={() => setUserRole('doctor')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1 ${
                  userRole === 'doctor'
                    ? 'bg-ayur-primary shadow-sm text-white font-bold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Doctor Mode</span>
              </button>
            </div>

            {/* Launch Assessment CTA */}
            <button
              onClick={onOpenNewAssessment}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ayur-primary hover:bg-ayur-deep text-white font-semibold text-sm shadow-ayur transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-ayur-gold" />
              <span>Start Assessment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sub-Nav */}
      <div className="lg:hidden flex items-center justify-around border-t border-ayur-border/60 bg-ayur-ivory py-2 px-2 text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTab('home')}
          className={`px-2.5 py-1 rounded-md ${activeTab === 'home' ? 'bg-ayur-goldLight text-ayur-deep font-bold' : 'text-gray-600'}`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab('assessment')}
          className={`px-2.5 py-1 rounded-md ${activeTab === 'assessment' ? 'bg-ayur-goldLight text-ayur-deep font-bold' : 'text-gray-600'}`}
        >
          Assessment
        </button>
        <button
          onClick={() => setActiveTab('doctor-dashboard')}
          className={`px-2.5 py-1 rounded-md ${activeTab === 'doctor-dashboard' ? 'bg-ayur-goldLight text-ayur-deep font-bold' : 'text-gray-600'}`}
        >
          Doctor CDSS
        </button>
        <button
          onClick={() => setActiveTab('knowledge-base')}
          className={`px-2.5 py-1 rounded-md ${activeTab === 'knowledge-base' ? 'bg-ayur-goldLight text-ayur-deep font-bold' : 'text-gray-600'}`}
        >
          Library
        </button>
        <button
          onClick={() => setActiveTab('ai-assistant')}
          className={`px-2.5 py-1 rounded-md ${activeTab === 'ai-assistant' ? 'bg-indigo-100 text-indigo-700 font-bold' : 'text-gray-600'}`}
        >
          Ayu AI
        </button>
      </div>
    </header>
  );
};
