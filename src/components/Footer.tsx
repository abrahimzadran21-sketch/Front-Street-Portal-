import React from 'react';
import { useShelter } from '../context/ShelterContext';
import { MapPin, Phone, Mail, Clock, RefreshCw, Heart } from 'lucide-react';

export const Footer: React.FC<{ onTabChange: (tab: string) => void }> = ({ onTabChange }) => {
  const { resetDemoData } = useShelter();

  return (
    <footer className="bg-neutral-900 text-neutral-300 border-t border-neutral-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Identity */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold font-display">
              Front Street Animal Shelter
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Sacramento's vital municipal shelter & rescue resource dedicated to saving animal lives, providing high-quality veterinary care, and creating lifelong human-animal families.
            </p>
            <div className="text-xs text-neutral-400 space-y-1 pt-1">
              <div>EIN: 68-0194821 · 501(c)(3) Non-Profit Partner</div>
              <div>Front Street Animal Shelter Foundation</div>
            </div>
          </div>

          {/* Col 2: Location & Hours */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider">
              Shelter & Clinic
            </h4>
            <div className="space-y-2.5 text-sm text-neutral-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>2127 Front Street<br />Sacramento, CA 95818</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>(916) 808-7387 (808-PETS)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Open 7 Days: 12:00 PM – 5:00 PM</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>info@frontstreetshelter.org</span>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider">
              Community Programs
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <button onClick={() => onTabChange('adopt')} className="hover:text-white transition-colors">
                  Available Adoptable Animals
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('medical')} className="hover:text-white transition-colors">
                  Veterinary Care & Vaccines
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('lostfound')} className="hover:text-white transition-colors">
                  Lost & Found Pet Reunification
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('foster')} className="hover:text-white transition-colors">
                  Foster Caregiver Program
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('volunteer-donate')} className="hover:text-white transition-colors">
                  Volunteer Shifts & Donations
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Demo State & Action */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider">
              Prototype Controls
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              This interactive application includes all 50 user stories with live persistent data for Sacramento. You can reset anytime:
            </p>
            <button
              onClick={resetDemoData}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-neutral-700 bg-neutral-800 text-neutral-200 hover:bg-neutral-700 hover:text-white transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Demo Records
            </button>
            <div className="pt-2 text-xs text-neutral-400">
              Emergency Animal Control Dispatch: dial 311 or (916) 264-5011 within Sacramento city limits.
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
          <div>
            © {new Date().getFullYear()} Front Street Animal Shelter · City of Sacramento Department of Animal Care Services.
          </div>
          <div className="flex items-center gap-4">
            <span>Rescue</span>
            <span aria-hidden="true">·</span>
            <span>Adopt</span>
            <span aria-hidden="true">·</span>
            <span>Veterinary Care</span>
            <span aria-hidden="true">·</span>
            <span>Foster</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
