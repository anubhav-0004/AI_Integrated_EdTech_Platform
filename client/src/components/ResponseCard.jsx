import React, { useState } from 'react'
import { motion } from 'framer-motion'

const MCQDisplay = ({ data }) => {
  const [selected, setSelected] = useState({})
  const [revealed, setRevealed] = useState({})

  const handleSelect = (qi, opt) => {
    if (revealed[qi]) return
    setSelected(prev => ({ ...prev, [qi]: opt }))
  }

  const handleReveal = (qi) => {
    setRevealed(prev => ({ ...prev, [qi]: true }))
  }

  return (
    <div>
      {data.questions.map((q, qi) => (
        <motion.div
          key={qi}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: qi * 0.08 }}
          style={{
            marginBottom: 20,
            padding: '18px',
            borderRadius: 12,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <p style={{ fontWeight: 600, marginBottom: 12, fontSize: 14, color: '#e2e8f0', lineHeight: 1.5 }}>
            <span style={{ color: '#6366f1', marginRight: 8 }}>Q{qi + 1}.</span>
            {q.question}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {q.options.map((opt, oi) => {
              const isSelected = selected[qi] === opt
              const isCorrect = revealed[qi] && opt === q.answer
              const isWrong = revealed[qi] && isSelected && opt !== q.answer

              return (
                <button
                  key={oi}
                  onClick={() => handleSelect(qi, opt)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 8,
                    textAlign: 'left',
                    fontSize: 13,
                    cursor: revealed[qi] ? 'default' : 'pointer',
                    border: isCorrect
                      ? '1px solid rgba(34,197,94,0.5)'
                      : isWrong
                      ? '1px solid rgba(239,68,68,0.5)'
                      : isSelected
                      ? '1px solid rgba(99,102,241,0.5)'
                      : '1px solid rgba(255,255,255,0.06)',
                    background: isCorrect
                      ? 'rgba(34,197,94,0.1)'
                      : isWrong
                      ? 'rgba(239,68,68,0.1)'
                      : isSelected
                      ? 'rgba(99,102,241,0.12)'
                      : 'transparent',
                    color: isCorrect ? '#4ade80' : isWrong ? '#f87171' : '#94a3b8',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{ marginRight: 8, opacity: 0.5 }}>{['A', 'B', 'C', 'D'][oi]}.</span>
                  {opt}
                </button>
              )
            })}
          </div>

          {selected[qi] && !revealed[qi] && (
            <button
              onClick={() => handleReveal(qi)}
              style={{
                marginTop: 10,
                padding: '7px 14px',
                borderRadius: 8,
                background: 'rgba(99,102,241,0.15)',
                border: '1px solid rgba(99,102,241,0.3)',
                color: '#a78bfa',
                fontSize: 12,
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              Check Answer
            </button>
          )}

          {revealed[qi] && (
            <div style={{ marginTop: 10, fontSize: 12, color: '#4ade80' }}>
              ✓ Correct answer: <strong>{q.answer}</strong>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

const TextDisplay = ({ text }) => {
  const lines = text.split('\n').filter(l => l.trim())

  const renderInline = (raw) => {
    const parts = raw.split(/(\*\*.*?\*\*)/g)
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} style={{ color: '#e2e8f0', fontWeight: 700 }}>
            {part.slice(2, -2)}
          </strong>
        )
      }
      return <span key={i}>{part}</span>
    })
  }

  return (
    <div style={{ lineHeight: 1.8 }}>
      {lines.map((line, i) => {
        const trimmed = line.trim()

        // Strip leading bullet characters
        const isBullet =
          trimmed.startsWith('•') ||
          trimmed.startsWith('-') ||
          trimmed.startsWith('*') && !trimmed.startsWith('**')

        // Heading: ends with colon OR is wrapped in ** and short
        const isStarHeading = trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.length < 80
        const isColonHeading = trimmed.endsWith(':') && trimmed.length < 70 && !isBullet

        const cleaned = trimmed.replace(/^[-•*]\s*/, '')

        if (isStarHeading) {
          const headingText = trimmed.replace(/\*\*/g, '')
          return (
            <p key={i} style={{
              fontWeight: 700,
              color: '#a78bfa',
              fontSize: 15,
              marginTop: i > 0 ? 20 : 0,
              marginBottom: 6,
              letterSpacing: '0.2px',
            }}>
              {headingText}
            </p>
          )
        }

        if (isColonHeading) {
          const headingText = trimmed.replace(/\*\*/g, '')
          return (
            <p key={i} style={{
              fontWeight: 700,
              color: '#a78bfa',
              fontSize: 15,
              marginTop: i > 0 ? 20 : 0,
              marginBottom: 6,
              letterSpacing: '0.2px',
            }}>
              {headingText}
            </p>
          )
        }

        if (isBullet) {
          return (
            <div key={i} style={{
              display: 'flex',
              gap: 8,
              marginBottom: 6,
              alignItems: 'flex-start',
              paddingLeft: 4,
            }}>
              <span style={{ color: '#6366f1', marginTop: 4, flexShrink: 0, fontSize: 12 }}>▸</span>
              <span style={{ color: '#cbd5e1', fontSize: 14 }}>
                {renderInline(cleaned)}
              </span>
            </div>
          )
        }

        return (
          <p key={i} style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 8 }}>
            {renderInline(cleaned)}
          </p>
        )
      })}
    </div>
  )
}

export default function ResponseCard({ response, mode }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const text = mode === 'mcq'
      ? JSON.stringify(response.response, null, 2)
      : response.response
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const modeLabels = {
    explain: { icon: '📖', label: 'Concept Explanation' },
    mcq: { icon: '🧪', label: 'Practice MCQs' },
    summarize: { icon: '📝', label: 'Summary' },
    improve: { icon: '✍️', label: 'Improved Writing' },
  }

  const meta = modeLabels[mode]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      style={{
        marginTop: 24,
        borderRadius: 16,
        border: '1px solid rgba(99,102,241,0.2)',
        background: 'rgba(10,10,18,0.8)',
        overflow: 'hidden',
        boxShadow: '0 0 40px rgba(99,102,241,0.08)',
      }}
    >
      {/* Card Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(99,102,241,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18 }}>{meta.icon}</span>
          <span style={{ fontWeight: 600, fontSize: 14, color: '#e2e8f0' }}>{meta.label}</span>
          <span style={{
            padding: '2px 8px',
            borderRadius: 100,
            background: 'rgba(99,102,241,0.15)',
            border: '1px solid rgba(99,102,241,0.3)',
            fontSize: 11,
            color: '#6366f1',
            fontWeight: 600,
            letterSpacing: '0.5px',
          }}>
            AI GENERATED
          </span>
        </div>

        <button
          onClick={handleCopy}
          style={{
            padding: '6px 14px',
            borderRadius: 8,
            background: copied ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.05)',
            border: copied ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(255,255,255,0.1)',
            color: copied ? '#4ade80' : '#64748b',
            fontSize: 12,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 500,
          }}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>

      {/* Card Content */}
      <div style={{ padding: '20px' }}>
        {mode === 'mcq' && response.response?.questions ? (
          <MCQDisplay data={response.response} />
        ) : (
          <TextDisplay text={typeof response.response === 'string' ? response.response : JSON.stringify(response.response)} />
        )}
      </div>
    </motion.div>
  )
}