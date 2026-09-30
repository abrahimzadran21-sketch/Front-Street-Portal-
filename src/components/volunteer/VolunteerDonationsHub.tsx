import React, { useState } from 'react';
import { useShelter } from '../../context/ShelterContext';
import { VolunteerShift, DonationRecord } from '../../types/shelter';
import { 
  Heart, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle, 
  Sparkles, 
  FileText, 
  Download, 
  Printer, 
  Plus, 
  X,
  CreditCard,
  DollarSign
} from 'lucide-react';

interface VolunteerDonationsHubProps {
  initialOpenDonation?: boolean;
}

export const VolunteerDonationsHub: React.FC<VolunteerDonationsHubProps> = ({ initialOpenDonation }) => {
  const { 
    volunteerShifts, 
    volunteerApplications, 
    donations, 
    role, 
    currentUser, 
    submitVolunteerApplication, 
    reviewVolunteerApplication, 
    signUpForShift, 
    cancelShiftSignUp, 
    addVolunteerShift, 
    submitDonation 
  } = useShelter();

  const [activeTab, setActiveTab] = useState<'shifts' | 'volunteer-app' | 'donate' | 'admin-apps'>('shifts');

  // Modals
  const [donateModalOpen, setDonateModalOpen] = useState(initialOpenDonation || false);
  const [createdReceipt, setCreatedReceipt] = useState<DonationRecord | null>(null);
  const [newShiftModalOpen, setNewShiftModalOpen] = useState(false);

  // Volunteer form state
  const [volName, setVolName] = useState(currentUser.name);
  const [volEmail, setVolEmail] = useState(currentUser.email);
  const [volPhone, setVolPhone] = useState(currentUser.phone);
  const [volInterests, setVolInterests] = useState<string[]>(['Dog Walking & Enrichment', 'Veterinary Clinic Support']);
  const [volAvailability, setVolAvailability] = useState<string[]>(['Weekend Mornings']);
  const [volExp, setVolExp] = useState('Passionate about animal rescue, previous experience walking dogs.');

  // Shift form state
  const [shiftTitle, setShiftTitle] = useState('Weekend Dog Walking');
  const [shiftCategory, setShiftCategory] = useState<VolunteerShift['category']>('Dog Walking & Enrichment');
  const [shiftDate, setShiftDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d.toISOString().slice(0, 10);
  });
  const [shiftTime, setShiftTime] = useState('9:00 AM - 12:00 PM');
  const [shiftLoc, setShiftLoc] = useState('Main Shelter - Dog Play Yards');
  const [shiftCapacity, setShiftCapacity] = useState(5);
  const [shiftDesc, setShiftDesc] = useState('Walking shelter dogs, providing puzzle toy enrichment, positive play.');

  // Donation form state
  const [donationAmount, setDonationAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [tierTitle, setTierTitle] = useState('Vaccine & Wellness Bundle');
  const [isMonthly, setIsMonthly] = useState(false);
  const [tributeType, setTributeType] = useState<'None' | 'In Honor of' | 'In Memory of'>('None');
  const [tributeName, setTributeName] = useState('');
  const [donorName, setDonorName] = useState(currentUser.name);
  const [donorEmail, setDonorEmail] = useState(currentUser.email);

  const donationTiers = [
    { amount: 25, title: 'Nutritious Meals for Shelter Pets', desc: 'Provides high-quality food, treats, and puppy milk formula for one week.' },
    { amount: 50, title: 'Core Vaccine & Microchip Package', desc: 'Covers essential Rabies, DHPP, and lifetime microchip registration.' },
    { amount: 100, title: 'Spay / Neuter Surgery Sponsorship', desc: 'Fully sponsors life-saving sterilization for a rescue dog or cat.' },
    { amount: 250, title: 'Emergency Medical & Trauma Fund', desc: 'Subsidizes critical surgeries, orthopedic repairs, and x-rays.' }
  ];

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitVolunteerApplication({
      applicantName: volName,
      email: volEmail,
      phone: volPhone,
      interests: volInterests,
      availability: volAvailability,
      experience: volExp
    });
    setActiveTab('shifts');
  };

  const handleNewShiftSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addVolunteerShift({
      title: shiftTitle,
      category: shiftCategory,
      date: shiftDate,
      timeWindow: shiftTime,
      location: shiftLoc,
      capacity: shiftCapacity,
      description: shiftDesc
    });
    setNewShiftModalOpen(false);
  };

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseFloat(customAmount) : donationAmount;
    if (!finalAmount || finalAmount <= 0) return;

    const receipt = submitDonation({
      donorName,
      donorEmail,
      amount: finalAmount,
      tierTitle: customAmount ? 'Custom Contribution' : tierTitle,
      isMonthly,
      tributeType,
      tributeName: tributeType !== 'None' ? tributeName : undefined,
      paymentMethod: 'Credit Card (**** 4242)'
    });

    setCreatedReceipt(receipt);
    setDonateModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            <Heart className="w-4 h-4 text-emerald-700" />
            Sacramento Community Giving & Volunteering
          </div>
          <h1 className="text-2xl font-bold font-display text-neutral-950 mt-1">
            Volunteer Shifts & Online Donations
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            100% of tax-deductible contributions support medical treatments, food, and rescue services at Front Street Animal Shelter.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setDonateModalOpen(true)}
            className="px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Make an Online Donation (Story 47)</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-neutral-200 gap-2 overflow-x-auto text-xs font-medium">
        <button
          onClick={() => setActiveTab('shifts')}
          className={`py-2.5 px-4 border-b-2 font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'shifts'
              ? 'border-emerald-800 text-emerald-900'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Available Volunteer Shifts (Stories 45 & 46)
        </button>
        <button
          onClick={() => setActiveTab('volunteer-app')}
          className={`py-2.5 px-4 border-b-2 font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'volunteer-app'
              ? 'border-emerald-800 text-emerald-900'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Volunteer Application (Story 43)
        </button>
        <button
          onClick={() => setActiveTab('donate')}
          className={`py-2.5 px-4 border-b-2 font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'donate'
              ? 'border-emerald-800 text-emerald-900'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Donation Program & Tiers
        </button>
        {role === 'admin' && (
          <button
            onClick={() => setActiveTab('admin-apps')}
            className={`py-2.5 px-4 border-b-2 font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'admin-apps'
                ? 'border-emerald-800 text-emerald-900'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Volunteer Applications Review (Story 44)
          </button>
        )}
      </div>

      {/* Tab 1: Available Volunteer Shifts (Stories 45 & 46) */}
      {activeTab === 'shifts' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="text-xs text-neutral-500">
              Select an upcoming shift to support dog walking, feline socialization, or veterinary clinic support.
            </div>
            {role === 'admin' && (
              <button
                onClick={() => setNewShiftModalOpen(true)}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Shift</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {volunteerShifts.map(shift => {
              const isRegistered = shift.registeredUsers.some(u => u.email === currentUser.email);
              const spotsLeft = shift.capacity - shift.registeredUsers.length;
              const isFull = spotsLeft <= 0;

              return (
                <div key={shift.id} className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                          {shift.category}
                        </span>
                        <h3 className="font-bold text-neutral-900 text-base mt-0.5">
                          {shift.title}
                        </h3>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        isRegistered ? 'bg-emerald-100 text-emerald-900' :
                        isFull ? 'bg-neutral-200 text-neutral-700' : 'bg-emerald-50 text-emerald-800'
                      }`}>
                        {isRegistered ? 'Registered' : `${spotsLeft} spots left`}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-600 bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                        <span className="font-medium">{shift.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{shift.timeWindow}</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:col-span-2">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        <span className="truncate">{shift.location}</span>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {shift.description}
                    </p>
                  </div>

                  {/* Registered volunteers preview & Actions */}
                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-neutral-500">
                      <Users className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{shift.registeredUsers.length}/{shift.capacity} signed up</span>
                    </div>

                    {isRegistered ? (
                      <button
                        onClick={() => cancelShiftSignUp(shift.id, currentUser.email)}
                        className="px-3 py-1.5 font-semibold text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors cursor-pointer"
                      >
                        Cancel Reservation
                      </button>
                    ) : (
                      <button
                        onClick={() => signUpForShift(shift.id, currentUser.name, currentUser.email)}
                        disabled={isFull}
                        className={`px-4 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
                          isFull
                            ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                            : 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-xs'
                        }`}
                      >
                        {isFull ? 'Shift Full' : 'Sign Up for Shift (Story 46)'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Volunteer Application (Story 43) */}
      {activeTab === 'volunteer-app' && (
        <div className="max-w-2xl bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-5 text-xs">
          <div>
            <h2 className="text-lg font-bold font-display text-neutral-950">
              Front Street Shelter Volunteer Application (Story 43)
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Join our passionate Sacramento volunteer corps and make a tangible difference in shelter animal lives.
            </p>
          </div>

          <form onSubmit={handleVolunteerSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={volName}
                  onChange={e => setVolName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={volEmail}
                  onChange={e => setVolEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-neutral-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={volPhone}
                onChange={e => setVolPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300"
              />
            </div>

            <div>
              <label className="block font-medium text-neutral-700 mb-1">Interests</label>
              <div className="grid grid-cols-2 gap-2 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                {['Dog Walking & Enrichment', 'Cattery Care & Cuddles', 'Veterinary Clinic Support', 'Adoption Events & Fairs', 'Food Pantry Distribution'].map(item => (
                  <label key={item} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={volInterests.includes(item)}
                      onChange={e => {
                        if (e.target.checked) setVolInterests([...volInterests, item]);
                        else setVolInterests(volInterests.filter(i => i !== item));
                      }}
                      className="w-4 h-4 text-emerald-700 rounded"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-medium text-neutral-700 mb-1">Availability</label>
              <div className="grid grid-cols-2 gap-2 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                {['Weekday Mornings', 'Weekday Afternoons', 'Weekend Mornings', 'Weekend Afternoons'].map(av => (
                  <label key={av} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={volAvailability.includes(av)}
                      onChange={e => {
                        if (e.target.checked) setVolAvailability([...volAvailability, av]);
                        else setVolAvailability(volAvailability.filter(i => i !== av));
                      }}
                      className="w-4 h-4 text-emerald-700 rounded"
                    />
                    <span>{av}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-medium text-neutral-700 mb-1">Experience & Background</label>
              <textarea
                rows={3}
                value={volExp}
                onChange={e => setVolExp(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                placeholder="Share any past volunteer or pet handling experience..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Submit Volunteer Application
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Donation Program & Tiers (Story 47) */}
      {activeTab === 'donate' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {donationTiers.map(tier => (
              <div key={tier.amount} className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="text-2xl font-bold font-mono text-emerald-800">
                    ${tier.amount}
                  </div>
                  <h3 className="font-bold text-neutral-900 text-sm">
                    {tier.title}
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    {tier.desc}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setDonationAmount(tier.amount);
                    setCustomAmount('');
                    setTierTitle(tier.title);
                    setDonateModalOpen(true);
                  }}
                  className="w-full py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
                >
                  Sponsor for ${tier.amount}
                </button>
              </div>
            ))}
          </div>

          {/* Tax information notice */}
          <div className="p-4 bg-neutral-100 rounded-xl text-xs text-neutral-600 flex items-center justify-between">
            <div>
              <strong>Front Street Animal Shelter Foundation</strong> is a 501(c)(3) tax-exempt public charity (EIN: 68-0194821). All gifts are fully tax-deductible.
            </div>
            <button
              onClick={() => setDonateModalOpen(true)}
              className="px-4 py-1.5 font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shrink-0 transition-colors cursor-pointer"
            >
              Donate Custom Amount
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Admin Review Volunteer Apps (Story 44) */}
      {activeTab === 'admin-apps' && (
        <div className="space-y-4">
          <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-neutral-100 text-neutral-700 font-semibold text-[11px]">
                  <th className="py-2.5 px-4">Applicant</th>
                  <th className="py-2.5 px-4">Contact</th>
                  <th className="py-2.5 px-4">Interests</th>
                  <th className="py-2.5 px-4">Availability</th>
                  <th className="py-2.5 px-4">Status</th>
                  <th className="py-2.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {volunteerApplications.map(app => (
                  <tr key={app.id} className="hover:bg-neutral-50">
                    <td className="py-3 px-4 font-semibold text-neutral-900">{app.applicantName}</td>
                    <td className="py-3 px-4 text-neutral-600">
                      <div>{app.email}</div>
                      <div className="text-[11px] text-neutral-400">{app.phone}</div>
                    </td>
                    <td className="py-3 px-4 text-neutral-600">
                      {app.interests.join(', ')}
                    </td>
                    <td className="py-3 px-4 text-neutral-600">
                      {app.availability.join(', ')}
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
                            onClick={() => reviewVolunteerApplication(app.id, 'Approved')}
                            className="px-2.5 py-1 text-[11px] font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => reviewVolunteerApplication(app.id, 'Declined')}
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

      {/* Modal: Online Donation (Story 47) */}
      {donateModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-neutral-200 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <h3 className="text-base font-bold text-neutral-950 font-display flex items-center gap-2">
                <Heart className="w-5 h-5 text-amber-600" />
                Support Front Street Animal Shelter
              </h3>
              <button onClick={() => setDonateModalOpen(false)}><X className="w-5 h-5 text-neutral-400" /></button>
            </div>
            <form onSubmit={handleDonationSubmit} className="space-y-4">
              <div>
                <label className="block font-medium text-neutral-700 mb-2">Select Donation Amount</label>
                <div className="grid grid-cols-4 gap-2">
                  {[25, 50, 100, 250].map(amt => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setDonationAmount(amt);
                        setCustomAmount('');
                      }}
                      className={`py-2 rounded-lg font-bold border transition-colors ${
                        donationAmount === amt && !customAmount
                          ? 'bg-amber-600 text-white border-amber-600'
                          : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">Or Custom Amount ($)</label>
                <input
                  type="number"
                  min="5"
                  step="1"
                  value={customAmount}
                  onChange={e => setCustomAmount(e.target.value)}
                  placeholder="Enter amount (e.g. 75)"
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Donor Name *</label>
                  <input
                    type="text"
                    required
                    value={donorName}
                    onChange={e => setDonorName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Email for Tax Receipt *</label>
                  <input
                    type="email"
                    required
                    value={donorEmail}
                    onChange={e => setDonorEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
              </div>

              {/* Dedication / Tribute */}
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 space-y-2">
                <label className="block font-medium text-neutral-700">Dedicate This Gift (Optional)</label>
                <div className="flex gap-2">
                  {(['None', 'In Honor of', 'In Memory of'] as const).map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setTributeType(type)}
                      className={`px-2.5 py-1 rounded text-[11px] border transition-colors ${
                        tributeType === type
                          ? 'bg-neutral-900 text-white border-neutral-900'
                          : 'bg-white text-neutral-700 border-neutral-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {tributeType !== 'None' && (
                  <input
                    type="text"
                    value={tributeName}
                    onChange={e => setTributeName(e.target.value)}
                    placeholder="Enter name of pet or person..."
                    className="w-full px-2.5 py-1.5 rounded border border-neutral-300 bg-white"
                  />
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isMonthly}
                  onChange={e => setIsMonthly(e.target.checked)}
                  id="monthly-check"
                  className="w-4 h-4 text-amber-600 rounded"
                />
                <label htmlFor="monthly-check" className="font-medium text-neutral-800 cursor-pointer">
                  Make this a recurring monthly gift to sustain our rescue clinic
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDonateModalOpen(false)}
                  className="px-4 py-2 font-medium text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm cursor-pointer"
                >
                  Complete Contribution (${customAmount || donationAmount})
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Instant Official Tax Receipt Confirmation (Story 48) */}
      {createdReceipt && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-neutral-200 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <div className="flex items-center gap-2 text-emerald-800">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-neutral-950 font-display">
                  Official Donation Receipt (Story 48)
                </h3>
              </div>
              <button onClick={() => setCreatedReceipt(null)}><X className="w-5 h-5 text-neutral-400" /></button>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2.5 font-sans">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-neutral-900">Front Street Animal Shelter Foundation</span>
                <span className="font-mono text-[10px] text-neutral-500">{createdReceipt.receiptNumber}</span>
              </div>
              <div className="text-[11px] text-neutral-500">
                Tax-Exempt Status: 501(c)(3) · {createdReceipt.taxDeductibleEIN}
              </div>
              <div className="pt-2 border-t border-neutral-200 flex items-center justify-between">
                <span>Donor:</span>
                <strong className="text-neutral-900">{createdReceipt.donorName}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Contribution Amount:</span>
                <strong className="text-emerald-800 font-mono text-base">${createdReceipt.amount.toFixed(2)}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Purpose:</span>
                <span>{createdReceipt.tierTitle || 'General Rescue Operations'}</span>
              </div>
              {createdReceipt.tributeType && createdReceipt.tributeType !== 'None' && (
                <div className="flex items-center justify-between">
                  <span>Dedication:</span>
                  <span>{createdReceipt.tributeType} {createdReceipt.tributeName}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-neutral-400 text-[10px] pt-1">
                <span>Date & Time:</span>
                <span>{createdReceipt.timestamp}</span>
              </div>
            </div>

            <p className="text-[11px] text-neutral-500 italic text-center">
              No goods or services were provided in exchange for this contribution. Please retain this receipt for federal and California income tax records.
            </p>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>
              <button
                onClick={() => setCreatedReceipt(null)}
                className="px-5 py-2 font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add New Volunteer Shift (Admin) */}
      {newShiftModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-neutral-200 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <h3 className="text-base font-bold text-neutral-950 font-display">
                Create Volunteer Shift
              </h3>
              <button onClick={() => setNewShiftModalOpen(false)}><X className="w-5 h-5 text-neutral-400" /></button>
            </div>
            <form onSubmit={handleNewShiftSubmit} className="space-y-3">
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Shift Title</label>
                <input
                  type="text"
                  required
                  value={shiftTitle}
                  onChange={e => setShiftTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Category</label>
                <select
                  value={shiftCategory}
                  onChange={e => setShiftCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white"
                >
                  <option value="Dog Walking & Enrichment">Dog Walking & Enrichment</option>
                  <option value="Cattery Care & Cuddles">Cattery Care & Cuddles</option>
                  <option value="Veterinary Clinic Support">Veterinary Clinic Support</option>
                  <option value="Adoption Center Welcome Desk">Adoption Center Welcome Desk</option>
                  <option value="Food Pantry Distribution">Food Pantry Distribution</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={shiftDate}
                    onChange={e => setShiftDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Time Window</label>
                  <input
                    type="text"
                    required
                    value={shiftTime}
                    onChange={e => setShiftTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={shiftLoc}
                    onChange={e => setShiftLoc(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Capacity</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    required
                    value={shiftCapacity}
                    onChange={e => setShiftCapacity(parseInt(e.target.value, 10) || 1)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
              </div>
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Description & Duties</label>
                <textarea
                  rows={2}
                  value={shiftDesc}
                  onChange={e => setShiftDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewShiftModalOpen(false)}
                  className="px-4 py-2 font-medium text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm"
                >
                  Publish Shift
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
