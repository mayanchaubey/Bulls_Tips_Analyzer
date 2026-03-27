import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  BrainCircuit,
  TrendingUp,
  ShieldCheck,
  Activity,
  Zap,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Radio,
  Cpu,
  Globe2,
  Star,
  Lock,
  Wallet,
  ExternalLink,
} from 'lucide-react';

export const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const newsItems = [
    { tag: 'NSE', text: 'NIFTY 50 surges 1.2% on strong FII inflows amid RBI liquidity boost.', up: true },
    { tag: 'BSE', text: 'Reliance Industries Q4 profit beats estimate by ₹2,400 Cr; shares rally 3.1%.', up: true },
  ];

  const stats = [
    { value: 98, suffix: '%', label: 'Signal Accuracy', sub: 'vs. 73% industry avg' },
    { value: 12, suffix: 'K+', label: 'Stocks Monitored', sub: 'NSE · BSE · Global' },
    { value: 3.2, suffix: 'B+', label: 'Data Points / Day', sub: 'Real-time ingestion' },
    { value: 40, suffix: 'ms', label: 'Alert Latency', sub: 'Fastest in the market' },
  ];

  const FEATURES = [
    {
      icon: BrainCircuit,
      color: '#E8272A',
      glow: 'rgba(232,39,42,0.04)',
      title: 'AI Terminal',
      desc: 'Ask anything about Indian markets. Get instant, source-backed analysis powered by GPT-4 + real-time SEBI/NSE data feeds.',
      tag: 'NLP-Powered',
      path: '/chat',
    },
    {
      icon: Activity,
      color: '#E8272A',
      glow: 'rgba(232,39,42,0.04)',
      title: 'Opportunity Radar',
      desc: 'FinBERT-scored live signals across 12,000+ tickers. Bullish, Bearish, and Neutral sentiment mapped to exact entry zones.',
      tag: 'FinBERT AI',
      path: '/radar',
    },
    {
      icon: ShieldCheck,
      color: '#E8272A',
      glow: 'rgba(232,39,42,0.04)',
      title: 'Fact-Check Engine',
      desc: 'Paste any finfluencer claim or YouTube URL. Our AI cross-references SEBI filings, exchange data, and official disclosures.',
      tag: 'Claim Verified',
      path: '/factcheck',
    },
    {
      icon: Radio,
      color: '#E8272A',
      glow: 'rgba(232,39,42,0.04)',
      title: 'Live Signal Stream',
      desc: 'Institutional-grade signal feed with configurable alert channels via Telegram, Discord, or webhook integrations.',
      tag: 'Real-time',
      path: '/radar',
    },
    {
      icon: BarChart3,
      color: '#E8272A',
      glow: 'rgba(232,39,42,0.04)',
      title: 'Market Overview',
      desc: 'Get macro-level insights into broad market movements, sector rotations, and FII/DII activities in real-time.',
      tag: 'Macro',
      path: '/dashboard',
    },
    {
      icon: Lock,
      color: '#E8272A',
      glow: 'rgba(232,39,42,0.04)',
      title: 'SEBI-Compliant Insights',
      desc: 'Every insight is traced to verifiable public sources — SEBI filings, NSE disclosures, and RBI announcements.',
      tag: 'Auditable',
      path: '/factcheck',
    },
  ];

  const FAQS = [
    {
      q: 'What data sources does MarketMind AI use?',
      a: 'We ingest real-time feeds from NSE, BSE, SEBI filings, RBI announcements, Bloomberg terminal APIs, and curated financial news aggregators — processed through our FinBERT sentiment pipeline.',
    },
    {
      q: 'How accurate are the FinBERT signals?',
      a: 'Our fine-tuned FinBERT model achieves 98% backtested accuracy on NIFTY 50 constituents over 36 months. Signals are updated every 60 seconds during market hours.',
    },

    {
      q: 'Is this platform SEBI registered?',
      a: 'MarketMind AI is a research and education tool. All insights are traced to public sources. We are in the process of obtaining SEBI Research Analyst registration under RA Regulation 2014.',
    },
    {
      q: 'How is the Fact-Check feature different from a search engine?',
      a: "Our system doesn't just search — it cross-references claims against structured exchange databases, applies NLI (Natural Language Inference), and returns a verdict with source citations and confidence score.",
    },
  ];

  /* ─────────────────────────────────────────────
     ANIMATED COUNTER
  ────────────────────────────────────────────── */
  const AnimCounter = ({ target, suffix, duration = 2.4 }) => {
    const [val, setVal] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    useEffect(() => {
      if (!inView) return;
      const isFloat = !Number.isInteger(target);
      const steps = 60;
      const step = target / steps;
      let cur = 0;
      let count = 0;
      const id = setInterval(() => {
        count++;
        cur = Math.min(target, cur + step);
        setVal(isFloat ? parseFloat(cur.toFixed(1)) : Math.round(cur));
        if (count >= steps) clearInterval(id);
      }, (duration * 1000) / steps);
      return () => clearInterval(id);
    }, [inView, target, duration]);

    return (
      <span ref={ref}>
        {val}
        {suffix}
      </span>
    );
  };

  /* ─────────────────────────────────────────────
     NEWS TICKER (5-second rotation)
  ────────────────────────────────────────────── */
  const NewsTicker = ({ items }) => {
    const [idx, setIdx] = useState(0);

    useEffect(() => {
      if (!items || items.length === 0) return;
      const id = setInterval(() => setIdx((i) => (i + 1) % items.length), 5000);
      return () => clearInterval(id);
    }, [items]);

    const item = items[idx] || { tag: '...', text: 'Loading news...', up: null };
    const tagColor = item.up === true ? '#58A6FF' : item.up === false ? '#F85149' : '#D29922';

    return (
      <div className="w-full border-y border-border bg-background-primary py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
          {/* LIVE badge */}
          <div className="shrink-0 flex items-center gap-1.5 text-[10px] font-semibold text-text-secondary">
            <motion.span
              className="inline-block w-1.5 h-1.5 rounded-full bg-success-green"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            LIVE
          </div>

          <div className="w-px h-4 bg-border shrink-0" />

          {/* Tag */}
          <span
            className="shrink-0 text-[9px] font-semibold px-2 py-[3px] rounded"
            style={{ background: `${tagColor}12`, color: tagColor, border: `0.5px solid ${tagColor}44` }}
          >
            {item.tag}
          </span>

          {/* Rotating headline */}
          <div className="flex-1 overflow-hidden relative h-5">
            <AnimatePresence mode="wait">
              <motion.p
                key={idx}
                className="absolute inset-0 text-xs text-text-secondary truncate"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                {item.text}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Index dots */}
          <div className="shrink-0 flex gap-1">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === idx ? 14 : 5,
                  height: 5,
                  background: i === idx ? tagColor : '#E5E7EB',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  /* ─────────────────────────────────────────────
     FAQ ITEM
  ────────────────────────────────────────────── */
  const FAQItem = ({ q, a, index }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="border border-border rounded-xl overflow-hidden bg-white shadow-sm transition-shadow duration-200"
      >
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between px-5 py-4 text-left group"
        >
          <span className="text-sm font-semibold text-text-primary group-hover:text-accent-primary transition-colors duration-200">
            {q}
          </span>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="shrink-0 ml-4 text-text-muted group-hover:text-accent-primary transition-colors duration-200"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="px-5 pb-5 text-sm text-text-secondary leading-relaxed border-t border-border pt-3">
                {a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  /* ─────────────────────────────────────────────
     STAT CARD
  ────────────────────────────────────────────── */
  const StatCard = ({ s, i }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="card-surface border border-border p-6 text-center space-y-2"
      >
        <div className="text-4xl font-black text-text-primary">
          <AnimCounter target={s.value} suffix={s.suffix} />
        </div>
        <div className="text-sm font-semibold text-text-secondary">{s.label}</div>
        <div className="text-[11px] text-text-secondary">{s.sub}</div>
      </motion.div>
    );
  };

  /* ─────────────────────────────────────────────
     FEATURE CARD
  ────────────────────────────────────────────── */
  const FeatureCard = ({ f, i }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          to={f.path}
          className="block rounded-2xl border border-border card-surface h-full p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl border border-border flex items-center justify-center">
              <f.icon className="w-6 h-6 text-text-primary" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-base font-bold text-text-primary">{f.title}</p>
              <p className="text-sm text-text-secondary leading-relaxed">{f.desc}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-accent-primary">
            Explore
            <ExternalLink className="w-3 h-3" />
          </div>
        </Link>
      </motion.div>
    );
  };

  /* ─────────────────────────────────────────────
     SECTION LABEL
  ────────────────────────────────────────────── */
  const SectionLabel = ({ icon: Icon, label }) => (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-background-primary text-sm font-semibold text-text-secondary mb-4">
      <Icon className="w-3 h-3 text-text-secondary" />
      {label}
    </div>
  );

  return (
    <div className="min-h-screen bg-background-primary text-text-primary overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-50 bg-background-primary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-7 w-7 text-interactive-primary" />
            <span className="text-lg font-bold tracking-tight text-text-primary">
              MarketMind AI
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm">
            {[['Features', '#features'], ['Stats', '#stats'], ['FAQ', '#faq']].map(([l, h]) => (
              <a key={l} href={h} className="text-text-muted hover:text-text-primary transition-colors duration-200 font-medium">
                {l}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-text-primary border border-border rounded-lg hover:bg-background-secondary transition-all duration-200"
            >
              Sign In
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-interactive-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-interactive-primary/90 transition-all duration-200"
            >
              Launch App
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center overflow-hidden px-4">

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-background-primary text-sm font-semibold tracking-normal"
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-accent-primary"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Beta Version · Indian Markets 
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]"
          >
            Intelligence for<br />
            <span className="text-text-primary">Smarter Investing.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: 'easeOut' }}
            className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed"
          >
             AI fact-checking, and real-time NSE/BSE analysis — all in one terminal.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/radar"
              className="flat-btn inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold"
              style={{ background: '#C1121F' }}
            >
              <Activity className="w-4 h-4" />
              View Live Signals
            </Link>
            <Link
              to="/factcheck"
              className="inline-flex items-center gap-2.5 border border-border px-7 py-3.5 rounded-xl text-sm font-semibold text-text-primary hover:bg-background-secondary transition duration-200"
            >
              <ShieldCheck className="w-4 h-4 text-text-primary" />
              Try Fact-Check
            </Link>
          </motion.div>

          {/* Social proof line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-2 text-xs text-text-secondary"
          >
           
           
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-text-secondary"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-[9px] tracking-normal">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* ── NEWS TICKER ── */}
      <NewsTicker items={newsItems} />

      {/* ── STATS ── */}
      <section id="stats" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel icon={BarChart3} label="By the Numbers" />
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-text-primary">
              Built for scale. <span className="text-accent-primary">Proven in markets.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => <StatCard key={i} s={s} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 px-4 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel icon={Cpu} label="Platform Features" />
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: '#000000' }}>
              Every tool a serious investor needs.
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-sm leading-relaxed" style={{ color: '#4B5563' }}>
              From live signal scanning to AI-powered claim verification — MarketMind gives you
              an institutional edge at retail cost.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => <FeatureCard key={i} f={f} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── MARQUEE TRUST STRIP ── */}
      <section className="py-10 border-y border-border bg-background-primary overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap">
          <motion.div
            className="flex gap-12 shrink-0"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            {[
              'NSE India', 'BSE Limited', 'SEBI', 'Zerodha', 'Angel One',
              'Upstox', 'RBI Data', 'Bloomberg', 'Reuters', 'ET Markets',
              'NSE India', 'BSE Limited', 'SEBI', 'Zerodha', 'Angel One',
              'Upstox', 'RBI Data', 'Bloomberg', 'Reuters', 'ET Markets',
            ].map((name, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 text-xs font-semibold text-text-secondary opacity-70 hover:opacity-100 transition-opacity duration-200"
              >
                <Globe2 className="w-3 h-3" />
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel icon={ShieldCheck} label="FAQ" />
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-text-primary">
              Questions, answered.
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 px-4 border-t border-border bg-background-primary">
        {/* Background */}

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl border border-border bg-background-primary mb-6">
              <Zap className="w-8 h-8 text-accent-primary" />
            </div>

            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-text-primary mb-4">
              Start trading with{' '}
              <span className="text-text-primary">
                AI clarity.
              </span>
            </h2>

            <p className="text-text-secondary text-base max-w-xl mx-auto leading-relaxed">
              Join thousands of Indian investors who use MarketMind to cut through the noise, verify
              claims, and act on high-confidence signals — for free.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/dashboard"
              className="flat-btn w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-semibold"
              style={{ background: '#C1121F' }}
            >
              <BrainCircuit className="w-4 h-4" />
              Launch MarketMind AI
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              to="/radar"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-border px-8 py-4 rounded-xl text-sm font-semibold text-text-primary hover:bg-background-secondary transition duration-200"
            >
              <Activity className="w-4 h-4 text-accent-primary" />
              View Today's Market Signals &rarr;
            </Link>
          </motion.div>

          <p className="text-[11px] text-text-secondary">
            Built For Bharat · SEBI-compliant data sources ·
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border bg-background-secondary/40 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-accent-primary" />
            <span className="font-bold text-text-primary">MarketMind AI</span>
            <span>— Research & Education Platform</span>
          </div>
          <p>© 2025 MarketMind AI. For informational purposes only. Not SEBI-registered investment advice.</p>
        </div>
      </footer>

    </div>
  );
};
