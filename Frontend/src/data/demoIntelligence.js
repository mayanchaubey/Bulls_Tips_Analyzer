/* ─────────────────────────────────────────────────────────────────
   Intelligence Panel data
   Each entry is matched to keywords in the user query.
   Structure:
     news[]   – headline cards with source, time, sentiment
     insights[] – key analytical bullets
     context  – market context numbers (price, change, volume…)
──────────────────────────────────────────────────────────────── */

const DEFAULT_CONTEXT = {
  ticker: 'NIFTY 50',
  price: '22,326.90',
  change: '+1.24%',
  up: true,
  volume: '₹94,312 Cr',
  sentiment: 0.61,
  sentimentLabel: 'Bullish',
};

const INTELLIGENCE_DB = [
  /* ── RELIANCE ── */
  {
    keywords: ['reliance', 'ril', 'jio'],
    context: {
      ticker: 'RELIANCE',
      price: '₹2,934.50',
      change: '+2.10%',
      up: true,
      volume: '₹8,412 Cr',
      sentiment: 0.85,
      sentimentLabel: 'Strongly Bullish',
    },
    news: [
      {
        headline: 'RIL Q4 Net Profit Beats Estimates by ₹2,400 Cr; Jio adds 42M subscribers',
        source: 'ET Markets',
        time: '2h ago',
        sentiment: 'bullish',
        url: '#',
      },
      {
        headline: 'Reliance New Energy to commission 10GW solar capacity by 2026 — Mukesh Ambani',
        source: 'NSE Filing',
        time: '5h ago',
        sentiment: 'bullish',
        url: '#',
      },
      {
        headline: 'Retail arm JioMart reports 28% GMV growth; quick-commerce push intensifies',
        source: 'Business Standard',
        time: '1d ago',
        sentiment: 'bullish',
        url: '#',
      },
    ],
    insights: [
      { text: 'FII net buyers — ₹1,230 Cr inflow in last 5 sessions', type: 'positive' },
      { text: 'Options chain shows strong support at ₹2,850 strike', type: 'neutral' },
      { text: 'Key resistance at ₹2,980. Breakout targets ₹3,150', type: 'neutral' },
      { text: 'Promoter holding stable at 50.3% — no dilution risk', type: 'positive' },
    ],
  },

  /* ── HDFC BANK ── */
  {
    keywords: ['hdfc', 'hdfcbank', 'hdfc bank'],
    context: {
      ticker: 'HDFCBANK',
      price: '₹1,648.90',
      change: '+0.55%',
      up: true,
      volume: '₹3,822 Cr',
      sentiment: 0.72,
      sentimentLabel: 'Bullish',
    },
    news: [
      {
        headline: 'HDFC Bank Q4: NIM contracts 20bps to 3.4% but deposit growth at 20.3% YoY impresses',
        source: 'NSE Disclosures',
        time: '3h ago',
        sentiment: 'neutral',
        url: '#',
      },
      {
        headline: 'HDFC Bank board approves ₹7,000 Cr AT-1 bond issuance for capital strengthening',
        source: 'SEBI Filing',
        time: '6h ago',
        sentiment: 'bullish',
        url: '#',
      },
      {
        headline: 'Credit-deposit ratio improves to 87.2% — analysts raise target to ₹1,800',
        source: 'Motilal Oswal',
        time: '1d ago',
        sentiment: 'bullish',
        url: '#',
      },
    ],
    insights: [
      { text: 'Loan book growth: 16.5% YoY — above sector average', type: 'positive' },
      { text: 'CASA ratio at 44.2% — slight pressure vs 46% prior year', type: 'warning' },
      { text: 'Analyst consensus: 22 BUY, 4 HOLD, 1 SELL', type: 'positive' },
      { text: 'FII ownership at 52.1% — near upper threshold', type: 'neutral' },
    ],
  },

  /* ── TCS / IT ── */
  {
    keywords: ['tcs', 'infosys', 'wipro', 'it sector', 'tech'],
    context: {
      ticker: 'TCS',
      price: '₹3,812.75',
      change: '-0.87%',
      up: false,
      volume: '₹2,115 Cr',
      sentiment: -0.48,
      sentimentLabel: 'Mildly Bearish',
    },
    news: [
      {
        headline: 'TCS Q3 revenue 4.5% YoY — misses 6.2% street estimate; BFSI vertical under pressure',
        source: 'NSE',
        time: '4h ago',
        sentiment: 'bearish',
        url: '#',
      },
      {
        headline: 'TCS deal wins at $10.2B TCV — pipeline remains robust despite execution delays',
        source: 'TCS Investor Call',
        time: '6h ago',
        sentiment: 'neutral',
        url: '#',
      },
      {
        headline: 'Indian IT attrition ticks up across TCS, Infosys, Wipro — talent war heating up',
        source: 'NASSCOM',
        time: '2d ago',
        sentiment: 'bearish',
        url: '#',
      },
    ],
    insights: [
      { text: 'BFSI vertical: clients deferring discretionary spend', type: 'warning' },
      { text: 'Rupee depreciation provides ~60bps margin tailwind', type: 'positive' },
      { text: 'Generative AI revenue run-rate hit $1.5B — accelerating', type: 'positive' },
      { text: 'Wait for Q4 guidance clarity before adding exposure', type: 'neutral' },
    ],
  },

  /* ── SEBI / REGULATION ── */
  {
    keywords: ['sebi', 'circular', 'regulation', 'f&o', 'margin', 'insider'],
    context: {
      ticker: 'REGULATORY',
      price: 'SEBI/2024',
      change: 'New Circular',
      up: null,
      volume: 'F&O Segment',
      sentiment: 0,
      sentimentLabel: 'Neutral Impact',
    },
    news: [
      {
        headline: 'SEBI tightens F&O: weekly expiry limited to 1 index/exchange from Apr 2025',
        source: 'SEBI Official',
        time: '1h ago',
        sentiment: 'neutral',
        url: '#',
      },
      {
        headline: 'Minimum F&O contract value raised to ₹15L — retail participation to decline',
        source: 'NSE Circular',
        time: '3h ago',
        sentiment: 'bearish',
        url: '#',
      },
      {
        headline: 'SEBI mandates upfront premium collection for options buyers effective Q2 FY26',
        source: 'SEBI Press Release',
        time: '5h ago',
        sentiment: 'neutral',
        url: '#',
      },
    ],
    insights: [
      { text: 'F&O daily turnover may drop 30–40% post-implementation', type: 'warning' },
      { text: 'Retail F&O losses: 89% traders lost money in FY24 (SEBI study)', type: 'warning' },
      { text: 'Brokers face revenue headwind — Zerodha, Angel One in focus', type: 'warning' },
      { text: 'Long-term market health improvement expected by RBI', type: 'positive' },
    ],
  },

  /* ── NIFTY / MARKET ── */
  {
    keywords: ['nifty', 'sensex', 'market', 'outlook', 'trend', 'sector'],
    context: {
      ticker: 'NIFTY 50',
      price: '22,326.90',
      change: '+1.24%',
      up: true,
      volume: '₹94,312 Cr',
      sentiment: 0.61,
      sentimentLabel: 'Bullish',
    },
    news: [
      {
        headline: 'NIFTY hits 6-week high on FII buying of ₹8,400 Cr in 5 sessions; metals rally',
        source: 'NSE',
        time: '30m ago',
        sentiment: 'bullish',
        url: '#',
      },
      {
        headline: 'India PMI Manufacturing at 56.7 — 3-month high; signals robust growth momentum',
        source: 'S&P Global',
        time: '2h ago',
        sentiment: 'bullish',
        url: '#',
      },
      {
        headline: 'RBI dividend to govt at ₹2.1 lakh Cr — fiscal deficit pressures ease for FY26',
        source: 'RBI',
        time: '4h ago',
        sentiment: 'bullish',
        url: '#',
      },
    ],
    insights: [
      { text: 'FII net positive: ₹8,400 Cr bought in last 5 sessions', type: 'positive' },
      { text: '67% of NIFTY stocks above 200-DMA — healthy breadth', type: 'positive' },
      { text: 'Support at 21,800. Resistance at 23,000', type: 'neutral' },
      { text: 'India VIX at 13.2 — low volatility regime continues', type: 'neutral' },
    ],
  },

  /* ── RBI / MACRO ── */
  {
    keywords: ['rbi', 'repo', 'rate', 'interest', 'inflation', 'cpi', 'monetary'],
    context: {
      ticker: 'MACRO-IN',
      price: '6.50%',
      change: 'Repo Rate',
      up: null,
      volume: 'CPI: 4.8%',
      sentiment: 0.35,
      sentimentLabel: 'Neutral-Positive',
    },
    news: [
      {
        headline: "RBI MPC holds repo rate at 6.5%; maintains 'withdrawal of accommodation' stance",
        source: 'RBI.org.in',
        time: '1h ago',
        sentiment: 'neutral',
        url: '#',
      },
      {
        headline: 'India CPI inflation at 4.8% in Feb — within target band; rate cut hopes build',
        source: 'MOSPI',
        time: '3h ago',
        sentiment: 'bullish',
        url: '#',
      },
      {
        headline: 'Markets price in 25bps cut in Q2 FY26 as global central banks ease policy',
        source: 'Bloomberg',
        time: '5h ago',
        sentiment: 'bullish',
        url: '#',
      },
    ],
    insights: [
      { text: 'Rate cut probability in Q2 FY26: 68% (swap market implied)', type: 'positive' },
      { text: 'Real rates at 1.7% — above neutral rate; room to ease', type: 'positive' },
      { text: 'RBI FX reserves: $648B — 11 months import cover', type: 'positive' },
      { text: 'Core inflation at 3.4% — gives MPC flexibility to cut', type: 'neutral' },
    ],
  },
];

/* Default panel data — shown when no query is active */
const DEFAULT_PANEL = {
  context: DEFAULT_CONTEXT,
  news: [
    {
      headline: 'NIFTY 50 rises 1.2% on strong FII inflows; BANKNIFTY lags',
      source: 'NSE',
      time: '15m ago',
      sentiment: 'bullish',
      url: '#',
    },
    {
      headline: 'Reliance Industries Q4 profit beats estimates — shares rally 3.1%',
      source: 'ET Markets',
      time: '1h ago',
      sentiment: 'bullish',
      url: '#',
    },
    {
      headline: 'SEBI issues new circular on algo trading surveillance norms',
      source: 'SEBI',
      time: '2h ago',
      sentiment: 'neutral',
      url: '#',
    },
  ],
  insights: [
    { text: 'FII net buyers for 3rd consecutive week', type: 'positive' },
    { text: 'India VIX at 13.2 — low-volatility, trending market', type: 'neutral' },
    { text: 'Rate cut probability rising: 68% for Q2 FY26', type: 'positive' },
    { text: 'Watch: IT sector earnings risk next week', type: 'warning' },
  ],
};

/**
 * Returns contextual intelligence data for a given user query string.
 */
export const getIntelligenceData = (query) => {
  if (!query) return DEFAULT_PANEL;
  const q = query.toLowerCase();
  const match = INTELLIGENCE_DB.find((entry) =>
    entry.keywords.some((k) => q.includes(k))
  );
  if (!match) return DEFAULT_PANEL;
  return { context: match.context, news: match.news, insights: match.insights };
};

export { DEFAULT_PANEL };
