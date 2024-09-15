'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/services/firebase/config';
import { FiMenu, FiX, FiUser, FiLogOut, FiActivity, FiHeart, FiAward } from 'react-icons/fi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from '@/components/ProtectedRoute';
import { motion } from 'framer-motion';

const Home = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut(auth).then(() => {
      sessionStorage.removeItem('user');
      router.push('/sign-in');
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <ProtectedRoute>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-cover bg-center min-h-screen flex flex-col"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="bg-blue-900 bg-opacity-80 min-h-screen flex flex-col">
          <nav className="p-4 flex justify-between items-center text-white">
            <motion.h1 
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              className="text-3xl font-bold text-green-300"
            >
              HealthPulse
            </motion.h1>
            <div className="md:hidden z-50">
              <button onClick={toggleMenu} className="focus:outline-none">
                {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            </div>
            <motion.ul 
              className={`fixed inset-0 flex flex-col items-center justify-center bg-blue-900 md:bg-transparent bg-opacity-90 transition-all duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:flex md:flex-row md:items-center md:space-x-8 md:pr-10`}
              initial={false}
              animate={isMenuOpen ? "open" : "closed"}
              variants={{
                open: { x: 0 },
                closed: { x: "-100%" },
              }}
            >
              <li><button onClick={() => router.push('/profile')} className="flex items-center space-x-2 py-4 md:py-0 hover:text-green-300 transition-colors"><FiUser /><span>Profile</span></button></li>
              <li><button onClick={() => router.push('/health-dashboard')} className="flex items-center space-x-2 py-4 md:py-0 hover:text-green-300 transition-colors"><FiActivity /><span>Health Dashboard</span></button></li>
              <li><button onClick={handleLogout} className="flex items-center space-x-2 py-4 md:py-0 hover:text-green-300 transition-colors"><FiLogOut /><span>Log out</span></button></li>
            </motion.ul>
          </nav>

          <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center text-white max-w-2xl mb-16"
            >
              <h2 className="text-5xl font-bold mb-6 text-green-300">Your Personal Health Assistant</h2>
              <p className="text-xl mb-8">Get personalized health insights and supplement recommendations based on your wearable data.</p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/health-report')} 
                  className="px-8 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-colors flex items-center"
                >
                  <FiActivity className="mr-2" />
                  Provide your health data
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full"
            >
              <div className="bg-white bg-opacity-10 p-6 rounded-lg text-white">
                <FiHeart className="text-4xl mb-4 text-green-300" />
                <h3 className="text-xl font-bold mb-2">Personalized Insights</h3>
                <p>Get AI-driven health insights based on your wearable data and symptoms.</p>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-lg text-white">
                <FiAward className="text-4xl mb-4 text-green-300" />
                <h3 className="text-xl font-bold mb-2">Smart Recommendations</h3>
                <p>Receive tailored supplement suggestions to optimize your health.</p>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-lg text-white">
                <FiActivity className="text-4xl mb-4 text-green-300" />
                <h3 className="text-xl font-bold mb-2">Predictive Health</h3>
                <p>Stay ahead with AI predictions of potential health issues before they arise.</p>
              </div>
            </motion.div>
          </main>

          <footer className="bg-blue-900 bg-opacity-75 text-white py-6 px-4 mt-auto">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p>&copy; 2024 HealthPulse. All rights reserved.</p>
              </div>
              <div className="flex flex-col md:flex-row md:space-x-8">
                <div className="mb-4 md:mb-0">
                  <h4 className="font-bold mb-2">Quick Links</h4>
                  <ul className="space-y-1">
                    <li><a href="#" className="hover:text-green-300 transition-colors">About Us</a></li>
                    <li><a href="#" className="hover:text-green-300 transition-colors">FAQs</a></li>
                    <li><a href="#" className="hover:text-green-300 transition-colors">Health Blog</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Legal</h4>
                  <ul className="space-y-1">
                    <li><a href="#" className="hover:text-green-300 transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-green-300 transition-colors">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-green-300 transition-colors">Contact Us</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
          
          <ToastContainer position="bottom-right" />
        </div>
      </motion.div>
    </ProtectedRoute>
  );
};

export default Home;