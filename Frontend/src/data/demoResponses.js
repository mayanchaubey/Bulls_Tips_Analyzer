/* ──────────────────────────────────────────────────────
   Demo chat data — used when the real API is unavailable
────────────────────────────────────────────────────── */

export const demoChatResponse = {
  answer:
    "Based on recent SEBI guidelines and NSE data, the market is showing strong resilience. FII inflows have turned net positive for the third consecutive week, which is historically correlated with NIFTY outperformance. However, the IT sector's operating margins remain under pressure due to macro headwinds in the US. Let me know if you'd like a detailed breakdown of a specific ticker.",
  sources: ['SEBI Report Q3 2024', 'NSE Daily Bulletin', 'RBI Monetary Policy'],
};

// Richer suggestion groups shown in the sidebar
export const suggestionGroups = [
  {
    label: 'Market Pulse',
    icon: 'Activity',
    items: [
      'What is the current NIFTY 50 trend?',
      'Show me bearish signals today.',
      'Which sectors are outperforming this week?',
    ],
  },
  {
    label: 'Stock Analysis',
    icon: 'TrendingUp',
    items: [
      'What is the outlook for Reliance Industries?',
      'Analyse HDFC Bank Q4 results.',
      'Is TCS a buy at current levels?',
    ],
  },
  {
    label: 'Regulatory & Policy',
    icon: 'ShieldCheck',
    items: [
      'Explain the latest SEBI circular on F&O margins.',
      'What did the RBI say about repo rates?',
      'Summarise SEBI insider trading norms.',
    ],
  },
];

// Pre-canned responses keyed to keywords for demo realism
export const demoCannedResponses = [
  {
    keywords: ['reliance', 'ril'],
    answer:
      "Reliance Industries (RIL) is showing strong momentum. The stock has outperformed NIFTY by ~8% in the last quarter, driven by the Jio Platforms subscriber growth (+42M net adds) and new energy capex visibility. FinBERT sentiment score: **+0.85 Bullish**. Key resistance at ₹2,980 — a breakout above this level would target ₹3,150 in the medium term.",
    sources: ['NSE Corporate Filings', 'Jio Platforms Q4 Report', 'RIL Investor Presentation'],
  },
  {
    keywords: ['hdfc', 'hdfcbank'],
    answer:
      "HDFC Bank's Q4 FY25 results were broadly in line with estimates. Net Interest Margin (NIM) compressed slightly to 3.4% vs 3.6% QoQ, but deposit growth of 20.3% YoY signals healthy liability franchise. Credit-to-deposit ratio improved to 87.2%. FinBERT score: **+0.72 Bullish**. Analysts have maintained a BUY with target price of ₹1,800.",
    sources: ['HDFC Bank Q4 Filing', 'NSE Disclosures', 'Motilal Oswal Research'],
  },
  {
    keywords: ['tcs', 'infosys', 'wipro', 'it sector', 'tech'],
    answer:
      "The Indian IT sector is facing near-term headwinds. TCS Q3 revenue growth of 4.5% YoY missed Street estimates of 6.2%. Attrition tick-up and BFSI vertical softness are key concerns. However, deal-win momentum remains robust (TCS: $10.2B TCV). FinBERT sector score: **-0.48 Bearish**. Wait for a better entry post next earnings or a 5–8% correction.",
    sources: ['TCS Q3 Investor Call', 'NASSCOM Report', 'ET Markets'],
  },
  {
    keywords: ['sebi', 'circular', 'regulation', 'f&o', 'margin'],
    answer:
      "SEBI's latest circular (SEBI/HO/MRD/2024) tightens F&O margin norms effective from April 1, 2025. Key changes: (1) Minimum contract value raised to ₹15L from ₹5L. (2) Weekly expiries limited to one index per exchange. (3) Upfront collection of option premiums mandatory. These measures aim to reduce retail speculation and systemic risk in the derivatives segment.",
    sources: ['SEBI Circular SEBI/HO/MRD/2024', 'NSE Circular NSE/CMPT/57482', 'RBI Clarification'],
  },
  {
    keywords: ['nifty', 'sensex', 'market', 'outlook', 'trend'],
    answer:
      "NIFTY 50 is consolidating near the 22,400 zone with bullish underpinnings. FII net buying has turned positive (+₹8,400 Cr in the last 5 sessions). Breadth remains positive with ~67% stocks above their 200-DMA. Key levels: Support at 21,800, Resistance at 23,000. FinBERT macro score: **+0.61 Bullish**. Bias: Cautiously positive into Q1 FY26 earnings season.",
    sources: ['NSE Market Statistics', 'SEBI FII Flow Data', 'RBI Liquidity Report'],
  },
  {
    keywords: ['rbi', 'repo', 'rate', 'interest', 'inflation'],
    answer:
      "The RBI Monetary Policy Committee (MPC) held the repo rate steady at **6.5%** in its February 2025 meeting, as expected. CPI inflation at 4.8% is within the 4% ±2% target band. The MPC retained a 'withdrawal of accommodation' stance. Markets are pricing in a 25bps rate cut in Q2 FY26 if inflation sustains below 4.5%.",
    sources: ['RBI MPC Statement', 'MOSPI CPI Data', 'Bloomberg Consensus'],
  },
];

export const demoSuggestions = {
  suggestions: [
    'What is the outlook for Reliance?',
    'Explain the latest SEBI circular.',
    'Show me bearish signals today.',
  ],
};
