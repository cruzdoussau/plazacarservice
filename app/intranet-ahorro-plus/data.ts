export type PreferredClient = {
  id: string;
  registeredAt: string;
  name: string;
  rut: string;
  rutKey: string;
  phone: string;
  plate: string;
  brand: string;
  referrer: string;
};

export type BenefitKey = "washes" | "technicalReview" | "brakeReview" | "savings";

export const benefitLimits = {
  washes: 3,
  technicalReview: 1,
  brakeReview: 1,
  savings: 15000,
} as const;

export const benefitLabels: Record<BenefitKey, string> = {
  washes: "Lavados sin costo",
  technicalReview: "Pre-revision tecnica",
  brakeReview: "Revision sistema de frenos",
  savings: "Pesos ahorro",
};

export const preferredClients: PreferredClient[] = [
  {
    "id": "209911159-vl6731",
    "registeredAt": "2026-07-29",
    "name": "WILLIAM SANTANA",
    "rut": "20991115-9",
    "rutKey": "209911159",
    "phone": "56945025194",
    "plate": "VL6731",
    "brand": "PEUGEOT",
    "referrer": ""
  },
  {
    "id": "130568157-fdwf95",
    "registeredAt": "2026-07-29",
    "name": "FABIOLA SERRA",
    "rut": "13056815-7",
    "rutKey": "130568157",
    "phone": "56940499166",
    "plate": "FDWF95",
    "brand": "SUZUKI",
    "referrer": ""
  },
  {
    "id": "72086570-jkf287",
    "registeredAt": "2026-07-29",
    "name": "CARMEN ORELLANA",
    "rut": "7208657-0",
    "rutKey": "72086570",
    "phone": "56979618904",
    "plate": "JKF287",
    "brand": "KIA",
    "referrer": ""
  },
  {
    "id": "196590316-dsvw52",
    "registeredAt": "2026-07-29",
    "name": "FELIPE ALVAREZ",
    "rut": "19659031-6",
    "rutKey": "196590316",
    "phone": "56975402254",
    "plate": "DSVW52",
    "brand": "VOLVO",
    "referrer": ""
  }
];
