import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Newspaper,
  Lightbulb,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus,
  ExternalLink,
  BrainCircuit,
  RefreshCw,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { getIntelligenceData, DEFAULT_PANEL } from '../data/demoIntelligence';

/* ─────────────────────────────────────────────
   TAB CONFIG
────────────────────────────────────────────── */
const TABS = [
  { id: 'news',     label: 'News',     Icon: Newspaper },
  { id: 'insights', label: 'Insights', Icon: Lightbulb },
  { id: 'context',  label: 'Context',  Icon: BarChart3 },
];

/* ─────────────────────────────────────────────
   SENTIMENT CONFIG
────────────────────────────────────────────── */
const SENTIMENT_CFG = {
  bullish:  { color: '#58A6FF', bg: 'rgba(88,166,255,0.12)', label: 'Bullish',  Icon: TrendingUp  },
  bearish:  { color: '#e24b4a', bg: 'rgba(226,75,74,0.12)',  label: 'Bearish',  Icon: TrendingDown },
  neutral:  { color: '#ba7517', bg: 'rgba(186,117,23,0.12)', label: 'Neutral',  Icon: Minus        },
};

/* ─────────────────────────────────────────────
   SECTION LABEL
────────────────────────────────────────────── */
const PanelLabel = ({ Icon, label }) => (
  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-text-muted mb-3">
    <Icon className="w-3 h-3" />
    {label}
  </div>
);

/* ─────────────────────────────────────────────
   NEWS ITEM
────────────────────────────────────────────── */
const NewsItem = ({ item, index }) => {
  const cfg = SENTIMENT_CFG[item.sentiment] || SENTIMENT_CFG.neutral;
  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.38, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group block p-3 rounded-xl border border-border bg-background-primary/50 hover:border-opacity-80 hover:bg-background-card transition-all duration-200 relative overflow-hidden"
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl"
        style={{ background: cfg.color }}
      />
      <div className="pl-2">
        {/* Sentiment badge + time */}
        <div className="flex items-center justify-between mb-1.5">
          <span
            className="inline-flex items-center gap-1 text-[9px] font-bold font-mono tracking-widest uppercase px-1.5 py-0.5 rounded"
            style={{ color: cfg.color, background: cfg.bg }}
          >
            <cfg.Icon className="w-2.5 h-2.5" />
            {cfg.label}
          </span>
          <span className="text-[9px] text-text-muted font-mono">{item.time}</span>
        </div>
        {/* Headline */}
        <p className="text-xs text-text-secondary leading-snug group-hover:text-text-primary transition-colors duration-200 line-clamp-2">
          {item.headline}
        </p>
        {/* Source */}
        <div className="flex items-center gap-1 mt-1.5 text-[9px] text-text-muted font-mono">
          <ExternalLink className="w-2.5 h-2.5" />
          {item.source}
        </div>
      </div>
    </motion.a>
  );
};

/* ─────────────────────────────────────────────
   INSIGHT ITEM
────────────────────────────────────────────── */
const INSIGHT_CFG = {
  positive: { color: '#58A6FF', icon: '●', bg: 'rgba(88,166,255,0.08)'  },
  warning:  { color: '#ba7517', icon: '▲', bg: 'rgba(186,117,23,0.08)'  },
  neutral:  { color: '#2d6aa0', icon: '◆', bg: 'rgba(45,106,160,0.08)'  },
};

const InsightItem = ({ item, index }) => {
  const cfg = INSIGHT_CFG[item.type] || INSIGHT_CFG.neutral;
  return (
    <motion.div
      initial={{ opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.38, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-2.5 p-3 rounded-xl border border-border"
      style={{ background: cfg.bg }}
    >
      <span className="shrink-0 text-[10px] mt-0.5" style={{ color: cfg.color }}>
        {cfg.icon}
      </span>
      <p className="text-xs text-text-secondary leading-snug">{item.text}</p>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   CONTEXT PANEL
────────────────────────────────────────────── */
const ContextPanel = ({ ctx }) => {
  const sentPct = Math.round(((ctx.sentiment + 1) / 2) * 100);
  const sentColor =
    ctx.sentiment >= 0.35 ? '#58A6FF' :
    ctx.sentiment <= -0.35 ? '#F85149' :
    '#D29922';

  const ChangeIcon = ctx.up === true ? ArrowUp : ctx.up === false ? ArrowDown : Minus;
  const changeColor = ctx.up === true ? '#58A6FF' : ctx.up === false ? '#F85149' : '#D29922';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-3"
    >
      {/* Ticker card */}
      <div className="p-4 rounded-xl border border-border bg-background-primary/60">
        <div className="flex items-start justify-between mb-3">
          {/* Ticker + price */}
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-muted">
              {ctx.ticker}
            </p>
            <p className="text-2xl font-black text-text-primary font-mono mt-0.5">
              {ctx.price}
            </p>
          </div>
          {/* Change badge */}
          <div
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold"
            style={{ color: changeColor, background: `${changeColor}15`, border: `0.5px solid ${changeColor}40` }}
          >
            <ChangeIcon className="w-3 h-3" />
            {ctx.change}
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center justify-between text-[10px] font-mono text-text-muted">
          <span>Volume</span>
          <span className="text-text-secondary">{ctx.volume}</span>
        </div>
      </div>

      {/* FinBERT sentiment */}
      <div className="p-4 rounded-xl border border-border bg-background-primary/60">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-text-muted">
            <BrainCircuit className="w-3 h-3" />
            FinBERT Pulse
          </div>
          <span className="text-xs font-black" style={{ color: sentColor }}>
            {ctx.sentimentLabel}
          </span>
        </div>

        {/* Bar track */}
        <div className="relative w-full h-1.5 rounded-full bg-background-card border border-border overflow-hidden">
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-border/60 z-10" />
          <motion.div
            className="absolute top-0 bottom-0 left-0 rounded-full"
            style={{ background: `linear-gradient(90deg, ${sentColor}70, ${sentColor})` }}
            initial={{ width: '50%' }}
            animate={{ width: `${sentPct}%` }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <div className="flex justify-between text-[9px] font-mono text-text-muted mt-1">
          <span>Bearish</span>
          <span className="font-bold" style={{ color: sentColor }}>
            {Math.abs(Math.round(ctx.sentiment * 100))}%
          </span>
          <span>Bullish</span>
        </div>
      </div>

      {/* Live data disclaimer */}
      <div className="flex items-center gap-1.5 text-[9px] font-mono text-text-muted px-1">
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-success-green"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        Demo data · NSE/BSE feed simulated
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   LOADING SHIMMER
────────────────────────────────────────────── */
const Shimmer = () => (
  <div className="space-y-3 animate-pulse">
    {[0.85, 0.65, 0.75].map((w, i) => (
      <div key={i} className="p-3 rounded-xl border border-border bg-background-primary/50 space-y-2">
        <div className="h-2 rounded bg-border" style={{ width: `${w * 100}%` }} />
        <div className="h-2 rounded bg-border" style={{ width: `${(w - 0.2) * 100}%` }} />
        <div className="h-2 rounded bg-border w-1/3" />
      </div>
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   MAIN INTELLIGENCE PANEL
   Props:
     activeQuery – string | null   (last user query)
     isLoading   – bool            (AI is typing)
────────────────────────────────────────────── */
export const IntelligencePanel = ({ activeQuery, isLoading, intelligence }) => {
  const [tab, setTab] = useState('news');
  const [panelData, setPanelData] = useState(DEFAULT_PANEL);
  const [refreshing, setRefreshing] = useState(false);

  /* Update panel when query or intelligence changes */
  useEffect(() => {
    if (intelligence) {
      setPanelData(intelligence);
      return;
    }
    
    if (!activeQuery) {
      setPanelData(DEFAULT_PANEL);
      return;
    }
    
    // Fallback to demo data if no intelligence prop provided
    const id = setTimeout(() => {
      setPanelData(getIntelligenceData(activeQuery));
    }, 900);
    return () => clearTimeout(id);
  }, [activeQuery, intelligence]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setPanelData(getIntelligenceData(activeQuery));
      setRefreshing(false);
    }, 800);
  };

  return (
    <aside className="hidden xl:flex flex-col w-72 shrink-0 border-l border-border bg-background-secondary/30 overflow-hidden">
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between px-4 py-3.5 border-b border-border">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-warning-amber" />
          <span className="text-xs font-bold text-text-primary uppercase tracking-widest">
            Intelligence
          </span>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="p-1.5 rounded-md text-text-muted hover:text-accent-primary hover:bg-accent-primary/10 transition-all duration-200 disabled:opacity-40"
          title="Refresh"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Tab bar */}
      <div className="shrink-0 flex border-b border-border">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`relative flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all duration-200 ${
              tab === id ? 'text-accent-primary' : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            <Icon className="w-3 h-3" />
            {label}
            {tab === id && (
              <motion.div
                layoutId="panel-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-primary rounded-t"
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Query context badge */}
      <AnimatePresence mode="wait">
        {activeQuery && (
          <motion.div
            key={activeQuery}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="shrink-0 px-4 py-2 border-b border-border bg-accent-primary/5"
          >
            <p className="text-[9px] font-mono uppercase tracking-widest text-text-muted mb-0.5">
              Context for query
            </p>
            <p className="text-[11px] text-accent-primary font-medium leading-snug line-clamp-1">
              {activeQuery}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel content */}
      <div className="flex-1 overflow-y-auto px-3 py-4 scrollbar-hide">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="shimmer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Shimmer />
            </motion.div>
          ) : (
            <motion.div
              key={`${tab}-${activeQuery || 'default'}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {/* NEWS TAB */}
              {tab === 'news' && (
                <div className="space-y-2.5">
                  <PanelLabel Icon={Newspaper} label="Market News" />
                  {panelData.news.map((item, i) => (
                    <NewsItem key={i} item={item} index={i} />
                  ))}
                </div>
              )}

              {/* INSIGHTS TAB */}
              {tab === 'insights' && (
                <div className="space-y-2.5">
                  <PanelLabel Icon={Lightbulb} label="AI Insights" />
                  {panelData.insights.map((item, i) => (
                    <InsightItem key={i} item={item} index={i} />
                  ))}
                </div>
              )}

              {/* CONTEXT TAB */}
              {tab === 'context' && (
                <div>
                  <PanelLabel Icon={BarChart3} label="Market Context" />
                  <ContextPanel ctx={panelData.context} />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-border px-4 py-3">
        <div className="flex items-center gap-1.5 text-[9px] font-mono text-text-muted">
          <BrainCircuit className="w-3 h-3 text-accent-primary" />
          Powered by MarketMind Engine
        </div>
      </div>
    </aside>
  );
};
