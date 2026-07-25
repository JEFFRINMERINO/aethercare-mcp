'use client';

import { useState } from 'react';
import { useTheme, useWidgetSDK } from '@nitrostack/widgets';

export default function AgenticDashboardWidget() {
  const theme = useTheme();
  const { getToolOutput } = useWidgetSDK();
  const rawData = getToolOutput<any>();

  const isDark = theme === 'dark';
  const [searchQuery, setSearchQuery] = useState('Analyze patient billing & audit hospital empanelment for Kauvery Chennai');
  const [approved, setApproved] = useState(false);
  const [dispatched, setDispatched] = useState(false);

  return (
    <div style={{
      padding: '24px',
      background: isDark
        ? 'linear-gradient(135deg, #090d16 0%, #1e1b4b 40%, #0f172a 100%)'
        : 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      borderRadius: '24px',
      color: isDark ? '#ffffff' : '#0f172a',
      maxWidth: '780px',
      boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      border: '1px solid ' + (isDark ? 'rgba(99, 102, 241, 0.4)' : '#38bdf8')
    }}>
      
      {/* 1. TOP HEADER & ASSIST SEARCH BAR (Matching Business Central Image) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '24px' }}>⚡</span>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, letterSpacing: '-0.5px' }}>
              AetherCare Enterprise Health Operations Center
            </h2>
            <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 600 }}>
              CONNECTED AGENTIC ECOSYSTEM • INTERCONNECTED MULTI-MODEL STATE
            </span>
          </div>
        </div>

        <span style={{
          background: 'linear-gradient(135deg, #0284c7, #2563eb)',
          color: 'white',
          fontSize: '11px',
          fontWeight: 800,
          padding: '6px 14px',
          borderRadius: '20px',
          boxShadow: '0 4px 12px rgba(2, 132, 199, 0.4)'
        }}>
          ENTERPRISE V2.0
        </span>
      </div>

      {/* Universal Search Bar */}
      <div style={{
        background: isDark ? 'rgba(255,255,255,0.06)' : '#ffffff',
        border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.15)' : '#cbd5e1'),
        padding: '12px',
        borderRadius: '16px',
        marginBottom: '20px',
        display: 'flex',
        gap: '10px',
        alignItems: 'center'
      }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '16px', opacity: 0.7 }}>🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="How can AetherCare Agentic AI assist you today?"
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              color: isDark ? '#ffffff' : '#0f172a',
              fontSize: '13px',
              outline: 'none',
              fontWeight: 600
            }}
          />
        </div>
        <button style={{
          background: 'linear-gradient(135deg, #0284c7, #2563eb)',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          padding: '8px 16px',
          fontWeight: 700,
          fontSize: '12px',
          cursor: 'pointer',
          whiteSpace: 'nowrap'
        }}>
          Generate Report
        </button>
      </div>

      {/* 2. KEY METRIC SUMMARY BAR */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff', padding: '12px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ fontSize: '11px', opacity: 0.7, display: 'block' }}>Total Patients Saved</span>
          <strong style={{ fontSize: '20px', color: '#38bdf8' }}>₹4,500,000</strong>
        </div>

        <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff', padding: '12px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ fontSize: '11px', opacity: 0.7, display: 'block' }}>Overdue Fraud Claims</span>
          <strong style={{ fontSize: '20px', color: '#ef4444' }}>₹66,000</strong>
        </div>

        <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff', padding: '12px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ fontSize: '11px', opacity: 0.7, display: 'block' }}>Active Scheme Coverage</span>
          <strong style={{ fontSize: '20px', color: '#10b981' }}>99.4%</strong>
        </div>
      </div>

      {/* 3. DUAL AI COPILOT AVATARS (Matching Image Left & Right Speech Bubbles) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
        
        {/* Left Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '50%', background: '#0284c7',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: 'white', flexShrink: 0
          }}>
            👩‍⚕️
          </div>
          <div style={{
            background: isDark ? 'rgba(255,255,255,0.08)' : '#ffffff',
            padding: '10px 12px', borderRadius: '14px', fontSize: '11px', lineHeight: 1.3, border: '1px solid rgba(255,255,255,0.15)'
          }}>
            <strong>Health Audit Agent:</strong><br />
            "Sure! I've executed the full 360-degree hospital audit for Kauvery Hospital Chennai."
          </div>
        </div>

        {/* Right Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            background: isDark ? 'rgba(255,255,255,0.08)' : '#ffffff',
            padding: '10px 12px', borderRadius: '14px', fontSize: '11px', lineHeight: 1.3, border: '1px solid rgba(255,255,255,0.15)', textAlign: 'right'
          }}>
            <strong>Legal Enforcement Agent:</strong><br />
            "Reminder: Approve 5 pending Form 14555 legal notices for dispatch."
          </div>
          <div style={{
            width: '42px', height: '42px', borderRadius: '50%', background: '#6366f1',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: 'white', flexShrink: 0
          }}>
            🤖
          </div>
        </div>
      </div>

      {/* 4. INTERCONNECTED 4-PANEL DASHBOARD GRID (Matching the reference picture layout!) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
        
        {/* Panel 1: Revenue & Overcharge Audit Analysis */}
        <div style={{
          background: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff',
          border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'),
          padding: '14px',
          borderRadius: '16px'
        }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: 800 }}>📈 Billing Overcharge Analysis</h4>
          <div style={{ fontSize: '11px', opacity: 0.8, marginBottom: '8px' }}>Procedure: <strong>Drug-Eluting Cardiac Stent (DES)</strong></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>
            <span>Quoted Estimate:</span>
            <span style={{ color: '#ef4444' }}>₹45,000</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>
            <span>NPPA Legal Cap:</span>
            <span style={{ color: '#10b981' }}>₹38,260</span>
          </div>
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', padding: '6px 10px', borderRadius: '8px', fontSize: '11px', color: '#fca5a5', fontWeight: 700 }}>
            Illegal Overcharge: +₹6,740 (DPCO Violation)
          </div>
        </div>

        {/* Panel 2: Predictive Healthcare Insights */}
        <div style={{
          background: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff',
          border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'),
          padding: '14px',
          borderRadius: '16px'
        }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: 800 }}>📊 Predictive Health AI Insights</h4>
          <div style={{ fontSize: '11px', opacity: 0.85, marginBottom: '8px' }}>
            <strong>AI Analysis:</strong> Hospital Compliance Score Up 15% after SAFU audit notice.
          </div>
          <div style={{ background: 'rgba(56, 189, 248, 0.15)', padding: '8px 10px', borderRadius: '8px', fontSize: '11px', color: '#7dd3fc' }}>
            Predicted Approval Probability: <strong>99.4% Cashless Guarantee</strong>
          </div>
        </div>

        {/* Panel 3: Smart Recommendations / Action Optimization */}
        <div style={{
          background: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff',
          border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'),
          padding: '14px',
          borderRadius: '16px'
        }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: 800 }}>💡 Smart AI Recommendations</h4>
          <div style={{ fontSize: '11px', opacity: 0.85, marginBottom: '10px' }}>
            <strong>AI Suggestion:</strong> Convert Kauvery Hospital Chennai admission to 100% Cashless under CMCHIS TN.
          </div>
          <button
            onClick={() => setDispatched(true)}
            style={{
              width: '100%',
              background: dispatched ? '#10b981' : 'linear-gradient(135deg, #0284c7, #2563eb)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '8px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {dispatched ? '✓ District Collector Escalation Dispatched' : 'Create Emergency Collector Escalation'}
          </button>
        </div>

        {/* Panel 4: Invoice / Legal Notice Approval Panel */}
        <div style={{
          background: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff',
          border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'),
          padding: '14px',
          borderRadius: '16px'
        }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: 800 }}>📋 Legal Form 14555 Approval</h4>
          <div style={{ fontSize: '11px', opacity: 0.85, marginBottom: '6px' }}>
            5 Complaints Pending • Total: <strong>₹32,750</strong>
          </div>
          <button
            onClick={() => setApproved(true)}
            style={{
              width: '100%',
              background: approved ? '#10b981' : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '8px',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
              marginBottom: '8px'
            }}
          >
            {approved ? '✓ All Legal Notices Approved & Issued' : 'Approve All Legal Notices'}
          </button>
          <div style={{ fontSize: '10px', opacity: 0.6, textAlign: 'center' }}>
            Automated Actions: <strong>Task Scheduled</strong>
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div style={{
        paddingTop: '12px',
        borderTop: '1px solid ' + (isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'),
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        fontSize: '11px',
        opacity: 0.7
      }}>
        <span>AetherCare Interconnected Multi-Agent Ecosystem</span>
        <span>4M Token Context Enabled</span>
      </div>
    </div>
  );
}
