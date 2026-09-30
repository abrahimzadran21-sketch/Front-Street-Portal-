import React, { useState } from 'react';
import { useShelter } from '../../context/ShelterContext';
import { Animal, FosterApplication } from '../../types/shelter';
import { 
  HeartHandshake, 
  Home, 
  Plus, 
  CheckCircle, 
  X, 
  FileText, 
  Clock, 
  Scale, 
  Camera, 
  AlertCircle,
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const FosterCareHub: React.FC = () => {
  const { 
    animals, 
    fosterApplications, 
    role, 
    currentUser, 
    submitFosterApplication, 
    reviewFosterApplication, 
    assignAnimalToFoster, 
    addFosterProgressUpdate, 
    returnAnimalFromFoster 
  } = useShelter();

  const [activeTab, setActiveTab] = useState<'needs-foster' | 'current-foster' | 'apply' | 'admin-queue'>('needs-foster');

  // Modals
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [assignModalAnimal, setAssignModalAnimal] = useState<Animal | null>(null);
  const [updateModalAnimal, setUpdateModalAnimal] = useState<Animal | null>(null);
  const [returnModalAnimal, setReturnModalAnimal] = useState<Animal | null>(null);

  // Application form
  const [fosterApplicantName, setFosterApplicantName] = useState(currentUser.name);
  const [fosterEmail, setFosterEmail] = useState(currentUser.email);
  const [fosterPhone, setFosterPhone] = useState(currentUser.phone);
  const [fosterAddress, setFosterAddress] = useState('312 24th St, Sacramento, CA');
  const [fosterHousing, setFosterHousing] = useState('Single Family Home with yard');
  const [fosterPreferences, setFosterPreferences] = useState(['Neonatal bottle kittens', 'Medical recovery dogs']);
  const [fosterExp, setFosterExp] = useState('5 years of animal handling, comfortable with syringe feeding & medication.');

  // Assign form
  const [assignCaregiverName, setAssignCaregiverName] = useState('Samantha Cooper');
  const [assignCaregiverEmail, setAssignCaregiverEmail] = useState('abrahimzadran21@gmail.com');
  const [assignCaregiverPhone, setAssignCaregiverPhone] = useState('(916) 555-0144');
  const [assignStartDate, setAssignStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [assignExpReturnDate, setAssignExpReturnDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 21);
    return d.toISOString().slice(0, 10);
  });
  const [assignReason, setAssignReason] = useState<'Neonatal Care' | 'Medical Recovery' | 'Behavioral Decompression' | 'Space Relief'>('Medical Recovery');

  // Progress update form
  const [updateWeight, setUpdateWeight] = useState(10.5);
  const [updateNotes, setUpdateNotes] = useState('Eating well, incision healing cleanly, very playful.');
  const [updatePhoto, setUpdatePhoto] = useState('');

  // Return form
  const [returnNotes, setReturnNotes] = useState('Completed foster period successfully. Ready for public adoption.');

  // Animals needing foster care:
  // Animals in shelter with special needs or kittens/medical hold
  const animalsNeedingFoster = animals.filter(a => 
    a.status === 'Medical Hold / Recovery' || 
    a.ageGroup === 'Puppy / Kitten' ||
    (a.status === 'Available for Adoption' && !a.fosterPlacements?.some(p => p.status === 'Active'))
  );

  // Animals currently in foster care:
  const animalsInFoster = animals.filter(a => 
    a.status === 'In Foster Care' || 
    a.fosterPlacements?.some(p => p.status === 'Active')
  );

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    submitFosterApplication({
      applicantName: fosterApplicantName,
      email: fosterEmail,
      phone: fosterPhone,
      address: fosterAddress,
      housingType: fosterHousing,
      preferredTypes: fosterPreferences,
      experienceSummary: fosterExp
    });
    setApplyModalOpen(false);
  };

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignModalAnimal) return;
    assignAnimalToFoster(assignModalAnimal.id, {
      animalId: assignModalAnimal.id,
      caregiverName: assignCaregiverName,
      caregiverEmail: assignCaregiverEmail,
      caregiverPhone: assignCaregiverPhone,
      startDate: assignStartDate,
      expectedReturnDate: assignExpReturnDate,
      fosterReason: assignReason
    });
    setAssignModalAnimal(null);
  };

  const handleAddUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateModalAnimal) return;
    addFosterProgressUpdate(updateModalAnimal.id, {
      date: new Date().toISOString().slice(0, 10),
      caregiverName: currentUser.name,
      weightLbs: updateWeight,
      notes: updateNotes,
      photoUrl: updatePhoto || undefined
    });
    setUpdateModalAnimal(null);
  };

  const handleReturn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!returnModalAnimal) return;
    returnAnimalFromFoster(returnModalAnimal.id, returnNotes);
    setReturnModalAnimal(null);
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            <Home className="w-4 h-4 text-emerald-700" />
            Front Street Foster Network
          </div>
          <h1 className="text-2xl font-bold font-display text-neutral-950 mt-1">
            Foster Care & Temporary Guardian Program
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Foster caregivers provide temporary loving homes for recovering pets, bottle kittens, and seniors while freeing up shelter kennel space.
          </p>
        </div>

        <button
          onClick={() => setApplyModalOpen(true)}
          className="px-4 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Apply to Become a Foster Parent</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-neutral-200 gap-2 overflow-x-auto text-xs font-medium">
        <button
          onClick={() => setActiveTab('needs-foster')}
          className={`py-2.5 px-4 border-b-2 font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'needs-foster'
              ? 'border-emerald-800 text-emerald-900'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Animals Needing Foster Homes ({animalsNeedingFoster.length})
        </button>
        <button
          onClick={() => setActiveTab('current-foster')}
          className={`py-2.5 px-4 border-b-2 font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'current-foster'
              ? 'border-emerald-800 text-emerald-900'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Currently in Foster Care ({animalsInFoster.length})
        </button>
        {role === 'admin' && (
          <button
            onClick={() => setActiveTab('admin-queue')}
            className={`py-2.5 px-4 border-b-2 font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'admin-queue'
                ? 'border-emerald-800 text-emerald-900'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Foster Applications Queue ({fosterApplications.length})
          </button>
        )}
      </div>

      {/* Tab 1: Animals Needing Foster Homes (Story 37) */}
      {activeTab === 'needs-foster' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {animalsNeedingFoster.map(animal => (
            <div key={animal.id} className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs space-y-3 p-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200">
                  <img
                    src={animal.photoUrl}
                    alt={animal.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-neutral-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    Needs Foster Care
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-neutral-950 text-base">{animal.name}</h3>
                    <span className="font-mono text-xs text-neutral-500">{animal.id}</span>
                  </div>
                  <div className="text-xs text-neutral-500">{animal.species} · {animal.breed} · {animal.ageGroup}</div>
                  <p className="text-xs text-neutral-600 mt-2 line-clamp-2">
                    {animal.behavior.summaryNotes}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-neutral-500">
                  {animal.locationInShelter}
                </span>

                {role === 'admin' ? (
                  <button
                    onClick={() => setAssignModalAnimal(animal)}
                    className="px-3 py-1.5 font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
                  >
                    Assign Foster (Story 40)
                  </button>
                ) : (
                  <button
                    onClick={() => setApplyModalOpen(true)}
                    className="px-3 py-1.5 font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
                  >
                    Foster Me
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Currently in Foster Care (Story 41 & 42) */}
      {activeTab === 'current-foster' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {animalsInFoster.map(animal => {
              const activePlacement = animal.fosterPlacements?.find(p => p.status === 'Active') || animal.fosterPlacements?.[0];

              return (
                <div key={animal.id} className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={animal.photoUrl}
                        alt={animal.name}
                        className="w-16 h-16 rounded-xl object-cover border border-neutral-200"
                      />
                      <div className="text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base text-neutral-900">{animal.name}</span>
                          <span className="font-mono text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded text-[10px]">{animal.id}</span>
                        </div>
                        <div className="text-neutral-500">{animal.species} · {animal.breed}</div>
                        <div className="text-neutral-600 mt-0.5">
                          Caregiver: <strong>{activePlacement?.caregiverName || 'Foster Volunteer'}</strong>
                        </div>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-900">
                      Active Foster
                    </span>
                  </div>

                  {/* Placement info */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-neutral-50 rounded-lg border border-neutral-100 text-xs">
                    <div>
                      <span className="text-neutral-500 block text-[10px]">Foster Reason</span>
                      <strong className="text-neutral-800">{activePlacement?.fosterReason || 'Space Relief'}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[10px]">Start Date</span>
                      <strong className="text-neutral-800 font-mono">{activePlacement?.startDate || '—'}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[10px]">Expected Return</span>
                      <strong className="text-neutral-800 font-mono">{activePlacement?.expectedReturnDate || '—'}</strong>
                    </div>
                  </div>

                  {/* Foster Updates Timeline (Story 41) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-neutral-700">
                        Caregiver Progress Updates ({activePlacement?.updates?.length || 0})
                      </span>
                      <button
                        onClick={() => setUpdateModalAnimal(animal)}
                        className="text-emerald-700 hover:text-emerald-900 font-medium flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Log Progress Update</span>
                      </button>
                    </div>

                    {(!activePlacement?.updates || activePlacement.updates.length === 0) ? (
                      <div className="text-xs text-neutral-400 italic p-3 bg-neutral-50 rounded-lg">
                        No progress updates logged yet.
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                        {activePlacement.updates.map(upd => (
                          <div key={upd.id} className="p-2.5 rounded-lg border border-neutral-200 bg-neutral-50/60 text-xs space-y-1">
                            <div className="flex items-center justify-between text-[11px] text-neutral-500">
                              <span>{upd.date} · by {upd.caregiverName}</span>
                              {upd.weightLbs && (
                                <span className="font-mono font-semibold text-neutral-800">
                                  Weight: {upd.weightLbs} lbs
                                </span>
                              )}
                            </div>
                            <p className="text-neutral-700">{upd.notes}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Return animal to shelter action (Story 42) */}
                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-end gap-2 text-xs">
                    <button
                      onClick={() => setReturnModalAnimal(animal)}
                      className="px-3 py-1.5 font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
                    >
                      Record Return to Shelter (Story 42)
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Admin Review Queue (Story 39) */}
      {activeTab === 'admin-queue' && (
        <div className="space-y-4">
          <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-neutral-100 text-neutral-700 font-semibold text-[11px]">
                  <th className="py-2.5 px-4">Applicant</th>
                  <th className="py-2.5 px-4">Contact</th>
                  <th className="py-2.5 px-4">Preferred Animals</th>
                  <th className="py-2.5 px-4">Experience</th>
                  <th className="py-2.5 px-4">Status</th>
                  <th className="py-2.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {fosterApplications.map(app => (
                  <tr key={app.id} className="hover:bg-neutral-50">
                    <td className="py-3 px-4 font-semibold text-neutral-900">{app.applicantName}</td>
                    <td className="py-3 px-4 text-neutral-600">
                      <div>{app.email}</div>
                      <div className="text-[11px] text-neutral-400">{app.phone}</div>
                    </td>
                    <td className="py-3 px-4 text-neutral-600">
                      {app.preferredTypes.join(', ')}
                    </td>
                    <td className="py-3 px-4 text-neutral-600 max-w-xs truncate">
                      {app.experienceSummary}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        app.status === 'Approved' ? 'bg-emerald-100 text-emerald-900' : 
                        app.status === 'Declined' ? 'bg-rose-100 text-rose-900' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-1.5">
                      {app.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => reviewFosterApplication(app.id, 'Approved', 'Approved by shelter staff')}
                            className="px-2.5 py-1 text-[11px] font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => reviewFosterApplication(app.id, 'Declined')}
                            className="px-2.5 py-1 text-[11px] font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded"
                          >
                            Decline
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Submit Foster Application (Story 38) */}
      {applyModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-neutral-200 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <h3 className="text-base font-bold text-neutral-950 font-display">
                Front Street Foster Volunteer Application
              </h3>
              <button onClick={() => setApplyModalOpen(false)}><X className="w-5 h-5 text-neutral-400" /></button>
            </div>
            <form onSubmit={handleApply} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fosterApplicantName}
                    onChange={e => setFosterApplicantName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={fosterPhone}
                    onChange={e => setFosterPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
              </div>
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={fosterEmail}
                  onChange={e => setFosterEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Sacramento Address *</label>
                <input
                  type="text"
                  required
                  value={fosterAddress}
                  onChange={e => setFosterAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Housing Type & Yard Details</label>
                <input
                  type="text"
                  value={fosterHousing}
                  onChange={e => setFosterHousing(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Animal Care Experience</label>
                <textarea
                  rows={2}
                  value={fosterExp}
                  onChange={e => setFosterExp(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setApplyModalOpen(false)}
                  className="px-4 py-2 font-medium text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm"
                >
                  Submit Foster Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Assign Animal to Foster Volunteer (Story 40) */}
      {assignModalAnimal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-neutral-200 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <h3 className="text-base font-bold text-neutral-950 font-display">
                Assign {assignModalAnimal.name} ({assignModalAnimal.id}) to Foster Home
              </h3>
              <button onClick={() => setAssignModalAnimal(null)}><X className="w-5 h-5 text-neutral-400" /></button>
            </div>
            <form onSubmit={handleAssign} className="space-y-3">
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Foster Caregiver Name *</label>
                <input
                  type="text"
                  required
                  value={assignCaregiverName}
                  onChange={e => setAssignCaregiverName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Caregiver Email</label>
                  <input
                    type="email"
                    value={assignCaregiverEmail}
                    onChange={e => setAssignCaregiverEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Caregiver Phone</label>
                  <input
                    type="tel"
                    value={assignCaregiverPhone}
                    onChange={e => setAssignCaregiverPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={assignStartDate}
                    onChange={e => setAssignStartDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Expected Return Date</label>
                  <input
                    type="date"
                    required
                    value={assignExpReturnDate}
                    onChange={e => setAssignExpReturnDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
              </div>
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Foster Reason</label>
                <select
                  value={assignReason}
                  onChange={e => setAssignReason(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white"
                >
                  <option value="Neonatal Care">Neonatal Care / Bottle Kittens</option>
                  <option value="Medical Recovery">Medical Recovery / Post-Surgery</option>
                  <option value="Behavioral Decompression">Behavioral Decompression</option>
                  <option value="Space Relief">Shelter Space Relief</option>
                </select>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAssignModalAnimal(null)}
                  className="px-4 py-2 font-medium text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm"
                >
                  Complete Foster Placement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Submit Foster Progress Update (Story 41) */}
      {updateModalAnimal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-neutral-200 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <h3 className="text-base font-bold text-neutral-950 font-display">
                Log Foster Update for {updateModalAnimal.name}
              </h3>
              <button onClick={() => setUpdateModalAnimal(null)}><X className="w-5 h-5 text-neutral-400" /></button>
            </div>
            <form onSubmit={handleAddUpdate} className="space-y-3">
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Current Weight (lbs)</label>
                <input
                  type="number"
                  step="0.1"
                  value={updateWeight}
                  onChange={e => setUpdateWeight(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Condition & Behavior Notes *</label>
                <textarea
                  rows={3}
                  required
                  value={updateNotes}
                  onChange={e => setUpdateNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  placeholder="Appetite, energy level, bowel movements, social development..."
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setUpdateModalAnimal(null)}
                  className="px-4 py-2 font-medium text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm"
                >
                  Log Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Return from Foster (Story 42) */}
      {returnModalAnimal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-neutral-200 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <h3 className="text-base font-bold text-neutral-950 font-display">
                Record Foster Animal Return to Shelter
              </h3>
              <button onClick={() => setReturnModalAnimal(null)}><X className="w-5 h-5 text-neutral-400" /></button>
            </div>
            <form onSubmit={handleReturn} className="space-y-3">
              <p className="text-neutral-600">
                Marking <strong>{returnModalAnimal.name}</strong> as returned from foster care. Their location will be updated to Main Shelter Kennel and status changed to Available for Adoption.
              </p>
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Return Notes / Medical Check</label>
                <textarea
                  rows={2}
                  value={returnNotes}
                  onChange={e => setReturnNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReturnModalAnimal(null)}
                  className="px-4 py-2 font-medium text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm"
                >
                  Confirm Return
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
