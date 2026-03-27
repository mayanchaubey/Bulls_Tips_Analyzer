import { motion } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  HelpCircle,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

const VERDICT_CONFIG = {
  VERIFIED: {
    Icon: CheckCircle2,
    label: 'Verified',
    color: '#1D9E75',
    bg: 'rgba(29,158,117,0.12)',
    border: '#1D9E75',
    barColor: '#1D9E75',
  },
  FALSE: {
    Icon: XCircle,
    label: 'False',
    color: '#E24B4A',
    bg: 'rgba(226,75,74,0.12)',
    border: '#E24B4A',
    barColor: '#E24B4A',
  },
  MISLEADING: {
    Icon: AlertTriangle,
    label: 'Misleading',
    color: '#C1121F',
    bg: 'rgba(193,18,31,0.12)',
    border: '#C1121F',
    barColor: '#C1121F',
  },
  UNKNOWN: {
    Icon: HelpCircle,
    label: 'Unknown',
    color: '#6B7280',
    bg: 'rgba(107,114,128,0.12)',
    border: '#6B7280',
    barColor: '#6B7280',
  },
};

const CONFIDENCE_LEVELS = {
  VERIFIED: 0.9,
  FALSE: 0.7,
  MISLEADING: 0.55,
  UNKNOWN: 0.35,
};

const VerdictBadge = ({ cfg }) => (
  <span
    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-tight uppercase"
    style={{
      background: cfg.bg,
      color: cfg.color,
      border: `1px solid ${cfg.border}`,
    }}
  >
    <cfg.Icon className="w-3.5 h-3.5" />
    {cfg.label}
  </span>
);

const ConfidenceBar = ({ cfg, verdict }) => {
  const level = CONFIDENCE_LEVELS[verdict] || 0.4;
  const filledCount = Math.round(level * 6);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[10px] text-text-secondary">
        <span>AI Confidence</span>
        <span style={{ color: cfg.color }}>{Math.round(level * 100)}%</span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="flex-1 h-[4px] rounded-full"
            style={{
              background: idx < filledCount ? cfg.barColor : '#E5E7EB',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const ClaimRow = ({ claim: claimData, index = 0 }) => {
  const { claim, verdict = 'UNKNOWN', explanation, source } = claimData;
  const cfg = VERDICT_CONFIG[verdict] || VERDICT_CONFIG.UNKNOWN;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="card-surface border border-border"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-4">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-full border"
            style={{ borderColor: cfg.border, background: cfg.bg }}
          >
            <cfg.Icon className="w-5 h-5" style={{ color: cfg.color }} />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-3">
              <p className="text-base font-semibold text-text-primary leading-snug">
                {claim}
              </p>
              <VerdictBadge cfg={cfg} />
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">{explanation}</p>
          </div>
        </div>
        <ConfidenceBar cfg={cfg} verdict={verdict} />
        <div className="flex items-center justify-between text-[11px] text-text-secondary">
          <div className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            <span>{source}</span>
          </div>
          <div className="inline-flex items-center gap-1 font-semibold" style={{ color: cfg.color }}>
            View Source
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
