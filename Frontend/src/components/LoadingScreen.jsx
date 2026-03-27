import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TICKER_DATA = [
  { symbol: 'SENSEX', val: '73,428.65', change: '+1.24%', up: true },
  { symbol: 'NIFTY 50', val: '22,326.90', change: '+0.98%', up: true },
  { symbol: 'BANKNIFTY', val: '47,815.20', change: '-0.32%', up: false },
];

const RINGS = [
  { radius: 56, duration: 20, size: 4, color: '#C1121F' },
  { radius: 80, duration: 24, size: 3, color: '#F59E0B' },
  { radius: 104, duration: 28, size: 3, color: '#10B981' },
  { radius: 128, duration: 32, size: 2, color: '#6366F1' },
];

export const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 4000;
    let frameId;
    let completionTimeout;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progressValue = Math.min(100, (elapsed / duration) * 100);
      setProgress(Math.round(progressValue));

      if (elapsed < duration) {
        frameId = requestAnimationFrame(tick);
      } else {
        completionTimeout = window.setTimeout(() => {
          onComplete?.();
        }, 400);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      if (completionTimeout) clearTimeout(completionTimeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="loading-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
      >
        {/* Globe + Orbits */}
        <div className="relative flex items-center justify-center w-72 h-72">
          {/* Rings */}
          {RINGS.map((ring, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: ring.radius * 2,
                height: ring.radius * 2,
                border: '1px solid #E5E7EB',
                opacity: 0.6,
              }}
            />
          ))}

          {/* Orbiting nodes */}
          {RINGS.map((ring, i) => (
            <OrbitingNode key={i} ring={ring} />
          ))}

          {/* Globe */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="relative w-24 h-24 rounded-full border flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #C1121F 0%, #6F0F14 70%)',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              boxShadow: 'inset 0 0 25px rgba(193, 18, 31, 0.8)',
            }}
          >
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 96 96"
              fill="none"
            >
              {[24, 38, 48, 58, 72].map((y) => (
                <ellipse
                  key={y}
                  cx="48"
                  cy={y}
                  rx="40"
                  ry={Math.max(2, 12 - Math.abs(y - 48) / 3)}
                  stroke="#111111"
                  strokeWidth="0.5"
                  opacity="0.2"
                />
              ))}
              <line
                x1="48"
                y1="8"
                x2="48"
                y2="88"
                stroke="#111111"
                strokeWidth="0.5"
                opacity="0.2"
              />
              <ellipse
                cx="48"
                cy="48"
                rx="40"
                ry="40"
                stroke="#111111"
                strokeWidth="0.5"
                opacity="0.2"
              />
            </svg>
          </motion.div>
        </div>

        {/* Branding */}
        <div className="mt-6 text-center">
          <h1 className="text-2xl font-semibold text-black">
            MarketMind <span style={{ color: '#C1121F' }}>AI</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Preparing market intelligence
          </p>
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-64">
          <div className="w-full h-[2px] bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full"
              style={{
                width: `${progress}%`,
                background: '#C1121F',
                transition: 'width 0.1s linear',
              }}
            />
          </div>

          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Loading</span>
            <span>{progress}%</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const OrbitingNode = ({ ring }) => {
  return (
    <motion.div
      className="absolute"
      style={{ width: ring.radius * 2, height: ring.radius * 2 }}
      animate={{ rotate: 360 }}
      transition={{ duration: ring.duration, repeat: Infinity, ease: 'linear' }}
    >
      <div
        className="absolute rounded-full"
        style={{
              width: ring.size,
              height: ring.size,
              background: ring.color,
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
    </motion.div>
  );
};
