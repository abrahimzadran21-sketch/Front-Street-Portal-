import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  Animal,
  Role,
  AdoptionApplication,
  LostPetReport,
  FoundAnimalReport,
  FosterApplication,
  VolunteerApplication,
  VolunteerShift,
  DonationRecord,
  VetExam,
  Vaccination,
  Medication,
  MedicalCondition,
  MedicalAppointment,
  FosterPlacement,
  FosterProgressUpdate,
  AdoptionRecord,
  ReturnToOwnerRecord,
  SpayNeuterStatus
} from '../types/shelter';
import {
  INITIAL_ANIMALS,
  INITIAL_ADOPTION_APPLICATIONS,
  INITIAL_LOST_REPORTS,
  INITIAL_FOUND_REPORTS,
  INITIAL_VOLUNTEER_SHIFTS,
  INITIAL_FOSTER_APPLICATIONS,
  INITIAL_VOLUNTEER_APPLICATIONS,
  INITIAL_DONATIONS
} from '../data/initialData';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface ShelterContextType {
  role: Role;
  setRole: (role: Role) => void;
  currentUser: {
    name: string;
    email: string;
    phone: string;
  };
  setCurrentUser: React.Dispatch<React.SetStateAction<{ name: string; email: string; phone: string }>>;
  
  animals: Animal[];
  addAnimal: (animal: Omit<Animal, 'id'> & { customId?: string }) => Animal;
  updateAnimal: (id: string, updates: Partial<Animal>) => void;
  deleteAnimal: (id: string) => void;
  getNextAnimalId: () => string;
  
  // Medical
  addVetExam: (animalId: string, exam: Omit<VetExam, 'id'>) => void;
  addVaccination: (animalId: string, vax: Omit<Vaccination, 'id'>) => void;
  addMedication: (animalId: string, med: Omit<Medication, 'id'>) => void;
  addCondition: (animalId: string, cond: Omit<MedicalCondition, 'id'>) => void;
  scheduleAppointment: (animalId: string, appt: Omit<MedicalAppointment, 'id'>) => void;
  toggleMedicalClearance: (animalId: string, cleared: boolean) => void;
  updateSpayNeuter: (animalId: string, status: SpayNeuterStatus, date?: string) => void;
  upcomingVaccineAlerts: { animal: Animal; vax: Vaccination; daysRemaining: number }[];

  // Adoption
  adoptionApplications: AdoptionApplication[];
  submitAdoptionApplication: (app: Omit<AdoptionApplication, 'id' | 'submittedAt' | 'status'>) => AdoptionApplication;
  reviewAdoptionApplication: (appId: string, status: 'Approved' | 'Rejected', reviewNotes: string, reviewerName: string) => void;
  finalizeAdoption: (animalId: string, record: AdoptionRecord) => void;

  // Lost & Found
  lostReports: LostPetReport[];
  foundReports: FoundAnimalReport[];
  submitLostReport: (report: Omit<LostPetReport, 'id' | 'reportedAt' | 'status'>) => LostPetReport;
  submitFoundReport: (report: Omit<FoundAnimalReport, 'id' | 'reportedAt' | 'status'>) => FoundAnimalReport;
  markReturnedToOwner: (animalId: string, record: ReturnToOwnerRecord, lostReportId?: string) => void;
  matchLostReport: (lostReportId: string, animalId: string) => void;

  // Foster
  fosterApplications: FosterApplication[];
  submitFosterApplication: (app: Omit<FosterApplication, 'id' | 'submittedAt' | 'status'>) => FosterApplication;
  reviewFosterApplication: (appId: string, status: 'Approved' | 'Declined', notes?: string) => void;
  assignAnimalToFoster: (animalId: string, placement: Omit<FosterPlacement, 'id' | 'status' | 'updates'>) => void;
  addFosterProgressUpdate: (animalId: string, update: Omit<FosterProgressUpdate, 'id'>) => void;
  returnAnimalFromFoster: (animalId: string, notes?: string) => void;

  // Volunteers & Donations
  volunteerApplications: VolunteerApplication[];
  volunteerShifts: VolunteerShift[];
  donations: DonationRecord[];
  submitVolunteerApplication: (app: Omit<VolunteerApplication, 'id' | 'submittedAt' | 'status'>) => VolunteerApplication;
  reviewVolunteerApplication: (appId: string, status: 'Approved' | 'Declined') => void;
  signUpForShift: (shiftId: string, name: string, email: string) => boolean;
  cancelShiftSignUp: (shiftId: string, email: string) => void;
  addVolunteerShift: (shift: Omit<VolunteerShift, 'id' | 'registeredUsers'>) => void;
  submitDonation: (donation: Omit<DonationRecord, 'id' | 'receiptNumber' | 'timestamp' | 'taxDeductibleEIN'>) => DonationRecord;

  // UI / Global
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  resetDemoData: () => void;
}

const safeGetItem = (key: string): string | null => {
  try {
    return typeof window !== 'undefined' && window.localStorage ? window.localStorage.getItem(key) : null;
  } catch {
    return null;
  }
};

const safeSetItem = (key: string, value: string): void => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch {
    // Ignore restricted iframe storage exceptions
  }
};

const safeRemoveItem = (key: string): void => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(key);
    }
  } catch {
    // Ignore storage exceptions
  }
};

const ShelterContext = createContext<ShelterContextType | undefined>(undefined);

export const ShelterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>(() => {
    return (safeGetItem('fsas_role') as Role) || 'public';
  });

  const [currentUser, setCurrentUser] = useState(() => ({
    name: 'Samantha Cooper',
    email: 'abrahimzadran21@gmail.com',
    phone: '(916) 555-0144'
  }));

  const [animals, setAnimals] = useState<Animal[]>(() => {
    try {
      const saved = safeGetItem('fsas_animals_v2');
      return saved ? JSON.parse(saved) : INITIAL_ANIMALS;
    } catch {
      return INITIAL_ANIMALS;
    }
  });

  const [adoptionApplications, setAdoptionApplications] = useState<AdoptionApplication[]>(() => {
    try {
      const saved = safeGetItem('fsas_applications_v2');
      return saved ? JSON.parse(saved) : INITIAL_ADOPTION_APPLICATIONS;
    } catch {
      return INITIAL_ADOPTION_APPLICATIONS;
    }
  });

  const [lostReports, setLostReports] = useState<LostPetReport[]>(() => {
    try {
      const saved = safeGetItem('fsas_lost_v2');
      return saved ? JSON.parse(saved) : INITIAL_LOST_REPORTS;
    } catch {
      return INITIAL_LOST_REPORTS;
    }
  });

  const [foundReports, setFoundReports] = useState<FoundAnimalReport[]>(() => {
    try {
      const saved = safeGetItem('fsas_found_v2');
      return saved ? JSON.parse(saved) : INITIAL_FOUND_REPORTS;
    } catch {
      return INITIAL_FOUND_REPORTS;
    }
  });

  const [fosterApplications, setFosterApplications] = useState<FosterApplication[]>(() => {
    try {
      const saved = safeGetItem('fsas_foster_apps_v2');
      return saved ? JSON.parse(saved) : INITIAL_FOSTER_APPLICATIONS;
    } catch {
      return INITIAL_FOSTER_APPLICATIONS;
    }
  });

  const [volunteerApplications, setVolunteerApplications] = useState<VolunteerApplication[]>(() => {
    try {
      const saved = safeGetItem('fsas_vol_apps_v2');
      return saved ? JSON.parse(saved) : INITIAL_VOLUNTEER_APPLICATIONS;
    } catch {
      return INITIAL_VOLUNTEER_APPLICATIONS;
    }
  });

  const [volunteerShifts, setVolunteerShifts] = useState<VolunteerShift[]>(() => {
    try {
      const saved = safeGetItem('fsas_shifts_v2');
      return saved ? JSON.parse(saved) : INITIAL_VOLUNTEER_SHIFTS;
    } catch {
      return INITIAL_VOLUNTEER_SHIFTS;
    }
  });

  const [donations, setDonations] = useState<DonationRecord[]>(() => {
    try {
      const saved = safeGetItem('fsas_donations_v2');
      return saved ? JSON.parse(saved) : INITIAL_DONATIONS;
    } catch {
      return INITIAL_DONATIONS;
    }
  });

  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync state to localStorage safely
  useEffect(() => {
    safeSetItem('fsas_role', role);
  }, [role]);

  useEffect(() => {
    safeSetItem('fsas_animals_v2', JSON.stringify(animals));
  }, [animals]);

  useEffect(() => {
    safeSetItem('fsas_applications_v2', JSON.stringify(adoptionApplications));
  }, [adoptionApplications]);

  useEffect(() => {
    safeSetItem('fsas_lost_v2', JSON.stringify(lostReports));
  }, [lostReports]);

  useEffect(() => {
    safeSetItem('fsas_found_v2', JSON.stringify(foundReports));
  }, [foundReports]);

  useEffect(() => {
    safeSetItem('fsas_shifts_v2', JSON.stringify(volunteerShifts));
  }, [volunteerShifts]);

  useEffect(() => {
    safeSetItem('fsas_donations_v2', JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    safeSetItem('fsas_foster_apps_v2', JSON.stringify(fosterApplications));
  }, [fosterApplications]);

  useEffect(() => {
    safeSetItem('fsas_vol_apps_v2', JSON.stringify(volunteerApplications));
  }, [volunteerApplications]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = 'toast_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const resetDemoData = () => {
    safeRemoveItem('fsas_animals_v2');
    safeRemoveItem('fsas_applications_v2');
    safeRemoveItem('fsas_lost_v2');
    safeRemoveItem('fsas_found_v2');
    safeRemoveItem('fsas_shifts_v2');
    safeRemoveItem('fsas_donations_v2');
    safeRemoveItem('fsas_foster_apps_v2');
    safeRemoveItem('fsas_vol_apps_v2');
    setAnimals(INITIAL_ANIMALS);
    setAdoptionApplications(INITIAL_ADOPTION_APPLICATIONS);
    setLostReports(INITIAL_LOST_REPORTS);
    setFoundReports(INITIAL_FOUND_REPORTS);
    setVolunteerShifts(INITIAL_VOLUNTEER_SHIFTS);
    setDonations(INITIAL_DONATIONS);
    setFosterApplications(INITIAL_FOSTER_APPLICATIONS);
    setVolunteerApplications(INITIAL_VOLUNTEER_APPLICATIONS);
    showToast('Front Street Shelter demo data reset to default successfully', 'info');
  };

  const getNextAnimalId = (): string => {
    const currentYear = new Date().getFullYear();
    const existingIds = animals
      .map(a => a.id)
      .filter(id => id.startsWith(`FSAS-${currentYear}-`));
    
    let maxNum = 110;
    existingIds.forEach(id => {
      const parts = id.split('-');
      if (parts.length === 3) {
        const num = parseInt(parts[2], 10);
        if (!isNaN(num) && num > maxNum) {
          maxNum = num;
        }
      }
    });

    const nextNum = (maxNum + 1).toString().padStart(4, '0');
    return `FSAS-${currentYear}-${nextNum}`;
  };

  const addAnimal = (newAnimalData: Omit<Animal, 'id'> & { customId?: string }): Animal => {
    const id = newAnimalData.customId?.trim() || getNextAnimalId();
    const newAnimal: Animal = {
      ...newAnimalData,
      id,
      medicalExams: newAnimalData.medicalExams || [],
      vaccinations: newAnimalData.vaccinations || [],
      medications: newAnimalData.medications || [],
      conditions: newAnimalData.conditions || [],
      appointments: newAnimalData.appointments || [],
      fosterPlacements: newAnimalData.fosterPlacements || []
    };

    setAnimals(prev => [newAnimal, ...prev]);
    showToast(`Animal ${newAnimal.name} registered with unique ID ${id}`, 'success');
    return newAnimal;
  };

  const updateAnimal = (id: string, updates: Partial<Animal>) => {
    setAnimals(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, ...updates };
      }
      return a;
    }));
    showToast(`Record for ${id} updated successfully`, 'info');
  };

  const deleteAnimal = (id: string) => {
    setAnimals(prev => prev.filter(a => a.id !== id));
    showToast(`Animal record ${id} removed`, 'warning');
  };

  // Medical actions
  const addVetExam = (animalId: string, examData: Omit<VetExam, 'id'>) => {
    const newExam: VetExam = {
      ...examData,
      id: 'EXAM-' + Date.now().toString().slice(-4)
    };
    setAnimals(prev => prev.map(a => {
      if (a.id === animalId) {
        return {
          ...a,
          medicallyCleared: examData.clearedForAdoption,
          medicalExams: [newExam, ...(a.medicalExams || [])]
        };
      }
      return a;
    }));
    showToast(`Medical examination logged for ${animalId}`, 'success');
  };

  const addVaccination = (animalId: string, vaxData: Omit<Vaccination, 'id'>) => {
    const newVax: Vaccination = {
      ...vaxData,
      id: 'VAX-' + Date.now().toString().slice(-4)
    };
    setAnimals(prev => prev.map(a => {
      if (a.id === animalId) {
        return {
          ...a,
          vaccinations: [...(a.vaccinations || []), newVax]
        };
      }
      return a;
    }));
    showToast(`Vaccination ${vaxData.vaccineName} recorded for ${animalId}`, 'success');
  };

  const addMedication = (animalId: string, medData: Omit<Medication, 'id'>) => {
    const newMed: Medication = {
      ...medData,
      id: 'MED-' + Date.now().toString().slice(-4)
    };
    setAnimals(prev => prev.map(a => {
      if (a.id === animalId) {
        return {
          ...a,
          medications: [...(a.medications || []), newMed]
        };
      }
      return a;
    }));
    showToast(`Medication ${medData.medicationName} prescribed`, 'info');
  };

  const addCondition = (animalId: string, condData: Omit<MedicalCondition, 'id'>) => {
    const newCond: MedicalCondition = {
      ...condData,
      id: 'COND-' + Date.now().toString().slice(-4)
    };
    setAnimals(prev => prev.map(a => {
      if (a.id === animalId) {
        return {
          ...a,
          conditions: [...(a.conditions || []), newCond]
        };
      }
      return a;
    }));
    showToast(`Condition ${condData.diagnosis} recorded`, 'info');
  };

  const scheduleAppointment = (animalId: string, apptData: Omit<MedicalAppointment, 'id'>) => {
    const newAppt: MedicalAppointment = {
      ...apptData,
      id: 'APT-' + Date.now().toString().slice(-4)
    };
    setAnimals(prev => prev.map(a => {
      if (a.id === animalId) {
        return {
          ...a,
          appointments: [...(a.appointments || []), newAppt]
        };
      }
      return a;
    }));
    showToast(`Follow-up appointment scheduled for ${apptData.scheduledDate}`, 'success');
  };

  const toggleMedicalClearance = (animalId: string, cleared: boolean) => {
    setAnimals(prev => prev.map(a => {
      if (a.id === animalId) {
        return {
          ...a,
          medicallyCleared: cleared,
          status: cleared && a.status === 'Medical Hold / Recovery' ? 'Available for Adoption' : a.status
        };
      }
      return a;
    }));
    showToast(`Medical clearance updated to ${cleared ? 'CLEARED' : 'NOT CLEARED'}`, cleared ? 'success' : 'warning');
  };

  const updateSpayNeuter = (animalId: string, status: SpayNeuterStatus, date?: string) => {
    setAnimals(prev => prev.map(a => {
      if (a.id === animalId) {
        return {
          ...a,
          spayNeuterStatus: status,
          spayNeuterDate: date || a.spayNeuterDate
        };
      }
      return a;
    }));
    showToast(`Spay/neuter status updated to ${status}`, 'info');
  };

  // Vaccine alerts: checks upcoming vaccines within 30 days or marked due
  const upcomingVaccineAlerts = useMemo(() => {
    const alerts: { animal: Animal; vax: Vaccination; daysRemaining: number }[] = [];
    const now = new Date();
    
    animals.forEach(animal => {
      if (animal.status === 'Adopted' || animal.status === 'Returned to Owner') return;
      animal.vaccinations?.forEach(vax => {
        if (!vax.expirationDate) return;
        const expDate = new Date(vax.expirationDate);
        const diffMs = expDate.getTime() - now.getTime();
        const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        if (days <= 30 || vax.isDueAlert) {
          alerts.push({
            animal,
            vax,
            daysRemaining: days
          });
        }
      });
    });
    return alerts;
  }, [animals]);

  // Adoption actions
  const submitAdoptionApplication = (appData: Omit<AdoptionApplication, 'id' | 'submittedAt' | 'status'>): AdoptionApplication => {
    const newApp: AdoptionApplication = {
      ...appData,
      id: 'APP-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000),
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'Pending'
    };
    setAdoptionApplications(prev => [newApp, ...prev]);
    showToast(`Adoption application for ${appData.petName} submitted successfully! Application ID: ${newApp.id}`, 'success');
    return newApp;
  };

  const reviewAdoptionApplication = (
    appId: string, 
    status: 'Approved' | 'Rejected', 
    reviewNotes: string, 
    reviewerName: string
  ) => {
    setAdoptionApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          status,
          reviewNotes,
          reviewedBy: reviewerName,
          decisionDate: new Date().toISOString().slice(0, 10)
        };
      }
      return app;
    }));
    showToast(`Application ${appId} marked as ${status}`, status === 'Approved' ? 'success' : 'info');
  };

  const finalizeAdoption = (animalId: string, record: AdoptionRecord) => {
    setAnimals(prev => prev.map(a => {
      if (a.id === animalId) {
        return {
          ...a,
          status: 'Adopted',
          locationInShelter: 'Archived (Adopted)',
          adoptionRecord: record
        };
      }
      return a;
    }));
    // Also mark related applications as finalized
    setAdoptionApplications(prev => prev.map(app => {
      if (app.petId === animalId && app.status === 'Approved') {
        return { ...app, status: 'Finalized' };
      }
      return app;
    }));
    showToast(`Congratulations! ${animalId} has been officially adopted by ${record.adopterName}`, 'success');
  };

  // Lost & Found
  const submitLostReport = (reportData: Omit<LostPetReport, 'id' | 'reportedAt' | 'status'>): LostPetReport => {
    const newReport: LostPetReport = {
      ...reportData,
      id: 'LOST-' + new Date().getFullYear() + '-' + Math.floor(100 + Math.random() * 900),
      reportedAt: new Date().toISOString().slice(0, 10),
      status: 'Open Search'
    };
    setLostReports(prev => [newReport, ...prev]);
    showToast(`Lost pet report for ${reportData.petName} created. Staff and community notified.`, 'info');
    return newReport;
  };

  const submitFoundReport = (reportData: Omit<FoundAnimalReport, 'id' | 'reportedAt' | 'status'>): FoundAnimalReport => {
    const newReport: FoundAnimalReport = {
      ...reportData,
      id: 'FOUND-' + new Date().getFullYear() + '-' + Math.floor(100 + Math.random() * 900),
      reportedAt: new Date().toISOString().slice(0, 10),
      status: 'Open'
    };
    setFoundReports(prev => [newReport, ...prev]);
    showToast('Found animal report submitted. Thank you for helping Sacramento animals!', 'success');
    return newReport;
  };

  const markReturnedToOwner = (animalId: string, record: ReturnToOwnerRecord, lostReportId?: string) => {
    setAnimals(prev => prev.map(a => {
      if (a.id === animalId) {
        return {
          ...a,
          status: 'Returned to Owner',
          locationInShelter: 'Case Closed (RTO)',
          rtoRecord: record
        };
      }
      return a;
    }));
    if (lostReportId) {
      setLostReports(prev => prev.map(r => {
        if (r.id === lostReportId) {
          return {
            ...r,
            status: 'Reunited',
            matchedAnimalId: animalId
          };
        }
        return r;
      }));
    }
    showToast(`Animal ${animalId} reunited with owner ${record.ownerName}!`, 'success');
  };

  const matchLostReport = (lostReportId: string, animalId: string) => {
    setLostReports(prev => prev.map(r => {
      if (r.id === lostReportId) {
        return {
          ...r,
          status: 'Matched with Shelter Pet',
          matchedAnimalId: animalId
        };
      }
      return r;
    }));
    showToast(`Lost report ${lostReportId} matched with shelter pet ${animalId}`, 'success');
  };

  // Foster actions
  const submitFosterApplication = (appData: Omit<FosterApplication, 'id' | 'submittedAt' | 'status'>): FosterApplication => {
    const newApp: FosterApplication = {
      ...appData,
      id: 'FOST-APP-' + Math.floor(100 + Math.random() * 900),
      submittedAt: new Date().toISOString().slice(0, 10),
      status: 'Pending'
    };
    setFosterApplications(prev => [newApp, ...prev]);
    showToast('Foster application submitted! Our foster coordinator will reach out.', 'success');
    return newApp;
  };

  const reviewFosterApplication = (appId: string, status: 'Approved' | 'Declined', notes?: string) => {
    setFosterApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          status,
          approvalNotes: notes
        };
      }
      return app;
    }));
    showToast(`Foster application ${appId} marked as ${status}`, 'info');
  };

  const assignAnimalToFoster = (animalId: string, placementData: Omit<FosterPlacement, 'id' | 'status' | 'updates'>) => {
    const newPlacement: FosterPlacement = {
      ...placementData,
      id: 'FOST-' + Math.floor(100 + Math.random() * 900),
      status: 'Active',
      updates: []
    };
    setAnimals(prev => prev.map(a => {
      if (a.id === animalId) {
        return {
          ...a,
          status: 'In Foster Care',
          locationInShelter: `Foster Home: ${placementData.caregiverName}`,
          fosterPlacements: [newPlacement, ...(a.fosterPlacements || [])]
        };
      }
      return a;
    }));
    showToast(`${animalId} placed in foster care with ${placementData.caregiverName}`, 'success');
  };

  const addFosterProgressUpdate = (animalId: string, updateData: Omit<FosterProgressUpdate, 'id'>) => {
    const newUpdate: FosterProgressUpdate = {
      ...updateData,
      id: 'FUPD-' + Math.floor(100 + Math.random() * 900)
    };
    setAnimals(prev => prev.map(a => {
      if (a.id === animalId) {
        const placements = (a.fosterPlacements || []).map((p, idx) => {
          if (idx === 0) { // most recent placement
            return {
              ...p,
              updates: [newUpdate, ...p.updates]
            };
          }
          return p;
        });
        return {
          ...a,
          fosterPlacements: placements,
          weightLbs: updateData.weightLbs || a.weightLbs
        };
      }
      return a;
    }));
    showToast(`Foster progress update logged for ${animalId}`, 'success');
  };

  const returnAnimalFromFoster = (animalId: string, notes?: string) => {
    setAnimals(prev => prev.map(a => {
      if (a.id === animalId) {
        const placements = (a.fosterPlacements || []).map((p, idx) => {
          if (idx === 0) {
            return {
              ...p,
              status: 'Returned to Shelter' as const,
              actualReturnDate: new Date().toISOString().slice(0, 10)
            };
          }
          return p;
        });
        return {
          ...a,
          status: 'Available for Adoption',
          locationInShelter: 'Main Shelter Kennel',
          fosterPlacements: placements,
          intakeNotes: notes ? `${a.intakeNotes} | Foster Return Note: ${notes}` : a.intakeNotes
        };
      }
      return a;
    }));
    showToast(`Animal ${animalId} returned to shelter and marked Available`, 'info');
  };

  // Volunteer & Donation actions
  const submitVolunteerApplication = (appData: Omit<VolunteerApplication, 'id' | 'submittedAt' | 'status'>): VolunteerApplication => {
    const newApp: VolunteerApplication = {
      ...appData,
      id: 'VOL-APP-' + Math.floor(100 + Math.random() * 900),
      submittedAt: new Date().toISOString().slice(0, 10),
      status: 'Pending'
    };
    setVolunteerApplications(prev => [newApp, ...prev]);
    showToast('Volunteer application submitted! Welcome to Front Street team.', 'success');
    return newApp;
  };

  const reviewVolunteerApplication = (appId: string, status: 'Approved' | 'Declined') => {
    setVolunteerApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return { ...app, status };
      }
      return app;
    }));
    showToast(`Volunteer application ${appId} marked as ${status}`, 'info');
  };

  const signUpForShift = (shiftId: string, name: string, email: string): boolean => {
    let success = false;
    setVolunteerShifts(prev => prev.map(shift => {
      if (shift.id === shiftId) {
        if (shift.registeredUsers.some(u => u.email === email)) {
          showToast('You are already registered for this shift!', 'info');
          return shift;
        }
        if (shift.registeredUsers.length >= shift.capacity) {
          showToast('Sorry, this shift has reached full volunteer capacity.', 'warning');
          return shift;
        }
        success = true;
        return {
          ...shift,
          registeredUsers: [...shift.registeredUsers, { name, email }]
        };
      }
      return shift;
    }));
    if (success) {
      showToast(`Successfully registered for shift on ${shiftId}!`, 'success');
    }
    return success;
  };

  const cancelShiftSignUp = (shiftId: string, email: string) => {
    setVolunteerShifts(prev => prev.map(shift => {
      if (shift.id === shiftId) {
        return {
          ...shift,
          registeredUsers: shift.registeredUsers.filter(u => u.email !== email)
        };
      }
      return shift;
    }));
    showToast('Shift reservation cancelled', 'info');
  };

  const addVolunteerShift = (shiftData: Omit<VolunteerShift, 'id' | 'registeredUsers'>) => {
    const newShift: VolunteerShift = {
      ...shiftData,
      id: 'SHIFT-' + Math.floor(100 + Math.random() * 900),
      registeredUsers: []
    };
    setVolunteerShifts(prev => [newShift, ...prev]);
    showToast(`New volunteer shift created: ${shiftData.title}`, 'success');
  };

  const submitDonation = (donationData: Omit<DonationRecord, 'id' | 'receiptNumber' | 'timestamp' | 'taxDeductibleEIN'>): DonationRecord => {
    const id = 'DON-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    const receiptNumber = 'REC-FSAS-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000);
    const newDonation: DonationRecord = {
      ...donationData,
      id,
      receiptNumber,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      taxDeductibleEIN: '68-0194821 - Front Street Animal Shelter Foundation'
    };
    setDonations(prev => [newDonation, ...prev]);
    showToast(`Thank you for your generous $${donationData.amount} donation to Front Street Animals!`, 'success');
    return newDonation;
  };

  return (
    <ShelterContext.Provider
      value={{
        role,
        setRole,
        currentUser,
        setCurrentUser,
        animals,
        addAnimal,
        updateAnimal,
        deleteAnimal,
        getNextAnimalId,
        addVetExam,
        addVaccination,
        addMedication,
        addCondition,
        scheduleAppointment,
        toggleMedicalClearance,
        updateSpayNeuter,
        upcomingVaccineAlerts,
        adoptionApplications,
        submitAdoptionApplication,
        reviewAdoptionApplication,
        finalizeAdoption,
        lostReports,
        foundReports,
        submitLostReport,
        submitFoundReport,
        markReturnedToOwner,
        matchLostReport,
        fosterApplications,
        submitFosterApplication,
        reviewFosterApplication,
        assignAnimalToFoster,
        addFosterProgressUpdate,
        returnAnimalFromFoster,
        volunteerApplications,
        volunteerShifts,
        donations,
        submitVolunteerApplication,
        reviewVolunteerApplication,
        signUpForShift,
        cancelShiftSignUp,
        addVolunteerShift,
        submitDonation,
        toasts,
        showToast,
        removeToast,
        resetDemoData
      }}
    >
      {children}
    </ShelterContext.Provider>
  );
};

export const useShelter = (): ShelterContextType => {
  const context = useContext(ShelterContext);
  if (!context) {
    throw new Error('useShelter must be used within a ShelterProvider');
  }
  return context;
};
