import React from 'react';
import { TridoshaLogo } from './TridoshaLogo';
import { ShieldCheck, Scale, FileText, HeartPulse } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-ayur-dark text-ayur-ivory border-t-2 border-ayur-accent/30 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <TridoshaLogo size="md" className="brightness-125 text-white" />
            <p className="text-ayur-cream/80 text-sm max-w-md leading-relaxed">
              Bridging Classical Ayurveda with Intelligent Clinical Assessment. Grounded in the authentic verses of Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya, and Madhava Nidana for modern clinical practitioners and patients.
            </p>
            <div className="flex items-center gap-2 text-xs text-ayur-gold font-medium">
              <HeartPulse className="w-4 h-4 text-emerald-400" />
              <span>Evidence-Informed Ayurvedic Clinical Decision Support System (CDSS)</span>
            </div>
          </div>

          {/* Classical References */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-ayur-gold uppercase tracking-wider font-serif">
              Classical Sources
            </h4>
            <ul className="text-xs text-ayur-cream/70 space-y-2">
              <li>• Charaka Samhita (Vimana, Sharira & Chikitsa)</li>
              <li>• Sushruta Samhita (Sutra & Sharira)</li>
              <li>• Ashtanga Hridaya (Sutrasthana 1-13)</li>
              <li>• Madhava Nidana (Panchalakshana)</li>
              <li>• Sharangadhara Samhita (Kala & Aushadha)</li>
              <li>• Bhavaprakasha Nighantu</li>
            </ul>
          </div>

          {/* Clinical & Statutory Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-ayur-gold uppercase tracking-wider font-serif flex items-center gap-1.5">
              <Scale className="w-4 h-4" />
              <span>Medical Safety Mandate</span>
            </h4>
            <div className="text-[11px] text-ayur-cream/75 leading-relaxed bg-ayur-deep/60 p-3 rounded-lg border border-ayur-secondary/40">
              <p>
                <strong>Statutory Notice:</strong> AYUCLINIC AI is designed solely as an educational and decision-support companion for qualified Ayurvedic practitioners (BAMS/MD) and patients. It does <em>not</em> provide autonomous diagnosis or automated medical prescriptions. The final diagnosis and therapeutic decisions rest exclusively with the treating registered clinician.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="mt-12 pt-6 border-t border-ayur-secondary/30 flex flex-col sm:flex-row items-center justify-between text-xs text-ayur-cream/60 gap-4">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} AYUCLINIC AI. All rights reserved.</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Privacy & Data Protected
            </span>
          </div>
          <div className="flex items-center gap-4 text-ayur-cream/80">
            <span className="hover:text-white cursor-pointer transition-colors">Ethics & Safety</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">Clinical Guidelines</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">Ayush Council Alignment</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
