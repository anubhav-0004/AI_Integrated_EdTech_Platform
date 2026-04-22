import React from 'react'

export default function Divider() {
  return (
    <div style={{ position: 'relative', height: 60, overflow: 'hidden', margin: '0 0 20px' }}>
      <svg
        viewBox="0 0 1440 60"
        fill="none"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%' }}
      >
        <path
          d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
          fill="url(#divGrad)"
          fillOpacity="0.15"
        />
        <path
          d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30"
          stroke="url(#lineGrad)"
          strokeWidth="1.5"
          fill="none"
        />
        <defs>
          <linearGradient id="divGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="#6366f1" />
            <stop offset="70%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}