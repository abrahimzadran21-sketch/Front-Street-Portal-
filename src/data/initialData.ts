import { 
  Animal, 
  AdoptionApplication, 
  LostPetReport, 
  FoundAnimalReport, 
  FosterPlacement, 
  VolunteerShift, 
  DonationRecord,
  FosterApplication,
  VolunteerApplication
} from '../types/shelter';

export const INITIAL_ANIMALS: Animal[] = [
  {
    id: 'FSAS-2026-0101',
    name: 'Barnaby',
    species: 'Dog',
    breed: 'Golden Retriever & Labrador Mix',
    ageYears: 2,
    ageMonths: 4,
    ageGroup: 'Young',
    sex: 'Male',
    color: 'Honey Gold',
    size: 'Large (50-80 lbs)',
    weightLbs: 62,
    microchipId: '985141004128911',
    photoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
    intakeType: 'Stray / Found',
    intakeDate: '2026-08-14',
    intakeLocation: 'East Sacramento near McKinley Park (33rd & H St)',
    intakeNotes: 'Found wandering near rose garden; friendly and accepted leash readily. No collar.',
    status: 'Available for Adoption',
    locationInShelter: 'Dog Run A-12',
    medicallyCleared: true,
    spayNeuterStatus: 'Neutered',
    spayNeuterDate: '2026-08-18',
    behavior: {
      goodWithDogs: 'Yes',
      goodWithCats: 'Needs Slow Intro',
      goodWithKids: 'Yes',
      energyLevel: 'Moderate',
      houseTrained: 'Yes',
      summaryNotes: 'Barnaby is a gentle, affable soul who loves playing fetch and leaning in for chest scratches. Walks politely on loose leash and knows "sit" and "paw".'
    },
    medicalExams: [
      {
        id: 'EXAM-001',
        date: '2026-08-15',
        veterinarian: 'Dr. Sarah Lin, DVM',
        weightLbs: 60.5,
        temperatureF: 101.4,
        heartRateBpm: 88,
        dentalGrade: 'Grade 0 (Clean)',
        findings: 'Overall excellent condition. Clear eyes and ears. Healthy coat. Mild tick bites treated with topical preventative.',
        clearedForAdoption: true
      },
      {
        id: 'EXAM-002',
        date: '2026-09-12',
        veterinarian: 'Dr. Michael Chen, DVM',
        weightLbs: 62.0,
        temperatureF: 101.2,
        heartRateBpm: 84,
        dentalGrade: 'Grade 0 (Clean)',
        findings: 'Monthly shelter check. Weight gained healthy 1.5 lbs. Ready for permanent home.',
        clearedForAdoption: true
      }
    ],
    vaccinations: [
      {
        id: 'VAX-101',
        vaccineName: 'Rabies (3-Year)',
        administeredDate: '2026-08-16',
        expirationDate: '2029-08-16',
        administeredBy: 'Dr. Sarah Lin, DVM',
        batchNumber: 'DEF-9912'
      },
      {
        id: 'VAX-102',
        vaccineName: 'DHPP Core (Canine Distemper/Parvo)',
        administeredDate: '2026-08-16',
        expirationDate: '2027-08-16',
        administeredBy: 'Dr. Sarah Lin, DVM',
        batchNumber: 'MER-4410'
      },
      {
        id: 'VAX-103',
        vaccineName: 'Bordetella Oral',
        administeredDate: '2026-08-16',
        expirationDate: '2027-02-16',
        administeredBy: 'Nurse R. Torres, RVT',
        batchNumber: 'BOR-2201'
      }
    ],
    medications: [],
    conditions: [],
    appointments: [],
    fosterPlacements: [],
    featuredInAdoption: true
  },
  {
    id: 'FSAS-2026-0102',
    name: 'Clover',
    species: 'Cat',
    breed: 'Domestic Shorthair - Calico',
    ageYears: 1,
    ageMonths: 1,
    ageGroup: 'Young',
    sex: 'Female',
    color: 'Calico (White, Ginger, Dark Slate)',
    size: 'Small (<20 lbs)',
    weightLbs: 8.4,
    microchipId: '985141004128912',
    photoUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
    intakeType: 'Owner Surrender',
    intakeDate: '2026-08-28',
    intakeLocation: 'Midtown Sacramento (21st & P St)',
    intakeNotes: 'Owner moving to housing that prohibits pets. Clover has lived indoors all her life.',
    status: 'Available for Adoption',
    locationInShelter: 'Cattery Suite C-04',
    medicallyCleared: true,
    spayNeuterStatus: 'Spayed',
    spayNeuterDate: '2026-01-10',
    behavior: {
      goodWithDogs: 'Needs Slow Intro',
      goodWithCats: 'Yes',
      goodWithKids: 'Yes',
      energyLevel: 'Moderate',
      houseTrained: 'Yes',
      summaryNotes: 'Clover is a sweet purr machine. Loves laser pointers and curling up in sunny window hammocks. Very affectionate and vocal when greeting visitors.'
    },
    medicalExams: [
      {
        id: 'EXAM-003',
        date: '2026-08-29',
        veterinarian: 'Dr. Michael Chen, DVM',
        weightLbs: 8.4,
        temperatureF: 100.8,
        heartRateBpm: 140,
        dentalGrade: 'Grade 0 (Clean)',
        findings: 'Normal cardiac and respiratory sounds. Spay tattoo verified. Healthy eyes and ears.',
        clearedForAdoption: true
      }
    ],
    vaccinations: [
      {
        id: 'VAX-104',
        vaccineName: 'FVRCP (Feline Core)',
        administeredDate: '2026-08-29',
        expirationDate: '2027-08-29',
        administeredBy: 'Dr. Michael Chen, DVM',
        batchNumber: 'FEL-8891'
      },
      {
        id: 'VAX-105',
        vaccineName: 'Rabies (1-Year Feline)',
        administeredDate: '2026-08-29',
        expirationDate: '2027-08-29',
        administeredBy: 'Dr. Michael Chen, DVM',
        batchNumber: 'RAB-3301'
      }
    ],
    medications: [],
    conditions: [],
    appointments: [],
    fosterPlacements: [],
    featuredInAdoption: true
  },
  {
    id: 'FSAS-2026-0103',
    name: 'Duke',
    species: 'Dog',
    breed: 'German Shepherd & Belgian Malinois Mix',
    ageYears: 3,
    ageMonths: 6,
    ageGroup: 'Adult',
    sex: 'Male',
    color: 'Black and Tan',
    size: 'Large (50-80 lbs)',
    weightLbs: 74,
    microchipId: '985141004128913',
    photoUrl: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=800&q=80',
    intakeType: 'Stray / Found',
    intakeDate: '2026-09-02',
    intakeLocation: 'South Sacramento near Florin Rd',
    intakeNotes: 'Intake officer picked up near shopping plaza. Friendly demeanor, responsive to obedience cues.',
    status: 'Available for Adoption',
    locationInShelter: 'Dog Run B-08',
    medicallyCleared: true,
    spayNeuterStatus: 'Neutered',
    spayNeuterDate: '2026-09-06',
    behavior: {
      goodWithDogs: 'Needs Slow Intro',
      goodWithCats: 'No',
      goodWithKids: 'Older Kids Only',
      energyLevel: 'High',
      houseTrained: 'Yes',
      summaryNotes: 'Duke is highly intelligent, loyal, and eager to please. Thrives with mental enrichment puzzles and agility training. Best in an active home without cats.'
    },
    medicalExams: [
      {
        id: 'EXAM-004',
        date: '2026-09-03',
        veterinarian: 'Dr. Sarah Lin, DVM',
        weightLbs: 73.0,
        temperatureF: 101.1,
        heartRateBpm: 92,
        dentalGrade: 'Grade 1 (Mild Tartar)',
        findings: 'Minor superficial abrasion on left front paw, cleansed and dressed. Neuter surgery scheduled.',
        clearedForAdoption: true
      }
    ],
    vaccinations: [
      {
        id: 'VAX-106',
        vaccineName: 'Rabies (3-Year)',
        administeredDate: '2026-09-04',
        expirationDate: '2029-09-04',
        administeredBy: 'Dr. Sarah Lin, DVM'
      },
      {
        id: 'VAX-107',
        vaccineName: 'DHPP Core',
        administeredDate: '2026-09-04',
        expirationDate: '2027-09-04',
        administeredBy: 'Dr. Sarah Lin, DVM'
      }
    ],
    medications: [],
    conditions: [],
    appointments: [],
    fosterPlacements: []
  },
  {
    id: 'FSAS-2026-0104',
    name: 'Pippin',
    species: 'Rabbit',
    breed: 'Holland Lop',
    ageYears: 1,
    ageMonths: 3,
    ageGroup: 'Young',
    sex: 'Female',
    color: 'Cream and Soft Grey',
    size: 'Small (<20 lbs)',
    weightLbs: 3.8,
    photoUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=800&q=80',
    intakeType: 'Owner Surrender',
    intakeDate: '2026-09-08',
    intakeLocation: 'Land Park, Sacramento',
    intakeNotes: 'Owner moving to college dorm. Well-socialized, litterbox trained rabbit.',
    status: 'Available for Adoption',
    locationInShelter: 'Small Animal Room S-02',
    medicallyCleared: true,
    spayNeuterStatus: 'Spayed',
    spayNeuterDate: '2026-03-15',
    behavior: {
      goodWithDogs: 'No',
      goodWithCats: 'Yes',
      goodWithKids: 'Yes',
      energyLevel: 'Moderate',
      houseTrained: 'Yes',
      summaryNotes: 'Pippin does joyful binkies when served fresh Timothy hay and cilantro sprigs. Gentle and tolerates being held with care.'
    },
    medicalExams: [
      {
        id: 'EXAM-005',
        date: '2026-09-09',
        veterinarian: 'Dr. Michael Chen, DVM',
        weightLbs: 3.8,
        temperatureF: 102.2,
        heartRateBpm: 180,
        dentalGrade: 'Grade 0 (Clean)',
        findings: 'Incisor alignment normal, no spurring. Gut sounds active. Clear ears free of mites.',
        clearedForAdoption: true
      }
    ],
    vaccinations: [
      {
        id: 'VAX-108',
        vaccineName: 'RHDV2 (Rabbit Hemorrhagic Disease)',
        administeredDate: '2026-09-09',
        expirationDate: '2027-09-09',
        administeredBy: 'Dr. Michael Chen, DVM'
      }
    ],
    medications: [],
    conditions: [],
    appointments: [],
    fosterPlacements: []
  },
  {
    id: 'FSAS-2026-0105',
    name: 'Oliver',
    species: 'Cat',
    breed: 'Domestic Longhair - Tuxedo',
    ageYears: 4,
    ageMonths: 2,
    ageGroup: 'Adult',
    sex: 'Male',
    color: 'Jet Black with White Chest & Socks',
    size: 'Medium (20-50 lbs)',
    weightLbs: 11.2,
    microchipId: '985141004128914',
    photoUrl: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80',
    intakeType: 'Stray / Found',
    intakeDate: '2026-09-10',
    intakeLocation: 'Downtown Sacramento near Capitol Park (12th & L St)',
    intakeNotes: 'Found sheltering under building porch. Very friendly toward workers.',
    status: 'In Foster Care',
    locationInShelter: 'Foster Home: Elena Ramirez',
    medicallyCleared: true,
    spayNeuterStatus: 'Neutered',
    behavior: {
      goodWithDogs: 'Yes',
      goodWithCats: 'Yes',
      goodWithKids: 'Yes',
      energyLevel: 'Low',
      houseTrained: 'Yes',
      summaryNotes: 'Oliver is a gentle giant who loves lounging beside laptops and being brushed. Total couch buddy.'
    },
    medicalExams: [
      {
        id: 'EXAM-006',
        date: '2026-09-11',
        veterinarian: 'Dr. Sarah Lin, DVM',
        weightLbs: 11.2,
        temperatureF: 101.0,
        dentalGrade: 'Grade 1 (Mild Tartar)',
        findings: 'Coat slightly matted upon intake, groomed successfully. Mild gingivitis.',
        clearedForAdoption: true
      }
    ],
    vaccinations: [
      {
        id: 'VAX-109',
        vaccineName: 'FVRCP Feline Core',
        administeredDate: '2026-09-11',
        expirationDate: '2027-09-11',
        administeredBy: 'Dr. Sarah Lin, DVM'
      },
      {
        id: 'VAX-110',
        vaccineName: 'Rabies Feline',
        administeredDate: '2026-09-11',
        expirationDate: '2027-09-11',
        administeredBy: 'Dr. Sarah Lin, DVM'
      }
    ],
    medications: [],
    conditions: [],
    appointments: [],
    fosterPlacements: [
      {
        id: 'FOST-001',
        animalId: 'FSAS-2026-0105',
        caregiverName: 'Elena Ramirez',
        caregiverEmail: 'elena.ramirez.sac@example.com',
        caregiverPhone: '(916) 555-8291',
        startDate: '2026-09-14',
        expectedReturnDate: '2026-10-15',
        fosterReason: 'Space Relief',
        status: 'Active',
        updates: [
          {
            id: 'FUPD-001',
            date: '2026-09-20',
            caregiverName: 'Elena Ramirez',
            weightLbs: 11.5,
            notes: 'Oliver has settled into our living room beautifully! He loves napping next to my husband during remote work.'
          },
          {
            id: 'FUPD-002',
            date: '2026-09-28',
            caregiverName: 'Elena Ramirez',
            weightLbs: 11.7,
            notes: 'Grooming daily now. He purrs like an engine when brushed. Zero litterbox accidents.'
          }
        ]
      }
    ]
  },
  {
    id: 'FSAS-2026-0106',
    name: 'Bella',
    species: 'Dog',
    breed: 'Pit Bull Terrier & Boxer Mix',
    ageYears: 5,
    ageMonths: 0,
    ageGroup: 'Adult',
    sex: 'Female',
    color: 'Brindle and White',
    size: 'Medium (20-50 lbs)',
    weightLbs: 51,
    microchipId: '985141004128915',
    photoUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
    intakeType: 'Field Confiscation',
    intakeDate: '2026-08-01',
    intakeLocation: 'Del Paso Heights, Sacramento',
    intakeNotes: 'Rescued from unattended property. Underweight upon arrival, recovering remarkably.',
    status: 'Available for Adoption',
    locationInShelter: 'Dog Run A-04',
    medicallyCleared: true,
    spayNeuterStatus: 'Spayed',
    spayNeuterDate: '2026-08-22',
    behavior: {
      goodWithDogs: 'Yes',
      goodWithCats: 'Unknown',
      goodWithKids: 'Yes',
      energyLevel: 'Moderate',
      houseTrained: 'Yes',
      summaryNotes: 'Bella has the sweetest blocky head and wiggly tail. She is our shelter staff favorite and loves giving gentle paw shakes for treats.'
    },
    medicalExams: [
      {
        id: 'EXAM-007',
        date: '2026-08-02',
        veterinarian: 'Dr. Sarah Lin, DVM',
        weightLbs: 42.0,
        dentalGrade: 'Grade 1 (Mild Tartar)',
        findings: 'Underweight, BCS 3/9. Heartworm test negative. Placed on high-protein refeeding plan.',
        clearedForAdoption: false
      },
      {
        id: 'EXAM-008',
        date: '2026-08-22',
        veterinarian: 'Dr. Sarah Lin, DVM',
        weightLbs: 51.0,
        dentalGrade: 'Grade 1 (Mild Tartar)',
        findings: 'Weight restored to healthy BCS 5/9! Spay surgery successful. Medically cleared for adoption.',
        clearedForAdoption: true
      }
    ],
    vaccinations: [
      {
        id: 'VAX-111',
        vaccineName: 'Rabies (3-Year)',
        administeredDate: '2026-08-05',
        expirationDate: '2029-08-05',
        administeredBy: 'Dr. Sarah Lin, DVM'
      },
      {
        id: 'VAX-112',
        vaccineName: 'DHPP Core',
        administeredDate: '2026-08-05',
        expirationDate: '2027-08-05',
        administeredBy: 'Dr. Sarah Lin, DVM'
      },
      {
        id: 'VAX-113',
        vaccineName: 'Bordetella Oral',
        administeredDate: '2026-08-05',
        expirationDate: '2027-02-05',
        administeredBy: 'Nurse R. Torres, RVT'
      }
    ],
    medications: [],
    conditions: [],
    appointments: [],
    fosterPlacements: [],
    featuredInAdoption: true
  },
  {
    id: 'FSAS-2026-0107',
    name: 'Rusty',
    species: 'Dog',
    breed: 'Australian Cattle Dog / Heeler',
    ageYears: 1,
    ageMonths: 8,
    ageGroup: 'Young',
    sex: 'Male',
    color: 'Red Heeler Speckle',
    size: 'Medium (20-50 lbs)',
    weightLbs: 41,
    microchipId: '985141004128916',
    photoUrl: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80',
    intakeType: 'Stray / Found',
    intakeDate: '2026-09-18',
    intakeLocation: 'Oak Park (35th & Broadway)',
    intakeNotes: 'Brought in by resident after running loose for 2 days. Very agile and responsive.',
    status: 'Medical Hold / Recovery',
    locationInShelter: 'Medical Ward Med-03',
    medicallyCleared: false,
    spayNeuterStatus: 'Scheduled',
    behavior: {
      goodWithDogs: 'Yes',
      goodWithCats: 'Needs Slow Intro',
      goodWithKids: 'Older Kids Only',
      energyLevel: 'Very High',
      houseTrained: 'Partially',
      summaryNotes: 'High drive working breed. Needs experienced handler who enjoys trail running, hiking, or agility work.'
    },
    medicalExams: [
      {
        id: 'EXAM-009',
        date: '2026-09-19',
        veterinarian: 'Dr. Michael Chen, DVM',
        weightLbs: 41.0,
        temperatureF: 101.5,
        heartRateBpm: 95,
        dentalGrade: 'Grade 0 (Clean)',
        findings: 'Right ear hematoma (swelling from excessive head shaking due to mild ear mites). Drained and medicated.',
        clearedForAdoption: false
      }
    ],
    vaccinations: [
      {
        id: 'VAX-114',
        vaccineName: 'DHPP Core',
        administeredDate: '2026-09-19',
        expirationDate: '2027-09-19',
        administeredBy: 'Dr. Michael Chen, DVM'
      },
      {
        id: 'VAX-115',
        vaccineName: 'Rabies (1-Year)',
        administeredDate: '2026-09-19',
        expirationDate: '2027-09-19',
        administeredBy: 'Dr. Michael Chen, DVM'
      }
    ],
    medications: [
      {
        id: 'MED-001',
        medicationName: 'Tresaderm Otic Solution',
        dosage: '5 drops',
        frequency: 'Twice daily in right ear',
        startDate: '2026-09-19',
        endDate: '2026-10-03',
        prescribedBy: 'Dr. Michael Chen, DVM',
        instructions: 'Clean ear before applying drops. Complete 14-day course.',
        status: 'Active'
      },
      {
        id: 'MED-002',
        medicationName: 'Carprofen (Rimadyl)',
        dosage: '75 mg chewable tablet',
        frequency: 'Once daily with food',
        startDate: '2026-09-19',
        endDate: '2026-09-26',
        prescribedBy: 'Dr. Michael Chen, DVM',
        instructions: 'Pain management for ear hematoma drainage.',
        status: 'Active'
      }
    ],
    conditions: [
      {
        id: 'COND-001',
        diagnosis: 'Otitis Externa & Aural Hematoma',
        diagnosedDate: '2026-09-19',
        severity: 'Moderate',
        treatmentPlan: 'Otic topical suspension + anti-inflammatory + Neuter scheduled upon recovery.',
        resolved: false
      }
    ],
    appointments: [
      {
        id: 'APT-001',
        scheduledDate: '2026-10-02',
        scheduledTime: '10:30 AM',
        reason: 'Follow-up ear exam & check aural hematoma resolution',
        veterinarian: 'Dr. Michael Chen, DVM',
        status: 'Scheduled'
      },
      {
        id: 'APT-002',
        scheduledDate: '2026-10-06',
        scheduledTime: '08:00 AM',
        reason: 'Neuter Surgery & Post-Op Recovery Check',
        veterinarian: 'Dr. Sarah Lin, DVM',
        status: 'Scheduled'
      }
    ],
    fosterPlacements: []
  },
  {
    id: 'FSAS-2026-0108',
    name: 'Mochi',
    species: 'Cat',
    breed: 'Siamese Mix',
    ageYears: 0,
    ageMonths: 4,
    ageGroup: 'Puppy / Kitten',
    sex: 'Female',
    color: 'Seal Point with Blue Eyes',
    size: 'Small (<20 lbs)',
    weightLbs: 3.5,
    microchipId: '985141004128917',
    photoUrl: 'https://images.unsplash.com/photo-1513360309081-38f076278f1e?auto=format&fit=crop&w=800&q=80',
    intakeType: 'Shelter Transfer',
    intakeDate: '2026-09-15',
    intakeLocation: 'Rural Partner Rescue Transfer',
    intakeNotes: 'Arrived with littermates from overcrowded rural shelter. Active and playful.',
    status: 'In Foster Care',
    locationInShelter: 'Kitten Foster Home: Marcus Vance',
    medicallyCleared: true,
    spayNeuterStatus: 'Scheduled',
    behavior: {
      goodWithDogs: 'Yes',
      goodWithCats: 'Yes',
      goodWithKids: 'Yes',
      energyLevel: 'High',
      houseTrained: 'Yes',
      summaryNotes: 'Playful little kitten who loves feather wands, chasing ping pong balls, and falling asleep on shoulders.'
    },
    medicalExams: [
      {
        id: 'EXAM-010',
        date: '2026-09-16',
        veterinarian: 'Dr. Sarah Lin, DVM',
        weightLbs: 3.5,
        dentalGrade: 'Grade 0 (Clean)',
        findings: 'Healthy growing kitten. Normal heart/lungs, clear stool sample.',
        clearedForAdoption: true
      }
    ],
    vaccinations: [
      {
        id: 'VAX-116',
        vaccineName: 'FVRCP Booster #2',
        administeredDate: '2026-09-16',
        expirationDate: '2026-10-16',
        administeredBy: 'Nurse R. Torres, RVT',
        isDueAlert: true // Due soon for 3rd booster!
      }
    ],
    medications: [],
    conditions: [],
    appointments: [
      {
        id: 'APT-003',
        scheduledDate: '2026-10-14',
        scheduledTime: '09:00 AM',
        reason: 'Kitten FVRCP Booster #3 & Spay Evaluation',
        veterinarian: 'Dr. Sarah Lin, DVM',
        status: 'Scheduled'
      }
    ],
    fosterPlacements: [
      {
        id: 'FOST-002',
        animalId: 'FSAS-2026-0108',
        caregiverName: 'Marcus Vance',
        caregiverEmail: 'marcus.vance@example.com',
        caregiverPhone: '(916) 555-4412',
        startDate: '2026-09-17',
        expectedReturnDate: '2026-10-20',
        fosterReason: 'Neonatal Care',
        status: 'Active',
        updates: [
          {
            id: 'FUPD-003',
            date: '2026-09-24',
            caregiverName: 'Marcus Vance',
            weightLbs: 3.5,
            notes: 'Eating kitten pate with gusto. Loves wrestling with my resident adult cat.'
          }
        ]
      }
    ]
  },
  {
    id: 'FSAS-2026-0109',
    name: 'Zeus',
    species: 'Dog',
    breed: 'Siberian Husky',
    ageYears: 3,
    ageMonths: 0,
    ageGroup: 'Adult',
    sex: 'Male',
    color: 'Silver Grey and White',
    size: 'Large (50-80 lbs)',
    weightLbs: 58,
    microchipId: '985141004128918',
    photoUrl: 'https://images.unsplash.com/photo-1563889362352-b0492c224f61?auto=format&fit=crop&w=800&q=80',
    intakeType: 'Stray / Found',
    intakeDate: '2026-09-20',
    intakeLocation: 'Pocket / Greenhaven neighborhood',
    intakeNotes: 'Picked up running in neighborhood park. High energy and talks in classic husky howls.',
    status: 'Returned to Owner',
    locationInShelter: 'Case Closed (RTO)',
    medicallyCleared: true,
    spayNeuterStatus: 'Neutered',
    behavior: {
      goodWithDogs: 'Yes',
      goodWithCats: 'No',
      goodWithKids: 'Yes',
      energyLevel: 'Very High',
      houseTrained: 'Yes',
      summaryNotes: 'Vocal, enthusiastic, escape artist when bored. Reunited with relieved owner who secured fence latch.'
    },
    medicalExams: [],
    vaccinations: [
      {
        id: 'VAX-117',
        vaccineName: 'Rabies (3-Year)',
        administeredDate: '2026-09-21',
        expirationDate: '2029-09-21',
        administeredBy: 'Dr. Sarah Lin, DVM'
      }
    ],
    medications: [],
    conditions: [],
    appointments: [],
    fosterPlacements: [],
    rtoRecord: {
      ownerName: 'Gregory Chen',
      ownerPhone: '(916) 555-7733',
      ownerEmail: 'greg.chen.sac@example.com',
      ownerAddress: '1420 Riverbank Way, Sacramento, CA 95831',
      returnDate: '2026-09-22',
      proofOfOwnership: 'Microchip registration matched + veterinary wellness receipts from 2025',
      redemptionFeePaid: 45,
      notes: 'Owner advised on reinforcing side gate latch. Provided free safety GPS tag promo.'
    }
  },
  {
    id: 'FSAS-2026-0110',
    name: 'Luna',
    species: 'Dog',
    breed: 'Border Collie & Australian Shepherd',
    ageYears: 2,
    ageMonths: 1,
    ageGroup: 'Young',
    sex: 'Female',
    color: 'Black & White with Freckles',
    size: 'Medium (20-50 lbs)',
    weightLbs: 44,
    microchipId: '985141004128919',
    photoUrl: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&w=800&q=80',
    intakeType: 'Owner Surrender',
    intakeDate: '2026-07-15',
    intakeLocation: 'Curtis Park, Sacramento',
    intakeNotes: 'Surrendered due to family downsizing. Very sweet temperament.',
    status: 'Adopted',
    locationInShelter: 'Archived (Adopted)',
    medicallyCleared: true,
    spayNeuterStatus: 'Spayed',
    behavior: {
      goodWithDogs: 'Yes',
      goodWithCats: 'Yes',
      goodWithKids: 'Yes',
      energyLevel: 'High',
      houseTrained: 'Yes',
      summaryNotes: 'Adopted by loving couple in East Sac with large fenced garden.'
    },
    medicalExams: [],
    vaccinations: [],
    medications: [],
    conditions: [],
    appointments: [],
    fosterPlacements: [],
    adoptionRecord: {
      adopterName: 'Claire & David Miller',
      adopterEmail: 'claire.miller@example.com',
      adopterPhone: '(916) 555-9012',
      adopterAddress: '2714 2nd Ave, Sacramento, CA 95818',
      adoptionDate: '2026-08-10',
      adoptionFeePaid: 125,
      certificateId: 'ADOPT-2026-0044',
      notes: 'Passed yard check, excellent dog handling experience.'
    }
  }
];

export const INITIAL_ADOPTION_APPLICATIONS: AdoptionApplication[] = [
  {
    id: 'APP-2026-0301',
    petId: 'FSAS-2026-0101',
    petName: 'Barnaby',
    petSpecies: 'Dog',
    petPhotoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80',
    applicantName: 'Samantha Cooper',
    applicantEmail: 'abrahimzadran21@gmail.com', // Registered test user email
    applicantPhone: '(916) 555-0144',
    applicantAddress: '312 24th St, Midtown Sacramento, CA 95816',
    housingType: 'Rent House',
    landlordApproval: true,
    hasFencedYard: true,
    householdAdults: 2,
    householdChildren: 0,
    existingPets: 'None currently; had a senior golden retriever who passed peacefully last year.',
    petCarePlan: 'I work hybrid (3 days home, 2 days office). Daily morning and evening walks around Capitol Park. Enrolled in local Sacramento obedience club.',
    submittedAt: '2026-09-25 14:30',
    status: 'Under Review',
    reviewedBy: 'Staff Member Jessica',
    reviewNotes: 'Landlord verified; yard is 6ft cedar fence. Applicant meets all shelter requirements for Barnaby.'
  },
  {
    id: 'APP-2026-0302',
    petId: 'FSAS-2026-0102',
    petName: 'Clover',
    petSpecies: 'Cat',
    petPhotoUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80',
    applicantName: 'David & Rachel Kim',
    applicantEmail: 'rachel.kim.sac@example.com',
    applicantPhone: '(916) 555-3891',
    applicantAddress: '1540 T St, Sacramento, CA 95811',
    housingType: 'Own Home',
    landlordApproval: true,
    hasFencedYard: false,
    householdAdults: 2,
    householdChildren: 1,
    existingPets: '1 neutered indoor cat (age 4, very friendly)',
    petCarePlan: 'Indoor only. Plenty of cat perches, scratchers, and daily play sessions.',
    submittedAt: '2026-09-28 09:15',
    status: 'Approved',
    reviewedBy: 'Adoption Coordinator Marcus',
    reviewNotes: 'Approved for meet & greet this Saturday at 11am.',
    decisionDate: '2026-09-28'
  },
  {
    id: 'APP-2026-0303',
    petId: 'FSAS-2026-0103',
    petName: 'Duke',
    petSpecies: 'Dog',
    petPhotoUrl: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=400&q=80',
    applicantName: 'Carlos Gutierrez',
    applicantEmail: 'carlos.gutierrez@example.com',
    applicantPhone: '(916) 555-7281',
    applicantAddress: '4821 11th Ave, Oak Park, Sacramento, CA 95820',
    housingType: 'Own Home',
    landlordApproval: true,
    hasFencedYard: true,
    householdAdults: 3,
    householdChildren: 0,
    existingPets: 'None',
    petCarePlan: 'Experienced with German Shepherds. Large backyard, daily morning trail runs along American River Parkway.',
    submittedAt: '2026-09-29 11:20',
    status: 'Pending'
  }
];

export const INITIAL_LOST_REPORTS: LostPetReport[] = [
  {
    id: 'LOST-2026-001',
    petName: 'Rocky',
    species: 'Dog',
    breed: 'Siberian Husky',
    color: 'Grey and White',
    sex: 'Male',
    microchipId: '985141004128918',
    photoUrl: 'https://images.unsplash.com/photo-1563889362352-b0492c224f61?auto=format&fit=crop&w=600&q=80',
    lastSeenDate: '2026-09-19',
    lastSeenLocation: 'Pocket / Greenhaven near Gloria Dr',
    distinctiveFeatures: 'One blue eye, one brown eye (heterochromia). Blue nylon collar with Sacramento tag.',
    ownerName: 'Gregory Chen',
    ownerPhone: '(916) 555-7733',
    ownerEmail: 'greg.chen.sac@example.com',
    status: 'Reunited',
    matchedAnimalId: 'FSAS-2026-0109',
    notes: 'Reunited through Front Street shelter match!',
    reportedAt: '2026-09-20'
  },
  {
    id: 'LOST-2026-002',
    petName: 'Milo',
    species: 'Cat',
    breed: 'Domestic Shorthair - Orange Tabby',
    color: 'Orange / Ginger Striped',
    sex: 'Male',
    microchipId: '985141009944112',
    photoUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=600&q=80',
    lastSeenDate: '2026-09-27',
    lastSeenLocation: 'Midtown Sacramento (26th & N St)',
    distinctiveFeatures: 'Small notch on left ear tip. Wears reflective green collar with bell.',
    ownerName: 'Samantha Cooper',
    ownerPhone: '(916) 555-0144',
    ownerEmail: 'abrahimzadran21@gmail.com',
    status: 'Open Search',
    reportedAt: '2026-09-27'
  }
];

export const INITIAL_FOUND_REPORTS: FoundAnimalReport[] = [
  {
    id: 'FOUND-2026-001',
    species: 'Dog',
    breedDescription: 'Golden Retriever Mix',
    color: 'Light Honey / Cream',
    sex: 'Male',
    photoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80',
    foundDate: '2026-08-14',
    foundLocation: 'McKinley Park (33rd & H St)',
    finderName: 'Officer Miller',
    finderPhone: '(916) 808-7387',
    finderEmail: 'intake@frontstreetshelter.org',
    currentHolding: 'Brought to Front Street Shelter',
    shelterIntakeId: 'FSAS-2026-0101',
    status: 'Admitted to Shelter',
    reportedAt: '2026-08-14'
  },
  {
    id: 'FOUND-2026-002',
    species: 'Cat',
    breedDescription: 'Grey and White Tuxedo Kitten',
    color: 'Smoky Grey and White',
    sex: 'Female',
    photoUrl: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=600&q=80',
    foundDate: '2026-09-28',
    foundLocation: 'East Sacramento near Folsom Blvd & 48th St',
    finderName: 'Linda Nguyen',
    finderPhone: '(916) 555-6677',
    finderEmail: 'linda.nguyen.sac@example.com',
    currentHolding: 'Finder Keeping Temporarily',
    status: 'Open',
    reportedAt: '2026-09-28'
  }
];

export const INITIAL_VOLUNTEER_SHIFTS: VolunteerShift[] = [
  {
    id: 'SHIFT-001',
    title: 'Morning Canine Enrichment & Walking',
    category: 'Dog Walking & Enrichment',
    date: '2026-10-03',
    timeWindow: '8:00 AM - 11:00 AM',
    location: 'Front Street Main Shelter - Dog Runs A & B',
    capacity: 6,
    registeredUsers: [
      { name: 'Samantha Cooper', email: 'abrahimzadran21@gmail.com' },
      { name: 'Lucas Martin', email: 'lucas.m@example.com' },
      { name: 'Claire Miller', email: 'claire.miller@example.com' }
    ],
    description: 'Provide morning potty breaks, physical exercise, and positive puzzle toy enrichment for shelter dogs.'
  },
  {
    id: 'SHIFT-002',
    title: 'Cattery Socialization & Kitty Cuddles',
    category: 'Cattery Care & Cuddles',
    date: '2026-10-03',
    timeWindow: '1:00 PM - 3:30 PM',
    location: 'Front Street Main Shelter - Cattery Rooms 1-4',
    capacity: 4,
    registeredUsers: [
      { name: 'Elena Ramirez', email: 'elena.ramirez.sac@example.com' }
    ],
    description: 'Brush, play, and socialize shelter cats to reduce kennel stress and prepare them for adoptive families.'
  },
  {
    id: 'SHIFT-003',
    title: 'Low-Cost Spay/Neuter Clinic Support Assistant',
    category: 'Veterinary Clinic Support',
    date: '2026-10-05',
    timeWindow: '7:30 AM - 11:30 AM',
    location: 'Front Street Veterinary Clinic Building',
    capacity: 3,
    registeredUsers: [
      { name: 'Samantha Cooper', email: 'abrahimzadran21@gmail.com' },
      { name: 'Devon Patel', email: 'devon.p@example.com' }
    ],
    description: 'Assist veterinary technicians with patient intake, recovery towel warming, cage prep, and recovery monitoring.'
  },
  {
    id: 'SHIFT-004',
    title: 'Weekend Mobile Adoption Fair at Midtown Farmers Market',
    category: 'Adoption Center Welcome Desk',
    date: '2026-10-10',
    timeWindow: '9:00 AM - 1:00 PM',
    location: 'Midtown Farmers Market (20th & J St, Sacramento)',
    capacity: 5,
    registeredUsers: [
      { name: 'Marcus Vance', email: 'marcus.vance@example.com' }
    ],
    description: 'Staff the mobile adoption van, introduce adoptable pets to community visitors, hand out adoption packets.'
  },
  {
    id: 'SHIFT-005',
    title: 'Community Pet Food Pantry Distribution',
    category: 'Food Pantry Distribution',
    date: '2026-10-11',
    timeWindow: '10:00 AM - 1:00 PM',
    location: 'Front Street Animal Shelter - North Gate Pantry',
    capacity: 8,
    registeredUsers: [],
    description: 'Help distribute free dog & cat food, litter, and supplies to Sacramento pet guardians in need.'
  }
];

export const INITIAL_FOSTER_APPLICATIONS: FosterApplication[] = [
  {
    id: 'FOST-APP-001',
    applicantName: 'Samantha Cooper',
    email: 'abrahimzadran21@gmail.com',
    phone: '(916) 555-0144',
    address: '312 24th St, Midtown Sacramento',
    housingType: 'House with yard',
    preferredTypes: ['Post-surgery dogs', 'Adult cats', 'Kitten litters'],
    experienceSummary: 'Fostered 4 litters of kittens in the past 3 years; comfortable administering oral medications.',
    submittedAt: '2026-09-10',
    status: 'Approved',
    approvalNotes: 'Home check complete; approved for dog and cat foster care.'
  },
  {
    id: 'FOST-APP-002',
    applicantName: 'Brian Torres',
    email: 'brian.torres@example.com',
    phone: '(916) 555-9201',
    address: '1109 46th St, East Sacramento',
    housingType: 'Apartment',
    preferredTypes: ['Bottle-baby neonatal kittens'],
    experienceSummary: 'Experienced with bottle feeding every 2-3 hours.',
    submittedAt: '2026-09-24',
    status: 'Pending'
  }
];

export const INITIAL_VOLUNTEER_APPLICATIONS: VolunteerApplication[] = [
  {
    id: 'VOL-APP-001',
    applicantName: 'Samantha Cooper',
    email: 'abrahimzadran21@gmail.com',
    phone: '(916) 555-0144',
    interests: ['Dog Walking & Enrichment', 'Veterinary Clinic Support'],
    availability: ['Weekend Mornings', 'Friday Afternoons'],
    experience: 'Previous volunteer at SPCA, completed fear-free animal handling training.',
    status: 'Approved',
    submittedAt: '2026-08-20'
  }
];

export const INITIAL_DONATIONS: DonationRecord[] = [
  {
    id: 'DON-2026-0891',
    receiptNumber: 'REC-FSAS-2026-0891',
    donorName: 'Samantha Cooper',
    donorEmail: 'abrahimzadran21@gmail.com',
    amount: 100,
    tierTitle: 'Spay & Neuter Sponsorship',
    isMonthly: false,
    tributeType: 'In Honor of',
    tributeName: 'Barnaby & Sacramento Rescue Dogs',
    timestamp: '2026-09-26 16:45',
    paymentMethod: 'Credit Card (**** 4242)',
    taxDeductibleEIN: '68-0194821 - Front Street Animal Shelter Foundation'
  },
  {
    id: 'DON-2026-0890',
    receiptNumber: 'REC-FSAS-2026-0890',
    donorName: 'Arthur & Barbara Pendelton',
    donorEmail: 'arthur.p@example.com',
    amount: 250,
    tierTitle: 'Emergency Medical & Surgery Fund',
    isMonthly: true,
    tributeType: 'In Memory of',
    tributeName: 'Rusty the Heeler',
    timestamp: '2026-09-24 10:12',
    paymentMethod: 'Bank ACH',
    taxDeductibleEIN: '68-0194821 - Front Street Animal Shelter Foundation'
  }
];
