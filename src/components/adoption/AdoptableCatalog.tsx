import React, { useState, useMemo } from 'react';
import { useShelter } from '../../context/ShelterContext';
import { Animal, Species, AgeGroup, AnimalSize, Sex } from '../../types/shelter';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Heart, 
  CheckCircle, 
  AlertCircle, 
  Calendar, 
  Clock, 
  PawPrint,
  SlidersHorizontal,
  X
} from 'lucide-react';

interface AdoptableCatalogProps {
  onSelectPet: (pet: Animal) => void;
  onApplyForPet: (pet: Animal) => void;
}

export const AdoptableCatalog: React.FC<AdoptableCatalogProps> = ({
  onSelectPet,
  onApplyForPet
}) => {
  const { animals, role } = useShelter();

  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<Species | 'All'>('All');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup | 'All'>('All');
  const [selectedSex, setSelectedSex] = useState<Sex | 'All'>('All');
  const [selectedSize, setSelectedSize] = useState<AnimalSize | 'All'>('All');
  const [selectedBreed, setSelectedBreed] = useState<string>('All');
  const [onlyCleared, setOnlyCleared] = useState(false);
  const [includeFoster, setIncludeFoster] = useState(true);

  // Available unique breeds based on current animals
  const availableBreeds = useMemo(() => {
    const breeds = new Set<string>();
    animals.forEach(a => {
      if (selectedSpecies === 'All' || a.species === selectedSpecies) {
        breeds.add(a.breed);
      }
    });
    return Array.from(breeds).sort();
  }, [animals, selectedSpecies]);

  // Filtered animals
  const filteredAnimals = useMemo(() => {
    return animals.filter(animal => {
      // Status filter: Public mainly looks at Available and Foster animals
      const isAdoptable = animal.status === 'Available for Adoption' || 
        (includeFoster && animal.status === 'In Foster Care');

      if (!isAdoptable && role !== 'admin') {
        return false;
      }

      // Search by Name or unique ID
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = animal.name.toLowerCase().includes(query);
        const matchesId = animal.id.toLowerCase().includes(query);
        const matchesBreed = animal.breed.toLowerCase().includes(query);
        const matchesColor = animal.color.toLowerCase().includes(query);
        if (!matchesName && !matchesId && !matchesBreed && !matchesColor) {
          return false;
        }
      }

      // Species
      if (selectedSpecies !== 'All' && animal.species !== selectedSpecies) {
        return false;
      }

      // Age Group
      if (selectedAgeGroup !== 'All' && animal.ageGroup !== selectedAgeGroup) {
        return false;
      }

      // Sex
      if (selectedSex !== 'All' && animal.sex !== selectedSex) {
        return false;
      }

      // Size
      if (selectedSize !== 'All' && animal.size !== selectedSize) {
        return false;
      }

      // Breed
      if (selectedBreed !== 'All' && animal.breed !== selectedBreed) {
        return false;
      }

      // Medically Cleared
      if (onlyCleared && !animal.medicallyCleared) {
        return false;
      }

      return true;
    });
  }, [
    animals, 
    role, 
    searchTerm, 
    selectedSpecies, 
    selectedAgeGroup, 
    selectedSex, 
    selectedSize, 
    selectedBreed, 
    onlyCleared, 
    includeFoster
  ]);

  // Calculate length of stay from intake date
  const calculateStayDays = (intakeDate: string): number => {
    const intake = new Date(intakeDate).getTime();
    const today = new Date().getTime();
    const diff = Math.max(0, Math.floor((today - intake) / (1000 * 60 * 60 * 24)));
    return diff;
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedSpecies('All');
    setSelectedAgeGroup('All');
    setSelectedSex('All');
    setSelectedSize('All');
    setSelectedBreed('All');
    setOnlyCleared(false);
  };

  const hasActiveFilters = searchTerm !== '' || 
    selectedSpecies !== 'All' || 
    selectedAgeGroup !== 'All' || 
    selectedSex !== 'All' || 
    selectedSize !== 'All' || 
    selectedBreed !== 'All' || 
    onlyCleared;

  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-neutral-900 text-white p-6 sm:p-8 md:p-12 shadow-md">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Sacramento Pet Adoption Program
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight leading-tight text-white">
            Find your lifelong companion in Sacramento.
          </h1>
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-2xl">
            Every pet at Front Street Animal Shelter receives complete veterinary care, core vaccinations, microchip registration, and spay or neuter surgery before heading home.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-neutral-400">
            <span>2127 Front Street, Sacramento</span>
            <span aria-hidden="true">·</span>
            <span>Adoptions Open Daily 12 PM - 5 PM</span>
            <span aria-hidden="true">·</span>
            <span>Same-Day Meets Available</span>
          </div>
        </div>
        {/* Subtle decorative background gradient */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Filter and Search Bar Controls (Interactive segmented controls & search input) */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-6 shadow-sm space-y-5">
        {/* Search Input and Species Tabs */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by Pet Name, Unique ID (e.g. FSAS-2026-0101), or Breed..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-neutral-300 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Interactive Species Selector Tabs (Functional Buttons) */}
          <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg overflow-x-auto">
            {(['All', 'Dog', 'Cat', 'Rabbit', 'Other'] as const).map(sp => (
              <button
                key={sp}
                onClick={() => setSelectedSpecies(sp)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  selectedSpecies === sp
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {sp === 'All' ? 'All Species' : sp + 's'}
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Secondary Filters: Age, Breed, Sex, Size, Medical Clearance */}
        <div className="pt-2 border-t border-neutral-100 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* Age Filter */}
          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1">Age</label>
            <select
              value={selectedAgeGroup}
              onChange={e => setSelectedAgeGroup(e.target.value as AgeGroup | 'All')}
              className="w-full px-2.5 py-1.5 text-xs rounded-md border border-neutral-300 bg-white focus:outline-none focus:border-emerald-600"
            >
              <option value="All">All Ages</option>
              <option value="Puppy / Kitten">Puppy / Kitten (&lt; 1 yr)</option>
              <option value="Young">Young (1-3 yrs)</option>
              <option value="Adult">Adult (3-7 yrs)</option>
              <option value="Senior">Senior (7+ yrs)</option>
            </select>
          </div>

          {/* Breed Filter */}
          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1">Breed</label>
            <select
              value={selectedBreed}
              onChange={e => setSelectedBreed(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-md border border-neutral-300 bg-white focus:outline-none focus:border-emerald-600 truncate"
            >
              <option value="All">All Breeds</option>
              {availableBreeds.map(breed => (
                <option key={breed} value={breed}>{breed}</option>
              ))}
            </select>
          </div>

          {/* Sex Filter */}
          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1">Sex</label>
            <select
              value={selectedSex}
              onChange={e => setSelectedSex(e.target.value as Sex | 'All')}
              className="w-full px-2.5 py-1.5 text-xs rounded-md border border-neutral-300 bg-white focus:outline-none focus:border-emerald-600"
            >
              <option value="All">Any Sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Size Filter */}
          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1">Size</label>
            <select
              value={selectedSize}
              onChange={e => setSelectedSize(e.target.value as AnimalSize | 'All')}
              className="w-full px-2.5 py-1.5 text-xs rounded-md border border-neutral-300 bg-white focus:outline-none focus:border-emerald-600"
            >
              <option value="All">Any Size</option>
              <option value="Small (<20 lbs)">Small (&lt;20 lbs)</option>
              <option value="Medium (20-50 lbs)">Medium (20-50 lbs)</option>
              <option value="Large (50-80 lbs)">Large (50-80 lbs)</option>
              <option value="Extra Large (80+ lbs)">Extra Large (80+ lbs)</option>
            </select>
          </div>

          {/* Medically Cleared Toggle Checkbox */}
          <div className="flex flex-col justify-end">
            <label className="flex items-center gap-2 cursor-pointer py-1.5">
              <input
                type="checkbox"
                checked={onlyCleared}
                onChange={e => setOnlyCleared(e.target.checked)}
                className="w-4 h-4 text-emerald-700 rounded border-neutral-300 focus:ring-emerald-600"
              />
              <span className="text-xs font-medium text-neutral-700">
                Medically Cleared Only
              </span>
            </label>
          </div>
        </div>

        {/* Filter Summary & Reset Bar */}
        <div className="flex items-center justify-between text-xs text-neutral-500 pt-1">
          <div className="flex items-center gap-2">
            <span>Showing <strong className="font-semibold text-neutral-800 tabular-nums">{filteredAnimals.length}</strong> animals ready for homes</span>
            {hasActiveFilters && (
              <span className="text-neutral-400">· Filters applied</span>
            )}
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-emerald-700 hover:text-emerald-900 font-medium underline transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Animal Cards Grid */}
      {filteredAnimals.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white rounded-xl border border-neutral-200">
          <PawPrint className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-neutral-800">No animals match your search</h3>
          <p className="text-sm text-neutral-500 max-w-md mx-auto mt-1 mb-5">
            Try adjusting your species, age, or breed filter, or clear your search term to see all available pets.
          </p>
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 text-xs font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Show All Adoptable Animals
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnimals.map(animal => {
            const stayDays = calculateStayDays(animal.intakeDate);

            return (
              <div
                key={animal.id}
                className="group flex flex-col bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow"
              >
                {/* Pet Image with resilient styling */}
                <div 
                  className="relative aspect-4/3 bg-neutral-100 overflow-hidden cursor-pointer"
                  onClick={() => onSelectPet(animal)}
                >
                  <img
                    src={animal.photoUrl}
                    alt={`${animal.name} - ${animal.breed}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback image container
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  
                  {/* Location / Status tag quiet overlay */}
                  <div className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-md">
                    {animal.status === 'In Foster Care' ? 'In Foster Home' : animal.locationInShelter}
                  </div>

                  {/* Stay days tracker */}
                  <div className="absolute bottom-3 right-3 bg-neutral-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Clock className="w-3 h-3 text-neutral-300" />
                    <span className="tabular-nums">Stay: {stayDays}d</span>
                  </div>
                </div>

                {/* Card Content: Strictly adhere to Anti-Slop Zero-Pill Rules (Clean unboxed text with typographic separators) */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Primary Title */}
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <h3 
                        onClick={() => onSelectPet(animal)}
                        className="text-xl font-bold font-display text-neutral-950 group-hover:text-emerald-800 transition-colors cursor-pointer"
                      >
                        {animal.name}
                      </h3>
                      <span className="text-xs font-mono font-medium text-neutral-500 tabular-nums">
                        {animal.id}
                      </span>
                    </div>

                    {/* Clean unboxed metadata with typographic separators */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-600 mb-3">
                      <span>{animal.species}</span>
                      <span aria-hidden="true" className="text-neutral-400">·</span>
                      <span className="truncate max-w-[150px]">{animal.breed}</span>
                      <span aria-hidden="true" className="text-neutral-400">·</span>
                      <span>{animal.ageYears > 0 ? `${animal.ageYears}y` : ''} {animal.ageMonths > 0 ? `${animal.ageMonths}m` : ''}</span>
                      <span aria-hidden="true" className="text-neutral-400">·</span>
                      <span>{animal.sex}</span>
                    </div>

                    {/* Short summary bio */}
                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                      {animal.behavior.summaryNotes}
                    </p>

                    {/* Medical Clearance & Spay/Neuter status indicator */}
                    <div className="mt-3 pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between text-xs text-neutral-500">
                      <div className="flex items-center gap-1.5">
                        {animal.medicallyCleared ? (
                          <span className="flex items-center gap-1 text-emerald-700 font-medium">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                            Medically Cleared
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-amber-700 font-medium">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                            Medical Review Pending
                          </span>
                        )}
                      </div>
                      <div className="text-neutral-500">
                        {animal.spayNeuterStatus}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => onSelectPet(animal)}
                      className="flex-1 py-2 px-3 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors text-center cursor-pointer"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => onApplyForPet(animal)}
                      className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs transition-colors text-center cursor-pointer"
                    >
                      Apply to Adopt
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
