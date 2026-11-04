type LegalInfo = {
  tradingName: string;
  registeredName: string | null;
  registrationNumber: string | null;
  vatNumber: string | null;
  physicalAddress: string | null;
  informationOfficer: string | null;
  lastUpdated: string;
};

export const legal: LegalInfo = {
  tradingName: "OP Garage & Gate Repairs",
  /* Fill in what the owner has. Anything left null is not shown. */
  registeredName: null,
  registrationNumber: null,
  vatNumber: null,
  physicalAddress: null,
  /* Name of the person responsible for privacy questions (POPIA) */
  informationOfficer: null,
  lastUpdated: "4 November 2026",
};
