import React from 'react';
import { AlertTriangle, PhoneCall, ShieldAlert, X } from 'lucide-react';
import { RED_FLAG_ALERTS } from '@/data/differentialRules';
import { RedFlagAlert } from '@/types/ayurveda';

interface RedFlagBannerProps {
  detectedAlerts: RedFlagAlert[];
  onDismissAlert?: (id: string) => void;
}

export const RedFlagAlertBanner: React.FC<RedFlagBannerProps> = ({ 
  detectedAlerts,
  onDismissAlert 
}) => {
  if (!detectedAlerts || detectedAlerts.length === 0) return null;

  return (
    <div className="mb-6 rounded-xl border-2 border-red-500 bg-red-50 p-4 shadow-lg animate-pulse-slow">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-red-600 text-white flex-shrink-0">
          <ShieldAlert className="w-6 h-6 animate-bounce" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-red-900 flex items-center gap-2">
              <span>CRITICAL MEDICAL SAFETY ALERT</span>
              <span className="px-2 py-0.5 rounded text-xs font-black bg-red-600 text-white tracking-wider uppercase">
                Red Flag Detected
              </span>
            </h3>
          </div>
          <p className="text-sm text-red-800 font-medium mt-1">
            One or more reported features trigger mandatory modern medical red-flag criteria. 
            AYUCLINIC AI is a clinical decision support tool and is <strong>not designed to manage medical emergencies</strong>.
          </p>

          <div className="mt-3 space-y-2">
            {detectedAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className="bg-white/90 border border-red-300 rounded-lg p-3 text-sm text-red-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <span className="font-bold text-red-700 block">
                    {alert.modernRedFlag} ({alert.ayurvedicEmergencyConcept})
                  </span>
                  <span className="text-xs text-gray-700">
                    <strong>Reported Feature:</strong> {alert.symptom}
                  </span>
                  <span className="text-xs text-red-900 block mt-0.5 font-semibold">
                    <strong>Immediate Protocol:</strong> {alert.clinicalAction}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <a
                    href="tel:112"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-700 hover:bg-red-800 text-white text-xs font-bold transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    Call 112 / EMS
                  </a>
                  {onDismissAlert && (
                    <button
                      onClick={() => onDismissAlert(alert.id)}
                      className="p-1 text-gray-400 hover:text-gray-700 rounded"
                      title="Clinician acknowledged"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 text-xs text-red-700 border-t border-red-200 pt-2 flex items-center justify-between">
            <span>Hospital triage / Emergency Department referral must take precedence over elective Ayurvedic workup.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
