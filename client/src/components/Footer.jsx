import React from 'react'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.05)',
      padding: '28px 24px',
      textAlign: 'center',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{
          width: 24, height: 24, borderRadius: 7,
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 700, color: '#fff',
          boxShadow: '0 0 10px rgba(99,102,241,0.5)',
        }}>E</div>
        <span className="font-display" style={{ fontSize: 14, color: '#475569' }}>EduMind AI</span>
      </div>
      <p style={{ color: '#334155', fontSize: 13 }}>
        Built with React + Groq LLM · AI-Powered Student Assistant
      </p>
    </footer>
  )
}