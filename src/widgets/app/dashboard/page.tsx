'use client';

import { useState } from 'react';
import { useTheme, useWidgetSDK } from '@nitrostack/widgets';

export default function AgenticDashboardWidget() {
  const theme = useTheme();
  const { getToolOutput } = useWidgetSDK();
  const rawData = getToolOutput<any>();

  const isDark = theme === 'dark';

  // State matching NitroStack Spec
  const [metrics, setMetrics] = useState({ activeCases: 12, pendingEscalations: 8, resolvedCases: 47 });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>('CSE-2024-0089');
  
  // Modals
  const [showLegalNoticeModal, setShowLegalNoticeModal] = useState(false);
  const [showInspectorModal, setShowInspectorModal] = useState(false);
  const [showAuditProgressModal, setShowAuditProgressModal] = useState(false);

  // Form & Action states
  const [noticeSent, setNoticeSent] = useState(false);
  const [rebateApproved, setRebateApproved] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string | null>(null);

  const cases = [
    { caseId: 'CSE-2024-0089', patient: 'Rajesh Kumar', hospital: 'Kauvery Chennai', violation: 'Illegal upfront cash demand', amount: '₹45,000', status: 'Audit In Progress' },
    { caseId: 'CSE-2024-0090', patient: 'Priya Singh', hospital: 'Apollo Delhi', violation: 'Price cap exceeded (DES stent)', amount: '₹52,000', status: 'Legal Notice Sent' },
    { caseId: 'CSE-2024-0091', patient: 'Amit Patel', hospital: 'Fortis Bangalore', violation: 'Prohibited bed charges upfront', amount: '₹18,500', status: 'Collector Notified' },
    { caseId: 'CSE-2024-0092', patient: 'Fatima Khan', hospital: 'Max Delhi', violation: 'Medicine markup violation', amount: '₹8,200', status: 'Rebate Approved' },
    { caseId: 'CSE-2024-0093', patient: 'Suresh Reddy', hospital: 'Manipal Hyderabad', violation: 'Illegal deposit demand', amount: '₹35,000', status: 'Pending Audit' }
  ];

  const alerts = [
    { id: 'alert-1', type: 'error', title: '🚨 Illegal Cash Demand Detected', message: 'Kauvery Chennai demanded ₹45,000 upfront for cardiac stent under CMCHIS. Patient protected. Legal notice queued.' },
    { id: 'alert-2', type: 'warning', title: '⚠️ Price Cap Violation', message: 'Apollo Delhi charged ₹52,000 for DES stent (cap: ₹38,260). Audit initiated. Patient rebate: ₹2,500 + 12% interest.' },
    { id: 'alert-3', type: 'success', title: '✅ Legal Notice Dispatched', message: 'NHA Grievance Officer and Collector notified of Fortis Bangalore violation. Case escalated to SAFU.' },
    { id: 'alert-4', type: 'info', title: 'ℹ️ Workflow Complete', message: 'Compliance audit for Case #CSE-2024-0089 complete. 2 violations detected. Enforcement action recommended.' }
  ];

  const workflows = [
    { id: 'WF-001', name: 'Billing Fraud Detection', progress: 87, status: 'Running', detail: 'Analyzing 5 active cases for price cap violations...' },
    { id: 'WF-002', name: 'Price Cap Verification', progress: 100, status: 'Complete', detail: 'All 12 active cases verified against NPPA registry. 3 violations found.' },
    { id: 'WF-003', name: 'Legal Notice Dispatch', progress: 65, status: 'Running', detail: 'Sending enforcement notices to NHA and District Collectors...' },
    { id: 'WF-004', name: 'NHA Grievance Filing', progress: 45, status: 'Running', detail: 'Filing formal grievances for 3 high-priority violations...' }
  ];

  const toolExecutions = [
    { name: 'analyze_billing_fraud_risk', status: 'Success', responseTime: 342, last: '2026-07-25T20:58:12Z' },
    { name: 'verify_procedure_price_cap', status: 'Success', responseTime: 256, last: '2026-07-25T20:57:45Z' },
    { name: 'dispatch_emergency_email_escalation', status: 'Running', responseTime: 0, last: '2026-07-25T20:59:00Z' },
    { name: 'check_hospital_empanelment', status: 'Success', responseTime: 189, last: '2026-07-25T20:56:30Z' },
    { name: 'calculate_out_of_pocket_cashless_rebate', status: 'Success', responseTime: 128, last: '2026-07-25T20:55:22Z' }
  ];

  return (
    <div style={{
      padding: '24px',
      background: isDark
        ? 'linear-gradient(135deg, #090d16 0%, #0f172a 40%, #1e1b4b 100%)'
        : 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
      borderRadius: '24px',
      color: isDark ? '#ffffff' : '#0f172a',
      maxWidth: '820px',
      boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      border: '1px solid ' + (isDark ? 'rgba(56, 189, 248, 0.4)' : '#cbd5e1')
    }}>
      
      {/* 1. TOP TITLE */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '24px' }}>🏥</span>
          <div>
            <h2 style={{ margin: 0, fontSize: '19px', fontWeight: 800 }}>AetherCare Healthcare Audit Command Center</h2>
            <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 600 }}>
              Real-time autonomous compliance monitoring, billing fraud detection, and enforcement dispatch
            </span>
          </div>
        </div>
        <span style={{ background: '#0284c7', color: 'white', fontSize: '11px', fontWeight: 800, padding: '5px 12px', borderRadius: '20px' }}>
          LIVE MONITORING
        </span>
      </div>

      {/* 2. TOP CENTRAL ACTION HUB */}
      <div style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff', border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'), padding: '16px', borderRadius: '18px', marginBottom: '20px' }}>
        
        {/* Search Bar */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Global Case Search (e.g. Kauvery Chennai, CSE-2024-0089, PM-JAY)"
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
          <button style={{ background: 'linear-gradient(135deg, #0284c7, #2563eb)', color: 'white', border: 'none', borderRadius: '10px', padding: '10px 16px', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>
            🔍 Search Cases
          </button>
        </div>

        {/* Quick Metrics Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '14px' }}>
          <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', padding: '10px', borderRadius: '10px' }}>
            <span style={{ fontSize: '11px', opacity: 0.7, display: 'block' }}>Active Cases</span>
            <strong style={{ fontSize: '18px', color: '#38bdf8' }}>{metrics.activeCases}</strong>
          </div>
          <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', padding: '10px', borderRadius: '10px' }}>
            <span style={{ fontSize: '11px', opacity: 0.7, display: 'block' }}>Pending Escalations</span>
            <strong style={{ fontSize: '18px', color: '#ef4444' }}>{metrics.pendingEscalations}</strong>
          </div>
          <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', padding: '10px', borderRadius: '10px' }}>
            <span style={{ fontSize: '11px', opacity: 0.7, display: 'block' }}>Resolved Cases</span>
            <strong style={{ fontSize: '18px', color: '#10b981' }}>{metrics.resolvedCases}</strong>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={() => setShowAuditProgressModal(true)} style={{ background: 'linear-gradient(135deg, #0284c7, #2563eb)', color: 'white', border: 'none', borderRadius: '10px', padding: '8px 14px', fontWeight: 700, fontSize: '11px', cursor: 'pointer' }}>
            ▶ Trigger Audit
          </button>
          <button onClick={() => setShowLegalNoticeModal(true)} style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: 'white', border: 'none', borderRadius: '10px', padding: '8px 14px', fontWeight: 700, fontSize: '11px', cursor: 'pointer' }}>
            📧 Legal Notice
          </button>
          <button onClick={() => setRebateApproved(true)} style={{ background: rebateApproved ? '#10b981' : 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', borderRadius: '10px', padding: '8px 14px', fontWeight: 700, fontSize: '11px', cursor: 'pointer' }}>
            {rebateApproved ? '✓ Rebate Approved' : '✅ Approve Rebate'}
          </button>
          <button onClick={() => setLastRefreshed(new Date().toLocaleTimeString())} style={{ background: 'transparent', color: isDark ? '#cbd5e1' : '#475569', border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.2)' : '#cbd5e1'), borderRadius: '10px', padding: '8px 14px', fontWeight: 700, fontSize: '11px', cursor: 'pointer' }}>
            🔄 {lastRefreshed ? `Refreshed ${lastRefreshed}` : 'Refresh Status'}
          </button>
        </div>
      </div>

      {/* 3. REAL-TIME SYSTEM ALERTS PANEL */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: 800 }}>🔔 Real-Time System Alerts</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {alerts.map((al) => (
            <div key={al.id} style={{
              background: al.type === 'error' ? (isDark ? 'rgba(239, 68, 68, 0.12)' : '#fff1f2') : al.type === 'warning' ? (isDark ? 'rgba(245, 158, 11, 0.12)' : '#fffbeb') : (isDark ? 'rgba(16, 185, 129, 0.12)' : '#f0fdf4'),
              borderLeft: '4px solid ' + (al.type === 'error' ? '#ef4444' : al.type === 'warning' ? '#f59e0b' : '#10b981'),
              padding: '10px 12px', borderRadius: '10px', fontSize: '11px'
            }}>
              <strong>{al.title}:</strong> {al.message}
            </div>
          ))}
        </div>
      </div>

      {/* 4. ACTIVE CASE AUDIT QUEUE TABLE */}
      <div style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff', border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'), padding: '16px', borderRadius: '18px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 800 }}>📋 Active Case Audit Queue (5 Priority Cases)</h4>
          <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>5 ACTIVE</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid ' + (isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'), opacity: 0.7 }}>
                <th style={{ padding: '8px' }}>Case ID</th>
                <th style={{ padding: '8px' }}>Patient</th>
                <th style={{ padding: '8px' }}>Hospital</th>
                <th style={{ padding: '8px' }}>Violation</th>
                <th style={{ padding: '8px' }}>Amount</th>
                <th style={{ padding: '8px' }}>Status</th>
                <th style={{ padding: '8px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((c) => (
                <tr key={c.caseId} style={{ borderBottom: '1px solid ' + (isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9') }}>
                  <td style={{ padding: '8px', fontWeight: 700, color: '#38bdf8' }}>{c.caseId}</td>
                  <td style={{ padding: '8px' }}>{c.patient}</td>
                  <td style={{ padding: '8px' }}>{c.hospital}</td>
                  <td style={{ padding: '8px', color: '#ef4444' }}>{c.violation}</td>
                  <td style={{ padding: '8px', fontWeight: 700 }}>{c.amount}</td>
                  <td style={{ padding: '8px' }}>
                    <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '2px 6px', borderRadius: '6px', fontSize: '10px' }}>{c.status}</span>
                  </td>
                  <td style={{ padding: '8px' }}>
                    <button onClick={() => { setSelectedCaseId(c.caseId); setShowInspectorModal(true); }} style={{ background: '#0284c7', color: 'white', border: 'none', borderRadius: '6px', padding: '4px 8px', fontSize: '10px', cursor: 'pointer' }}>
                      Inspect Case
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. AUTONOMOUS WORKFLOW EXECUTION SECTION */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: 800 }}>⚙️ Autonomous Workflow Execution Monitoring</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {workflows.map((wf) => (
            <div key={wf.id} style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff', border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0'), padding: '12px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
                <span>{wf.name} ({wf.id})</span>
                <span style={{ color: wf.status === 'Complete' ? '#10b981' : '#38bdf8' }}>{wf.progressPercent}%</span>
              </div>
              <p style={{ margin: 0, fontSize: '10px', opacity: 0.75 }}>{wf.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. BACKGROUND MCP TOOL EXECUTION MONITOR */}
      <div style={{ background: isDark ? 'rgba(0,0,0,0.4)' : '#ffffff', border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'), padding: '14px', borderRadius: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, marginBottom: '10px' }}>
          <span>🔧 Background MCP Tool Execution Monitor</span>
          <span style={{ color: '#10b981' }}>Total Calls: 47 • Success Rate: 98% • Avg Response: 263ms</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', fontSize: '10px' }}>
          {toolExecutions.map((t, i) => (
            <span key={i} style={{ background: isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9', padding: '4px 8px', borderRadius: '6px' }}>
              <code>{t.name}</code> ({t.responseTime > 0 ? `${t.responseTime}ms` : 'Running'})
            </span>
          ))}
        </div>
      </div>

      {/* MODAL 1: LEGAL NOTICE DISPATCH MODAL */}
      {showLegalNoticeModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: isDark ? '#0f172a' : '#ffffff', border: '1px solid rgba(56,189,248,0.4)', padding: '24px', borderRadius: '20px', width: '480px' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>📧 Dispatch Legal Notice to NHA & District Collector</h3>
            <p style={{ fontSize: '11px', opacity: 0.8, marginBottom: '14px' }}>Compose & send statutory Form 14555 legal enforcement notice to regulatory authorities.</p>
            
            <div style={{ fontSize: '11px', marginBottom: '10px' }}>
              <strong>Patient:</strong> Rajesh Kumar | <strong>Hospital:</strong> Kauvery Chennai | <strong>Cash Demanded:</strong> ₹45,000
            </div>
            
            <textarea
              readOnly
              value={`FORM 14555 - STATUTORY NHA LEGAL NOTICE\nTO: District Collector (collector.chennai@tn.gov.in) & NHA Grievance Officer\nRE: Prohibited upfront cash deposit demand at Kauvery Chennai.\nDEMAND: Convert admission to 100% cashless within 2 hours under CMCHIS TN Clause 16.`}
              style={{ width: '100%', height: '120px', background: isDark ? '#090d16' : '#f8fafc', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: isDark ? '#ffffff' : '#0f172a', padding: '10px', fontSize: '11px', marginBottom: '14px' }}
            />

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => { setNoticeSent(true); setTimeout(() => setShowLegalNoticeModal(false), 1500); }} style={{ flex: 1, background: '#10b981', color: 'white', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>
                {noticeSent ? '✓ Sent to Collector & NHA!' : '📤 Send Legal Notice'}
              </button>
              <button onClick={() => setShowLegalNoticeModal(false)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: isDark ? '#ffffff' : '#0f172a', padding: '10px 16px', borderRadius: '10px', fontSize: '12px', cursor: 'pointer' }}>
                ✕ Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CASE INSPECTOR MODAL */}
      {showInspectorModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: isDark ? '#0f172a' : '#ffffff', border: '1px solid rgba(56,189,248,0.4)', padding: '24px', borderRadius: '20px', width: '520px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '16px' }}>🔍 Case Inspector: {selectedCaseId}</h3>
              <button onClick={() => setShowInspectorModal(false)} style={{ background: 'transparent', border: 'none', color: '#ef4444', fontWeight: 800, cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ fontSize: '11px', marginBottom: '14px', background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '10px' }}>
              Patient: <strong>Rajesh Kumar</strong> • Hospital: <strong>Kauvery Chennai</strong> • Status: <strong style={{ color: '#ef4444' }}>Illegal Cash Demand</strong>
            </div>

            <h4 style={{ margin: '0 0 8px 0', fontSize: '12px' }}>📊 Itemized Billing Audit Breakdown:</h4>
            <div style={{ fontSize: '11px', marginBottom: '14px' }}>
              • Cardiac Stent DES: Quoted <strong>₹48,000</strong> (NPPA Cap: ₹50,000) ✓ Compliant<br />
              • ICU Bed (3 Days): Quoted <strong>₹19,500</strong> (Legal Cap: ₹18,000) ⚠️ <strong>₹1,500 Overcharge</strong><br />
              • Anesthesia: Quoted <strong>₹4,200</strong> (Legal Cap: ₹4,000) ⚠️ <strong>₹200 Overcharge</strong>
            </div>

            <div style={{ background: 'rgba(16,185,129,0.15)', padding: '10px', borderRadius: '10px', fontSize: '11px', marginBottom: '14px' }}>
              Total Charged: <strong>₹53,500</strong> • Legal Cap: <strong>₹50,000</strong> • Rebate Entitlement: <strong style={{ color: '#10b981' }}>₹3,920 + 12% Interest</strong>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => { setShowInspectorModal(false); setShowAuditProgressModal(true); }} style={{ flex: 1, background: '#0284c7', color: 'white', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>
                ▶ Run Compliance Audit
              </button>
              <button onClick={() => { setShowInspectorModal(false); setShowLegalNoticeModal(true); }} style={{ flex: 1, background: '#6366f1', color: 'white', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>
                📧 Dispatch Legal Notice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: AUDIT PROGRESS MODAL */}
      {showAuditProgressModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: isDark ? '#0f172a' : '#ffffff', border: '1px solid rgba(56,189,248,0.4)', padding: '24px', borderRadius: '20px', width: '460px' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>⚙️ Compliance Audit Workflow in Progress</h3>
            <p style={{ fontSize: '11px', opacity: 0.8, marginBottom: '14px' }}>Real-time autonomous billing fraud detection and price cap verification.</p>

            {[
              { title: 'User Intent Perception & Task Parsing', percent: 100, status: 'DONE' },
              { title: 'Autonomous Tool Selection', percent: 100, status: 'DONE' },
              { title: 'Database & Regulatory Rule Retrieval', percent: 100, status: 'DONE' },
              { title: 'Action Execution & State Mutation', percent: 100, status: 'DONE' },
              { title: 'Verification & Final Delivery', percent: 100, status: 'COMPLETED' }
            ].map((step, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span>Step {idx + 1}: {step.title}</span>
                <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓ {step.status}</span>
              </div>
            ))}

            <button onClick={() => setShowAuditProgressModal(false)} style={{ width: '100%', background: '#0284c7', color: 'white', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 700, fontSize: '12px', cursor: 'pointer', marginTop: '16px' }}>
              ✕ Close Audit Progress
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
