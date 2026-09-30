/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShelterProvider, useShelter } from './context/ShelterContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { AdoptableCatalog } from './components/adoption/AdoptableCatalog';
import { PetDetailModal } from './components/adoption/PetDetailModal';
import { AdoptionApplicationModal } from './components/adoption/AdoptionApplicationModal';
import { IntakeRegistrationModal } from './components/intake/IntakeRegistrationModal';
import { MedicalCarePortal } from './components/medical/MedicalCarePortal';
import { LostAndFoundHub } from './components/lostfound/LostAndFoundHub';
import { FosterCareHub } from './components/foster/FosterCareHub';
import { VolunteerDonationsHub } from './components/volunteer/VolunteerDonationsHub';
import { ShelterDashboard } from './components/management/ShelterDashboard';
import { UserPortal } from './components/user/UserPortal';
import { Animal } from './types/shelter';
import { ShieldCheck, User, Globe, Heart, Stethoscope, Sparkles } from 'lucide-react';

function ShelterAppContent() {
  const { role, setRole, currentUser } = useShelter();

  // Tab navigation: 'adopt' | 'medical' | 'lostfound' | 'foster' | 'volunteer-donate' | 'management' | 'my-hub'
  const [currentTab, setCurrentTab] = useState<string>('adopt');

  // Modals
  const [selectedPetForDetail, setSelectedPetForDetail] = useState<Animal | null>(null);
  const [selectedPetForAdoption, setSelectedPetForAdoption] = useState<Animal | null>(null);
  const [adoptionModalOpen, setAdoptionModalOpen] = useState(false);
  const [intakeModalOpen, setIntakeModalOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [activeMedicalAnimalId, setActiveMedicalAnimalId] = useState<string>('');

  // Safeguard: Ensure role and tab state remain fully consistent
  React.useEffect(() => {
    if (role === 'public' && (currentTab === 'management' || currentTab === 'my-hub')) {
      setCurrentTab('adopt');
    } else if (role === 'user' && currentTab === 'management') {
      setCurrentTab('my-hub');
    }
  }, [role, currentTab]);

  const handleOpenAdoptionForm = (pet: Animal) => {
    setSelectedPetForAdoption(pet);
    setAdoptionModalOpen(true);
  };

  const handleOpenMedicalPortalForPet = (pet: Animal) => {
    setActiveMedicalAnimalId(pet.id);
    setCurrentTab('medical');
  };

  const handleOpenEditAnimal = (animal: Animal) => {
    setEditingAnimal(animal);
    setIntakeModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 font-sans">
      {/* Interactive Quick Account Selector Ribbon */}
      <aside aria-label="Interactive demo role switcher" className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-emerald-300">Front Street Portal Account:</span>
            <span className="text-neutral-400 hidden sm:inline">Switch perspectives to test user stories:</span>
          </div>

          <div className="flex items-center gap-1.5 p-0.5 bg-emerald-900/60 rounded-lg">
            <button
              onClick={() => {
                setRole('public');
                setCurrentTab('adopt');
              }}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                role === 'public'
                  ? 'bg-white text-emerald-950 shadow-xs'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>1. Public Account</span>
            </button>

            <button
              onClick={() => {
                setRole('user');
                setCurrentTab('my-hub');
              }}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                role === 'user'
                  ? 'bg-white text-emerald-950 shadow-xs'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5 text-emerald-700" />
              <span>2. Registered User ({currentUser.name.split(' ')[0]})</span>
            </button>

            <button
              onClick={() => {
                setRole('admin');
                setCurrentTab('management');
              }}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                role === 'admin'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-xs'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-900" />
              <span>3. Admin / Staff & Vet</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Top Navigation conforming to Top Bar Contract */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenIntakeModal={() => {
          setEditingAnimal(null);
          setIntakeModalOpen(true);
        }}
        onOpenDonationModal={() => {
          setCurrentTab('volunteer-donate');
          setDonationModalOpen(true);
        }}
      />

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8">
        {currentTab === 'adopt' && (
          <AdoptableCatalog
            onSelectPet={(pet) => setSelectedPetForDetail(pet)}
            onApplyForPet={(pet) => handleOpenAdoptionForm(pet)}
          />
        )}

        {currentTab === 'medical' && (
          <MedicalCarePortal initialAnimalId={activeMedicalAnimalId} />
        )}

        {currentTab === 'lostfound' && (
          <LostAndFoundHub />
        )}

        {currentTab === 'foster' && (
          <FosterCareHub />
        )}

        {currentTab === 'volunteer-donate' && (
          <VolunteerDonationsHub initialOpenDonation={donationModalOpen} />
        )}

        {currentTab === 'management' && (
          <ShelterDashboard
            onEditAnimal={handleOpenEditAnimal}
            onOpenIntake={() => {
              setEditingAnimal(null);
              setIntakeModalOpen(true);
            }}
            onOpenMedical={handleOpenMedicalPortalForPet}
          />
        )}

        {currentTab === 'my-hub' && (
          <UserPortal
            onBrowseAdoptable={() => setCurrentTab('adopt')}
            onOpenDonate={() => {
              setCurrentTab('volunteer-donate');
              setDonationModalOpen(true);
            }}
            onOpenLostReport={() => setCurrentTab('lostfound')}
          />
        )}
      </main>

      {/* Global Interactive Modals */}
      {selectedPetForDetail && (
        <PetDetailModal
          pet={selectedPetForDetail}
          onClose={() => setSelectedPetForDetail(null)}
          onApply={(pet) => handleOpenAdoptionForm(pet)}
          onOpenMedical={(pet) => handleOpenMedicalPortalForPet(pet)}
          onMarkAdopted={(pet) => {
            setCurrentTab('management');
          }}
        />
      )}

      {adoptionModalOpen && (
        <AdoptionApplicationModal
          initialPet={selectedPetForAdoption}
          onClose={() => setAdoptionModalOpen(false)}
          onSuccess={(appId) => {
            setAdoptionModalOpen(false);
            if (role === 'user') {
              setCurrentTab('my-hub');
            }
          }}
        />
      )}

      {intakeModalOpen && (
        <IntakeRegistrationModal
          existingAnimal={editingAnimal}
          onClose={() => {
            setIntakeModalOpen(false);
            setEditingAnimal(null);
          }}
          onSuccess={(animal) => {
            setIntakeModalOpen(false);
            setEditingAnimal(null);
            setSelectedPetForDetail(animal);
          }}
        />
      )}

      {/* Floating Notifications */}
      <ToastContainer />

      {/* Institutional Footer */}
      <Footer onTabChange={(tab) => setCurrentTab(tab)} />
    </div>
  );
}

export default function App() {
  return (
    <ShelterProvider>
      <ShelterAppContent />
    </ShelterProvider>
  );
}
