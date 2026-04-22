import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateAIResponse } from '../services/aiService'
import SkeletonLoader from './SkeletonLoader'
import ResponseCard from './ResponseCard'

const MODES = [
  { value: 'explain', label: '📖 Explain Concept', desc: 'Deep concept breakdown' },
  { value: 'mcq', label: '🧪 Generate MCQs', desc: '5 smart practice questions' },
  { value: 'summarize', label: '📝 Summarize Text', desc: 'Key points extracted' },
  { value: 'improve', label: '✍️ Improve Writing', desc: 'Polish your draft' },
]

export default function AIAssistant() {
  const [prompt, setPrompt] = useState('')
  const [mode, setMode] = useState('explain')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async () => {
    if (!prompt.trim()) return
    setLoading(true)
    setError(null)
    setResponse(null)

    try {
      const data = await generateAIResponse(prompt, mode)
      setResponse(data)
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const selectedMode = MODES.find(m => m.value === mode)

  return (
    <section
      id="assistant"
      style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: '40px 24px 100px',
      }}
    >
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', marginBottom: 48 }}
      >
        <h2 className="font-display" style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          color: '#f1f5f9',
          marginBottom: 10,
          letterSpacing: '0.3px',
        }}>
          Ask{' '}
          <span className="gradient-text">EduMind AI</span>
        </h2>
        <p style={{ color: '#64748b', fontSize: 15 }}>
          Select a mode, type your question or text, and let AI do the heavy lifting.
        </p>
      </motion.div>

      {/* Mode Selector */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 10,
          marginBottom: 20,
        }}
      >
        {MODES.map((m) => (
          <button
            key={m.value}
            onClick={() => setMode(m.value)}
            style={{
              padding: '14px 16px',
              borderRadius: 12,
              border: mode === m.value
                ? '1px solid rgba(99,102,241,0.6)'
                : '1px solid rgba(255,255,255,0.06)',
              background: mode === m.value
                ? 'rgba(99,102,241,0.15)'
                : 'rgba(255,255,255,0.03)',
              color: mode === m.value ? '#a78bfa' : '#64748b',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.25s ease',
              boxShadow: mode === m.value ? '0 0 16px rgba(99,102,241,0.2)' : 'none',
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 3 }}>{m.label}</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>{m.desc}</div>
          </button>
        ))}
      </motion.div>

      {/* Textarea */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        style={{ marginBottom: 16, position: 'relative' }}
      >
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder={
            mode === 'explain' ? "e.g. Explain how neural networks learn using backpropagation..." :
            mode === 'mcq' ? "e.g. JavaScript closures and scope..." :
            mode === 'summarize' ? "Paste your text or notes here to summarize..." :
            "Paste your draft paragraph or essay to improve..."
          }
          rows={6}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: 14,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.04)',
            color: '#f1f5f9',
            fontSize: 15,
            fontFamily: 'DM Sans, sans-serif',
            resize: 'vertical',
            outline: 'none',
            lineHeight: 1.7,
            transition: 'border-color 0.2s ease',
          }}
          onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.5)'}
          onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
        />
        <div style={{
          position: 'absolute',
          bottom: 12,
          right: 14,
          fontSize: 12,
          color: '#334155',
        }}>
          {prompt.length} chars
        </div>
      </motion.div>

      {/* Submit Button */}
      <motion.button
        onClick={handleSubmit}
        disabled={loading || !prompt.trim()}
        whileHover={{ scale: prompt.trim() ? 1.02 : 1 }}
        whileTap={{ scale: 0.98 }}
        className="btn-primary"
        style={{
          width: '100%',
          padding: '15px',
          borderRadius: 12,
          fontSize: 15,
          fontWeight: 600,
          color: '#fff',
          opacity: loading || !prompt.trim() ? 0.5 : 1,
          cursor: loading || !prompt.trim() ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          letterSpacing: '0.2px',
        }}
      >
        {loading ? (
          <>
            <span style={{
              width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)',
              borderTopColor: '#fff', borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
              display: 'inline-block',
            }} />
            Generating...
          </>
        ) : (
          <>
            ✨ Generate with {selectedMode?.label.split(' ').slice(1).join(' ')} Mode
          </>
        )}
      </motion.button>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              marginTop: 16,
              padding: '14px 16px',
              borderRadius: 12,
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#f87171',
              fontSize: 14,
            }}
          >
            ⚠️ {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loader */}
      {loading && <SkeletonLoader />}

      {/* Response */}
      <AnimatePresence>
        {response && !loading && (
          <ResponseCard response={response} mode={mode} />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}