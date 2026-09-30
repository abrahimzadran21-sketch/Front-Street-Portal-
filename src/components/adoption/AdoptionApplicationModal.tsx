import React, { useState } from 'react';
import { Animal } from '../../types/shelter';
import { useShelter } from '../../context/ShelterContext';
import { X, CheckCircle, Heart, PawPrint } from 'lucide-react';

interface AdoptionApplicationModalProps {
  initialPet?: Animal | null;
  onClose: () => void;
  onSuccess: (applicationId: string) => void;
}

export const AdoptionApplicationModal: React.FC<AdoptionApplicationModalProps> = ({
  initialPet,
  onClose,
  onSuccess
}) => {
  const { animals, currentUser, submitAdoptionApplication } = useShelter();

  const availablePets = animals.filter(a => 
    a.status === 'Available for Adoption' || a.status === 'In Foster Care'
  );

  const [selectedPetId, setSelectedPetId] = useState<string>(
    initialPet ? initialPet.id : (availablePets[0]?.id || '')
  );

  const [applicantName, setApplicantName] = useState(currentUser.name);
  const [applicantEmail, setApplicantEmail] = useState(currentUser.email);
  const [applicantPhone, setApplicantPhone] = useState(currentUser.phone);
  const [applicantAddress, setApplicantAddress] = useState('312 24th St, Sacramento, CA 95816');
  const [housingType, setHousingType] = useState<'Own Home' | 'Rent Apartment' | 'Rent House' | 'Condo / Townhouse'>('Rent House');
  const [landlordApproval, setLandlordApproval] = useState(true);
  const [hasFencedYard, setHasFencedYard] = useState(true);
  const [householdAdults, setHouseholdAdults] = useState(2);
  const [householdChildren, setHouseholdChildren] = useState(0);
  const [existingPets, setExistingPets] = useState('1 senior cat (indoor only, current on vaccines)');
  const [petCarePlan, setPetCarePlan] = useState('Work hybrid schedule with daily walks around Capitol Park, enroll in basic obedience training, and provide lots of enrichment.');

  const selectedAnimal = animals.find(a => a.id === selectedPetId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAnimal) return;

    const newApp = submitAdoptionApplication({
      petId: selectedAnimal.id,
      petName: selectedAnimal.name,
      petSpecies: selectedAnimal.species,
      petPhotoUrl: selectedAnimal.photoUrl,
      applicantName,
      applicantEmail,
      applicantPhone,
      applicantAddress,
      housingType,
      landlordApproval: housingType.includes('Rent') ? landlordApproval : true,
      hasFencedYard,
      householdAdults,
      householdChildren,
      existingPets,
      petCarePlan
    });

    onSuccess(newApp.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-neutral-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50/50">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-emerald-700" />
            <div>
              <h2 className="text-xl font-bold font-display text-neutral-950">
                Front Street Adoption Application
              </h2>
              <p className="text-xs text-neutral-500">
                Official adoption intake form for Sacramento shelter animals
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {/* Selected Animal Selection Box */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 flex items-center gap-4">
            {selectedAnimal ? (
              <>
                <img
                  src={selectedAnimal.photoUrl}
                  alt={selectedAnimal.name}
                  className="w-16 h-16 rounded-lg object-cover border border-emerald-300"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                    Selected Pet for Adoption
                  </div>
                  <div className="text-lg font-bold text-neutral-900 truncate">
                    {selectedAnimal.name}
                  </div>
                  <div className="text-xs text-neutral-600">
                    {selectedAnimal.id} · {selectedAnimal.species} · {selectedAnimal.breed}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-sm text-neutral-500">No pet selected</div>
            )}

            {/* Change pet dropdown */}
            <div className="shrink-0">
              <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                Change Animal:
              </label>
              <select
                value={selectedPetId}
                onChange={e => setSelectedPetId(e.target.value)}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-neutral-300 bg-white focus:outline-none focus:border-emerald-600"
              >
                {availablePets.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.id}) - {p.breed}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 1: Applicant Details */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
              1. Applicant Contact Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={e => setApplicantName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={applicantEmail}
                  onChange={e => setApplicantEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={applicantPhone}
                  onChange={e => setApplicantPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">Street Address (Sacramento Area) *</label>
                <input
                  type="text"
                  required
                  value={applicantAddress}
                  onChange={e => setApplicantAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Home Environment */}
          <div className="space-y-3 pt-2 border-t border-neutral-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
              2. Living Environment & Household
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">Housing Type</label>
                <select
                  value={housingType}
                  onChange={e => setHousingType(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 bg-white"
                >
                  <option value="Own Home">Own Single Family Home</option>
                  <option value="Rent House">Rent Single Family House</option>
                  <option value="Rent Apartment">Rent Apartment</option>
                  <option value="Condo / Townhouse">Condominium / Townhouse</option>
                </select>
              </div>

              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-2 cursor-pointer py-2">
                  <input
                    type="checkbox"
                    checked={hasFencedYard}
                    onChange={e => setHasFencedYard(e.target.checked)}
                    className="w-4 h-4 text-emerald-700 rounded border-neutral-300"
                  />
                  <span className="text-xs text-neutral-700">Has Fully Fenced Yard</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">Adults in Household</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={householdAdults}
                  onChange={e => setHouseholdAdults(parseInt(e.target.value, 10) || 1)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">Children Under 18</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={householdChildren}
                  onChange={e => setHouseholdChildren(parseInt(e.target.value, 10) || 0)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300"
                />
              </div>
            </div>

            {housingType.includes('Rent') && (
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={landlordApproval}
                    onChange={e => setLandlordApproval(e.target.checked)}
                    className="w-4 h-4 text-emerald-700 rounded border-neutral-300"
                  />
                  <span className="text-xs text-neutral-700">
                    I have verified landlord / lease approval allowing pets on the premises.
                  </span>
                </label>
              </div>
            )}
          </div>

          {/* Section 3: Pet Experience & Care Plan */}
          <div className="space-y-3 pt-2 border-t border-neutral-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
              3. Current Pets & Pet Care Plan
            </h3>

            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Other Animals Currently in Home (Species, Age, Altered status):
              </label>
              <input
                type="text"
                value={existingPets}
                onChange={e => setExistingPets(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300"
                placeholder="e.g., None, or 1 neutered dog age 4"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Daily Care, Exercise & Supervision Plan:
              </label>
              <textarea
                rows={3}
                required
                value={petCarePlan}
                onChange={e => setPetCarePlan(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300"
                placeholder="Describe daily routine, exercise schedule, and where the animal will stay when you are away..."
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Submit Official Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
