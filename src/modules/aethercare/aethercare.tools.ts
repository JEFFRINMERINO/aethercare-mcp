import { ToolDecorator as Tool, Widget, ExecutionContext, z } from '@nitrostack/core';

// Mock datasets for Indian Healthcare Ecosystem (Ayushman Bharat PM-JAY, CGHS, NPPA price caps)

interface HospitalRecord {
  id: string;
  name: string;
  city: string;
  state: string;
  pincode: string;
  empanelmentStatus: 'EMPANELED_ACTIVE' | 'SUSPENDED' | 'BLACK_LISTED' | 'UNDER_REVIEW';
  schemesSupported: string[];
  cashlessFacility: boolean;
  icuBedsAvailable: number;
  lastInspectionDate: string;
  warningFlags: string[];
  contactPhone: string;
  address: string;
}

const HOSPITALS_DATABASE: HospitalRecord[] = [
  {
    id: 'HOSP-001',
    name: 'City Care Super Specialty Hospital',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400012',
    empanelmentStatus: 'EMPANELED_ACTIVE',
    schemesSupported: ['Ayushman Bharat (PM-JAY)', 'MJPJAY (Maharashtra)', 'CGHS'],
    cashlessFacility: true,
    icuBedsAvailable: 14,
    lastInspectionDate: '2026-06-10',
    warningFlags: [],
    contactPhone: '+91-22-5551-0192',
    address: 'Sector 4, Parel, Mumbai, MH'
  },
  {
    id: 'HOSP-002',
    name: 'Apollo Lifecare Hospital',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110025',
    empanelmentStatus: 'SUSPENDED',
    schemesSupported: ['CGHS', 'ECHS'],
    cashlessFacility: false,
    icuBedsAvailable: 0,
    lastInspectionDate: '2026-07-01',
    warningFlags: ['Cashless facility suspended due to audit investigation', 'Reported out-of-pocket cash demands'],
    contactPhone: '+91-11-4992-8800',
    address: 'Sarita Vihar, Mathura Road, New Delhi'
  },
  {
    id: 'HOSP-003',
    name: 'Sanjivani Multispecialty Trust Hospital',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560001',
    empanelmentStatus: 'EMPANELED_ACTIVE',
    schemesSupported: ['Ayushman Bharat (PM-JAY)', 'SAST (Karnataka)', 'CGHS'],
    cashlessFacility: true,
    icuBedsAvailable: 8,
    lastInspectionDate: '2026-05-20',
    warningFlags: [],
    contactPhone: '+91-80-2211-9922',
    address: 'MG Road, Richmond Town, Bengaluru, KA'
  },
  {
    id: 'HOSP-004',
    name: 'Metro Global Health Institute',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    pincode: '226001',
    empanelmentStatus: 'BLACK_LISTED',
    schemesSupported: [],
    cashlessFacility: false,
    icuBedsAvailable: 0,
    lastInspectionDate: '2026-04-12',
    warningFlags: ['Permanently de-empanelled for fake billing fraud (Order #NHA/UP/2026/891)'],
    contactPhone: '+91-522-3344-556',
    address: 'Hazratganj Main Road, Lucknow, UP'
  }
];

const PRICE_CAPS_REGISTRY: Record<string, { category: string; legalMaxINR: number; nppaOrderRef: string; details: string }> = {
  'cardiac_stent_des': {
    category: 'Medical Device',
    legalMaxINR: 38260,
    nppaOrderRef: 'NPPA/SO-1334(E)/2025',
    details: 'Drug-Eluting Stents (DES) capped including GST. Mandatory breakdown in final hospital invoice.'
  },
  'cardiac_stent_bms': {
    category: 'Medical Device',
    legalMaxINR: 10500,
    nppaOrderRef: 'NPPA/SO-1334(E)/2025',
    details: 'Bare-Metal Stents (BMS) maximum allowable cost.'
  },
  'knee_replacement_implants': {
    category: 'Medical Device',
    legalMaxINR: 64180,
    nppaOrderRef: 'NPPA/TKR-CAP/2025',
    details: 'Primary Knee Joint Replacement Implants (Standard Cobalt Chromium alloy).'
  },
  'icu_bed_daily_rate_pmjay': {
    category: 'Hospital Package',
    legalMaxINR: 4500,
    nppaOrderRef: 'NHA/PMJAY/RATE-LIST/2026',
    details: 'Daily ICU Bed Rate under PM-JAY including basic drugs, nursing charges, and monitoring.'
  },
  'cataract_surgery_package': {
    category: 'Surgical Package',
    legalMaxINR: 12500,
    nppaOrderRef: 'NHA/PMJAY/CATARACT/2025',
    details: 'Complete bilateral or mono-focal cataract surgery with fold-able IOL lens included.'
  }
};

export class AetherCareTools {

  @Tool({
    name: 'check_hospital_empanelment',
    description: 'Lookup hospital empanelment status, cashless facility availability, active scheme coverage (PM-JAY, CGHS), and fraud/blacklist warnings.',
    inputSchema: z.object({
      query: z.string().default('Hospital').describe('Hospital name, city, or pincode (e.g., "Apollo", "Mumbai", "560001")'),
      scheme_filter: z.string().optional().describe('Filter by specific scheme like "Ayushman Bharat (PM-JAY)" or "CGHS"')
    }),
    examples: {
      request: {
        query: 'City Care',
        scheme_filter: 'Ayushman Bharat (PM-JAY)'
      },
      response: {
        totalFound: 1,
        hospitals: [
          {
            name: 'City Care Super Specialty Hospital',
            city: 'Mumbai',
            empanelmentStatus: 'EMPANELED_ACTIVE',
            cashlessFacility: true
          }
        ]
      }
    }
  })
  @Widget('empanelment-card')
  async checkHospitalEmpanelment(input: { query?: string; scheme_filter?: string }, ctx: ExecutionContext) {
    const rawQuery = input?.query || '';
    ctx.logger.info('Searching hospital empanelment', { query: rawQuery, filter: input?.scheme_filter });

    const q = rawQuery.trim().toLowerCase();

    let results = q === '' 
      ? HOSPITALS_DATABASE
      : HOSPITALS_DATABASE.filter(h =>
          h.name.toLowerCase().includes(q) ||
          h.city.toLowerCase().includes(q) ||
          h.pincode.includes(q) ||
          h.state.toLowerCase().includes(q)
        );

    if (input?.scheme_filter) {
      const sf = input.scheme_filter.toLowerCase();
      results = results.filter(h => h.schemesSupported.some(s => s.toLowerCase().includes(sf)));
    }

    return {
      searchQuery: rawQuery || 'All Hospitals',
      schemeFilter: input?.scheme_filter || 'All Schemes',
      totalFound: results.length,
      timestamp: new Date().toISOString(),
      hospitals: results
    };
  }

  @Tool({
    name: 'verify_procedure_price_cap',
    description: 'Verify government legally mandated price caps for medical devices (stents, implants) and surgical packages under NPPA & NHA guidelines.',
    inputSchema: z.object({
      procedure_key: z.enum([
        'cardiac_stent_des',
        'cardiac_stent_bms',
        'knee_replacement_implants',
        'icu_bed_daily_rate_pmjay',
        'cataract_surgery_package'
      ]).default('cardiac_stent_des').describe('The specific medical procedure or device key to verify'),
      quoted_price_inr: z.number().optional().describe('Hospital quoted estimate price in INR to test against maximum cap')
    })
  })
  @Widget('price-cap-audit')
  async verifyProcedurePriceCap(input: { procedure_key?: string; quoted_price_inr?: number }, ctx: ExecutionContext) {
    const key = input?.procedure_key || 'cardiac_stent_des';
    ctx.logger.info('Verifying procedure price cap', { key, price: input?.quoted_price_inr });

    const capInfo = PRICE_CAPS_REGISTRY[key] || PRICE_CAPS_REGISTRY['cardiac_stent_des'];
    const quoted = input?.quoted_price_inr;
    let isExceeded = false;
    let excessAmountINR = 0;
    let status: 'PASSED_WITHIN_CAP' | 'FRAUD_OVERCHARGE_RISK' | 'INFORMATIONAL' = 'INFORMATIONAL';

    if (quoted !== undefined && quoted !== null) {
      if (quoted > capInfo.legalMaxINR) {
        isExceeded = true;
        excessAmountINR = Math.round((quoted - capInfo.legalMaxINR) * 100) / 100;
        status = 'FRAUD_OVERCHARGE_RISK';
      } else {
        status = 'PASSED_WITHIN_CAP';
      }
    }

    return {
      procedureKey: key,
      category: capInfo.category,
      legalMaxINR: capInfo.legalMaxINR,
      quotedPriceINR: quoted ?? null,
      isExceeded,
      excessAmountINR,
      status,
      regulatoryOrder: capInfo.nppaOrderRef,
      officialDetails: capInfo.details,
      legalConsumerRight: 'Hospitals demanding charges above the NPPA/NHA cap are committing illegal price gouging punishable under DPCO 2013 & IT Act 2000.'
    };
  }

  @Tool({
    name: 'check_scheme_eligibility_and_docs',
    description: 'Check patient eligibility for public health insurance (PM-JAY, State schemes) and generate required pre-authorization document checklist.',
    inputSchema: z.object({
      annual_family_income_inr: z.number().default(200000).describe('Annual household income in INR'),
      caste_category: z.enum(['GENERAL', 'OBC', 'SC', 'ST', 'EWS']).default('OBC').describe('Social category'),
      state: z.string().default('Maharashtra').describe('State of residence (e.g. "Maharashtra", "Karnataka", "Delhi")'),
      has_ration_card: z.boolean().default(true).describe('Whether the family possesses a valid Ration Card (Phh / AAY)')
    })
  })
  @Widget('document-checklist')
  async checkSchemeEligibilityAndDocs(input: { annual_family_income_inr?: number; caste_category?: string; state?: string; has_ration_card?: boolean }, ctx: ExecutionContext) {
    const income = input?.annual_family_income_inr ?? 200000;
    const caste = input?.caste_category ?? 'GENERAL';
    const state = input?.state ?? 'Maharashtra';
    const ration = input?.has_ration_card ?? true;

    ctx.logger.info('Checking scheme eligibility', { income, caste, state, ration });

    const isPMJAYEligible = ration || income <= 250000 || ['SC', 'ST', 'EWS'].includes(caste);
    const estimatedCoverageINR = isPMJAYEligible ? 500000 : 0;

    const requiredDocuments = [
      { name: 'Aadhaar Card of Patient', required: true, status: 'MANDATORY', note: 'Used for NHA biometric authentication' },
      { name: 'Ration Card / BPL Card', required: true, status: 'MANDATORY', note: 'Family verification for cashless entitlement' },
      { name: 'Doctor Pre-Authorization Letter', required: true, status: 'MANDATORY', note: 'Issued by hospital desk for package booking' },
      { name: 'Income Certificate / Self Declaration', required: income <= 300000, status: 'RECOMMENDED', note: 'Required for state specific top-up funds' },
      { name: 'Ayushman Card (Golden Card)', required: isPMJAYEligible, status: 'MANDATORY', note: 'Can be generated instantly at hospital CSC counter' }
    ];

    return {
      patientEligibility: {
        isEligiblePMJAY: isPMJAYEligible,
        coverageAmountINR: estimatedCoverageINR,
        primarySchemeName: isPMJAYEligible ? 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)' : 'Private TPA / State General Scheme',
        stateSpecificScheme: `${state} State Universal Health Trust Fund`
      },
      documentChecklist: requiredDocuments,
      actionSteps: [
        'Present Aadhaar & Ration card at the hospital Ayushman Mitra counter.',
        'Obtain initial diagnostic pre-auth requisition from treating specialist.',
        'Ensure hospital submits electronic pre-authorization before procedure starts.'
      ]
    };
  }

  @Tool({
    name: 'analyze_billing_fraud_risk',
    description: 'Audit line-item medical hospital bills or pre-treatment cost estimates to detect illegal out-of-pocket demands and price cap violations.',
    inputSchema: z.object({
      hospital_name: z.string().default('City Hospital').describe('Name of the hospital issuing the estimate/bill'),
      is_cashless_admission: z.boolean().default(true).describe('Whether the patient is admitted under a Cashless / PM-JAY policy'),
      line_items: z.array(z.object({
        item_name: z.string().describe('Item description (e.g. "Stent", "ICU Bed Daily", "Nursing Surcharge")'),
        amount_charged_inr: z.number().describe('Amount charged by hospital in INR')
      })).default([
        { item_name: 'Cardiac Stent DES', amount_charged_inr: 65000 },
        { item_name: 'ICU Bed Charges', amount_charged_inr: 7500 }
      ]).describe('List of bill line-items to audit')
    })
  })
  @Widget('price-cap-audit')
  async analyzeBillingFraudRisk(input: { hospital_name?: string; is_cashless_admission?: boolean; line_items?: Array<{ item_name: string; amount_charged_inr: number }> }, ctx: ExecutionContext) {
    const hospitalName = input?.hospital_name || 'Hospital';
    const isCashless = input?.is_cashless_admission ?? true;
    const lineItems = input?.line_items || [];

    ctx.logger.info('Auditing medical bill for fraud risk', { hospital: hospitalName, lines: lineItems.length });

    let totalBilledINR = 0;
    let totalCapExcessINR = 0;
    const auditResults: Array<{ item: string; charged: number; maxAllowed: number; status: string; flag: string | null }> = [];

    for (const line of lineItems) {
      totalBilledINR += line.amount_charged_inr;
      const lower = (line.item_name || '').toLowerCase();
      let cap = line.amount_charged_inr;
      let flag: string | null = null;

      if (lower.includes('stent')) {
        cap = PRICE_CAPS_REGISTRY['cardiac_stent_des'].legalMaxINR;
        if (line.amount_charged_inr > cap) {
          flag = `Exceeds NPPA Cardiac Stent Price Cap of ₹${cap.toLocaleString('en-IN')}`;
          totalCapExcessINR += (line.amount_charged_inr - cap);
        }
      } else if (lower.includes('icu') && isCashless) {
        cap = PRICE_CAPS_REGISTRY['icu_bed_daily_rate_pmjay'].legalMaxINR;
        if (line.amount_charged_inr > cap) {
          flag = `Illegal extra ICU surcharge under Cashless PM-JAY admission`;
          totalCapExcessINR += (line.amount_charged_inr - cap);
        }
      } else if (lower.includes('cash demand') || lower.includes('deposit') || lower.includes('out of pocket')) {
        if (isCashless) {
          cap = 0;
          flag = `Illegal upfront cash demand under cashless scheme policy`;
          totalCapExcessINR += line.amount_charged_inr;
        }
      }

      auditResults.push({
        item: line.item_name,
        charged: line.amount_charged_inr,
        maxAllowed: cap,
        status: flag ? 'VIOLATION' : 'VALID',
        flag
      });
    }

    const hasViolations = totalCapExcessINR > 0;

    return {
      hospitalName,
      isCashlessAdmission: isCashless,
      totalBilledINR,
      totalCapExcessINR,
      riskLevel: hasViolations ? 'HIGH_FRAUD_RISK' : 'CLEAN_COMPLIANT',
      auditSummary: hasViolations
        ? `Found ₹${totalCapExcessINR.toLocaleString('en-IN')} in illegal overcharges / price cap violations.`
        : 'All line items appear compliant with legal ceilings.',
      lineItemsAudit: auditResults,
      recourseAdvice: hasViolations
        ? 'File an instant grievance on NHA National Grievance Portal (14555) or report to the State Anti-Fraud Unit (SAFU).'
        : 'Proceed with standard hospital billing approval.'
    };
  }

  @Tool({
    name: 'search_healthcare_announcements',
    description: 'Fetch recent government health circulars, hospital suspension notices, and regulatory updates in Indian public healthcare.',
    inputSchema: z.object({
      category: z.enum(['ALL', 'BLACK_LISTING', 'PRICE_CAPS', 'SCHEME_UPDATES']).default('ALL').describe('Category of circulars')
    })
  })
  async searchHealthcareAnnouncements(input: { category?: string }, ctx: ExecutionContext) {
    const category = input?.category || 'ALL';
    ctx.logger.info('Searching healthcare announcements', { category });

    const announcements = [
      {
        id: 'CIRC-2026-044',
        title: 'NHA Order: Immediate Suspension of 12 Private Hospitals in UP & Maharashtra for Phantom Billing',
        date: '2026-07-20',
        category: 'BLACK_LISTING',
        summary: 'State Anti-Fraud Unit (SAFU) suspended empanelment after detecting fake ICU admissions.'
      },
      {
        id: 'CIRC-2026-031',
        title: 'NPPA Revised Price Ceilings for Orthopedic Implants & Coronary Stents',
        date: '2026-06-15',
        category: 'PRICE_CAPS',
        summary: 'Updated maximum retail prices for medical devices enforced under DPCO 2013.'
      },
      {
        id: 'CIRC-2026-018',
        title: 'Ayushman Bharat PM-JAY Coverage Expansion to All Senior Citizens Aged 70+',
        date: '2026-05-10',
        category: 'SCHEME_UPDATES',
        summary: 'Universal top-up card issuance unlocked for elderly citizens regardless of household income.'
      }
    ];

    const filtered = category === 'ALL'
      ? announcements
      : announcements.filter(a => a.category === category);

    return {
      categoryFilter: category,
      totalFound: filtered.length,
      announcements: filtered
    };
  }
}
