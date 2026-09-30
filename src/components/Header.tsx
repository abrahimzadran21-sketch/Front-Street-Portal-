import React, { useState } from 'react';
import { useShelter } from '../context/ShelterContext';
import { Role } from '../types/shelter';
import { 
  Heart, 
  ShieldCheck, 
  User, 
  Globe, 
  PlusCircle, 
  Menu, 
  X,
  Stethoscope,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenIntakeModal: () => void;
  onOpenDonationModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  onOpenIntakeModal,
  onOpenDonationModal
}) => {
  const { role, setRole, currentUser } = useShelter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'adopt', label: 'Adoptions' },
    { id: 'medical', label: 'Veterinary Clinic' },
    { id: 'lostfound', label: 'Lost & Found' },
    { id: 'foster', label: 'Foster Care' },
    { id: 'volunteer-donate', label: 'Volunteers & Giving' },
    ...(role === 'admin' ? [{ id: 'management', label: 'Shelter Operations' }] : []),
    ...(role === 'user' ? [{ id: 'my-hub', label: 'My Pet Hub' }] : [])
  ];

  const handleRoleSelect = (newRole: Role) => {
    setRole(newRole);
    setRoleDropdownOpen(false);
    if (newRole === 'public') {
      setCurrentTab('adopt');
    } else if (newRole === 'user') {
      setCurrentTab('my-hub');
    } else if (newRole === 'admin') {
      setCurrentTab('management');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      {/* Top Sacramento Community Utility Notice */}
      <div className="bg-neutral-900 text-neutral-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-medium text-neutral-200">Front Street Animal Shelter</span>
            <span className="text-neutral-500 hidden sm:inline">·</span>
            <span className="text-neutral-400 hidden sm:inline">2127 Front St, Sacramento, CA 95818</span>
            <span className="text-neutral-500 hidden md:inline">·</span>
            <span className="text-neutral-400 hidden md:inline">Open Daily 12 PM - 5 PM</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-neutral-300">
            <span className="text-neutral-400">Shelter Dispatch: <strong className="text-white font-mono">(916) 808-7387</strong></span>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Brand), Zone 2 (4-6 Clean Text Links), Zone 3 (Primary Actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setCurrentTab('adopt')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="text-xl font-bold tracking-tight text-neutral-950 font-display block leading-tight group-hover:text-emerald-800 transition-colors">
              Front Street Animal Shelter
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wider text-emerald-700 block">
              City of Sacramento · Rescue & Care
            </span>
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-600">
          {navLinks.map(link => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setCurrentTab(link.id)}
                className={`py-1 transition-colors relative whitespace-nowrap ${
                  isActive 
                    ? 'text-emerald-800 font-semibold' 
                    : 'hover:text-neutral-900'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-700 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Account Mode Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-neutral-300 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
              title="Switch user perspective"
            >
              {role === 'public' && (
                <>
                  <Globe className="w-3.5 h-3.5 text-neutral-600" />
                  <span>Public View</span>
                </>
              )}
              {role === 'user' && (
                <>
                  <User className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="truncate max-w-[110px]">User ({currentUser.name.split(' ')[0]})</span>
                </>
              )}
              {role === 'admin' && (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  <span className="font-semibold text-amber-900">Admin / Staff</span>
                </>
              )}
              <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-neutral-200 py-1.5 z-50 text-xs">
                <div className="px-3 py-2 border-b border-neutral-100 text-neutral-500">
                  <div className="font-semibold text-neutral-800">Select Viewing Account</div>
                  <div>Switch roles to test all 50 features:</div>
                </div>

                <button
                  onClick={() => handleRoleSelect('public')}
                  className={`w-full text-left px-3 py-2 flex items-start gap-2.5 hover:bg-neutral-50 transition-colors ${role === 'public' ? 'bg-emerald-50/70 text-emerald-900 font-medium' : 'text-neutral-700'}`}
                >
                  <Globe className="w-4 h-4 mt-0.5 text-neutral-500 shrink-0" />
                  <div>
                    <div className="font-semibold">Public Visitor</div>
                    <div className="text-[11px] text-neutral-500">Browse pets, lost & found, submit applications & donate</div>
                  </div>
                </button>

                <button
                  onClick={() => handleRoleSelect('user')}
                  className={`w-full text-left px-3 py-2 flex items-start gap-2.5 hover:bg-neutral-50 transition-colors ${role === 'user' ? 'bg-emerald-50/70 text-emerald-900 font-medium' : 'text-neutral-700'}`}
                >
                  <User className="w-4 h-4 mt-0.5 text-emerald-600 shrink-0" />
                  <div>
                    <div className="font-semibold">Registered User ({currentUser.name})</div>
                    <div className="text-[11px] text-neutral-500">Track application status, foster pets & volunteer shifts</div>
                  </div>
                </button>

                <button
                  onClick={() => handleRoleSelect('admin')}
                  className={`w-full text-left px-3 py-2 flex items-start gap-2.5 hover:bg-neutral-50 transition-colors ${role === 'admin' ? 'bg-amber-50/70 text-amber-900 font-medium' : 'text-neutral-700'}`}
                >
                  <ShieldCheck className="w-4 h-4 mt-0.5 text-amber-600 shrink-0" />
                  <div>
                    <div className="font-semibold">Admin / Staff & Veterinarian</div>
                    <div className="text-[11px] text-neutral-500">Intake animals, ID generator, medical charts, approvals & stats</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Primary Action Button */}
          {role === 'admin' ? (
            <button
              onClick={onOpenIntakeModal}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors whitespace-nowrap"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Animal Intake</span>
            </button>
          ) : (
            <button
              onClick={onOpenDonationModal}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition-colors whitespace-nowrap"
            >
              <Heart className="w-4 h-4" />
              <span>Donate</span>
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white px-4 py-3 space-y-1 shadow-lg">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => {
                setCurrentTab(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentTab === link.id
                  ? 'bg-emerald-50 text-emerald-900 font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
