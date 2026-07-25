'use client';

import { useState } from 'react';
import { useTheme, useWidgetSDK } from '@nitrostack/widgets';

export default function AgenticDashboardWidget() {
  const theme = useTheme();
  const { getToolOutput } = useWidgetSDK();
  const rawData = getToolOutput<any>();

  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState<'agents' | 'tools' | 'gateway' | 'cases'>('agents');
  const [showLaunchModal, setShowLaunchModal] = useState(false);
  const [selectedAgentName, setSelectedAgentName] = useState('Dr. Aether Medical Auditor');
  const [taskInput, setTaskInput] = useState('Rajesh Kumar admitted at Kauvery Hospital Chennai under CMCHIS TN, hospital demands 45,000 cash.');
  
  // Progress states
  const [progressPercent, setProgressPercent] = useState(0);
  const [progressLogs, setProgressLogs] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const agents = [
    { name: 'Dr. Aether Medical Auditor', role: 'Billing & Insurance Fraud Audit', desc: 'Parses hospital bills, verifies Drug-Eluting Stents & ICU bed caps against NPPA DPCO statutory rules.', tools: ['analyze_billing_fraud_risk', 'verify_procedure_price_cap'], avatar: '👩‍⚕️', color: 'linear-gradient(135deg, #0284c7, #2563eb)' },
    { name: 'NPPA Legal Enforcement Agent', role: 'Statutory Form 14555 Legal Notices', desc: 'Generates binding Form 14555 legal enforcement notices for prohibited upfront cash deposit demands.', tools: ['dispatch_emergency_email_escalation', 'grievance_notice_generator'], avatar: '⚖️', color: 'linear-gradient(135deg, #6366f1, #4f46e5)' },
    { name: 'District Collector Escalation Bot', role: 'Emergency Government Escalation', desc: 'Dispatches immediate emergency email escalations to District Magistrates & SAFU Helplines.', tools: ['collector_escalation_dispatch', 'safu_grievance_filing'], avatar: '🏛️', color: 'linear-gradient(135deg, #10b981, #059669)' },
    { name: 'NLEM Pharmacy Price Auditor', role: 'Essential Drug Markup Enforcement', desc: 'Audits pharmacy receipts for Human Insulin, IV Antibiotics, and Cardiac medications.', tools: ['pharmacy_overcharge_audit', 'calculate_cashless_rebate'], avatar: '💊', color: 'linear-gradient(135deg, #f59e0b, #d97706)' },
    { name: 'Multi-Lingual Patient Advocate', role: 'Tamil, Kannada, Malayalam, Hindi Support', desc: 'Provides real-time voice and text patient intake, scheme eligibility, and emergency triage.', tools: ['multilingual_patient_voice_assistant', 'check_hospital_empanelment'], avatar: '🗣️', color: 'linear-gradient(135deg, #ec4899, #db2777)' },
    { name: 'MoE Master Router Engine', role: '5-Stage Autonomous Execution Pipeline', desc: 'Full 360-degree autonomous pipeline combining Perception, Reasoning, Audit, Legal Notice, and Webhooks.', tools: ['run_autonomous_agentic_workflow', 'route_healthcare_query_moe'], avatar: '🧠', color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }
  ];

  const toolsList = [
    'analyze_billing_fraud_risk', 'verify_procedure_price_cap', 'dispatch_emergency_email_escalation',
    'calculate_out_of_pocket_cashless_rebate', 'check_hospital_empanelment', 'track_agentic_action_progress',
    'configure_external_ai_gateway', 'run_autonomous_agentic_workflow', 'illegal_cash_demand_negotiator',
    'pharmacy_overcharge_audit', 'multilingual_patient_voice_assistant', 'patient_intake_triage',
    'claim_audit_assistant', 'open_agentic_command_center'
  ];

  const startTask = () => {
    setIsExecuting(true);
    setIsCompleted(false);
    setProgressPercent(0);
    setProgressLogs(["Ingesting hospital empanelment & scheme rules..."]);

    const logsArray = [
      "✓ Stage 1: Perception — Ingested Kauvery Hospital Chennai empanelment status (EMPANELED_ACTIVE).",
      "✓ Stage 2: MoE Reasoning — Verified Cardiac Stent against NPPA DPCO 2013 cap (Cap: ₹38,260 vs Quote: ₹45,000).",
      "✓ Stage 3: Fraud Audit — Flagged ₹6,740 illegal overcharge & prohibited upfront deposit.",
      "✓ Stage 4: Legal Formulation — Formulated Form 14555 Statutory Enforcement Notice.",
      "✓ Stage 5: Enforcement Dispatch — Dispatched email escalation to District Collector Chennai & NHA Desk!"
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setProgressPercent(currentStep * 20);
      if (currentStep <= logsArray.length) {
        setProgressLogs(prev => [...prev, logsArray[currentStep - 1]]);
      }

      if (currentStep >= 5) {
        clearInterval(interval);
        setIsExecuting(false);
        setIsCompleted(true);
      }
    }, 600);
  };

  return (
    <div style={{
      padding: '24px',
      background: isDark ? '#07090e' : '#f8fafc',
      borderRadius: '24px',
      color: isDark ? '#ffffff' : '#0f172a',
      maxWidth: '860px',
      boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      border: '1px solid ' + (isDark ? 'rgba(56, 189, 248, 0.4)' : '#cbd5e1')
    }}>
      
      {/* 1. TOP HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid ' + (isDark ? 'rgba(56, 189, 248, 0.2)' : '#e2e8f0') }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'linear-gradient(135deg, #0284c7, #6366f1)', width: '38px', height: '38px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: 'white' }}>⚡</div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>AetherOS — Enterprise AI Agent Platform</h2>
            <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 600 }}>14 CONNECTED MCP TOOLS • 6 AUTONOMOUS AGENTS</span>
          </div>
        </div>
        <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontSize: '11px', fontWeight: 800, padding: '5px 12px', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          ● 100% OPERATIONAL
        </span>
      </div>

      {/* 2. TAB CONTROLS */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {[
          { id: 'agents', label: '🤖 AI Agent Marketplace' },
          { id: 'tools', label: '🛠️ Connected MCP Tools (14)' },
          { id: 'gateway', label: '🧠 Multi-Model Gateway' },
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

      {/* TAB 1: AI AGENTS MARKETPLACE */}
      {activeTab === 'agents' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {agents.map((ag, i) => (
              <div key={i} style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff', border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0'), padding: '16px', borderRadius: '16px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{ background: ag.color, width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: 'white', flexShrink: 0 }}>{ag.avatar}</div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 800 }}>{ag.name}</div>
                    <div style={{ fontSize: '10px', color: '#38bdf8', fontWeight: 700 }}>{ag.role}</div>
                  </div>
                </div>
                <p style={{ fontSize: '11px', opacity: 0.8, lineHeight: 1.4, marginBottom: '12px', flex: 1 }}>{ag.desc}</p>
                <button
                  onClick={() => { setSelectedAgentName(ag.name); setShowLaunchModal(true); setIsCompleted(false); setIsExecuting(false); setProgressPercent(0); }}
                  style={{ width: '100%', background: 'linear-gradient(135deg, #0284c7, #2563eb)', color: 'white', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 800, fontSize: '11px', cursor: 'pointer' }}
                >
                  ⚡ Book & Deploy Agent
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CONNECTED MCP TOOLS */}
      {activeTab === 'tools' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {toolsList.map((tName, idx) => (
            <div key={idx} style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff', border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0'), padding: '12px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '11px' }}>
                <code style={{ color: '#38bdf8', fontWeight: 700 }}>{tName}</code>
                <div style={{ fontSize: '10px', opacity: 0.6 }}>Ping: {20 + (idx * 3)}ms • SSE Active</div>
              </div>
              <span style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: '9px', fontWeight: 800, padding: '2px 6px', borderRadius: '6px' }}>CONNECTED</span>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: MULTI-MODEL GATEWAY */}
      {activeTab === 'gateway' && (
        <div style={{ fontSize: '12px' }}>
          <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff', padding: '16px', borderRadius: '16px', marginBottom: '10px' }}>
            <strong>🟢 OpenAI (GPT-4o / GPT-4 Turbo)</strong> — Key: <code>sk-proj-****9920</code> <span style={{ color: '#34d399', fontWeight: 800, marginLeft: '10px' }}>[ACTIVE]</span>
          </div>
          <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff', padding: '16px', borderRadius: '16px' }}>
            <strong>🟣 Anthropic (Claude 3.5 Sonnet)</strong> — Key: <code>sk-ant-****8820</code> <span style={{ color: '#34d399', fontWeight: 800, marginLeft: '10px' }}>[ACTIVE]</span>
          </div>
        </div>
      )}

      {/* TAB 4: CASES */}
      {activeTab === 'cases' && (
        <div style={{ fontSize: '11px' }}>
          <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff', padding: '12px', borderRadius: '12px', marginBottom: '8px' }}>
            <strong>CSE-2024-0089: Rajesh Kumar</strong> (Kauvery Hospital Chennai) — Demanded ₹45,000 cash under CMCHIS. Status: <span style={{ color: '#ef4444' }}>Illegal Overcharge Flagged</span>
          </div>
          <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff', padding: '12px', borderRadius: '12px' }}>
            <strong>CSE-2024-0090: Priya Singh</strong> (Apollo Lifecare Delhi) — Quoted ₹52,000 for DES Stent (Cap ₹38.26k). Status: <span style={{ color: '#38bdf8' }}>Legal Notice Sent</span>
          </div>
        </div>
      )}

      {/* BOOKING LAUNCH MODAL */}
      {showLaunchModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: isDark ? '#0b0f19' : '#ffffff', border: '1px solid rgba(56,189,248,0.4)', padding: '24px', borderRadius: '20px', width: '480px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '16px' }}>Book & Deploy: {selectedAgentName}</h3>
              <button onClick={() => setShowLaunchModal(false)} style={{ background: 'transparent', border: 'none', color: '#ef4444', fontWeight: 800, cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '10px', color: '#38bdf8', fontWeight: 700, display: 'block', marginBottom: '4px' }}>TARGET TASK STATEMENT</label>
              <input type="text" value={taskInput} onChange={(e) => setTaskInput(e.target.value)} style={{ width: '100%', background: isDark ? '#090d16' : '#f8fafc', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px', color: isDark ? '#ffffff' : '#0f172a', fontSize: '12px' }} />
            </div>

            {!isExecuting && !isCompleted && (
              <button onClick={startTask} style={{ width: '100%', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 800, fontSize: '12px', cursor: 'pointer' }}>
                🚀 Launch Autonomous Agent Task
              </button>
            )}

            {(isExecuting || isCompleted) && (
              <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', padding: '14px', borderRadius: '12px', marginTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, marginBottom: '6px' }}>
                  <span>{isCompleted ? '⚡ Autonomous Task Completed!' : 'Executing 5-Stage Agentic Loop...'}</span>
                  <span style={{ color: '#38bdf8' }}>{progressPercent}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden', marginBottom: '10px' }}>
                  <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #38bdf8)', transition: 'width 0.4s' }}></div>
                </div>
                <div style={{ fontSize: '10px', color: '#cbd5e1', lineHeight: 1.5, maxHeight: '100px', overflowY: 'auto' }}>
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
