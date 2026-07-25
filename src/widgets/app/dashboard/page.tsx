'use client';

import { useState } from 'react';
import { useTheme, useWidgetSDK } from '@nitrostack/widgets';

export default function AgenticDashboardWidget() {
  const theme = useTheme();
  const { getToolOutput } = useWidgetSDK();

  const isDark = theme === 'dark';

  // Navigation tab
  const [activeTab, setActiveTab] = useState<'agents' | 'tools' | 'gateway' | 'cases'>('agents');
  
  // Selected Patient Context State (Default: New Patient with NO data to test Empty States)
  const [selectedPatientId, setSelectedPatientId] = useState<'NEW_PATIENT' | 'RAJESH_KUMAR'>('NEW_PATIENT');

  // Patient Dynamic Data Store
  const [patientsData, setPatientsData] = useState({
    NEW_PATIENT: {
      name: 'Jeffrin Merino',
      phone: '9840123456',
      scheme: 'Unregistered',
      healthScore: null as number | null,
      healthStatus: 'No health data available yet',
      insurance: null as { provider: string; amount: string; used: string; remaining: string; cashless: boolean } | null,
      medicines: null as { total: number; completed: number; nextDose: string; adherence: number } | null,
      activeAgents: { running: 0, queued: 0, completedToday: 0 }
    },
    RAJESH_KUMAR: {
      name: 'Rajesh Kumar',
      phone: '9876543210',
      scheme: 'CMCHIS Tamil Nadu',
      healthScore: 88,
      healthStatus: 'Post-Cardiac Audit Active',
      insurance: { provider: 'CMCHIS Govt TN', amount: '₹5,00,000', used: '₹45,000', remaining: '₹4,55,000', cashless: true },
      medicines: { total: 3, completed: 2, nextDose: '08:00 PM', adherence: 67 },
      activeAgents: { running: 1, queued: 0, completedToday: 4 }
    }
  });

  // Modal Launcher States
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMode, setModalMode] = useState('');
  const [userQueryInput, setUserQueryInput] = useState('');
  
  // Action Progress State
  const [isExecuting, setIsExecuting] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [progressLogs, setProgressLogs] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // Active patient object
  const currentPatient = patientsData[selectedPatientId];

  const switchPatient = (id: 'NEW_PATIENT' | 'RAJESH_KUMAR') => {
    setSelectedPatientId(id);
  };

  const handleRunAgent = () => {
    setIsExecuting(true);
    setIsCompleted(false);
    setProgressPercent(0);
    setProgressLogs(["Initializing agent context & fetching patient records..."]);

    let current = 0;
    const interval = setInterval(() => {
      current += 25;
      setProgressPercent(current);

      if (current === 25) {
        setProgressLogs(prev => [...prev, "✓ Ingested patient record & scheme guidelines."]);
      } else if (current === 50) {
        setProgressLogs(prev => [...prev, "✓ Executed statutory compliance & audit tool."]);
      } else if (current === 75) {
        setProgressLogs(prev => [...prev, "✓ Calculated exact coverage & generated official statutory record."]);
      } else if (current >= 100) {
        clearInterval(interval);
        setIsExecuting(false);
        setIsCompleted(true);

        // REAL-TIME UPDATES: Update active patient state dynamically!
        setPatientsData(prev => ({
          ...prev,
          [selectedPatientId]: {
            ...prev[selectedPatientId],
            healthScore: modalMode === 'RECORDS' ? 92 : prev[selectedPatientId].healthScore,
            insurance: modalMode === 'INSURANCE' ? { provider: 'Star Health / CMCHIS', amount: '₹5,00,000', used: '₹0', remaining: '₹5,00,000', cashless: true } : prev[selectedPatientId].insurance,
            medicines: modalMode === 'MEDICINE' ? { total: 4, completed: 3, nextDose: '08:00 PM', adherence: 75 } : prev[selectedPatientId].medicines,
            activeAgents: {
              ...prev[selectedPatientId].activeAgents,
              completedToday: prev[selectedPatientId].activeAgents.completedToday + 1
            }
          }
        }));
      }
    }, 600);
  };

  const openActionModal = (title: string, mode: string) => {
    setModalTitle(title);
    setModalMode(mode);
    setUserQueryInput('');
    setIsExecuting(false);
    setIsCompleted(false);
    setProgressPercent(0);
    setProgressLogs([]);
    setShowModal(true);
  };

  return (
    <div style={{
      padding: '24px',
      background: isDark ? '#07090e' : '#f8fafc',
      borderRadius: '24px',
      color: isDark ? '#ffffff' : '#0f172a',
      maxWidth: '880px',
      boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      border: '1px solid ' + (isDark ? 'rgba(56, 189, 248, 0.4)' : '#cbd5e1')
    }}>
      
      {/* TOP HEADER WITH PATIENT SWITCHER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid ' + (isDark ? 'rgba(56, 189, 248, 0.2)' : '#e2e8f0') }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'linear-gradient(135deg, #0284c7, #6366f1)', width: '38px', height: '38px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontSize: '20px', color: 'white' }}>⚡</div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>AetherOS — Patient AI Operating System</h2>
            <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 700 }}>CONTEXT-AWARE PATIENT ENGINE</span>
          </div>
        </div>

        {/* PATIENT CONTEXT SWITCHER DROPDOWN */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, textTransform: uppercase }}>SELECT PATIENT:</span>
          <select
            value={selectedPatientId}
            onChange={(e) => switchPatient(e.target.value as any)}
            style={{ background: isDark ? '#0b0f19' : '#ffffff', border: '1px solid #0284c7', color: 'white', padding: '6px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 800, outline: 'none', cursor: 'pointer' }}
          >
            <option value="NEW_PATIENT">👤 Jeffrin Merino (New Patient - No Data)</option>
            <option value="RAJESH_KUMAR">👨‍💼 Rajesh Kumar (CMCHIS TN Active)</option>
          </select>
        </div>
      </div>

      {/* DYNAMIC DATA-DRIVEN DASHBOARD WIDGETS (3 STATES: LOADING, DATA, EMPTY STATE) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        
        {/* WIDGET 1: HEALTH SCORE */}
        <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff', border: '1px solid ' + (isDark ? 'rgba(56,189,248,0.2)' : '#e2e8f0'), padding: '16px', borderRadius: '16px' }}>
          <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Health Score</div>
          {currentPatient.healthScore !== null ? (
            <div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#10b981', margin: '4px 0' }}>{currentPatient.healthScore} / 100</div>
              <div style={{ fontSize: '10px', color: '#34d399', fontWeight: 700 }}>● {currentPatient.healthStatus}</div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '11px', color: '#cbd5e1', fontWeight: 700, margin: '8px 0 4px 0' }}>No health data available yet</div>
              <div style={{ fontSize: '9px', color: '#94a3b8', marginBottom: '8px' }}>Upload medical records to compute score.</div>
              <button onClick={() => openActionModal('Upload Medical Records', 'RECORDS')} style={{ background: 'rgba(2,132,199,0.2)', border: '1px solid #0284c7', color: '#38bdf8', padding: '4px 8px', borderRadius: '6px', fontSize: '9px', fontWeight: 800, cursor: 'pointer' }}>
                📁 Upload Records
              </button>
            </div>
          )}
        </div>

        {/* WIDGET 2: INSURANCE COVERAGE */}
        <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff', border: '1px solid ' + (isDark ? 'rgba(56,189,248,0.2)' : '#e2e8f0'), padding: '16px', borderRadius: '16px' }}>
          <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Insurance Coverage</div>
          {currentPatient.insurance !== null ? (
            <div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#38bdf8', margin: '4px 0' }}>{currentPatient.insurance.amount}</div>
              <div style={{ fontSize: '10px', color: '#34d399', fontWeight: 700 }}>{currentPatient.insurance.provider} (Cashless: Verified)</div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '11px', color: '#cbd5e1', fontWeight: 700, margin: '8px 0 4px 0' }}>No insurance uploaded</div>
              <div style={{ fontSize: '9px', color: '#94a3b8', marginBottom: '8px' }}>Upload policy PDF or health card.</div>
              <button onClick={() => openActionModal('Verify Insurance Policy', 'INSURANCE')} style={{ background: 'rgba(16,185,129,0.2)', border: '1px solid #10b981', color: '#34d399', padding: '4px 8px', borderRadius: '6px', fontSize: '9px', fontWeight: 800, cursor: 'pointer' }}>
                🛡️ Upload Insurance
              </button>
            </div>
          )}
        </div>

        {/* WIDGET 3: MEDICINE ADHERENCE */}
        <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff', border: '1px solid ' + (isDark ? 'rgba(56,189,248,0.2)' : '#e2e8f0'), padding: '16px', borderRadius: '16px' }}>
          <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Medicine Adherence</div>
          {currentPatient.medicines !== null ? (
            <div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#a855f7', margin: '4px 0' }}>{currentPatient.medicines.adherence}%</div>
              <div style={{ fontSize: '10px', color: '#cbd5e1', fontWeight: 700 }}>{currentPatient.medicines.completed} / {currentPatient.medicines.total} Doses • Next: {currentPatient.medicines.nextDose}</div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '11px', color: '#cbd5e1', fontWeight: 700, margin: '8px 0 4px 0' }}>No active prescriptions</div>
              <div style={{ fontSize: '9px', color: '#94a3b8', marginBottom: '8px' }}>Upload prescription to track doses.</div>
              <button onClick={() => openActionModal('Explain Prescription Medicines', 'MEDICINE')} style={{ background: 'rgba(168,85,247,0.2)', border: '1px solid #a855f7', color: '#c084fc', padding: '4px 8px', borderRadius: '6px', fontSize: '9px', fontWeight: 800, cursor: 'pointer' }}>
                💊 Upload Prescription
              </button>
            </div>
          )}
        </div>

        {/* WIDGET 4: ACTIVE AI WORKFLOWS */}
        <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff', border: '1px solid ' + (isDark ? 'rgba(56,189,248,0.2)' : '#e2e8f0'), padding: '16px', borderRadius: '16px' }}>
          <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight 700, textTransform: 'uppercase' }}>Active AI Workflows</div>
          {currentPatient.activeAgents.running > 0 || currentPatient.activeAgents.completedToday > 0 ? (
            <div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#f59e0b', margin: '4px 0' }}>{currentPatient.activeAgents.running} Running</div>
              <div style={{ fontSize: '10px', color: '#34d399', fontWeight: 700 }}>{currentPatient.activeAgents.completedToday} Workflows Completed Today</div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '11px', color: '#cbd5e1', fontWeight: 700, margin: '8px 0 4px 0' }}>No active AI workflows</div>
              <div style={{ fontSize: '9px', color: '#94a3b8', marginBottom: '8px' }}>AI workflows execute when tasks start.</div>
              <button onClick={() => openActionModal('Run Autonomous AI Workflow', 'MOE')} style={{ background: 'rgba(245,158,11,0.2)', border: '1px solid #f59e0b', color: '#fbbf24', padding: '4px 8px', borderRadius: '6px', fontSize: '9px', fontWeight: 800, cursor: 'pointer' }}>
                ⚡ Run Agent Task
              </button>
            </div>
          )}
        </div>

      </div>

      {/* AGENT MARKETPLACE CONTROLS */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {[
          { id: 'agents', label: '🤖 AI Patient Agent Marketplace' },
          { id: 'tools', label: '🛠️ Connected MCP Tools (14)' },
          { id: 'gateway', label: '🧠 Multi-Model Gateway (4)' },
          { id: 'cases', label: '📈 Active Case Queue (10)' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            style={{
              padding: '8px 14px',
              borderRadius: '10px',
              border: 'none',
              fontWeight: 700,
              fontSize: '11px',
              cursor: 'pointer',
              background: activeTab === t.id ? '#0284c7' : (isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0'),
              color: activeTab === t.id ? '#ffffff' : (isDark ? '#cbd5e1' : '#475569')
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: MARKETPLACE */}
      {activeTab === 'agents' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff', border: '1px solid rgba(255,255,255,0.08)', padding: '16px', borderRadius: '16px' }}>
            <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '4px' }}>📅 AI Smart Appointment Booking Agent</div>
            <p style={{ fontSize: '11px', opacity: 0.8, marginBottom: '12px' }}>Autonomously books doctor appointments, checks cashless eligibility, and syncs calendar.</p>
            <button onClick={() => openActionModal('Book Appointment', 'BOOKING')} style={{ width: '100%', background: '#0284c7', color: 'white', border: 'none', padding: '8px', borderRadius: '8px', fontWeight: 800, fontSize: '11px', cursor: 'pointer' }}>📅 Book Appointment</button>
          </div>
          <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff', border: '1px solid rgba(255,255,255,0.08)', padding: '16px', borderRadius: '16px' }}>
            <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '4px' }}>🛡️ AI Insurance Intelligence Agent</div>
            <p style={{ fontSize: '11px', opacity: 0.8, marginBottom: '12px' }}>Verifies policy PDF/card, coverage limits, room caps, and cashless eligibility.</p>
            <button onClick={() => openActionModal('Verify Insurance Policy', 'INSURANCE')} style={{ width: '100%', background: '#059669', color: 'white', border: 'none', padding: '8px', borderRadius: '8px', fontWeight: 800, fontSize: '11px', cursor: 'pointer' }}>🛡️ Verify Insurance</button>
          </div>
        </div>
      )}

      {/* ACTION & DATA INPUT MODAL */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyCenter: 'center', zIndex: 1000 }}>
          <div style={{ background: isDark ? '#0b0f19' : '#ffffff', border: '1px solid rgba(56,189,248,0.4)', padding: '24px', borderRadius: '20px', width: '480px' }}>
            <div style={{ display: 'flex', justifyCenter: 'space-between', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '16px' }}>{modalTitle}</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'transparent', border: 'none', color: '#ef4444', fontWeight: 800, cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '10px', color: '#38bdf8', fontWeight: 700, display: 'block', marginBottom: '4px' }}>PATIENT INPUT / DOCUMENT DETAILS</label>
              <textarea
                value={userQueryInput}
                onChange={(e) => setUserQueryInput(e.target.value)}
                placeholder="Enter details or upload document parameters..."
                style={{ width: '100%', height: '80px', background: isDark ? '#090d16' : '#f8fafc', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px', color: isDark ? '#ffffff' : '#0f172a', fontSize: '12px' }}
              />
            </div>

            {!isExecuting && !isCompleted && (
              <button onClick={handleRunAgent} style={{ width: '100%', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 800, fontSize: '12px', cursor: 'pointer' }}>
                🚀 Execute Agent & Compute Data
              </button>
            )}

            {(isExecuting || isCompleted) && (
              <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', padding: '14px', borderRadius: '12px', marginTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, marginBottom: '6px' }}>
                  <span>{isCompleted ? '⚡ Data Processed & Dashboard Updated!' : 'Processing Patient Data...'}</span>
                  <span style={{ color: '#38bdf8' }}>{progressPercent}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden', marginBottom: '10px' }}>
                  <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #38bdf8)', transition: 'width 0.4s' }}></div>
                </div>
                <div style={{ fontSize: '10px', color: '#cbd5e1', lineHeight: 1.5 }}>
                  {progressLogs.map((lg, i) => <div key={i}>{lg}</div>)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
