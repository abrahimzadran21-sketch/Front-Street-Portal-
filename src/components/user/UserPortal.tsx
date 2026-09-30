import React, { useState } from 'react';
import { useShelter } from '../../context/ShelterContext';
import { Animal } from '../../types/shelter';
import { 
  User, 
  FileText, 
  Heart, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Home, 
  DollarSign, 
  Printer, 
  Plus,
  PawPrint
} from 'lucide-react';

interface UserPortalProps {
  onBrowseAdoptable: () => void;
  onOpenDonate: () => void;
  onOpenLostReport: () => void;
}

export const UserPortal: React.FC<UserPortalProps> = ({
  onBrowseAdoptable,
  onOpenDonate,
  onOpenLostReport
}) => {
  const { 
    currentUser, 
    setCurrentUser, 
    adoptionApplications, 
    volunteerShifts, 
    donations, 
    animals, 
    lostReports,
    cancelShiftSignUp,
    addFosterProgressUpdate 
  } = useShelter();

  const [activeTab, setActiveTab] = useState<'applications' | 'foster' | 'shifts' | 'donations'>('applications');
  const [fosterUpdateModalAnimal, setFosterUpdateModalAnimal] = useState<Animal | null>(null);
  const [fosterWeight, setFosterWeight] = useState(11.8);
  const [fosterNotes, setFosterNotes] = useState('Doing wonderfully! Loves playing in the sunshine and gained healthy weight.');

  // User's applications (filtered by email)
  const myApplications = adoptionApplications.filter(a => 
    a.applicantEmail.toLowerCase() === currentUser.email.toLowerCase()
  );

  // User's foster animals (animals where currentUser is caregiver)
  const myFosterAnimals = animals.filter(a => 
    a.fosterPlacements?.some(p => 
      p.status === 'Active' && 
      (p.caregiverEmail?.toLowerCase() === currentUser.email.toLowerCase() ||
       p.caregiverName?.toLowerCase().includes('samantha'))
    )
  );

  // User's volunteer shifts
  const myShifts = volunteerShifts.filter(s => 
    s.registeredUsers.some(u => u.email.toLowerCase() === currentUser.email.toLowerCase())
  );

  // User's donations
  const myDonations = donations.filter(d => 
    d.donorEmail.toLowerCase() === currentUser.email.toLowerCase()
  );

  const handleFosterUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fosterUpdateModalAnimal) return;

    addFosterProgressUpdate(fosterUpdateModalAnimal.id, {
      date: new Date().toISOString().slice(0, 10),
      caregiverName: currentUser.name,
      weightLbs: fosterWeight,
      notes: fosterNotes
    });

    setFosterUpdateModalAnimal(null);
  };

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center font-display font-bold text-xl">
            {currentUser.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold font-display text-neutral-950">
                {currentUser.name}
              </h1>
              <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full">
                Registered Community Member
              </span>
            </div>
            <div className="text-xs text-neutral-500 mt-0.5">
              {currentUser.email} · {currentUser.phone} · Sacramento, CA
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onBrowseAdoptable}
            className="px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
          >
            Browse Adoptable Pets
          </button>
          <button
            onClick={onOpenDonate}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            Make Donation
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-neutral-200 gap-2 overflow-x-auto text-xs font-medium">
        <button
          onClick={() => setActiveTab('applications')}
          className={`py-2.5 px-4 border-b-2 font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'applications'
              ? 'border-emerald-800 text-emerald-900'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          My Adoption Applications ({myApplications.length}) (Story 28)
        </button>
        <button
          onClick={() => setActiveTab('foster')}
          className={`py-2.5 px-4 border-b-2 font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'foster'
              ? 'border-emerald-800 text-emerald-900'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          My Foster Pets ({myFosterAnimals.length}) (Story 41)
        </button>
        <button
          onClick={() => setActiveTab('shifts')}
          className={`py-2.5 px-4 border-b-2 font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'shifts'
              ? 'border-emerald-800 text-emerald-900'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          My Volunteer Shifts ({myShifts.length}) (Story 46)
        </button>
        <button
          onClick={() => setActiveTab('donations')}
          className={`py-2.5 px-4 border-b-2 font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'donations'
              ? 'border-emerald-800 text-emerald-900'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          My Donation Receipts ({myDonations.length}) (Story 48)
        </button>
      </div>

      {/* Tab 1: My Adoption Applications Status (Story 28) */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          {myApplications.length === 0 ? (
            <div className="text-center py-14 bg-white rounded-xl border border-neutral-200 p-6">
              <PawPrint className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
              <h3 className="font-semibold text-neutral-800">No applications submitted yet</h3>
              <p className="text-xs text-neutral-500 mt-1 mb-4">
                Explore our catalog of adoptable dogs, cats, and rabbits and submit your application online.
              </p>
              <button
                onClick={onBrowseAdoptable}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm"
              >
                Browse Adoptable Pets
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myApplications.map(app => (
                <div key={app.id} className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs space-y-4 text-xs">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={app.petPhotoUrl}
                        alt={app.petName}
                        className="w-14 h-14 rounded-xl object-cover border border-neutral-200"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-base text-neutral-900">{app.petName}</h3>
                          <span className="font-mono text-neutral-500 text-[10px]">{app.petId}</span>
                        </div>
                        <div className="text-neutral-500">{app.petSpecies} Adoption</div>
                        <div className="text-[11px] text-neutral-400 mt-0.5">Submitted: {app.submittedAt}</div>
                      </div>
                    </div>

                    {/* Status Badge (Story 28) */}
                    <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                      app.status === 'Approved' ? 'bg-emerald-100 text-emerald-900' :
                      app.status === 'Under Review' ? 'bg-sky-100 text-sky-900' :
                      app.status === 'Finalized' ? 'bg-purple-100 text-purple-900' :
                      app.status === 'Rejected' ? 'bg-rose-100 text-rose-900' :
                      'bg-amber-100 text-amber-900'
                    }`}>
                      {app.status}
                    </span>
                  </div>

                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100 space-y-1.5">
                    <div className="flex items-center justify-between text-neutral-600">
                      <span>Application Tracking ID:</span>
                      <strong className="font-mono text-neutral-900">{app.id}</strong>
                    </div>
                    {app.reviewNotes && (
                      <div className="pt-1 border-t border-neutral-200 text-neutral-700">
                        <strong>Shelter Review Notes:</strong> {app.reviewNotes}
                      </div>
                    )}
                    {app.decisionDate && (
                      <div className="text-[11px] text-neutral-500">
                        Reviewed on: {app.decisionDate} by {app.reviewedBy || 'Front Street Staff'}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: My Foster Pets (Story 41) */}
      {activeTab === 'foster' && (
        <div className="space-y-4">
          {myFosterAnimals.length === 0 ? (
            <div className="text-center py-14 bg-white rounded-xl border border-neutral-200 p-6">
              <Home className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
              <h3 className="font-semibold text-neutral-800">No animals currently assigned to your foster care</h3>
              <p className="text-xs text-neutral-500 mt-1">
                You can apply for our foster program to help bottle-baby kittens or recovering pets!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myFosterAnimals.map(animal => {
                const placement = animal.fosterPlacements?.[0];

                return (
                  <div key={animal.id} className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs space-y-4 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={animal.photoUrl}
                          alt={animal.name}
                          className="w-14 h-14 rounded-xl object-cover border border-neutral-200"
                        />
                        <div>
                          <h3 className="font-bold text-base text-neutral-900">{animal.name}</h3>
                          <div className="text-neutral-500">{animal.species} · {animal.breed}</div>
                          <div className="text-[11px] text-neutral-400">Current Weight: {animal.weightLbs} lbs</div>
                        </div>
                      </div>

                      <button
                        onClick={() => setFosterUpdateModalAnimal(animal)}
                        className="px-3 py-1.5 font-bold text-xs text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Log Progress</span>
                      </button>
                    </div>

                    {/* Recent updates */}
                    <div className="space-y-2">
                      <div className="font-semibold text-neutral-700">Recent Progress Logs:</div>
                      {placement?.updates && placement.updates.length > 0 ? (
                        placement.updates.slice(0, 3).map(upd => (
                          <div key={upd.id} className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-100 space-y-1">
                            <div className="flex items-center justify-between text-[11px] text-neutral-500">
                              <span>{upd.date}</span>
                              {upd.weightLbs && <span>Weight: {upd.weightLbs} lbs</span>}
                            </div>
                            <p className="text-neutral-700">{upd.notes}</p>
                          </div>
                        ))
                      ) : (
                        <div className="text-neutral-400 italic">No updates logged yet.</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: My Volunteer Shifts (Story 46) */}
      {activeTab === 'shifts' && (
        <div className="space-y-4">
          {myShifts.length === 0 ? (
            <div className="text-center py-14 bg-white rounded-xl border border-neutral-200 p-6">
              <Calendar className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
              <h3 className="font-semibold text-neutral-800">You are not signed up for any upcoming shifts</h3>
              <p className="text-xs text-neutral-500 mt-1">
                View available volunteer shifts under "Volunteers & Giving" to sign up!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myShifts.map(shift => (
                <div key={shift.id} className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs space-y-3 text-xs flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                      {shift.category}
                    </span>
                    <h3 className="font-bold text-neutral-900 text-base">
                      {shift.title}
                    </h3>
                    <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100 space-y-1 text-neutral-600">
                      <div><strong>Date:</strong> {shift.date}</div>
                      <div><strong>Time:</strong> {shift.timeWindow}</div>
                      <div><strong>Location:</strong> {shift.location}</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Shift Confirmed
                    </span>
                    <button
                      onClick={() => cancelShiftSignUp(shift.id, currentUser.email)}
                      className="px-2.5 py-1 text-rose-700 hover:text-rose-900 font-medium"
                    >
                      Cancel Reservation
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: My Donations (Story 48) */}
      {activeTab === 'donations' && (
        <div className="space-y-4">
          {myDonations.length === 0 ? (
            <div className="text-center py-14 bg-white rounded-xl border border-neutral-200 p-6">
              <DollarSign className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
              <h3 className="font-semibold text-neutral-800">No donation records found</h3>
              <p className="text-xs text-neutral-500 mt-1 mb-4">
                Thank you for considering a tax-deductible contribution to our animal rescue clinic.
              </p>
              <button
                onClick={onOpenDonate}
                className="px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm"
              >
                Make a Donation
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {myDonations.map(don => (
                <div key={don.id} className="bg-white rounded-xl border border-neutral-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-neutral-900">${don.amount.toFixed(2)}</span>
                      <span className="text-neutral-500">· {don.tierTitle}</span>
                      <span className="font-mono text-[10px] text-neutral-400">({don.receiptNumber})</span>
                    </div>
                    <div className="text-neutral-500 mt-0.5">
                      {don.timestamp} · {don.taxDeductibleEIN}
                    </div>
                    {don.tributeType && don.tributeType !== 'None' && (
                      <div className="text-neutral-600 mt-0.5">
                        Tribute: {don.tributeType} {don.tributeName}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 rounded-lg border border-neutral-300 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 font-medium flex items-center gap-1.5 transition-colors self-start sm:self-center"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Receipt</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal: Log Foster Update (Story 41) */}
      {fosterUpdateModalAnimal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-neutral-200 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <h3 className="text-base font-bold text-neutral-950 font-display">
                Submit Foster Update for {fosterUpdateModalAnimal.name}
              </h3>
              <button onClick={() => setFosterUpdateModalAnimal(null)}>✕</button>
            </div>
            <form onSubmit={handleFosterUpdateSubmit} className="space-y-3">
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Current Weight (lbs)</label>
                <input
                  type="number"
                  step="0.1"
                  value={fosterWeight}
                  onChange={e => setFosterWeight(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Behavior & Health Progress Notes *</label>
                <textarea
                  rows={3}
                  required
                  value={fosterNotes}
                  onChange={e => setFosterNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  placeholder="Appetite, energy, milestones..."
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setFosterUpdateModalAnimal(null)}
                  className="px-4 py-2 font-medium text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm"
                >
                  Save Progress Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
