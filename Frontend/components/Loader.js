import React from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaApple, FaRunning, FaWater } from 'react-icons/fa';

const HealthIcon = ({ icon: Icon, delay, rotate }) => (
  <motion.div
    className="absolute text-white"
    style={{
      rotate: rotate,
      transformOrigin: '100px 100px',
    }}
    initial={{ scale: 0 }}
    animate={{ 
      scale: [0, 1, 1, 0],
      opacity: [0, 1, 1, 0]
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut",
    }}
  >
    <Icon size={32} />
  </motion.div>
);

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-sky-400 to-sky-200 overflow-hidden">
      <div className="relative">
        {/* Pulsating circle */}
        <motion.div
          className="absolute inset-0 bg-white rounded-full opacity-20"
          style={{ width: '200px', height: '200px' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Rotating ring */}
        <motion.div
          className="border-4 border-white rounded-full"
          style={{ width: '200px', height: '200px' }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Heartbeat icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-white"
          animate={{
            scale: [1, 1.2, 1, 1.2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <FaHeartbeat size={64} />
        </motion.div>

        {/* Orbiting health icons */}
        <HealthIcon icon={FaApple} delay={0} rotate={0} />
        <HealthIcon icon={FaRunning} delay={0.5} rotate={120} />
        <HealthIcon icon={FaWater} delay={1} rotate={240} />
      </div>

      {/* Loading text */}
      <motion.p
        className="absolute mt-40 text-white text-2xl font-semibold"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Loading...
      </motion.p>
    </div>
  );
}