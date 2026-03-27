export const demoVerifyResult = {
  originalText: "I'm telling you guys, HDFC Bank is guaranteed to double its profits next year! They just reported 50% loan growth. Also, RBI has officially paused rate hikes for the entire year, which means banks are going to print money. Adani Enterprises is set to announce a massive $5B acquisition in the power sector tomorrow, get in before it's too late!",
  summary: {
    verified: 1,
    misleading: 1,
    false: 1,
    riskLevel: 'HIGH',
    sentiment: 0.1,
  },
  claims: [
    {
      claim: "HDFC Bank is guaranteed to double its profits next year.",
      verdict: "FALSE",
      confidence: 0.95,
      explanation: "No official company guidance or credible sell-side analyst report supports a 100% profit increase in one year. Consensus EPS growth estimates hover around 16-18% for FY25.",
      source: "NSE: HDFC Bank Earnings Call Transcript Q4"
    },
    {
      claim: "HDFC Bank just reported 50% loan growth.",
      verdict: "FALSE",
      confidence: 0.98,
      explanation: "HDFC Bank reported a gross advances growth of ~55% YoY in Q4 FY24, but this includes the impact of the e-HDFC Ltd merger. Core, organic loan growth was approximately 16.5%.",
      source: "SEBI Form: HDFC Bank Q4 FY24 Disclosures"
    },
    {
      claim: "RBI has officially paused rate hikes for the entire year.",
      verdict: "MISLEADING",
      confidence: 0.88,
      explanation: "The RBI Monetary Policy Committee has paused rate hikes at 6.5% for current meetings, but has strictly maintained a 'withdrawal of accommodation' stance. No official commitment has been made for the 'entire year'.",
      source: "RBI Monetary Policy Statement, Feb 2025"
    },
    {
      claim: "Adani Enterprises is set to announce a $5B power sector acquisition tomorrow.",
      verdict: "UNKNOWN",
      confidence: 0.75,
      explanation: "There are ongoing market rumors regarding Adani's expansion in the power sector, but no official disclosures have been made to the stock exchanges regarding a $5B acquisition.",
      source: "BSE Disclosures: Adani Enterprises"
    }
  ]
};
