import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Activity, ShieldCheck, Wallet, LayoutDashboard, LogIn, User, Terminal } from 'lucide-react';
import logo from '../assets/logo.png';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Dummy auth state
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Terminal', path: '/chat', icon: Terminal },
    { name: 'Radar', path: '/radar', icon: Activity },
    { name: 'Fact-Check', path: '/factcheck', icon: ShieldCheck },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <img src={logo} alt="MarketMind AI" className="h-14 w-14 object-contain" />
            <span className="text-xl font-bold tracking-tight leading-none" style={{ color: '#000000' }}>
              MarketMind <span style={{ color: '#E8272A' }}>AI</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                    isActive ? 'text-accent-primary' : 'text-gray-600 hover:text-gray-900'
                  }`
                }
                style={({ isActive }) => isActive ? { color: '#E8272A' } : {}}
              >
                <link.icon className="h-4 w-4" />
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {!isAuthenticated ? (
              <NavLink
                to="/dashboard"
                className="flex items-center gap-2 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:opacity-90 transition-all"
                style={{ background: '#E8272A' }}
              >
                <LogIn className="h-4 w-4" />
                Sign In
              </NavLink>
            ) : (
              <NavLink
                to="/dashboard"
                className="flex items-center gap-2 border-2 px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all"
                style={{ borderColor: '#E8272A', color: '#000000' }}
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center border-2" style={{ borderColor: '#E8272A', background: '#E8272A15' }}>
                  <User className="w-3.5 h-3.5" style={{ color: '#E8272A' }} />
                </div>
                My Account
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 transition-colors focus:outline-none"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }}>
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-50 border-b border-gray-200 overflow-hidden"
          >
            <div className="px-4 py-4 mx-2 space-y-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive 
                        ? 'bg-background-card text-accent-primary border border-border shadow-inner' 
                        : 'text-text-secondary hover:bg-background-card/50 hover:text-text-primary'
                    }`
                  }
                >
                  <link.icon className="h-5 w-5" />
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-4 border-t border-border">
                {!isAuthenticated ? (
                  <NavLink 
                    to="/dashboard" 
                    onClick={() => setIsOpen(false)}
                    className="w-full flex justify-center items-center gap-2 bg-interactive-primary text-white px-4 py-3 rounded-xl text-sm font-bold shadow-lg"
                  >
                    <LogIn className="h-4 w-4" />
                    Sign In to Terminal
                  </NavLink>
                ) : (
                  <NavLink 
                    to="/dashboard" 
                    onClick={() => setIsOpen(false)}
                    className="w-full flex justify-center items-center gap-2 border border-border bg-background-card text-text-primary px-4 py-3 rounded-xl text-sm font-bold"
                  >
                    <User className="h-4 w-4 text-accent-primary" />
                    Open Dashboard
                  </NavLink>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
