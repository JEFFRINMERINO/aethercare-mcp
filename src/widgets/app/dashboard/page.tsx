'use client';

import { useState } from 'react';
import { useTheme, useWidgetSDK } from '@nitrostack/widgets';

export default function AgenticDashboardWidget() {
  const theme = useTheme();
  const { getToolOutput } = useWidgetSDK();
  const rawData = getToolOutput<any>();

  const isDark = theme === 'dark';
  const initialQuery = rawData?.userQuery || rawData?.query || 'Emergency cardiac stent surgery at Kauvery Chennai under CMCHIS card, hospital demands 45000 cash';

  const [activeTab, setActiveTab] = useState<'pipeline' | 'empanelment' | 'pricecap' | 'checklist' | 'grievance' | 'rebate'>('pipeline');
  const [userPrompt, setUserPrompt] = useState(initialQuery);
  const [copied, setCopied] = useState(false);

  const sampleNotice = `TO: The Nodal Grievance Officer & SAFU Desk
HOSPITAL: Kauvery Super Specialty Hospital, Chennai, Tamil Nadu
BENEFICIARY ID: PMJAY-TN-9920148-2026
SUBJECT: STATUTORY FORM 14555 LEGAL NOTICE FOR PROHIBITED CASH DEMAND UNDER CMCHIS / PM-JAY CLAUSE 16

1. The beneficiary presented a valid CMCHIS / PM-JAY Cashless card for emergency cardiac intervention.
2. Hospital counter demanded ₹45,000 upfront cash deposit for Drug-Eluting Stent (NPPA legal ceiling: ₹38,260).
3. Demand violates DPCO 2013 and NHA Cashless Guidelines.
4. Immediate conversion to 100% cashless admission required within 2 hours, failing which SAFU Tamil Nadu action will be enforced.`;

  const copyNotice = () => {
    navigator.clipboard.writeText(sampleNotice);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div style={{
      padding: '24px',
      background: isDark
        ? 'linear-gradient(135deg, #090d16 0%, #0f172a 50%, #1e1b4b 100%)'
        : 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
      borderRadius: '24px',
      color: isDark ? '#ffffff' : '#0f172a',
      maxWidth: '680px',
      boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      border: '1px solid ' + (isDark ? 'rgba(99, 102, 241, 0.4)' : '#cbd5e1')
    }}>
      {/* Top Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
            padding: '12px 16px',
            borderRadius: '18px',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '24px',
            boxShadow: '0 0 24px rgba(99, 102, 241, 0.6)'
          }}>
            ⚡
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, letterSpacing: '-0.5px' }}>
              AetherCare Agentic Control Hub
            </h2>
            <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 600 }}>
              ● AUTONOMOUS HEALTHCARE ENGINE • 10 TOOLS ONLINE • 5 RESOURCES SYNCED
            </span>
          </div>
        </div>

        <span style={{
          background: 'rgba(99, 102, 241, 0.15)',
          color: '#818cf8',
          fontSize: '11px',
          fontWeight: 700,
          padding: '6px 12px',
          borderRadius: '20px',
          border: '1px solid rgba(99, 102, 241, 0.3)'
        }}>
          v2.0 AGENTIC MOE
        </span>
      </div>

      {/* Interactive Scenario Bar */}
      <div style={{
        background: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff',
        border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'),
        padding: '14px',
        borderRadius: '16px',
        marginBottom: '20px'
      }}>
        <label style={{ fontSize: '12px', fontWeight: 700, opacity: 0.8, display: 'block', marginBottom: '6px' }}>
          🔍 Patient Scenario / Emergency Investigation Query:
        </label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            style={{
              flex: 1,
              background: isDark ? '#090d16' : '#f8fafc',
              border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.15)' : '#cbd5e1'),
              borderRadius: '10px',
              padding: '10px 14px',
              color: isDark ? '#ffffff' : '#0f172a',
              fontSize: '13px',
              outline: 'none'
            }}
          />
          <button style={{
            background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            padding: '10px 18px',
            fontWeight: 700,
            fontSize: '13px',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)'
          }}>
            ▷ Run Investigation
          </button>
        </div>
      </div>

      {/* 360-Degree Control Tabs */}
      <div style={{
        display: 'flex',
        gap: '6px',
        overflowX: 'auto',
        paddingBottom: '8px',
        marginBottom: '20px',
        borderBottom: '1px solid ' + (isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0')
      }}>
        {[
          { id: 'pipeline', label: '⚡ Agentic Pipeline' },
          { id: 'empanelment', label: '🏥 Empanelment Status' },
          { id: 'pricecap', label: '⚖️ NPPA Price Caps' },
          { id: 'checklist', label: '📋 Pre-Auth Checklist' },
          { id: 'grievance', label: '📜 Form 14555 Notice' },
          { id: 'rebate', label: '💵 Cashless Rebate' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              background: activeTab === tab.id
                ? 'linear-gradient(135deg, #6366f1, #3b82f6)'
                : isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              color: activeTab === tab.id ? 'white' : isDark ? '#94a3b8' : '#64748b',
              border: 'none',
              borderRadius: '10px',
              padding: '8px 14px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT PANELS */}

      {/* Tab 1: Agentic Pipeline */}
      {activeTab === 'pipeline' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800 }}>⚡ 5-Stage Autonomous Execution State Machine</h4>
            <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>● ALL STAGES ENFORCED (349ms)</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { num: 1, title: 'PERCEPTION & INGESTION', desc: 'Ingested Kauvery Hospital Chennai (CMCHIS TN & PM-JAY active empanelment).' },
              { num: 2, title: 'MOE REASONING', desc: 'Cross-verified Drug-Eluting Stent cap (₹38,260) vs hospital cash quote.' },
              { num: 3, title: 'FRAUD AUDIT', desc: 'Flagged ₹6,740 overcharge + prohibited upfront cash deposit under CMCHIS Clause 14.' },
              { num: 4, title: 'LEGAL FORMULATION', desc: 'Generated statutory Form 14555 Legal Notice & SAFU Tamil Nadu packet.' },
              { num: 5, title: 'DISPATCH & ENFORCEMENT', desc: 'Webhooks dispatched to Hospital Nodal Officer & SAFU Helpline (1800-425-3993).' }
            ].map((s) => (
              <div key={s.num} style={{
                background: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff',
                borderLeft: '4px solid #6366f1',
                padding: '10px 14px',
                borderRadius: '10px',
                fontSize: '12px'
              }}>
                <strong style={{ color: '#818cf8' }}>STAGE {s.num}: {s.title}</strong>
                <p style={{ margin: '2px 0 0 0', opacity: 0.85 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Empanelment Status */}
      {activeTab === 'empanelment' && (
        <div style={{ fontSize: '13px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 800 }}>🏥 South & National Hospital Empanelment Radar</h4>
          <div style={{
            background: isDark ? 'rgba(16, 185, 129, 0.1)' : '#f0fdf4',
            border: '1px solid #10b981',
            padding: '14px',
            borderRadius: '14px',
            marginBottom: '10px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
              <span>Kauvery Super Specialty Hospital, Chennai</span>
              <span style={{ color: '#10b981' }}>EMPANELED ACTIVE</span>
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', opacity: 0.8 }}>
              Schemes: CMCHIS Tamil Nadu • Ayushman Bharat (PM-JAY) • CGHS<br />
              Cashless Facility: <strong>100% ACTIVE</strong> • Free ICU Beds: <strong>18 Available</strong>
            </p>
          </div>

          <div style={{
            background: isDark ? 'rgba(239, 68, 68, 0.1)' : '#fff1f2',
            border: '1px solid #ef4444',
            padding: '14px',
            borderRadius: '14px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
              <span>PSG Super Specialty Hospital, Coimbatore</span>
              <span style={{ color: '#ef4444' }}>SUSPENDED</span>
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', opacity: 0.8 }}>
              Warning: Cashless CMCHIS facility suspended for audit investigation by SAFU Tamil Nadu.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: NPPA Price Caps */}
      {activeTab === 'pricecap' && (
        <div style={{ fontSize: '13px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 800 }}>⚖️ Statutory NPPA Price Ceiling Matrix</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ fontSize: '11px', opacity: 0.7, display: 'block' }}>Cardiac Stent (DES) Cap</span>
              <strong style={{ fontSize: '18px', color: '#10b981' }}>₹38,260</strong>
              <p style={{ margin: '4px 0 0 0', fontSize: '11px', opacity: 0.75 }}>Order: NPPA/SO-1334(E)/2025</p>
            </div>

            <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ fontSize: '11px', opacity: 0.7, display: 'block' }}>Knee Replacement Cap</span>
              <strong style={{ fontSize: '18px', color: '#10b981' }}>₹64,180</strong>
              <p style={{ margin: '4px 0 0 0', fontSize: '11px', opacity: 0.75 }}>Order: NPPA/TKR-CAP/2025</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Pre-Auth Checklist */}
      {activeTab === 'checklist' && (
        <div style={{ fontSize: '13px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 800 }}>📋 Mandatory Admission Document Matrix</h4>
          {[
            'Aadhaar Card of Patient (Biometric Verification)',
            'Smart Ration Card / Rice Card (CMCHIS / PM-JAY Family Verification)',
            'Doctor Pre-Authorization Letter & Diagnostic Report',
            'CMCHIS / Ayushman Golden Card'
          ].map((doc, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span>
              <span>{doc}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tab 5: Form 14555 Legal Notice */}
      {activeTab === 'grievance' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800 }}>📜 Form 14555 Legal Complaint Notice</h4>
            <button
              onClick={copyNotice}
              style={{
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {copied ? '✓ Copied to Clipboard!' : '📋 Copy Legal Notice'}
            </button>
          </div>
          <pre style={{
            background: isDark ? '#090d16' : '#f8fafc',
            border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'),
            padding: '12px',
            borderRadius: '12px',
            fontSize: '11px',
            whiteSpace: 'pre-wrap',
            color: isDark ? '#cbd5e1' : '#1e293b',
            lineHeight: 1.4
          }}>
            {sampleNotice}
          </pre>
        </div>
      )}

      {/* Tab 6: Cashless Rebate */}
      {activeTab === 'rebate' && (
        <div style={{ textAlign: 'center', padding: '10px' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 800 }}>💵 Out-of-Pocket Cash Reimbursement & Penalty</h4>
          <div style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            padding: '16px',
            borderRadius: '16px',
            marginBottom: '12px'
          }}>
            <span style={{ fontSize: '11px', opacity: 0.9 }}>TOTAL REFUND & STATUTORY INTEREST DUE</span>
            <div style={{ fontSize: '28px', fontWeight: 800 }}>₹25,123.28</div>
            <span style={{ fontSize: '11px', opacity: 0.9 }}>Principal: ₹25,000 • 12% Statutory Interest: +₹123.28 (15 Days)</span>
          </div>
        </div>
      )}

      {/* Footer Banner */}
      <div style={{
        marginTop: '20px',
        paddingTop: '14px',
        borderTop: '1px solid ' + (isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'),
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        fontSize: '11px',
        opacity: 0.8
      }}>
        <span>AetherCare Agentic MoE Healthcare Navigator</span>
        <span>Powered by NitroStack × Amrita University</span>
      </div>
    </div>
  );
}
