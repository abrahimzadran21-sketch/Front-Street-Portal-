import React from 'react';
import { Animal } from '../../types/shelter';
import { useShelter } from '../../context/ShelterContext';
import { 
  X, 
  CheckCircle, 
  AlertCircle, 
  Calendar, 
  MapPin, 
  Activity, 
  Heart, 
  ShieldCheck, 
  Clock, 
  Info,
  Stethoscope,
  Share2
} from 'lucide-react';

interface PetDetailModalProps {
  pet: Animal;
  onClose: () => void;
  onApply: (pet: Animal) => void;
  onOpenMedical?: (pet: Animal) => void;
  onMarkAdopted?: (pet: Animal) => void;
}

export const PetDetailModal: React.FC<PetDetailModalProps> = ({
  pet,
  onClose,
  onApply,
  onOpenMedical,
  onMarkAdopted
}) => {
  const { role, showToast } = useShelter();

  const calculateStayDays = (intakeDate: string): number => {
    const intake = new Date(intakeDate).getTime();
    const today = new Date().getTime();
    return Math.max(0, Math.floor((today - intake) / (1000 * 60 * 60 * 24)));
  };

  const stayDays = calculateStayDays(pet.intakeDate);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast(`Link to ${pet.name}'s profile copied to clipboard!`, 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-neutral-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50/50">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold font-display text-neutral-950">
                {pet.name}
              </h2>
              <span className="text-xs font-mono font-medium text-neutral-500 tabular-nums bg-neutral-200/80 px-2 py-0.5 rounded">
                {pet.id}
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              {pet.species} · {pet.breed} · Location: {pet.locationInShelter}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 rounded-lg transition-colors"
              title="Share pet profile"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Photo & Key Vital Badges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
              <img
                src={pet.photoUrl}
                alt={pet.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-neutral-900/80 text-white text-xs px-2.5 py-1 rounded-md">
                Status: {pet.status}
              </div>
            </div>

            {/* Quick Vital Stats list */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200">
                  <div className="text-neutral-500 font-medium">Age & Sex</div>
                  <div className="text-neutral-900 font-semibold mt-0.5">
                    {pet.ageYears}y {pet.ageMonths}m · {pet.sex}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200">
                  <div className="text-neutral-500 font-medium">Size & Weight</div>
                  <div className="text-neutral-900 font-semibold mt-0.5">
                    {pet.size.split(' ')[0]} · {pet.weightLbs} lbs
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200">
                  <div className="text-neutral-500 font-medium">Spay / Neuter</div>
                  <div className="text-neutral-900 font-semibold mt-0.5">
                    {pet.spayNeuterStatus}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200">
                  <div className="text-neutral-500 font-medium">Adoption Clearance</div>
                  <div className="mt-0.5 font-semibold">
                    {pet.medicallyCleared ? (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Cleared
                      </span>
                    ) : (
                      <span className="text-amber-700 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Under Care
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Intake summary */}
              <div className="p-3.5 rounded-lg border border-neutral-200 text-xs space-y-1.5 bg-neutral-50/50">
                <div className="flex items-center justify-between text-neutral-600">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    Intake Date: <strong className="text-neutral-800">{pet.intakeDate}</strong>
                  </span>
                  <span className="tabular-nums font-medium text-emerald-800">
                    Stay: {stayDays} days in shelter
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-600">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span className="truncate">Sacramento Intake: {pet.intakeLocation}</span>
                </div>
                {pet.microchipId && (
                  <div className="flex items-center gap-1.5 text-neutral-600">
                    <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Microchip ID: <strong className="font-mono">{pet.microchipId}</strong></span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Behavior and Personality section */}
          <div className="space-y-3 pt-2 border-t border-neutral-200">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-2">
              <Heart className="w-4 h-4 text-emerald-700" />
              Behavior & Compatibility
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200">
                <span className="text-neutral-500 block">Dogs</span>
                <span className="font-semibold text-neutral-900 mt-0.5 block">{pet.behavior.goodWithDogs}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200">
                <span className="text-neutral-500 block">Cats</span>
                <span className="font-semibold text-neutral-900 mt-0.5 block">{pet.behavior.goodWithCats}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200">
                <span className="text-neutral-500 block">Children</span>
                <span className="font-semibold text-neutral-900 mt-0.5 block">{pet.behavior.goodWithKids}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200">
                <span className="text-neutral-500 block">Energy Level</span>
                <span className="font-semibold text-neutral-900 mt-0.5 block">{pet.behavior.energyLevel}</span>
              </div>
            </div>

            <p className="text-sm text-neutral-700 leading-relaxed bg-neutral-50 p-4 rounded-xl border border-neutral-200">
              "{pet.behavior.summaryNotes}"
            </p>
          </div>

          {/* Medical Snapshot */}
          <div className="space-y-3 pt-2 border-t border-neutral-200">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-emerald-700" />
              Veterinary Care Summary
            </h3>

            {/* Core Vaccines logged */}
            <div className="text-xs space-y-1.5">
              <span className="font-medium text-neutral-600">Core Vaccinations Administered:</span>
              <div className="flex flex-wrap gap-2">
                {pet.vaccinations && pet.vaccinations.length > 0 ? (
                  pet.vaccinations.map(vax => (
                    <div key={vax.id} className="text-neutral-700 bg-neutral-100 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{vax.vaccineName} (Exp: {vax.expirationDate})</span>
                    </div>
                  ))
                ) : (
                  <span className="text-neutral-400 italic">No vaccines logged yet</span>
                )}
              </div>
            </div>

            {/* Active treatments if any */}
            {pet.medications && pet.medications.length > 0 && (
              <div className="text-xs p-3 rounded-lg bg-amber-50 border border-amber-200 space-y-1">
                <div className="font-semibold text-amber-900">Current Treatment / Medication:</div>
                {pet.medications.map(med => (
                  <div key={med.id} className="text-amber-800">
                    • <strong>{med.medicationName}</strong>: {med.dosage} ({med.frequency}) until {med.endDate}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-neutral-200 bg-neutral-50 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-neutral-500">
            Front Street Adoption Fee includes spay/neuter, vaccinations, microchip & free vet exam voucher.
          </div>

          <div className="flex items-center gap-2">
            {role === 'admin' && onOpenMedical && (
              <button
                onClick={() => {
                  onClose();
                  onOpenMedical(pet);
                }}
                className="px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
              >
                Open Medical Chart
              </button>
            )}

            {role === 'admin' && pet.status !== 'Adopted' && onMarkAdopted && (
              <button
                onClick={() => {
                  onClose();
                  onMarkAdopted(pet);
                }}
                className="px-3.5 py-2 text-xs font-semibold text-amber-800 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors cursor-pointer"
              >
                Mark as Adopted
              </button>
            )}

            <button
              onClick={() => {
                onClose();
                onApply(pet);
              }}
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Submit Adoption Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
