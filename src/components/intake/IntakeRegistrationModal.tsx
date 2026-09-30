import React, { useState } from 'react';
import { useShelter } from '../../context/ShelterContext';
import { Animal, Species, Sex, AgeGroup, AnimalSize, IntakeType, SpayNeuterStatus } from '../../types/shelter';
import { X, PawPrint, Camera, MapPin, Calendar, ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface IntakeRegistrationModalProps {
  existingAnimal?: Animal | null;
  onClose: () => void;
  onSuccess: (animal: Animal) => void;
}

const SAMPLE_PHOTO_PRESETS = [
  { label: 'Golden Mix Dog', url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80' },
  { label: 'Shepherd Dog', url: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=800&q=80' },
  { label: 'Pit / Boxer Dog', url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80' },
  { label: 'Calico Cat', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80' },
  { label: 'Tuxedo Cat', url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80' },
  { label: 'Siamese Kitten', url: 'https://images.unsplash.com/photo-1513360309081-38f076278f1e?auto=format&fit=crop&w=800&q=80' },
  { label: 'Lop Rabbit', url: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=800&q=80' }
];

export const IntakeRegistrationModal: React.FC<IntakeRegistrationModalProps> = ({
  existingAnimal,
  onClose,
  onSuccess
}) => {
  const { getNextAnimalId, addAnimal, updateAnimal } = useShelter();
  const isEditing = !!existingAnimal;

  // Form State
  const [customId, setCustomId] = useState(existingAnimal?.id || getNextAnimalId());
  const [name, setName] = useState(existingAnimal?.name || '');
  const [species, setSpecies] = useState<Species>(existingAnimal?.species || 'Dog');
  const [breed, setBreed] = useState(existingAnimal?.breed || 'Labrador Retriever Mix');
  const [ageYears, setAgeYears] = useState(existingAnimal?.ageYears ?? 2);
  const [ageMonths, setAgeMonths] = useState(existingAnimal?.ageMonths ?? 0);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(existingAnimal?.ageGroup || 'Young');
  const [sex, setSex] = useState<Sex>(existingAnimal?.sex || 'Male');
  const [color, setColor] = useState(existingAnimal?.color || 'Tan & White');
  const [size, setSize] = useState<AnimalSize>(existingAnimal?.size || 'Medium (20-50 lbs)');
  const [weightLbs, setWeightLbs] = useState(existingAnimal?.weightLbs ?? 42);
  const [microchipId, setMicrochipId] = useState(existingAnimal?.microchipId || '');
  const [photoUrl, setPhotoUrl] = useState(existingAnimal?.photoUrl || SAMPLE_PHOTO_PRESETS[0].url);
  
  // Intake details
  const [intakeType, setIntakeType] = useState<IntakeType>(existingAnimal?.intakeType || 'Stray / Found');
  const [intakeDate, setIntakeDate] = useState(existingAnimal?.intakeDate || new Date().toISOString().slice(0, 10));
  const [intakeLocation, setIntakeLocation] = useState(existingAnimal?.intakeLocation || 'East Sacramento, CA');
  const [intakeNotes, setIntakeNotes] = useState(existingAnimal?.intakeNotes || 'Intake officer received animal in good body condition.');
  const [locationInShelter, setLocationInShelter] = useState(existingAnimal?.locationInShelter || 'Dog Run A-15');
  
  // Medical & Alter status
  const [spayNeuterStatus, setSpayNeuterStatus] = useState<SpayNeuterStatus>(existingAnimal?.spayNeuterStatus || 'Scheduled');
  const [medicallyCleared, setMedicallyCleared] = useState(existingAnimal?.medicallyCleared ?? false);

  // Behavior notes
  const [goodWithDogs, setGoodWithDogs] = useState(existingAnimal?.behavior.goodWithDogs || 'Yes');
  const [goodWithCats, setGoodWithCats] = useState(existingAnimal?.behavior.goodWithCats || 'Unknown');
  const [goodWithKids, setGoodWithKids] = useState(existingAnimal?.behavior.goodWithKids || 'Yes');
  const [energyLevel, setEnergyLevel] = useState(existingAnimal?.behavior.energyLevel || 'Moderate');
  const [houseTrained, setHouseTrained] = useState(existingAnimal?.behavior.houseTrained || 'Yes');
  const [summaryNotes, setSummaryNotes] = useState(existingAnimal?.behavior.summaryNotes || 'Very friendly, greets people with soft tail wags, enjoys gentle play and scratches.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing && existingAnimal) {
      updateAnimal(existingAnimal.id, {
        name,
        species,
        breed,
        ageYears,
        ageMonths,
        ageGroup,
        sex,
        color,
        size,
        weightLbs,
        microchipId: microchipId.trim() || undefined,
        photoUrl,
        intakeType,
        intakeDate,
        intakeLocation,
        intakeNotes,
        locationInShelter,
        spayNeuterStatus,
        medicallyCleared,
        behavior: {
          goodWithDogs,
          goodWithCats,
          goodWithKids,
          energyLevel,
          houseTrained,
          summaryNotes
        }
      });
      onSuccess({
        ...existingAnimal,
        name,
        species,
        breed,
        ageYears,
        ageMonths,
        ageGroup,
        sex,
        color,
        size,
        weightLbs,
        microchipId,
        photoUrl,
        intakeType,
        intakeDate,
        intakeLocation,
        intakeNotes,
        locationInShelter,
        spayNeuterStatus,
        medicallyCleared,
        behavior: {
          goodWithDogs,
          goodWithCats,
          goodWithKids,
          energyLevel,
          houseTrained,
          summaryNotes
        }
      });
    } else {
      const created = addAnimal({
        customId,
        name,
        species,
        breed,
        ageYears,
        ageMonths,
        ageGroup,
        sex,
        color,
        size,
        weightLbs,
        microchipId: microchipId.trim() || undefined,
        photoUrl,
        intakeType,
        intakeDate,
        intakeLocation,
        intakeNotes,
        status: medicallyCleared ? 'Available for Adoption' : 'Medical Hold / Recovery',
        locationInShelter,
        medicallyCleared,
        spayNeuterStatus,
        behavior: {
          goodWithDogs,
          goodWithCats,
          goodWithKids,
          energyLevel,
          houseTrained,
          summaryNotes
        },
        medicalExams: [],
        vaccinations: [],
        medications: [],
        conditions: [],
        appointments: [],
        fosterPlacements: []
      });
      onSuccess(created);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-neutral-200 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50/70">
          <div>
            <h2 className="text-xl font-bold font-display text-neutral-950 flex items-center gap-2">
              <PawPrint className="w-5 h-5 text-emerald-800" />
              {isEditing ? `Update Animal Record: ${existingAnimal?.id}` : 'Front Street Animal Intake Registration'}
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Unique ID generation, physical profile, intake origin, and behavior notes
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 text-xs">
          {/* Section 1: Unique Shelter ID & Core Identity */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                1. Shelter Tracking ID & Basic Identity
              </h3>
              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setCustomId(getNextAnimalId())}
                  className="text-emerald-700 hover:text-emerald-900 font-medium"
                >
                  Generate Sequential ID
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  Unique Animal ID *
                </label>
                <input
                  type="text"
                  required
                  value={customId}
                  onChange={e => setCustomId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 font-mono font-bold text-neutral-900 bg-neutral-50 focus:bg-white"
                  placeholder="e.g. FSAS-2026-0111"
                  readOnly={isEditing}
                />
                <span className="text-[10px] text-neutral-400 mt-0.5 block">
                  Official Sacramento tracking format: FSAS-YYYY-XXXX
                </span>
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  Animal Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-neutral-900 font-semibold"
                  placeholder="e.g. Barnaby"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  Species *
                </label>
                <select
                  value={species}
                  onChange={e => setSpecies(e.target.value as Species)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white"
                >
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Rabbit">Rabbit</option>
                  <option value="Other">Other Small Animal</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  Primary Breed *
                </label>
                <input
                  type="text"
                  required
                  value={breed}
                  onChange={e => setBreed(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  placeholder="e.g. Labrador Retriever Mix"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  Color / Coat Pattern *
                </label>
                <input
                  type="text"
                  required
                  value={color}
                  onChange={e => setColor(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  placeholder="e.g. Honey Gold, Brindle, Calico"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  Microchip Number (if scanned)
                </label>
                <input
                  type="text"
                  value={microchipId}
                  onChange={e => setMicrochipId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 font-mono"
                  placeholder="e.g. 985141004128911"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Sex</label>
                <select
                  value={sex}
                  onChange={e => setSex(e.target.value as Sex)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Unknown">Unknown</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">Age (Years & Mos)</label>
                <div className="flex gap-1.5">
                  <input
                    type="number"
                    min="0"
                    max="25"
                    value={ageYears}
                    onChange={e => setAgeYears(parseInt(e.target.value, 10) || 0)}
                    className="w-1/2 px-2 py-2 rounded-lg border border-neutral-300 text-center"
                    placeholder="Yrs"
                  />
                  <input
                    type="number"
                    min="0"
                    max="11"
                    value={ageMonths}
                    onChange={e => setAgeMonths(parseInt(e.target.value, 10) || 0)}
                    className="w-1/2 px-2 py-2 rounded-lg border border-neutral-300 text-center"
                    placeholder="Mos"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">Age Category</label>
                <select
                  value={ageGroup}
                  onChange={e => setAgeGroup(e.target.value as AgeGroup)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white"
                >
                  <option value="Puppy / Kitten">Puppy / Kitten (&lt;1y)</option>
                  <option value="Young">Young (1-3y)</option>
                  <option value="Adult">Adult (3-7y)</option>
                  <option value="Senior">Senior (7y+)</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">Weight (lbs)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  max="250"
                  value={weightLbs}
                  onChange={e => setWeightLbs(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Photo Selection / Upload */}
          <div className="space-y-3 pt-3 border-t border-neutral-200">
            <h3 className="font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-emerald-700" />
              2. Animal Photograph
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-300 shrink-0">
                <img
                  src={photoUrl}
                  alt="Preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 w-full space-y-2">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Photo URL</label>
                  <input
                    type="url"
                    required
                    value={photoUrl}
                    onChange={e => setPhotoUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                    placeholder="Paste image URL..."
                  />
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[11px] text-neutral-500 self-center mr-1">Or choose preset:</span>
                  {SAMPLE_PHOTO_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPhotoUrl(preset.url)}
                      className="text-[10px] px-2 py-0.5 rounded border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Intake History & Shelter Location */}
          <div className="space-y-3 pt-3 border-t border-neutral-200">
            <h3 className="font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-700" />
              3. Intake History & Shelter Location
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  How Animal Arrived (Intake Type) *
                </label>
                <select
                  value={intakeType}
                  onChange={e => setIntakeType(e.target.value as IntakeType)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white"
                >
                  <option value="Stray / Found">Stray / Found by Resident</option>
                  <option value="Owner Surrender">Owner Surrender</option>
                  <option value="Field Confiscation">Animal Control Officer Confiscation</option>
                  <option value="Shelter Transfer">Shelter Transfer / Rescue Partner</option>
                  <option value="Born in Foster">Born in Foster Care</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  Intake Date *
                </label>
                <input
                  type="date"
                  required
                  value={intakeDate}
                  onChange={e => setIntakeDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  Shelter Location / Kennel Assignment *
                </label>
                <input
                  type="text"
                  required
                  value={locationInShelter}
                  onChange={e => setLocationInShelter(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  placeholder="e.g. Dog Run B-12, Cattery C-02"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-neutral-700 mb-1">
                Intake Origin (Sacramento Location or Cross Streets) *
              </label>
              <input
                type="text"
                required
                value={intakeLocation}
                onChange={e => setIntakeLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                placeholder="e.g. Midtown 24th & J St, McKinley Park, Florin Rd"
              />
            </div>

            <div>
              <label className="block font-medium text-neutral-700 mb-1">
                Intake Officer Notes & Background
              </label>
              <textarea
                rows={2}
                value={intakeNotes}
                onChange={e => setIntakeNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                placeholder="Circumstances of arrival, surrender reasons, finder statements..."
              />
            </div>
          </div>

          {/* Section 4: Behavior & Personality Profile */}
          <div className="space-y-3 pt-3 border-t border-neutral-200">
            <h3 className="font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-emerald-700" />
              4. Behavior & Temperament Notes
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              <div>
                <label className="block font-medium text-neutral-600 mb-1">Good with Dogs</label>
                <select
                  value={goodWithDogs}
                  onChange={e => setGoodWithDogs(e.target.value as any)}
                  className="w-full px-2 py-1.5 rounded-lg border border-neutral-300 bg-white"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Needs Slow Intro">Needs Slow Intro</option>
                  <option value="Unknown">Unknown</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-neutral-600 mb-1">Good with Cats</label>
                <select
                  value={goodWithCats}
                  onChange={e => setGoodWithCats(e.target.value as any)}
                  className="w-full px-2 py-1.5 rounded-lg border border-neutral-300 bg-white"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Needs Slow Intro">Needs Slow Intro</option>
                  <option value="Unknown">Unknown</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-neutral-600 mb-1">Good with Kids</label>
                <select
                  value={goodWithKids}
                  onChange={e => setGoodWithKids(e.target.value as any)}
                  className="w-full px-2 py-1.5 rounded-lg border border-neutral-300 bg-white"
                >
                  <option value="Yes">Yes</option>
                  <option value="Older Kids Only">Older Kids Only</option>
                  <option value="No">No</option>
                  <option value="Unknown">Unknown</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-neutral-600 mb-1">Energy Level</label>
                <select
                  value={energyLevel}
                  onChange={e => setEnergyLevel(e.target.value as any)}
                  className="w-full px-2 py-1.5 rounded-lg border border-neutral-300 bg-white"
                >
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                  <option value="Very High">Very High</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-neutral-600 mb-1">House Trained</label>
                <select
                  value={houseTrained}
                  onChange={e => setHouseTrained(e.target.value as any)}
                  className="w-full px-2 py-1.5 rounded-lg border border-neutral-300 bg-white"
                >
                  <option value="Yes">Yes</option>
                  <option value="Partially">Partially</option>
                  <option value="No">No</option>
                  <option value="Unknown">Unknown</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-medium text-neutral-700 mb-1">
                Detailed Behavior Summary & Adopter Guidance *
              </label>
              <textarea
                rows={2}
                required
                value={summaryNotes}
                onChange={e => setSummaryNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                placeholder="Personality traits, play style, leash manners, handling notes..."
              />
            </div>
          </div>

          {/* Section 5: Medical Alteration & Clearance */}
          <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-neutral-700 mb-1">
                Spay / Neuter Status
              </label>
              <select
                value={spayNeuterStatus}
                onChange={e => setSpayNeuterStatus(e.target.value as SpayNeuterStatus)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white"
              >
                <option value="Neutered">Neutered Male</option>
                <option value="Spayed">Spayed Female</option>
                <option value="Intact">Intact</option>
                <option value="Scheduled">Surgery Scheduled</option>
              </select>
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 cursor-pointer py-2">
                <input
                  type="checkbox"
                  checked={medicallyCleared}
                  onChange={e => setMedicallyCleared(e.target.checked)}
                  className="w-4 h-4 text-emerald-700 rounded border-neutral-300"
                />
                <span className="font-semibold text-neutral-800">
                  Animal is Medically Cleared for Adoption
                </span>
              </label>
              <span className="text-[11px] text-neutral-500">
                If unchecked, animal will be listed under Medical Hold / Recovery until cleared by vet.
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              {isEditing ? 'Save Changes' : 'Register Animal & Save Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
