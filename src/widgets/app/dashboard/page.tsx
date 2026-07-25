'use client';

import { useState } from 'react';
import { useTheme, useWidgetSDK } from '@nitrostack/widgets';

export default function AgenticDashboardWidget() {
  const theme = useTheme();
  const { getToolOutput } = useWidgetSDK();
  const rawData = getToolOutput<any>();

  const isDark = theme === 'dark';
  const [searchPrompt, setSearchPrompt] = useState('How can I assist your healthcare operations today?');
  const [activeTab, setActiveTab] = useState<'analytics' | 'moe' | 'actions' | 'tasks'>('analytics');
  const [actionDone, setActionDone] = useState<string | null>(null);

  const handleAction = (msg: string) => {
    setActionDone(msg);
    setTimeout(() => setActionDone(null), 4000);
  };

  return (
    <div style={{
      padding: '28px',
      background: isDark
        ? 'linear-gradient(135deg, #090d16 0%, #0f172a 40%, #1e1b4b 100%)'
        : 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      borderRadius: '28px',
      color: isDark ? '#ffffff' : '#0f172a',
      maxWidth: '850px',
      boxShadow: '0 30px 70px rgba(0,0,0,0.6)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      border: '1px solid ' + (isDark ? 'rgba(56, 189, 248, 0.4)' : '#38bdf8')
    }}>
      
      {/* 1. TOP GLOBAL SEARCH & QUICK STATUS INDICATORS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #0284c7, #6366f1)',
            padding: '12px 16px',
            borderRadius: '18px',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '24px',
            boxShadow: '0 0 24px rgba(2, 132, 199, 0.6)'
          }}>
            ⚡
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, letterSpacing: '-0.5px' }}>
              AetherCare Agentic Operations Hub
            </h2>
            <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 600 }}>
              ● DUAL SSE+STDIO ACTIVE • 14 TOOLS CONNECTED • 5 RESOURCES SYNCED
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{
            background: 'rgba(16, 185, 129, 0.15)',
            color: '#34d399',
            fontSize: '11px',
            fontWeight: 800,
            padding: '6px 12px',
            borderRadius: '20px',
            border: '1px solid rgba(16, 185, 129, 0.3)'
          }}>
            HEALTH: 100% OPERATIONAL
          </span>
        </div>
      </div>

      {/* Centered Search & Quick Execution Box */}
      <div style={{
        background: isDark ? 'rgba(255,255,255,0.06)' : '#ffffff',
        border: '1px solid ' + (isDark ? 'rgba(56, 189, 248, 0.3)' : '#cbd5e1'),
        padding: '14px 18px',
        borderRadius: '20px',
        marginBottom: '24px',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
      }}>
        <span style={{ fontSize: '20px', opacity: 0.8 }}>🔍</span>
        <input
          type="text"
          value={searchPrompt}
          onChange={(e) => setSearchPrompt(e.target.value)}
          placeholder="How can I assist your healthcare operations today?"
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            color: isDark ? '#ffffff' : '#0f172a',
            fontSize: '14px',
            outline: 'none',
            fontWeight: 600
          }}
        />
        <button
          onClick={() => handleAction('Executed Autonomous Healthcare Investigation!')}
          style={{
            background: 'linear-gradient(135deg, #0284c7, #2563eb)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '10px 20px',
            fontWeight: 800,
            fontSize: '13px',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)',
            whiteSpace: 'nowrap'
          }}
        >
          Execute Agent Task
        </button>
      </div>

      {/* 2. INTERACTIVE FLOATING AGENT AVATARS & SPEECH NOTIFICATIONS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        
        {/* Assistant Avatar 1 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '46px', height: '46px', borderRadius: '50%', background: '#0284c7',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', color: 'white', flexShrink: 0,
            boxShadow: '0 0 16px rgba(2, 132, 199, 0.5)'
          }}>
            👩‍⚕️
          </div>
          <div style={{
            background: isDark ? 'rgba(255,255,255,0.06)' : '#ffffff',
            border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.12)' : '#cbd5e1'),
            padding: '12px 14px', borderRadius: '16px', fontSize: '12px', lineHeight: 1.4
          }}>
            <strong>Dr. Aether AI Navigator:</strong><br />
            "Sure! I've generated the empanelment trend analysis and hospital audit report for you."
          </div>
        </div>

        {/* Assistant Avatar 2 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: isDark ? 'rgba(255,255,255,0.06)' : '#ffffff',
            border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.12)' : '#cbd5e1'),
            padding: '12px 14px', borderRadius: '16px', fontSize: '12px', lineHeight: 1.4, textAlign: 'right'
          }}>
            <strong>Legal Enforcement Agent:</strong><br />
            "Reminder: Review 5 pending claim audits and NHA Form 14555 legal notices."
          </div>
          <div style={{
            width: '46px', height: '46px', borderRadius: '50%', background: '#6366f1',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', color: 'white', flexShrink: 0,
            boxShadow: '0 0 16px rgba(99, 102, 241, 0.5)'
          }}>
            🤖
          </div>
        </div>
      </div>

      {/* Action Notification Alert */}
      {actionDone && (
        <div style={{
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: 'white',
          padding: '10px 16px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 700,
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          ⚡ {actionDone}
        </div>
      )}

      {/* 3. DYNAMIC DASHBOARD WIDGETS & CARDS LAYOUT (GRID VIEW) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        
        {/* Widget 1: Revenue/Claims Trend Analysis */}
        <div style={{
          background: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff',
          border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'),
          padding: '16px',
          borderRadius: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800 }}>📈 Claims & Revenue Trend Analysis</h4>
            <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>+14.2% Growth</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
            <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', padding: '10px', borderRadius: '10px' }}>
              <span style={{ fontSize: '11px', opacity: 0.7, display: 'block' }}>Total Patients Saved</span>
              <strong style={{ fontSize: '18px', color: '#38bdf8' }}>₹4,500,000</strong>
            </div>

            <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', padding: '10px', borderRadius: '10px' }}>
              <span style={{ fontSize: '11px', opacity: 0.7, display: 'block' }}>Overdue Fraud Claims</span>
              <strong style={{ fontSize: '18px', color: '#ef4444' }}>₹66,000</strong>
            </div>
          </div>

          <div style={{ fontSize: '11px', opacity: 0.8 }}>
            Top Scheme Categories: <strong>CMCHIS (TN)</strong> • <strong>PM-JAY</strong> • <strong>SAST (KA)</strong>
          </div>
        </div>

        {/* Widget 2: Predictive Insights & MoE Routing Panel */}
        <div style={{
          background: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff',
          border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'),
          padding: '16px',
          borderRadius: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800 }}>📊 Predictive MoE Insights Panel</h4>
            <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 700 }}>99.4% Confidence</span>
          </div>

          <div style={{ background: 'rgba(56, 189, 248, 0.12)', padding: '12px', borderRadius: '12px', marginBottom: '12px', fontSize: '12px' }}>
            <strong>AI Forecast:</strong> Scheme utilization spikes +15% across Chennai & Bengaluru empanelled facilities.
          </div>

          <div style={{ fontSize: '11px', opacity: 0.85 }}>
            MoE Expert Allocation: <strong>4 Expert Agents Active</strong> (Empanelment, Price Cap, Pre-Auth, Anti-Fraud).
          </div>
        </div>

        {/* Widget 3: Smart Recommendations & Automated Actions */}
        <div style={{
          background: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff',
          border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'),
          padding: '16px',
          borderRadius: '20px'
        }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 800 }}>💡 Smart AI Recommendations</h4>
          <div style={{ fontSize: '11px', opacity: 0.85, marginBottom: '12px' }}>
            AI Suggestion: Convert Kauvery Chennai admission to 100% Cashless under CMCHIS TN.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={() => handleAction('Approved All 5 Pending Claims!')}
              style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', borderRadius: '10px', padding: '8px 12px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
            >
              ✓ Approve All Claims
            </button>
            <button
              onClick={() => handleAction('Dispatched Emergency District Collector Escalation!')}
              style={{ background: 'linear-gradient(135deg, #0284c7, #2563eb)', color: 'white', border: 'none', borderRadius: '10px', padding: '8px 12px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
            >
              📧 Dispatch Collector Escalation
            </button>
          </div>
        </div>

        {/* Widget 4: Invoice / Legal Notice Approval Panel */}
        <div style={{
          background: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff',
          border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'),
          padding: '16px',
          borderRadius: '20px'
        }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 800 }}>📋 Pending Legal Approvals</h4>
          <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>
            5 Complaints Pending • Total: <span style={{ color: '#38bdf8' }}>₹32,750</span>
          </div>

          <button
            onClick={() => handleAction('Formulated Statutory Form 14555 Legal Notice!')}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              padding: '10px',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
              marginBottom: '10px'
            }}
          >
            📜 Generate Statutory Form 14555 Notice
          </button>
        </div>
      </div>

      {/* 4. TASK SCHEDULED & SYSTEM HEALTH HUB (FOOTER MODULE) */}
      <div style={{
        background: isDark ? 'rgba(0,0,0,0.4)' : '#ffffff',
        border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'),
        padding: '14px 18px',
        borderRadius: '16px',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        fontSize: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '16px' }}>⚙️</span>
          <div>
            <strong>Automated Actions Hub:</strong> Task Scheduled (NHA & SAFU Circular Ingestion Active)
          </div>
        </div>
        <span style={{ color: '#10b981', fontWeight: 700 }}>
          MCP SERVER HEALTH: 100%
        </span>
      </div>

    </div>
  );
}
