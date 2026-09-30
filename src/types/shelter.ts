export type Role = 'public' | 'user' | 'admin';

export type Species = 'Dog' | 'Cat' | 'Rabbit' | 'Other';
export type Sex = 'Male' | 'Female' | 'Unknown';
export type AgeGroup = 'Puppy / Kitten' | 'Young' | 'Adult' | 'Senior';
export type AnimalSize = 'Small (<20 lbs)' | 'Medium (20-50 lbs)' | 'Large (50-80 lbs)' | 'Extra Large (80+ lbs)';

export type IntakeType = 
  | 'Stray / Found' 
  | 'Owner Surrender' 
  | 'Field Confiscation' 
  | 'Shelter Transfer' 
  | 'Born in Foster';

export type AnimalStatus = 
  | 'Available for Adoption'
  | 'Pending Adoption'
  | 'In Foster Care'
  | 'Medical Hold / Recovery'
  | 'Adopted'
  | 'Returned to Owner';

export type SpayNeuterStatus = 'Spayed' | 'Neutered' | 'Intact' | 'Scheduled';

export interface VetExam {
  id: string;
  date: string;
  veterinarian: string;
  weightLbs: number;
  temperatureF?: number;
  heartRateBpm?: number;
  dentalGrade: 'Grade 0 (Clean)' | 'Grade 1 (Mild Tartar)' | 'Grade 2 (Moderate)' | 'Grade 3 (Severe)';
  findings: string;
  clearedForAdoption: boolean;
}

export interface Vaccination {
  id: string;
  vaccineName: string; // e.g. Rabies, DHPP, FVRCP, Bordetella
  administeredDate: string;
  expirationDate: string;
  administeredBy: string;
  batchNumber?: string;
  isDueAlert?: boolean;
}

export interface Medication {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string; // e.g. Twice daily with food
  startDate: string;
  endDate: string;
  prescribedBy: string;
  instructions: string;
  status: 'Active' | 'Completed' | 'Discontinued';
}

export interface MedicalCondition {
  id: string;
  diagnosis: string;
  diagnosedDate: string;
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Chronic';
  treatmentPlan: string;
  resolved: boolean;
}

export interface MedicalAppointment {
  id: string;
  scheduledDate: string;
  scheduledTime: string;
  reason: string;
  veterinarian: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  notes?: string;
}

export interface BehaviorNotes {
  goodWithDogs: 'Yes' | 'No' | 'Needs Slow Intro' | 'Unknown';
  goodWithCats: 'Yes' | 'No' | 'Needs Slow Intro' | 'Unknown';
  goodWithKids: 'Yes' | 'No' | 'Older Kids Only' | 'Unknown';
  energyLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  houseTrained: 'Yes' | 'Partially' | 'No' | 'Unknown';
  summaryNotes: string;
}

export interface FosterProgressUpdate {
  id: string;
  date: string;
  caregiverName: string;
  weightLbs?: number;
  notes: string;
  photoUrl?: string;
}

export interface FosterPlacement {
  id: string;
  animalId: string;
  caregiverName: string;
  caregiverEmail: string;
  caregiverPhone: string;
  startDate: string;
  expectedReturnDate: string;
  fosterReason: 'Neonatal Care' | 'Medical Recovery' | 'Behavioral Decompression' | 'Space Relief';
  status: 'Active' | 'Returned to Shelter' | 'Foster-to-Adopt Finalized';
  actualReturnDate?: string;
  updates: FosterProgressUpdate[];
}

export interface AdoptionRecord {
  adopterName: string;
  adopterEmail: string;
  adopterPhone: string;
  adopterAddress: string;
  adoptionDate: string;
  adoptionFeePaid: number;
  notes?: string;
  certificateId: string;
}

export interface ReturnToOwnerRecord {
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  ownerAddress: string;
  returnDate: string;
  proofOfOwnership: string; // e.g. Microchip Match, Photo records, Vet receipts
  redemptionFeePaid: number;
  notes?: string;
}

export interface Animal {
  id: string; // Unique Shelter ID e.g. "FSAS-2026-0412"
  name: string;
  species: Species;
  breed: string;
  ageYears: number;
  ageMonths: number;
  ageGroup: AgeGroup;
  sex: Sex;
  color: string;
  size: AnimalSize;
  weightLbs: number;
  microchipId?: string;
  photoUrl: string;
  intakeType: IntakeType;
  intakeDate: string;
  intakeLocation: string; // Sacramento neighborhood/street
  intakeNotes: string;
  status: AnimalStatus;
  locationInShelter: string; // e.g. Kennel B-14, Cattery Room 2, Foster Care
  medicallyCleared: boolean;
  spayNeuterStatus: SpayNeuterStatus;
  spayNeuterDate?: string;
  behavior: BehaviorNotes;
  medicalExams: VetExam[];
  vaccinations: Vaccination[];
  medications: Medication[];
  conditions: MedicalCondition[];
  appointments: MedicalAppointment[];
  fosterPlacements: FosterPlacement[];
  adoptionRecord?: AdoptionRecord;
  rtoRecord?: ReturnToOwnerRecord;
  specialNeeds?: string;
  featuredInAdoption?: boolean;
}

export type ApplicationStatus = 'Pending' | 'Under Review' | 'Approved' | 'Rejected' | 'Finalized';

export interface AdoptionApplication {
  id: string;
  petId: string;
  petName: string;
  petSpecies: Species;
  petPhotoUrl: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  applicantAddress: string;
  housingType: 'Own Home' | 'Rent Apartment' | 'Rent House' | 'Condo / Townhouse';
  landlordApproval?: boolean;
  hasFencedYard: boolean;
  householdAdults: number;
  householdChildren: number;
  existingPets: string;
  petCarePlan: string;
  submittedAt: string;
  status: ApplicationStatus;
  reviewedBy?: string;
  reviewNotes?: string;
  decisionDate?: string;
}

export interface LostPetReport {
  id: string;
  petName: string;
  species: Species;
  breed: string;
  color: string;
  sex: Sex;
  microchipId?: string;
  photoUrl: string;
  lastSeenDate: string;
  lastSeenLocation: string; // Sacramento neighborhood e.g. "Midtown 24th & J St"
  distinctiveFeatures: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  status: 'Open Search' | 'Matched with Shelter Pet' | 'Reunited';
  matchedAnimalId?: string;
  notes?: string;
  reportedAt: string;
}

export interface FoundAnimalReport {
  id: string;
  species: Species;
  breedDescription: string;
  color: string;
  sex: Sex;
  photoUrl: string;
  foundDate: string;
  foundLocation: string; // e.g. "Land Park near Zoo"
  finderName: string;
  finderPhone: string;
  finderEmail: string;
  currentHolding: 'Finder Keeping Temporarily' | 'Brought to Front Street Shelter';
  shelterIntakeId?: string;
  status: 'Open' | 'Reunited with Owner' | 'Admitted to Shelter';
  reportedAt: string;
}

export interface FosterApplication {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  address: string;
  housingType: string;
  preferredTypes: string[]; // e.g. "Bottle-baby kittens", "Post-surgery dogs", "Hospice seniors"
  experienceSummary: string;
  submittedAt: string;
  status: 'Pending' | 'Approved' | 'Declined';
  approvalNotes?: string;
}

export interface VolunteerApplication {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  interests: string[]; // e.g. "Dog Walking", "Cattery Socialization", "Vet Clinic Support", "Mobile Adoption"
  availability: string[]; // e.g. "Weekday Mornings", "Weekend Afternoons"
  experience: string;
  status: 'Pending' | 'Approved' | 'Declined';
  submittedAt: string;
}

export interface VolunteerShift {
  id: string;
  title: string;
  category: 'Dog Walking & Enrichment' | 'Cattery Care & Cuddles' | 'Veterinary Clinic Support' | 'Adoption Center Welcome Desk' | 'Food Pantry Distribution';
  date: string;
  timeWindow: string;
  location: string;
  capacity: number;
  registeredUsers: { name: string; email: string }[];
  description: string;
}

export interface DonationRecord {
  id: string;
  receiptNumber: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  tierTitle?: string;
  isMonthly: boolean;
  tributeType?: 'In Honor of' | 'In Memory of' | 'None';
  tributeName?: string;
  timestamp: string;
  paymentMethod: string;
  taxDeductibleEIN: string;
}

export interface ShelterStats {
  totalCurrentAnimals: number;
  availableForAdoption: number;
  inFosterCare: number;
  medicalHold: number;
  intakesThisMonth: number;
  adoptionsThisMonth: number;
  rtoThisMonth: number;
  liveReleaseRatePct: number;
  averageLengthOfStayDays: number;
}
