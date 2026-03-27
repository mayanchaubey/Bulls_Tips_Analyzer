import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  BrainCircuit, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Code, 
  Send,
  ShieldCheck,
  TrendingUp,
  ChevronLeft
} from 'lucide-react';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Dummy authentication delay
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-primary opacity-5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-primary opacity-5 blur-[120px] rounded-full pointer-events-none" />

      {/* Floating Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 left-8"
      >
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-background-card border border-border flex items-center justify-center group-hover:border-accent-primary/50 transition-all">
            <ChevronLeft className="w-4 h-4 text-text-muted group-hover:text-text-primary" />
          </div>
          <span className="text-sm font-medium text-text-muted group-hover:text-text-primary transition-colors">Back to Landing</span>
        </Link>
      </motion.div>

      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-stretch gap-12 z-10">
        
        {/* Left Side: Branding & Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex flex-col justify-center space-y-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center shadow-[0_0_20px_rgba(88,166,255,0.1)]">
              <BrainCircuit className="w-7 h-7 text-accent-primary" />
            </div>
            <h1 className="text-3xl font-black text-text-primary tracking-tight">
              MarketMind <span className="text-accent-primary">AI</span>
            </h1>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-[1.1]">
              The future of <span className="text-text-primary">market intelligence</span> is here.
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed max-w-md">
              Join 4,000+ traders using AI to verify claims, spot institutional signals, and automate market research.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-border bg-background-card/30 backdrop-blur-sm">
              <ShieldCheck className="w-5 h-5 text-accent-primary mb-2" />
              <h4 className="text-sm font-bold text-text-primary mb-1">Claim Verification</h4>
              <p className="text-xs text-text-muted">Instant fact-checking via official SEBI/NSE data.</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-background-card/30 backdrop-blur-sm">
              <TrendingUp className="w-5 h-5 text-accent-primary mb-2" />
              <h4 className="text-sm font-bold text-text-primary mb-1">Signal Stream</h4>
              <p className="text-xs text-text-muted">Institutional entry/exit zones scanned in real-time.</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Auth Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 lg:max-w-md"
        >
          <div className="bg-white border-2 border-gray-100 hover:border-gray-200 rounded-3xl p-8 sm:p-10 relative overflow-hidden group" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            {/* Form Glow */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            
            <div className="mb-8 text-center sm:text-left">
              <h3 className="text-2xl font-bold text-text-primary mb-2">
                {isLogin ? 'Welcome back' : 'Create an account'}
              </h3>
              <p className="text-sm text-text-muted">
                {isLogin 
                  ? 'Access your saved signals and terminal history.' 
                  : 'Start your journey with institutional-grade AI.'}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-5">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-1.5"
                  >
                    <label className="text-xs font-bold text-text-muted uppercase tracking-widest pl-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input 
                        type="text" 
                        required
                        className="w-full bg-white border-2 border-gray-200 rounded-xl px-12 py-3.5 text-sm placeholder:text-gray-400 focus:outline-none focus:border-red-500 transition-all duration-300" 
                        style={{ color: '#000000' }}
                        placeholder="Arjun Verma"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-muted uppercase tracking-widest pl-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input 
                    type="email" 
                    required
                    className="w-full bg-background-primary border border-border rounded-xl px-12 py-3.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-all duration-300"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-muted uppercase tracking-widest pl-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input 
                    type="password" 
                    required
                    className="w-full bg-background-primary border border-border rounded-xl px-12 py-3.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-all duration-300"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <button type="button" className="text-xs font-semibold text-accent-primary hover:text-white transition-colors">
                    Forgot password?
                  </button>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full group bg-interactive-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-interactive-primary/90 transition-all shadow-[0_4px_20px_rgba(47,129,247,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:0.4s]" />
                  </div>
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative">
                  <span className="bg-background-card px-4 text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">Or continue with</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 py-3 px-4 rounded-xl border border-border bg-background-secondary hover:bg-background-card transition-all flex items-center justify-center gap-2 group">
                  <Code className="w-4 h-4 text-text-primary group-hover:text-accent-primary transition-colors" />
                  <span className="text-xs font-bold text-text-primary">GitHub</span>
                </button>
                <button className="flex-1 py-3 px-4 rounded-xl border border-border bg-background-secondary hover:bg-background-card transition-all flex items-center justify-center gap-2 group">
                  <Send className="w-4 h-4 text-text-primary group-hover:text-accent-primary transition-colors" />
                  <span className="text-xs font-bold text-text-primary">Twitter</span>
                </button>
              </div>

              <p className="text-sm text-text-secondary">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 font-bold text-accent-primary hover:text-white transition-colors"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Text */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-[10px] text-text-muted font-mono uppercase tracking-[0.3em] text-center"
      >
        Built For Bharat · SEBI Compliance Engine v1.0.4
      </motion.p>
    </div>
  );
};
