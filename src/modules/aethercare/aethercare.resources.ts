import { ResourceDecorator as Resource, ExecutionContext } from '@nitrostack/core';

export class AetherCareResources {

  @Resource({
    uri: 'aethercare://schemes/pmjay_master',
    name: 'Ayushman Bharat PM-JAY Guidelines & Policy Rules',
    description: 'Structured reference document for entitlement rules, cashless package limits, and family card verification.',
    mimeType: 'application/json'
  })
  async getPmjayGuidelines(ctx: ExecutionContext) {
    ctx.logger.info('Fetching PM-JAY guidelines resource');

    return {
      schemeName: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
      authority: 'National Health Authority (NHA), Ministry of Health & Family Welfare',
      financialCap: '₹5,00,000 per family per year on a family floater basis',
      cashlessGuarantee: '100% cashless treatment at empanelled public and private hospitals',
      keyCoverageItems: [
        'Pre-hospitalization diagnostics up to 3 days prior',
        'Post-hospitalization medicine and follow-up care up to 15 days',
        'Surgical packages including implants and ICU stay',
        'No upper limit on family size or age'
      ],
      grievanceHelpline: '14555 / 1800-111-555'
    };
  }

  @Resource({
    uri: 'aethercare://regulations/price_caps',
    name: 'NPPA & NHA Medical Device & Package Ceiling Prices',
    description: 'Central registry of maximum ceiling prices for coronary stents, knee implants, and daily ICU charges.',
    mimeType: 'application/json'
  })
  async getPriceCapsRegistry(ctx: ExecutionContext) {
    ctx.logger.info('Fetching price caps registry resource');

    return {
      registryTitle: 'National Drug & Medical Device Price Control Registry',
      governingAct: 'Drugs (Prices Control) Order, 2013 under Essential Commodities Act',
      stentCeilings: {
        bareMetalStentINR: 10500,
        drugElutingStentINR: 38260,
        note: 'Prices inclusive of local taxes/GST. Separate billing above ceiling is strictly illegal.'
      },
      orthopedicCeilings: {
        kneeReplacementCobaltChromiumINR: 64180,
        specializedTitaniumOptionINR: 78500
      },
      hospitalICUCeilings: {
        pmjayIcuPerDayINR: 4500,
        cghsIcuPerDayINR: 5200
      }
    };
  }
}
