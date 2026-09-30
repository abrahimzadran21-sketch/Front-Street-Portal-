import React, { useState } from 'react';
import { useShelter } from '../../context/ShelterContext';
import { Animal, SpayNeuterStatus } from '../../types/shelter';
import { 
  Stethoscope, 
  Syringe, 
  Pill, 
  AlertCircle, 
  Calendar, 
  Clock, 
  CheckCircle, 
  ShieldCheck, 
  Plus, 
  Search, 
  Bell, 
  FileText,
  Scissors,
  X
} from 'lucide-react';

interface MedicalCarePortalProps {
  initialAnimalId?: string;
}

export const MedicalCarePortal: React.FC<MedicalCarePortalProps> = ({ initialAnimalId }) => {
  const { 
    animals, 
    role, 
    addVetExam, 
    addVaccination, 
    addMedication, 
    addCondition, 
    scheduleAppointment, 
    toggleMedicalClearance, 
    updateSpayNeuter,
    upcomingVaccineAlerts 
  } = useShelter();

  const [selectedAnimalId, setSelectedAnimalId] = useState<string>(
    initialAnimalId || animals[0]?.id || ''
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'exams' | 'vaccines' | 'medications' | 'conditions' | 'appointments'>('exams');

  // Modals for adding records
  const [examModalOpen, setExamModalOpen] = useState(false);
  const [vaxModalOpen, setVaxModalOpen] = useState(false);
  const [medModalOpen, setMedModalOpen] = useState(false);
  const [condModalOpen, setCondModalOpen] = useState(false);
  const [apptModalOpen, setApptModalOpen] = useState(false);

  // Form states
  const [vetName, setVetName] = useState('Dr. Sarah Lin, DVM');
  const [examWeight, setExamWeight] = useState(50);
  const [examTemp, setExamTemp] = useState(101.4);
  const [examHeartRate, setExamHeartRate] = useState(90);
  const [examDental, setExamDental] = useState<'Grade 0 (Clean)' | 'Grade 1 (Mild Tartar)' | 'Grade 2 (Moderate)' | 'Grade 3 (Severe)'>('Grade 0 (Clean)');
  const [examFindings, setExamFindings] = useState('Clear auscultation, normal eye/ear exam, no parasites.');
  const [examCleared, setExamCleared] = useState(true);

  // Vax form
  const [vaxName, setVaxName] = useState('DHPP Core');
  const [vaxAdminDate, setVaxAdminDate] = useState(new Date().toISOString().slice(0, 10));
  const [vaxExpDate, setVaxExpDate] = useState(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    return d.toISOString().slice(0, 10);
  });
  const [vaxBatch, setVaxBatch] = useState('LOT-2026-X8');

  // Med form
  const [medName, setMedName] = useState('Amoxicillin / Clavamox');
  const [medDosage, setMedDosage] = useState('250 mg');
  const [medFrequency, setMedFrequency] = useState('Twice daily with meals');
  const [medStartDate, setMedStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [medEndDate, setMedEndDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 10);
    return d.toISOString().slice(0, 10);
  });
  const [medInstructions, setMedInstructions] = useState('Complete entire 10-day antibiotic course.');

  // Condition form
  const [condDiagnosis, setCondDiagnosis] = useState('Upper Respiratory Infection (Mild)');
  const [condSeverity, setCondSeverity] = useState<'Mild' | 'Moderate' | 'Severe' | 'Chronic'>('Mild');
  const [condTreatment, setCondTreatment] = useState('Doxycycline 100mg PO BID x 14 days + humidity therapy.');

  // Appt form
  const [apptDate, setApptDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().slice(0, 10);
  });
  const [apptTime, setApptTime] = useState('10:00 AM');
  const [apptReason, setApptReason] = useState('Post-op incision check & vaccination booster');

  const selectedAnimal = animals.find(a => a.id === selectedAnimalId) || animals[0];

  const filteredAnimals = animals.filter(a => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return a.name.toLowerCase().includes(q) || 
      a.id.toLowerCase().includes(q) || 
      a.breed.toLowerCase().includes(q);
  });

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAnimal) return;
    addVetExam(selectedAnimal.id, {
      date: new Date().toISOString().slice(0, 10),
      veterinarian: vetName,
      weightLbs: examWeight,
      temperatureF: examTemp,
      heartRateBpm: examHeartRate,
      dentalGrade: examDental,
      findings: examFindings,
      clearedForAdoption: examCleared
    });
    setExamModalOpen(false);
  };

  const handleCreateVaccine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAnimal) return;
    addVaccination(selectedAnimal.id, {
      vaccineName: vaxName,
      administeredDate: vaxAdminDate,
      expirationDate: vaxExpDate,
      administeredBy: vetName,
      batchNumber: vaxBatch
    });
    setVaxModalOpen(false);
  };

  const handleCreateMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAnimal) return;
    addMedication(selectedAnimal.id, {
      medicationName: medName,
      dosage: medDosage,
      frequency: medFrequency,
      startDate: medStartDate,
      endDate: medEndDate,
      prescribedBy: vetName,
      instructions: medInstructions,
      status: 'Active'
    });
    setMedModalOpen(false);
  };

  const handleCreateCondition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAnimal) return;
    addCondition(selectedAnimal.id, {
      diagnosis: condDiagnosis,
      diagnosedDate: new Date().toISOString().slice(0, 10),
      severity: condSeverity,
      treatmentPlan: condTreatment,
      resolved: false
    });
    setCondModalOpen(false);
  };

  const handleCreateAppt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAnimal) return;
    scheduleAppointment(selectedAnimal.id, {
      scheduledDate: apptDate,
      scheduledTime: apptTime,
      reason: apptReason,
      veterinarian: vetName,
      status: 'Scheduled'
    });
    setApptModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Top Section Header */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            <Stethoscope className="w-4 h-4 text-emerald-700" />
            Veterinary Care & Clinic Center
          </div>
          <h1 className="text-2xl font-bold font-display text-neutral-950 mt-1">
            Animal Health & Medical Records
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Full clinical documentation: examinations, vaccinations, pharmaceuticals, chronic conditions, and surgical clearances.
          </p>
        </div>

        {/* Quick Vaccine Alert Badge & Trigger */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3">
            <Bell className="w-5 h-5 text-amber-700 shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-amber-900">
                {upcomingVaccineAlerts.length} Upcoming Vaccine Reminders
              </div>
              <div className="text-amber-800">
                Animals due for booster in &lt; 30 days
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout: Left animal selector + Right medical chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Col: Animal Selector (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-neutral-200 bg-neutral-50/60">
            <label className="block text-xs font-semibold text-neutral-700 mb-2">
              Select Animal Patient
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Filter by name or ID..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-neutral-300 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>
          </div>

          <div className="max-h-[600px] overflow-y-auto divide-y divide-neutral-100">
            {filteredAnimals.map(animal => {
              const isSelected = animal.id === selectedAnimal?.id;
              const hasAlert = upcomingVaccineAlerts.some(a => a.animal.id === animal.id);

              return (
                <button
                  key={animal.id}
                  onClick={() => setSelectedAnimalId(animal.id)}
                  className={`w-full text-left p-3.5 flex items-center gap-3 hover:bg-neutral-50 transition-colors ${
                    isSelected ? 'bg-emerald-50/70 border-l-4 border-emerald-800' : ''
                  }`}
                >
                  <img
                    src={animal.photoUrl}
                    alt={animal.name}
                    className="w-11 h-11 rounded-lg object-cover border border-neutral-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-neutral-900 text-xs truncate">
                        {animal.name}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500 tabular-nums">
                        {animal.id}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-500 truncate">
                      {animal.species} · {animal.breed}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-[10px]">
                      {animal.medicallyCleared ? (
                        <span className="text-emerald-700 font-medium flex items-center gap-0.5">
                          <CheckCircle className="w-3 h-3" /> Cleared
                        </span>
                      ) : (
                        <span className="text-amber-700 font-medium flex items-center gap-0.5">
                          <AlertCircle className="w-3 h-3" /> Hold / Pending
                        </span>
                      )}
                      {hasAlert && (
                        <span className="text-amber-600 font-bold">· Vax Due</span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Col: Medical Chart & Controls (8 cols) */}
        {selectedAnimal && (
          <div className="lg:col-span-8 space-y-6">
            {/* Top Patient Clinical Header & Fast Controls */}
            <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedAnimal.photoUrl}
                    alt={selectedAnimal.name}
                    className="w-14 h-14 rounded-xl object-cover border border-neutral-200"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold font-display text-neutral-900">
                        {selectedAnimal.name}
                      </h2>
                      <span className="text-xs font-mono font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                        {selectedAnimal.id}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-500">
                      {selectedAnimal.species} · {selectedAnimal.breed} · {selectedAnimal.sex} · Weight: {selectedAnimal.weightLbs} lbs
                    </div>
                  </div>
                </div>

                {/* Medical Clearance Toggle Switch (Story 16) */}
                <div className="flex flex-col sm:items-end">
                  <span className="text-[11px] font-medium text-neutral-500 mb-1">
                    Adoption Clearance Status (Story 16)
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleMedicalClearance(selectedAnimal.id, !selectedAnimal.medicallyCleared)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        selectedAnimal.medicallyCleared
                          ? 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                          : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                      }`}
                    >
                      {selectedAnimal.medicallyCleared ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-emerald-700" />
                          <span>Medically Cleared for Adoption</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-amber-700" />
                          <span>Medical Hold (Not Cleared)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Spay / Neuter Management (Story 17) */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                <div className="flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-neutral-600" />
                  <span className="font-semibold text-neutral-800">Spay / Neuter Status:</span>
                  <span className="text-neutral-700 font-medium">{selectedAnimal.spayNeuterStatus}</span>
                  {selectedAnimal.spayNeuterDate && (
                    <span className="text-neutral-500">({selectedAnimal.spayNeuterDate})</span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-neutral-500 text-[11px]">Update:</span>
                  {(['Spayed', 'Neutered', 'Intact', 'Scheduled'] as SpayNeuterStatus[]).map(status => (
                    <button
                      key={status}
                      onClick={() => updateSpayNeuter(selectedAnimal.id, status)}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium border transition-colors ${
                        selectedAnimal.spayNeuterStatus === status
                          ? 'bg-emerald-800 text-white border-emerald-800'
                          : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Add Record */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={() => setExamModalOpen(true)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Log Vet Exam (Story 11)</span>
                </button>
                <button
                  onClick={() => setVaxModalOpen(true)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-800 text-white hover:bg-emerald-900 flex items-center gap-1 transition-colors"
                >
                  <Syringe className="w-3.5 h-3.5" />
                  <span>Record Vaccine (Story 12)</span>
                </button>
                <button
                  onClick={() => setMedModalOpen(true)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-sky-800 text-white hover:bg-sky-900 flex items-center gap-1 transition-colors"
                >
                  <Pill className="w-3.5 h-3.5" />
                  <span>Prescribe Med (Story 13)</span>
                </button>
                <button
                  onClick={() => setCondModalOpen(true)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-neutral-300 text-neutral-800 hover:bg-neutral-100 flex items-center gap-1 transition-colors"
                >
                  <span>Add Condition (Story 14)</span>
                </button>
                <button
                  onClick={() => setApptModalOpen(true)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-neutral-300 text-neutral-800 hover:bg-neutral-100 flex items-center gap-1 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Schedule Appt (Story 15)</span>
                </button>
              </div>
            </div>

            {/* Medical Tabs */}
            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs">
              <div className="flex items-center border-b border-neutral-200 bg-neutral-50/70 px-4 pt-2 gap-2 overflow-x-auto text-xs font-medium">
                <button
                  onClick={() => setActiveTab('exams')}
                  className={`py-2 px-3 border-b-2 font-semibold transition-colors whitespace-nowrap ${
                    activeTab === 'exams'
                      ? 'border-emerald-800 text-emerald-900'
                      : 'border-transparent text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Clinical Exams ({selectedAnimal.medicalExams?.length || 0})
                </button>
                <button
                  onClick={() => setActiveTab('vaccines')}
                  className={`py-2 px-3 border-b-2 font-semibold transition-colors whitespace-nowrap ${
                    activeTab === 'vaccines'
                      ? 'border-emerald-800 text-emerald-900'
                      : 'border-transparent text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Vaccinations ({selectedAnimal.vaccinations?.length || 0})
                </button>
                <button
                  onClick={() => setActiveTab('medications')}
                  className={`py-2 px-3 border-b-2 font-semibold transition-colors whitespace-nowrap ${
                    activeTab === 'medications'
                      ? 'border-emerald-800 text-emerald-900'
                      : 'border-transparent text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Medications ({selectedAnimal.medications?.length || 0})
                </button>
                <button
                  onClick={() => setActiveTab('conditions')}
                  className={`py-2 px-3 border-b-2 font-semibold transition-colors whitespace-nowrap ${
                    activeTab === 'conditions'
                      ? 'border-emerald-800 text-emerald-900'
                      : 'border-transparent text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Diagnoses & Conditions ({selectedAnimal.conditions?.length || 0})
                </button>
                <button
                  onClick={() => setActiveTab('appointments')}
                  className={`py-2 px-3 border-b-2 font-semibold transition-colors whitespace-nowrap ${
                    activeTab === 'appointments'
                      ? 'border-emerald-800 text-emerald-900'
                      : 'border-transparent text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Follow-Up Appts ({selectedAnimal.appointments?.length || 0})
                </button>
              </div>

              {/* Tab Contents */}
              <div className="p-5 text-xs">
                {/* 1. Clinical Exams */}
                {activeTab === 'exams' && (
                  <div className="space-y-4">
                    {(!selectedAnimal.medicalExams || selectedAnimal.medicalExams.length === 0) ? (
                      <div className="text-center py-10 text-neutral-400">
                        No clinical exams recorded for this animal yet.
                      </div>
                    ) : (
                      selectedAnimal.medicalExams.map(exam => (
                        <div key={exam.id} className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-neutral-900 text-sm">
                              {exam.veterinarian}
                            </span>
                            <span className="text-neutral-500 font-mono">
                              Date: {exam.date}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] text-neutral-600">
                            <div>Weight: <strong className="text-neutral-800">{exam.weightLbs} lbs</strong></div>
                            <div>Temp: <strong className="text-neutral-800">{exam.temperatureF ?? '—'} °F</strong></div>
                            <div>Heart Rate: <strong className="text-neutral-800">{exam.heartRateBpm ?? '—'} bpm</strong></div>
                            <div>Dental: <strong className="text-neutral-800">{exam.dentalGrade}</strong></div>
                          </div>

                          <div className="pt-2 text-neutral-700 leading-relaxed bg-white p-3 rounded-lg border border-neutral-100">
                            <strong>Clinical Findings:</strong> {exam.findings}
                          </div>

                          <div className="pt-1 flex items-center justify-between text-[11px]">
                            <span className="text-neutral-500">Exam ID: {exam.id}</span>
                            <span className={exam.clearedForAdoption ? 'text-emerald-700 font-semibold' : 'text-amber-700 font-semibold'}>
                              {exam.clearedForAdoption ? '✓ Recommended Cleared for Adoption' : '⚠ Recommended Medical Hold'}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* 2. Vaccinations */}
                {activeTab === 'vaccines' && (
                  <div className="space-y-3">
                    {(!selectedAnimal.vaccinations || selectedAnimal.vaccinations.length === 0) ? (
                      <div className="text-center py-10 text-neutral-400">
                        No vaccinations recorded yet.
                      </div>
                    ) : (
                      <div className="border border-neutral-200 rounded-xl overflow-hidden">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-neutral-100 text-neutral-700 font-semibold text-[11px]">
                              <th className="py-2.5 px-3">Vaccine Name</th>
                              <th className="py-2.5 px-3">Administered</th>
                              <th className="py-2.5 px-3">Expiration Date</th>
                              <th className="py-2.5 px-3">Batch / Lot</th>
                              <th className="py-2.5 px-3">Administered By</th>
                              <th className="py-2.5 px-3">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-100">
                            {selectedAnimal.vaccinations.map(vax => {
                              const expDate = new Date(vax.expirationDate);
                              const isExpired = expDate < new Date();

                              return (
                                <tr key={vax.id} className="hover:bg-neutral-50">
                                  <td className="py-2.5 px-3 font-semibold text-neutral-900">{vax.vaccineName}</td>
                                  <td className="py-2.5 px-3 font-mono text-neutral-600">{vax.administeredDate}</td>
                                  <td className="py-2.5 px-3 font-mono text-neutral-600">{vax.expirationDate}</td>
                                  <td className="py-2.5 px-3 font-mono text-neutral-500">{vax.batchNumber || '—'}</td>
                                  <td className="py-2.5 px-3 text-neutral-600">{vax.administeredBy}</td>
                                  <td className="py-2.5 px-3">
                                    {isExpired ? (
                                      <span className="text-rose-700 font-semibold">Overdue / Expired</span>
                                    ) : (
                                      <span className="text-emerald-700 font-semibold">Current</span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. Medications */}
                {activeTab === 'medications' && (
                  <div className="space-y-3">
                    {(!selectedAnimal.medications || selectedAnimal.medications.length === 0) ? (
                      <div className="text-center py-10 text-neutral-400">
                        No active or past medications recorded.
                      </div>
                    ) : (
                      selectedAnimal.medications.map(med => (
                        <div key={med.id} className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-neutral-900 text-sm">
                              {med.medicationName} ({med.dosage})
                            </span>
                            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-900">
                              {med.status}
                            </span>
                          </div>
                          <div className="text-neutral-600">
                            <strong>Frequency:</strong> {med.frequency} · <strong>Duration:</strong> {med.startDate} to {med.endDate}
                          </div>
                          <div className="text-neutral-700 bg-white p-2.5 rounded-lg border border-neutral-100">
                            {med.instructions}
                          </div>
                          <div className="text-[11px] text-neutral-400">
                            Prescribed by: {med.prescribedBy}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* 4. Diagnoses & Conditions */}
                {activeTab === 'conditions' && (
                  <div className="space-y-3">
                    {(!selectedAnimal.conditions || selectedAnimal.conditions.length === 0) ? (
                      <div className="text-center py-10 text-neutral-400">
                        No chronic or acute conditions diagnosed.
                      </div>
                    ) : (
                      selectedAnimal.conditions.map(cond => (
                        <div key={cond.id} className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-neutral-900 text-sm">
                              {cond.diagnosis}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-900">
                              {cond.severity} Severity
                            </span>
                          </div>
                          <div className="text-neutral-700 bg-white p-2.5 rounded-lg border border-neutral-100">
                            <strong>Treatment Plan:</strong> {cond.treatmentPlan}
                          </div>
                          <div className="text-[11px] text-neutral-400">
                            Diagnosed on: {cond.diagnosedDate} · Status: {cond.resolved ? 'Resolved' : 'Active Management'}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* 5. Appointments */}
                {activeTab === 'appointments' && (
                  <div className="space-y-3">
                    {(!selectedAnimal.appointments || selectedAnimal.appointments.length === 0) ? (
                      <div className="text-center py-10 text-neutral-400">
                        No upcoming medical appointments scheduled.
                      </div>
                    ) : (
                      selectedAnimal.appointments.map(appt => (
                        <div key={appt.id} className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 flex items-center justify-between gap-4">
                          <div>
                            <div className="font-bold text-neutral-900 text-sm">
                              {appt.reason}
                            </div>
                            <div className="text-neutral-600 mt-0.5">
                              {appt.veterinarian}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono font-bold text-emerald-900">
                              {appt.scheduledDate} · {appt.scheduledTime}
                            </div>
                            <div className="text-[11px] text-neutral-500">
                              Status: {appt.status}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Log Vet Exam */}
      {examModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-neutral-200 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <h3 className="text-base font-bold text-neutral-950 font-display">
                Record Clinical Veterinary Examination
              </h3>
              <button onClick={() => setExamModalOpen(false)}><X className="w-5 h-5 text-neutral-400" /></button>
            </div>
            <form onSubmit={handleCreateExam} className="space-y-3">
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Attending Veterinarian</label>
                <input
                  type="text"
                  required
                  value={vetName}
                  onChange={e => setVetName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Weight (lbs)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={examWeight}
                    onChange={e => setExamWeight(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Temp (°F)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={examTemp}
                    onChange={e => setExamTemp(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Heart Rate (bpm)</label>
                  <input
                    type="number"
                    value={examHeartRate}
                    onChange={e => setExamHeartRate(parseInt(e.target.value, 10) || 0)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
              </div>
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Dental Evaluation</label>
                <select
                  value={examDental}
                  onChange={e => setExamDental(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white"
                >
                  <option value="Grade 0 (Clean)">Grade 0 (Clean)</option>
                  <option value="Grade 1 (Mild Tartar)">Grade 1 (Mild Tartar)</option>
                  <option value="Grade 2 (Moderate)">Grade 2 (Moderate)</option>
                  <option value="Grade 3 (Severe)">Grade 3 (Severe)</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Clinical Findings & Notes</label>
                <textarea
                  rows={3}
                  required
                  value={examFindings}
                  onChange={e => setExamFindings(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={examCleared}
                    onChange={e => setExamCleared(e.target.checked)}
                    className="w-4 h-4 text-emerald-700 rounded border-neutral-300"
                  />
                  <span className="font-semibold text-neutral-800">
                    Certify animal as medically cleared for adoption
                  </span>
                </label>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setExamModalOpen(false)}
                  className="px-4 py-2 font-medium text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm"
                >
                  Save Exam
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Record Vaccination */}
      {vaxModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-neutral-200 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <h3 className="text-base font-bold text-neutral-950 font-display">
                Record Vaccine Administration
              </h3>
              <button onClick={() => setVaxModalOpen(false)}><X className="w-5 h-5 text-neutral-400" /></button>
            </div>
            <form onSubmit={handleCreateVaccine} className="space-y-3">
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Vaccine Name</label>
                <input
                  type="text"
                  required
                  value={vaxName}
                  onChange={e => setVaxName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  placeholder="e.g. Rabies (3-Year), DHPP, FVRCP, Bordetella"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Administered Date</label>
                  <input
                    type="date"
                    required
                    value={vaxAdminDate}
                    onChange={e => setVaxAdminDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Expiration / Booster Date</label>
                  <input
                    type="date"
                    required
                    value={vaxExpDate}
                    onChange={e => setVaxExpDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
              </div>
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Batch / Serial Number</label>
                <input
                  type="text"
                  value={vaxBatch}
                  onChange={e => setVaxBatch(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setVaxModalOpen(false)}
                  className="px-4 py-2 font-medium text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm"
                >
                  Log Vaccine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Prescribe Medication */}
      {medModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-neutral-200 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <h3 className="text-base font-bold text-neutral-950 font-display">
                Prescribe Medication
              </h3>
              <button onClick={() => setMedModalOpen(false)}><X className="w-5 h-5 text-neutral-400" /></button>
            </div>
            <form onSubmit={handleCreateMedication} className="space-y-3">
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Medication Name & Strength</label>
                <input
                  type="text"
                  required
                  value={medName}
                  onChange={e => setMedName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Dosage</label>
                  <input
                    type="text"
                    required
                    value={medDosage}
                    onChange={e => setMedDosage(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Frequency</label>
                  <input
                    type="text"
                    required
                    value={medFrequency}
                    onChange={e => setMedFrequency(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={medStartDate}
                    onChange={e => setMedStartDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={medEndDate}
                    onChange={e => setMedEndDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
              </div>
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Administration Instructions</label>
                <textarea
                  rows={2}
                  value={medInstructions}
                  onChange={e => setMedInstructions(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setMedModalOpen(false)}
                  className="px-4 py-2 font-medium text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-sky-800 hover:bg-sky-900 rounded-lg shadow-sm"
                >
                  Prescribe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Record Condition */}
      {condModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-neutral-200 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <h3 className="text-base font-bold text-neutral-950 font-display">
                Record Medical Condition / Diagnosis
              </h3>
              <button onClick={() => setCondModalOpen(false)}><X className="w-5 h-5 text-neutral-400" /></button>
            </div>
            <form onSubmit={handleCreateCondition} className="space-y-3">
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Diagnosis</label>
                <input
                  type="text"
                  required
                  value={condDiagnosis}
                  onChange={e => setCondDiagnosis(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Severity</label>
                <select
                  value={condSeverity}
                  onChange={e => setCondSeverity(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white"
                >
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                  <option value="Chronic">Chronic Management</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Treatment Plan</label>
                <textarea
                  rows={3}
                  required
                  value={condTreatment}
                  onChange={e => setCondTreatment(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCondModalOpen(false)}
                  className="px-4 py-2 font-medium text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm"
                >
                  Save Condition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Schedule Follow-up Appointment */}
      {apptModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-neutral-200 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <h3 className="text-base font-bold text-neutral-950 font-display">
                Schedule Follow-up Medical Appointment
              </h3>
              <button onClick={() => setApptModalOpen(false)}><X className="w-5 h-5 text-neutral-400" /></button>
            </div>
            <form onSubmit={handleCreateAppt} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={apptDate}
                    onChange={e => setApptDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Time</label>
                  <input
                    type="text"
                    required
                    value={apptTime}
                    onChange={e => setApptTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                    placeholder="e.g. 10:30 AM"
                  />
                </div>
              </div>
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Reason for Visit</label>
                <input
                  type="text"
                  required
                  value={apptReason}
                  onChange={e => setApptReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setApptModalOpen(false)}
                  className="px-4 py-2 font-medium text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm"
                >
                  Schedule Visit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
