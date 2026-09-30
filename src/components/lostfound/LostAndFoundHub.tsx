import React, { useState } from 'react';
import { useShelter } from '../../context/ShelterContext';
import { Animal, LostPetReport, FoundAnimalReport, Species, Sex, ReturnToOwnerRecord } from '../../types/shelter';
import { 
  Search, 
  MapPin, 
  Camera, 
  AlertTriangle, 
  CheckCircle, 
  HeartHandshake, 
  Clock, 
  Plus, 
  X, 
  ShieldCheck, 
  ArrowRight,
  Filter
} from 'lucide-react';

export const LostAndFoundHub: React.FC = () => {
  const { 
    animals, 
    lostReports, 
    foundReports, 
    role, 
    currentUser, 
    submitLostReport, 
    submitFoundReport, 
    markReturnedToOwner,
    matchLostReport
  } = useShelter();

  const [activeTab, setActiveTab] = useState<'shelter-search' | 'lost' | 'found' | 'matcher'>('shelter-search');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals
  const [lostModalOpen, setLostModalOpen] = useState(false);
  const [foundModalOpen, setFoundModalOpen] = useState(false);
  const [rtoModalAnimal, setRtoModalAnimal] = useState<Animal | null>(null);

  // Lost form state
  const [lostPetName, setLostPetName] = useState('');
  const [lostSpecies, setLostSpecies] = useState<Species>('Dog');
  const [lostBreed, setLostBreed] = useState('Husky Mix');
  const [lostColor, setLostColor] = useState('Grey and White');
  const [lostSex, setLostSex] = useState<Sex>('Male');
  const [lostPhotoUrl, setLostPhotoUrl] = useState('https://images.unsplash.com/photo-1563889362352-b0492c224f61?auto=format&fit=crop&w=600&q=80');
  const [lostLastSeenDate, setLostLastSeenDate] = useState(new Date().toISOString().slice(0, 10));
  const [lostLastSeenLoc, setLostLastSeenLoc] = useState('East Sacramento (McKinley Park)');
  const [lostFeatures, setLostFeatures] = useState('Wearing red collar, blue eyes, friendly.');
  const [lostChip, setLostChip] = useState('');

  // Found form state
  const [foundSpecies, setFoundSpecies] = useState<Species>('Cat');
  const [foundBreedDesc, setFoundBreedDesc] = useState('Domestic Shorthair Tabby');
  const [foundColor, setFoundColor] = useState('Orange with White Paws');
  const [foundSex, setFoundSex] = useState<Sex>('Unknown');
  const [foundPhotoUrl, setFoundPhotoUrl] = useState('https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=600&q=80');
  const [foundDate, setFoundDate] = useState(new Date().toISOString().slice(0, 10));
  const [foundLoc, setFoundLoc] = useState('Midtown Sacramento (21st & J St)');
  const [foundHolding, setFoundHolding] = useState<'Finder Keeping Temporarily' | 'Brought to Front Street Shelter'>('Finder Keeping Temporarily');
  const [finderName, setFinderName] = useState(currentUser.name);
  const [finderPhone, setFinderPhone] = useState(currentUser.phone);

  // RTO Modal form
  const [rtoOwnerName, setRtoOwnerName] = useState('');
  const [rtoOwnerPhone, setRtoOwnerPhone] = useState('');
  const [rtoOwnerEmail, setRtoOwnerEmail] = useState('');
  const [rtoOwnerAddress, setRtoOwnerAddress] = useState('Sacramento, CA');
  const [rtoProof, setRtoProof] = useState('Microchip scan match & veterinary rabies certificate');
  const [rtoFee, setRtoFee] = useState(45);
  const [rtoSelectedLostReportId, setRtoSelectedLostReportId] = useState('');

  // Filter animals currently at shelter for search (Story 35)
  const shelterAnimals = animals.filter(a => {
    if (a.status === 'Returned to Owner') return false;
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return a.name.toLowerCase().includes(q) || 
      a.id.toLowerCase().includes(q) || 
      a.breed.toLowerCase().includes(q) || 
      a.color.toLowerCase().includes(q) ||
      a.intakeLocation.toLowerCase().includes(q);
  });

  const handleCreateLost = (e: React.FormEvent) => {
    e.preventDefault();
    submitLostReport({
      petName: lostPetName,
      species: lostSpecies,
      breed: lostBreed,
      color: lostColor,
      sex: lostSex,
      photoUrl: lostPhotoUrl,
      lastSeenDate: lostLastSeenDate,
      lastSeenLocation: lostLastSeenLoc,
      distinctiveFeatures: lostFeatures,
      microchipId: lostChip || undefined,
      ownerName: currentUser.name,
      ownerPhone: currentUser.phone,
      ownerEmail: currentUser.email
    });
    setLostModalOpen(false);
  };

  const handleCreateFound = (e: React.FormEvent) => {
    e.preventDefault();
    submitFoundReport({
      species: foundSpecies,
      breedDescription: foundBreedDesc,
      color: foundColor,
      sex: foundSex,
      photoUrl: foundPhotoUrl,
      foundDate,
      foundLocation: foundLoc,
      finderName,
      finderPhone,
      finderEmail: currentUser.email,
      currentHolding: foundHolding
    });
    setFoundModalOpen(false);
  };

  const handleCompleteRTO = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rtoModalAnimal) return;
    markReturnedToOwner(
      rtoModalAnimal.id,
      {
        ownerName: rtoOwnerName,
        ownerPhone: rtoOwnerPhone,
        ownerEmail: rtoOwnerEmail,
        ownerAddress: rtoOwnerAddress,
        returnDate: new Date().toISOString().slice(0, 10),
        proofOfOwnership: rtoProof,
        redemptionFeePaid: rtoFee
      },
      rtoSelectedLostReportId || undefined
    );
    setRtoModalAnimal(null);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4 text-emerald-700" />
            Sacramento Pet Reunification Service
          </div>
          <h1 className="text-2xl font-bold font-display text-neutral-950 mt-1">
            Lost & Found Animal Center
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Compare shelter intakes with lost pet reports, search current animals, and safely reunite families.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setLostModalOpen(true)}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-rose-700 hover:bg-rose-800 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Report Lost Pet</span>
          </button>
          <button
            onClick={() => setFoundModalOpen(true)}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Report Found Animal</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-neutral-200 gap-2 overflow-x-auto text-xs font-medium">
        <button
          onClick={() => setActiveTab('shelter-search')}
          className={`py-2.5 px-4 border-b-2 font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'shelter-search'
              ? 'border-emerald-800 text-emerald-900'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Search Shelter Animals ({shelterAnimals.length})
        </button>
        <button
          onClick={() => setActiveTab('matcher')}
          className={`py-2.5 px-4 border-b-2 font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'matcher'
              ? 'border-emerald-800 text-emerald-900'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Compare & Match Reports (Story 34)
        </button>
        <button
          onClick={() => setActiveTab('lost')}
          className={`py-2.5 px-4 border-b-2 font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'lost'
              ? 'border-emerald-800 text-emerald-900'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Community Lost Pet Reports ({lostReports.length})
        </button>
        <button
          onClick={() => setActiveTab('found')}
          className={`py-2.5 px-4 border-b-2 font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'found'
              ? 'border-emerald-800 text-emerald-900'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Community Found Reports ({foundReports.length})
        </button>
      </div>

      {/* Tab 1: Pet Owner Searches Current Shelter Animals (Story 35) */}
      {activeTab === 'shelter-search' && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative flex-1 w-full max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search shelter animals by name, ID, breed, color, or intake street..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>
            <div className="text-xs text-neutral-500">
              Showing <strong className="text-neutral-900 tabular-nums">{shelterAnimals.length}</strong> animals in shelter care
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shelterAnimals.map(animal => (
              <div key={animal.id} className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs space-y-3 p-4 flex flex-col justify-between">
                <div className="flex gap-3">
                  <img
                    src={animal.photoUrl}
                    alt={animal.name}
                    className="w-20 h-20 rounded-lg object-cover border border-neutral-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0 text-xs">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-neutral-950 text-sm truncate">{animal.name}</h3>
                      <span className="font-mono text-[10px] text-neutral-500">{animal.id}</span>
                    </div>
                    <div className="text-neutral-500 truncate">{animal.species} · {animal.breed}</div>
                    <div className="text-neutral-600 mt-1">Color: {animal.color}</div>
                    <div className="text-[11px] text-neutral-500 flex items-center gap-1 mt-1 truncate">
                      <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                      <span>{animal.intakeLocation}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-neutral-500">
                    Intake: {animal.intakeDate} ({animal.intakeType})
                  </span>

                  {role === 'admin' && (
                    <button
                      onClick={() => {
                        setRtoModalAnimal(animal);
                        setRtoOwnerName('');
                        setRtoOwnerPhone('');
                      }}
                      className="px-2.5 py-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-md border border-emerald-200 transition-colors"
                    >
                      Return to Owner (Story 36)
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Compare Lost Pet Reports with Shelter Intakes (Story 34) */}
      {activeTab === 'matcher' && (
        <div className="space-y-6">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              Intelligent Intake Comparison Engine (Story 34)
            </div>
            <div>
              Staff can compare reported missing pets with shelter intakes matching species, color pattern, and Sacramento neighborhood proximity.
            </div>
          </div>

          <div className="space-y-4">
            {lostReports.map(report => {
              // Find matching shelter animals with same species
              const matches = animals.filter(a => 
                a.species === report.species && 
                (a.id === report.matchedAnimalId || a.status !== 'Returned to Owner')
              );

              return (
                <div key={report.id} className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100">
                    <div className="flex items-center gap-3">
                      <img
                        src={report.photoUrl}
                        alt={report.petName}
                        className="w-14 h-14 rounded-lg object-cover border border-neutral-200 shrink-0"
                      />
                      <div className="text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-neutral-900">{report.petName}</span>
                          <span className="font-mono text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded text-[10px]">{report.id}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            report.status === 'Reunited' ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
                          }`}>
                            {report.status}
                          </span>
                        </div>
                        <div className="text-neutral-500">
                          {report.species} · {report.breed} · {report.color}
                        </div>
                        <div className="text-neutral-600 mt-0.5">
                          Last seen: {report.lastSeenDate} at <strong>{report.lastSeenLocation}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-neutral-500 sm:text-right">
                      <div>Owner: <strong>{report.ownerName}</strong> ({report.ownerPhone})</div>
                      <div className="text-[11px] text-neutral-400">Reported on: {report.reportedAt}</div>
                    </div>
                  </div>

                  {/* Candidate matches in shelter */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-neutral-700">
                      Potential Shelter Animal Matches:
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {matches.slice(0, 3).map(candidate => {
                        const isLinked = report.matchedAnimalId === candidate.id;

                        return (
                          <div 
                            key={candidate.id}
                            className={`p-3 rounded-lg border text-xs flex items-center justify-between gap-3 ${
                              isLinked ? 'border-emerald-500 bg-emerald-50/50' : 'border-neutral-200 bg-neutral-50'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <img
                                src={candidate.photoUrl}
                                alt={candidate.name}
                                className="w-10 h-10 rounded-md object-cover border border-neutral-200 shrink-0"
                              />
                              <div className="truncate">
                                <div className="font-semibold text-neutral-900 truncate">{candidate.name}</div>
                                <div className="text-[10px] font-mono text-neutral-500">{candidate.id}</div>
                                <div className="text-[10px] text-neutral-500 truncate">{candidate.intakeLocation}</div>
                              </div>
                            </div>

                            <div className="shrink-0 flex flex-col gap-1">
                              {isLinked ? (
                                <span className="text-[10px] font-bold text-emerald-800 flex items-center gap-0.5">
                                  <CheckCircle className="w-3 h-3" /> Linked
                                </span>
                              ) : (
                                <button
                                  onClick={() => matchLostReport(report.id, candidate.id)}
                                  className="px-2 py-1 text-[10px] font-semibold text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-100 rounded transition-colors"
                                >
                                  Link Match
                                </button>
                              )}
                              {candidate.status !== 'Returned to Owner' && (
                                <button
                                  onClick={() => {
                                    setRtoModalAnimal(candidate);
                                    setRtoOwnerName(report.ownerName);
                                    setRtoOwnerPhone(report.ownerPhone);
                                    setRtoOwnerEmail(report.ownerEmail);
                                    setRtoSelectedLostReportId(report.id);
                                  }}
                                  className="px-2 py-1 text-[10px] font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded transition-colors"
                                >
                                  Process RTO
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Community Lost Pet Reports */}
      {activeTab === 'lost' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lostReports.map(report => (
            <div key={report.id} className="bg-white rounded-xl border border-neutral-200 p-4 shadow-xs space-y-3 text-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200">
                  <img
                    src={report.photoUrl}
                    alt={report.petName}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded ${
                    report.status === 'Reunited' ? 'bg-emerald-900/90 text-white' : 'bg-rose-900/90 text-white'
                  }`}>
                    {report.status}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-neutral-900">{report.petName}</h3>
                    <span className="font-mono text-[10px] text-neutral-500">{report.id}</span>
                  </div>
                  <div className="text-neutral-500">{report.species} · {report.breed} · {report.color}</div>
                  <div className="mt-1 text-neutral-600">
                    <strong>Last seen:</strong> {report.lastSeenDate} at {report.lastSeenLocation}
                  </div>
                  <p className="mt-1 text-neutral-600 line-clamp-2">
                    {report.distinctiveFeatures}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-100 text-[11px] text-neutral-500">
                Contact: {report.ownerName} · {report.ownerPhone}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Community Found Reports */}
      {activeTab === 'found' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foundReports.map(report => (
            <div key={report.id} className="bg-white rounded-xl border border-neutral-200 p-4 shadow-xs space-y-3 text-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200">
                  <img
                    src={report.photoUrl}
                    alt={report.breedDescription}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-900/90 text-white">
                    {report.currentHolding}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-neutral-900">{report.species} Found</h3>
                    <span className="font-mono text-[10px] text-neutral-500">{report.id}</span>
                  </div>
                  <div className="text-neutral-500">{report.breedDescription} · {report.color}</div>
                  <div className="mt-1 text-neutral-600">
                    <strong>Found on:</strong> {report.foundDate} at {report.foundLocation}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-100 text-[11px] text-neutral-500">
                Finder: {report.finderName} · {report.finderPhone}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Report Lost Pet */}
      {lostModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-neutral-200 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <h3 className="text-base font-bold text-neutral-950 font-display">
                Report a Missing / Lost Pet in Sacramento
              </h3>
              <button onClick={() => setLostModalOpen(false)}><X className="w-5 h-5 text-neutral-400" /></button>
            </div>
            <form onSubmit={handleCreateLost} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Pet Name *</label>
                  <input
                    type="text"
                    required
                    value={lostPetName}
                    onChange={e => setLostPetName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                    placeholder="e.g. Bella"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Species *</label>
                  <select
                    value={lostSpecies}
                    onChange={e => setLostSpecies(e.target.value as Species)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white"
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Breed Description *</label>
                  <input
                    type="text"
                    required
                    value={lostBreed}
                    onChange={e => setLostBreed(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Color & Markings *</label>
                  <input
                    type="text"
                    required
                    value={lostColor}
                    onChange={e => setLostColor(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Date Last Seen *</label>
                  <input
                    type="date"
                    required
                    value={lostLastSeenDate}
                    onChange={e => setLostLastSeenDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Last Seen Sacramento Location *</label>
                  <input
                    type="text"
                    required
                    value={lostLastSeenLoc}
                    onChange={e => setLostLastSeenLoc(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                    placeholder="e.g. East Sac 33rd & H St"
                  />
                </div>
              </div>
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Pet Photo URL *</label>
                <input
                  type="url"
                  required
                  value={lostPhotoUrl}
                  onChange={e => setLostPhotoUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Distinctive Collar / Features / Chip</label>
                <textarea
                  rows={2}
                  value={lostFeatures}
                  onChange={e => setLostFeatures(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  placeholder="Collar color, ear notches, scars, microchip number..."
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setLostModalOpen(false)}
                  className="px-4 py-2 font-medium text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-rose-700 hover:bg-rose-800 rounded-lg shadow-sm"
                >
                  Publish Lost Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Report Found Animal */}
      {foundModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-neutral-200 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <h3 className="text-base font-bold text-neutral-950 font-display">
                Report a Found Animal in Sacramento
              </h3>
              <button onClick={() => setFoundModalOpen(false)}><X className="w-5 h-5 text-neutral-400" /></button>
            </div>
            <form onSubmit={handleCreateFound} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Species *</label>
                  <select
                    value={foundSpecies}
                    onChange={e => setFoundSpecies(e.target.value as Species)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white"
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Date Found *</label>
                  <input
                    type="date"
                    required
                    value={foundDate}
                    onChange={e => setFoundDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
              </div>
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Description / Breed / Color *</label>
                <input
                  type="text"
                  required
                  value={foundBreedDesc}
                  onChange={e => setFoundBreedDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  placeholder="e.g. Tabby domestic shorthair, white chest"
                />
              </div>
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Found Location (Sacramento) *</label>
                <input
                  type="text"
                  required
                  value={foundLoc}
                  onChange={e => setFoundLoc(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Photo URL</label>
                <input
                  type="url"
                  required
                  value={foundPhotoUrl}
                  onChange={e => setFoundPhotoUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Current Holding Status *</label>
                <select
                  value={foundHolding}
                  onChange={e => setFoundHolding(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white"
                >
                  <option value="Finder Keeping Temporarily">Finder Keeping Safe Temporarily</option>
                  <option value="Brought to Front Street Shelter">Brought to Front Street Shelter</option>
                </select>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setFoundModalOpen(false)}
                  className="px-4 py-2 font-medium text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm"
                >
                  Submit Found Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Process Return to Owner (Story 36) */}
      {rtoModalAnimal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-neutral-200 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <h3 className="text-base font-bold text-neutral-950 font-display">
                Mark Returned to Owner (RTO) · {rtoModalAnimal.name} ({rtoModalAnimal.id})
              </h3>
              <button onClick={() => setRtoModalAnimal(null)}><X className="w-5 h-5 text-neutral-400" /></button>
            </div>
            <form onSubmit={handleCompleteRTO} className="space-y-3">
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center gap-3">
                <img
                  src={rtoModalAnimal.photoUrl}
                  alt={rtoModalAnimal.name}
                  className="w-12 h-12 rounded object-cover"
                />
                <div>
                  <div className="font-bold text-neutral-900">{rtoModalAnimal.name}</div>
                  <div className="text-[11px] text-neutral-500">{rtoModalAnimal.species} · {rtoModalAnimal.breed}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Owner Full Name *</label>
                  <input
                    type="text"
                    required
                    value={rtoOwnerName}
                    onChange={e => setRtoOwnerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Owner Phone *</label>
                  <input
                    type="tel"
                    required
                    value={rtoOwnerPhone}
                    onChange={e => setRtoOwnerPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">Owner Address</label>
                <input
                  type="text"
                  value={rtoOwnerAddress}
                  onChange={e => setRtoOwnerAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">Proof of Ownership Verified *</label>
                <input
                  type="text"
                  required
                  value={rtoProof}
                  onChange={e => setRtoProof(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  placeholder="e.g. Microchip registration match, vet bills, adoption contract"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">Redemption Fee ($)</label>
                <input
                  type="number"
                  value={rtoFee}
                  onChange={e => setRtoFee(parseInt(e.target.value, 10) || 0)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRtoModalAnimal(null)}
                  className="px-4 py-2 font-medium text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm"
                >
                  Confirm Reunion & Close Case
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
