'use client';

import { useState } from 'react';
import { useTheme, useWidgetSDK } from '@nitrostack/widgets';

export default function AgenticDashboardWidget() {
  const theme = useTheme();
  const { getToolOutput } = useWidgetSDK();
  const rawData = getToolOutput<any>();

  const isDark = theme === 'dark';
  const [taskQuery, setTaskQuery] = useState('How can I assist your healthcare operations today?');
  const [notification, setNotification] = useState<string | null>(null);

  const showNotif = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div style={{
      padding: '24px',
      background: isDark ? '#090d16' : '#ffffff',
      borderRadius: '24px',
      color: isDark ? '#ffffff' : '#0f172a',
      maxWidth: '860px',
      boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      border: '1px solid ' + (isDark ? 'rgba(56, 189, 248, 0.4)' : '#cbd5e1')
    }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid ' + (isDark ? 'rgba(56, 189, 248, 0.25)' : '#e2e8f0') }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'linear-gradient(135deg, #0284c7, #6366f1)', padding: '10px 14px', borderRadius: '16px', fontSize: '20px', color: 'white', fontWeight: 'bold' }}>⚡</div>
          <div>
            <h2 style={{ margin: 0, fontSize: '19px', fontWeight: 800 }}>AetherCare Agentic AI Command Center</h2>
            <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 600 }}>● DUAL SSE+STDIO ACTIVE • 14 TOOLS CONNECTED • 5 RESOURCES SYNCED</span>
          </div>
        </div>
        <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontSize: '11px', fontWeight: 800, padding: '5px 12px', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          100% OPERATIONAL
        </span>
      </div>

      {/* Centered Search Box */}
      <div style={{ background: isDark ? 'rgba(255, 255, 255, 0.06)' : '#f8fafc', border: '1px solid ' + (isDark ? 'rgba(56, 189, 248, 0.25)' : '#cbd5e1'), padding: '12px 16px', borderRadius: '18px', marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span style={{ fontSize: '18px' }}>🔍</span>
        <input
          type="text"
          value={taskQuery}
          onChange={(e) => setTaskQuery(e.target.value)}
          style={{ flex: 1, background: 'transparent', border: 'none', color: isDark ? '#ffffff' : '#0f172a', fontSize: '13px', outline: 'none', fontWeight: 600 }}
        />
        <button
          onClick={() => showNotif(`Executed Agent Task: ${taskQuery}`)}
          style={{ background: 'linear-gradient(135deg, #0284c7, #2563eb)', color: 'white', border: 'none', borderRadius: '10px', padding: '10px 18px', fontWeight: 800, fontSize: '12px', cursor: 'pointer' }}
        >
          Execute Agent Task
        </button>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', padding: '10px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: 700, marginBottom: '20px', textAlign: 'center' }}>
          ⚡ {notification}
        </div>
      )}

      {/* Dual Avatars */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#0284c7', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontSize: '20px', color: 'white', flexShrink: 0 }}>👩‍⚕️</div>
          <div style={{ background: isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9', border: '1px solid ' + (isDark ? 'rgba(56, 189, 248, 0.2)' : '#e2e8f0'), padding: '10px 12px', borderRadius: '14px', fontSize: '11px', lineHeight: 1.4 }}>
            <strong>Dr. Aether AI Navigator:</strong><br />
            "Sure! I've generated the empanelment trend analysis for you."
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9', border: '1px solid ' + (isDark ? 'rgba(56, 189, 248, 0.2)' : '#e2e8f0'), padding: '10px 12px', borderRadius: '14px', fontSize: '11px', lineHeight: 1.4, textAlign: 'right', flex: 1 }}>
            <strong>Legal Enforcement Agent:</strong><br />
            "Reminder: Review 5 pending claim audits and legal notices."
          </div>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#6366f1', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontSize: '20px', color: 'white', flexShrink: 0 }}>🤖</div>
        </div>
      </div>

      {/* 4-Panel Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
        
        {/* Panel 1 */}
        <div style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff', border: '1px solid ' + (isDark ? 'rgba(56, 189, 248, 0.2)' : '#e2e8f0'), padding: '16px', borderRadius: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800 }}>📈 Claims & Revenue Trend</span>
            <span style={{ color: '#10b981', fontSize: '11px', fontWeight: 700 }}>+14.2%</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
            <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc', padding: '8px', borderRadius: '8px' }}>
              <span style={{ fontSize: '10px', opacity: 0.7, display: 'block' }}>Total Saved</span>
              <strong style={{ fontSize: '16px', color: '#38bdf8' }}>₹4,500,000</strong>
            </div>
            <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc', padding: '8px', borderRadius: '8px' }}>
              <span style={{ fontSize: '10px', opacity: 0.7, display: 'block' }}>Overdue Claims</span>
              <strong style={{ fontSize: '16px', color: '#ef4444' }}>₹66,000</strong>
            </div>
          </div>
          <span style={{ fontSize: '10px', opacity: 0.8 }}>CMCHIS (TN) • PM-JAY • SAST (KA)</span>
        </div>

        {/* Panel 2 */}
        <div style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff', border: '1px solid ' + (isDark ? 'rgba(56, 189, 248, 0.2)' : '#e2e8f0'), padding: '16px', borderRadius: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800 }}>📊 Predictive MoE Insights</span>
            <span style={{ color: '#38bdf8', fontSize: '11px', fontWeight: 700 }}>99.4%</span>
          </div>
          <div style={{ background: 'rgba(56, 189, 248, 0.12)', padding: '10px', borderRadius: '10px', fontSize: '11px', marginBottom: '8px' }}>
            <strong>AI Forecast:</strong> Scheme utilization spikes +15% across Chennai & Bengaluru.
          </div>
          <span style={{ fontSize: '10px', opacity: 0.8 }}>MoE Routing: 4 Expert Agents Active</span>
        </div>

        {/* Panel 3 */}
        <div style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff', border: '1px solid ' + (isDark ? 'rgba(56, 189, 248, 0.2)' : '#e2e8f0'), padding: '16px', borderRadius: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800 }}>💡 Smart AI Recommendations</span>
            <span style={{ color: '#10b981', fontSize: '11px', fontWeight: 700 }}>ACTION READY</span>
          </div>
          <div style={{ fontSize: '11px', marginBottom: '10px' }}>
            AI Suggestion: Convert Kauvery Chennai admission to 100% Cashless under CMCHIS TN.
          </div>
          <button onClick={() => showNotif('Approved All Claims!')} style={{ width: '100%', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', borderRadius: '8px', padding: '8px', fontWeight: 700, fontSize: '11px', cursor: 'pointer', marginBottom: '6px' }}>
            ✓ Approve All Claims
          </button>
          <button onClick={() => showNotif('Dispatched Collector Escalation!')} style={{ width: '100%', background: 'linear-gradient(135deg, #0284c7, #2563eb)', color: 'white', border: 'none', borderRadius: '8px', padding: '8px', fontWeight: 700, fontSize: '11px', cursor: 'pointer' }}>
            📧 Dispatch Collector Escalation
          </button>
        </div>

        {/* Panel 4 */}
        <div style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff', border: '1px solid ' + (isDark ? 'rgba(56, 189, 248, 0.2)' : '#e2e8f0'), padding: '16px', borderRadius: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800 }}>📋 Pending Legal Approvals</span>
            <span style={{ color: '#818cf8', fontSize: '11px', fontWeight: 700 }}>5 PENDING</span>
          </div>
          <div style={{ fontSize: '11px', fontWeight: 700, marginBottom: '12px' }}>
            5 Complaints Pending • Total: <span style={{ color: '#38bdf8' }}>₹32,750</span>
          </div>
          <button onClick={() => showNotif('Generated Statutory Form 14555 Legal Notice!')} style={{ width: '100%', background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: 'white', border: 'none', borderRadius: '8px', padding: '8px', fontWeight: 700, fontSize: '11px', cursor: 'pointer' }}>
            📜 Generate Form 14555 Notice
          </button>
        </div>

      </div>

      {/* Footer */}
      <div style={{ background: isDark ? 'rgba(0,0,0,0.4)' : '#f8fafc', border: '1px solid ' + (isDark ? 'rgba(56, 189, 248, 0.2)' : '#e2e8f0'), padding: '12px 16px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
        <div>⚙️ <strong>Automated Actions Hub:</strong> Task Scheduled (NHA & SAFU Circular Ingestion Active)</div>
        <span style={{ color: '#10b981', fontWeight: 700 }}>MCP SERVER HEALTH: 100%</span>
      </div>

    </div>
  );
}
