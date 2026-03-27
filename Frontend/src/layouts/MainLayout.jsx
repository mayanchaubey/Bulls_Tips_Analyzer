import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Navbar />
      
      {/* Container holding Main */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8"
      >
        <main className="w-full flex flex-col space-y-6">
          <Outlet />
        </main>
      </motion.div>
    </div>
  );
};
