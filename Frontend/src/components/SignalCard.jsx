import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ExternalLink,
  Clock,
  BrainCircuit,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   FinBERT Sentiment Bar
   score: -1 (max bearish) → +1 (max bullish)
────────────────────────────────────────────── */
const FinBERTBar = ({ score }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  // Normalise to 0-100 for CSS width
  const pct = Math.round(((score + 1) / 2) * 100); // 0 → 100
  const abs = Math.abs(score);
  const label = abs >= 0.65 ? 'HIGH' : abs >= 0.35 ? 'MED' : 'LOW';

  const barColor =
    score >= 0.35
      ? { bg: '#1D9E75' }
      : score <= -0.35
      ? { bg: '#E24B4A' }
      : { bg: '#C1121F' };

  return (
    <div className="mt-4 space-y-1.5" ref={ref}>
      {/* Header */}
      <div className="flex items-center justify-between text-[10px] tracking-tight">
        <div className="flex items-center gap-1.5 text-text-muted">
          <BrainCircuit className="w-3 h-3" />
          <span>FinBERT Confidence</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="px-1.5 py-0.5 rounded text-[9px] font-semibold tracking-wide"
            style={{
              background: `${barColor.bg}22`,
              color: barColor.bg,
              border: `0.5px solid ${barColor.bg}55`,
            }}
          >
            {label}
          </span>
          <span style={{ color: barColor.bg }}>{(abs * 100).toFixed(0)}%</span>
        </div>
      </div>

      {/* Track */}
      <motion.div
        className="relative w-full h-[6px] rounded-full bg-border/40 overflow-hidden border border-border"
        initial={{ width: '50%' }}
        animate={inView ? { width: '100%' } : { width: '100%' }}
      >
        <motion.div
          className="absolute top-0 bottom-0 left-0 rounded-full"
          style={{ background: barColor.bg, width: `${pct}%` }}
          initial={{ width: '0%' }}
          animate={inView ? { width: `${pct}%` } : { width: '0%' }}
          transition={{ duration: 2.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>

      {/* Scale labels */}
      <div className="flex justify-between text-[9px] text-text-secondary">
        <span>Bearish</span>
        <span>Neutral</span>
        <span>Bullish</span>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Signal Badge (BULLISH / BEARISH / NEUTRAL)
────────────────────────────────────────────── */
const SignalBadge = ({ type }) => {
  const cfg = {
    BULLISH: {
      Icon: TrendingUp,
      label: 'Bullish',
      color: '#1D9E75',
      bg: 'rgba(29,158,117,0.12)',
      border: '#1D9E75',
    },
    BEARISH: {
      Icon: TrendingDown,
      label: 'Bearish',
      color: '#E24B4A',
      bg: 'rgba(226,75,74,0.12)',
      border: '#E24B4A',
    },
    NEUTRAL: {
      Icon: Minus,
      label: 'Neutral',
      color: '#C1121F',
      bg: 'rgba(193,18,31,0.12)',
      border: '#C1121F',
    },
  };

  const c = cfg[type] || cfg.NEUTRAL;

  return (
    <motion.span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-tight uppercase"
      style={{
        color: c.color,
        background: c.bg,
        border: `0.5px solid ${c.border}`,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'backOut' }}
    >
      <c.Icon className="w-3 h-3" />
      {c.label}
    </motion.span>
  );
};

/* ─────────────────────────────────────────────
   Main SignalCard component
   Props: { signal, index }
   signal: { ticker, signal_type, description,
             finbert_score, source, timestamp }
────────────────────────────────────────────── */
export const SignalCard = ({ signal, index = 0 }) => {
  const {
    ticker,
    signal_type = 'NEUTRAL',
    description,
    finbert_score = 0,
    source,
    timestamp,
  } = signal;

  const isBullish = signal_type === 'BULLISH';
  const isBearish = signal_type === 'BEARISH';

  const accentColor = isBullish
    ? '#1D9E75'
    : isBearish
    ? '#E24B4A'
    : '#C1121F';

  const relTime = timestamp
    ? new Date(timestamp).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '—';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.012, y: -2 }}
      className="group relative rounded-xl border border-border bg-background-card overflow-hidden cursor-pointer"
      style={{
        boxShadow: '0 12px 30px rgba(17,17,17,0.08)',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* Accent left stripe */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl"
        style={{ background: accentColor }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 3.2, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 + 0.1 }}
      />

      <div className="px-5 pt-4 pb-5 pl-7">
        {/* Top row: ticker + badge + time */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Ticker chip */}
            <motion.div
            className="flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-semibold tracking-tight"
              style={{
                background: `${accentColor}18`,
                color: accentColor,
                border: `0.5px solid ${accentColor}44`,
                minWidth: '72px',
                textAlign: 'center',
              }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.12 + 0.15 }}
            >
              {ticker}
            </motion.div>
            <SignalBadge type={signal_type} />
          </div>

          {/* Timestamp */}
          <div className="flex items-center gap-1 text-[10px] text-text-muted shrink-0 mt-0.5">
            <Clock className="w-3 h-3" />
            {relTime}
          </div>
        </div>

        {/* Description */}
        <motion.p
          className="mt-3 text-sm text-text-secondary leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.12 + 0.25 }}
        >
          {description}
        </motion.p>

        {/* FinBERT Bar */}
        <FinBERTBar score={finbert_score} />

        {/* Footer: source */}
        <motion.div
          className="mt-4 flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.12 + 0.4 }}
        >
          <div className="flex items-center gap-1.5 text-[10px] text-text-muted font-mono uppercase tracking-widest">
            <ExternalLink className="w-3 h-3" />
            {source}
          </div>

          {/* Scan indicator */}
          <div className="flex items-center gap-1.5 text-[10px] text-text-muted">
            <motion.span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: accentColor }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="font-mono uppercase tracking-widest">Live Scan</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
