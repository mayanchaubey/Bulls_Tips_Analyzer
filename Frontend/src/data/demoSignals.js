export const demoSignals = [
  {
    ticker: 'RELIANCE',
    signal_type: 'BULLISH',
    description: 'Reliance Industries accelerates ₹75,000 crore new energy investments. Jio subscriber net adds exceed analyst estimates.',
    finbert_score: 0.85,
    source: 'ET Markets',
    timestamp: new Date().toISOString()
  },
  {
    ticker: 'TCS',
    signal_type: 'BEARISH',
    description: 'TCS faces operating margin pressures in Q3 due to macroeconomic headwinds in North America. BFSI vertical remains soft.',
    finbert_score: -0.65,
    source: 'NSE Filing',
    timestamp: new Date().toISOString()
  },
  {
    ticker: 'HDFCBANK',
    signal_type: 'BULLISH',
    description: 'HDFC Bank deposit growth (20.3% YoY) outpaces system average, improving credit-deposit ratio ahead of merger synergies.',
    finbert_score: 0.72,
    source: 'SEBI Form',
    timestamp: new Date().toISOString()
  },
  {
    ticker: 'WIPRO',
    signal_type: 'BEARISH',
    description: 'Q3 revenue growth guidance remains muted at -1.5% to +0.5%. Key leadership exits weigh on near-term visibility.',
    finbert_score: -0.78,
    source: 'Reuters',
    timestamp: new Date(Date.now() - 15 * 60000).toISOString()
  },
  {
    ticker: 'INFY',
    signal_type: 'NEUTRAL',
    description: 'Infosys signs a multi-year $1.5B digital transformation deal, but margin expansion remains bounded by wage hikes.',
    finbert_score: 0.12,
    source: 'NSE Disclosures',
    timestamp: new Date(Date.now() - 45 * 60000).toISOString()
  },
  {
    ticker: 'BAJFINANCE',
    signal_type: 'BULLISH',
    description: 'New loan bookings up 26% YoY in Q4. AUM crosses ₹3.3 lakh crore mark despite rising funding costs.',
    finbert_score: 0.88,
    source: 'Bloomberg Quint',
    timestamp: new Date(Date.now() - 120 * 60000).toISOString()
  },
  {
    ticker: 'PAYTM',
    signal_type: 'BEARISH',
    description: 'Regulatory actions impact payments bank operations. Merchant GMV growth slows down significantly.',
    finbert_score: -0.92,
    source: 'RBI Circular',
    timestamp: new Date(Date.now() - 300 * 60000).toISOString()
  },
  {
    ticker: 'ZOMATO',
    signal_type: 'BULLISH',
    description: 'Blinkit quick-commerce division turns adjusted EBITDA positive ahead of guidance. Core food delivery growth steady.',
    finbert_score: 0.82,
    source: 'BSE Filing',
    timestamp: new Date(Date.now() - 420 * 60000).toISOString()
  }
];
