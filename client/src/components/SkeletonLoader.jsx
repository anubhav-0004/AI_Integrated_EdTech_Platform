import React from 'react'
import { motion } from 'framer-motion'

const SkeletonLine = ({ width = '100%', height = 16, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay }}
    className="shimmer"
    style={{
      width,
      height,
      borderRadius: 8,
      marginBottom: 12,
    }}
  />
)

export default function SkeletonLoader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        marginTop: 24,
        padding: '24px',
        borderRadius: 16,
        border: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(255,255,255,0.03)',
      }}
    >
      {/* Header skeleton */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div className="shimmer" style={{ width: 28, height: 28, borderRadius: 8 }} />
        <SkeletonLine width="35%" height={18} />
      </div>

      <SkeletonLine width="95%" />
      <SkeletonLine width="85%" delay={0.05} />
      <SkeletonLine width="90%" delay={0.1} />
      <SkeletonLine width="70%" delay={0.15} />

      <div style={{ margin: '20px 0 12px' }}>
        <SkeletonLine width="40%" height={14} delay={0.2} />
      </div>

      <SkeletonLine width="92%" delay={0.25} />
      <SkeletonLine width="80%" delay={0.3} />
      <SkeletonLine width="87%" delay={0.35} />

      <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
        <SkeletonLine width="28%" height={36} delay={0.4} />
        <SkeletonLine width="28%" height={36} delay={0.45} />
      </div>
    </motion.div>
  )
}