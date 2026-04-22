import React from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section
      className="bg-grid"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 24px 60px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient blur orbs */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '10%',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '8%',
        width: 350,
        height: 350,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(99,102,241,0.12)',
          border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: 100,
          padding: '6px 16px',
          marginBottom: 28,
          fontSize: 13,
          color: '#a78bfa',
          fontWeight: 500,
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#6366f1', display: 'inline-block', boxShadow: '0 0 6px #6366f1' }} />
        Powered by Groq LLM — Ultra Fast AI
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        style={{
          textAlign: 'center',
          fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
          fontWeight: 700,
          lineHeight: 1.15,
          color: '#f1f5f9',
          maxWidth: 750,
          marginBottom: 20,
          letterSpacing: '-1.5px',
        }}
      >
        Your{' '}
        <span className="font-display gradient-text" style={{ letterSpacing: '0px' }}>
          AI Study Partner
        </span>
        {' '}That Never Sleeps
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          textAlign: 'center',
          color: '#64748b',
          fontSize: 18,
          maxWidth: 520,
          lineHeight: 1.7,
          marginBottom: 44,
        }}
      >
        Explain concepts, generate MCQs, summarize notes, and improve your writing — all with one AI assistant built for serious students.
      </motion.p>

      {/* CTA */}
      <motion.a
        href="#assistant"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.65 }}
        className="btn-primary"
        style={{
          padding: '14px 36px',
          borderRadius: 12,
          fontSize: 15,
          fontWeight: 600,
          color: '#fff',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          letterSpacing: '0.2px',
        }}
      >
        Start Learning Free
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.a>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        style={{
          display: 'flex',
          gap: 40,
          marginTop: 64,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {[
          { value: '4 Modes', label: 'AI Task Modes' },
          { value: '< 2s', label: 'Response Time' },
          { value: '∞', label: 'Questions Answered' },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div className="gradient-text" style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.5px' }}>
              {stat.value}
            </div>
            <div style={{ color: '#475569', fontSize: 13, marginTop: 4, fontWeight: 500 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}