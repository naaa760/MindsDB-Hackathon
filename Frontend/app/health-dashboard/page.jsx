'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaHeartbeat, FaWalking, FaMoon, FaWeight, 
  FaApple, FaWater, FaRunning, FaChartLine 
} from 'react-icons/fa';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const HealthMetric = ({ icon: Icon, title, value, unit, color }) => (
  <motion.div
    className={`bg-white rounded-lg p-4 shadow-md flex items-center space-x-4`}
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className={`p-3 rounded-full ${color}`}>
      <Icon className="text-white text-2xl" />
    </div>
    <div>
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold">{value}<span className="text-sm font-normal"> {unit}</span></p>
    </div>
  </motion.div>
);

const activityData = [
  { name: 'Mon', steps: 6000 },
  { name: 'Tue', steps: 7500 },
  { name: 'Wed', steps: 9000 },
  { name: 'Thu', steps: 8000 },
  { name: 'Fri', steps: 10000 },
  { name: 'Sat', steps: 11000 },
  { name: 'Sun', steps: 8500 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <motion.h1 
        className="text-3xl font-bold mb-8 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Health Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <HealthMetric icon={FaHeartbeat} title="Heart Rate" value={72} unit="bpm" color="bg-red-500" />
        <HealthMetric icon={FaWalking} title="Steps" value="8,546" unit="steps" color="bg-blue-500" />
        <HealthMetric icon={FaMoon} title="Sleep" value={7.5} unit="hours" color="bg-indigo-500" />
        <HealthMetric icon={FaWeight} title="Weight" value={68.5} unit="kg" color="bg-green-500" />
      </div>

      <motion.div 
        className="bg-white rounded-lg shadow-md p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Weekly Activity</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="steps" stroke="#3B82F6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          className="bg-white rounded-lg shadow-md p-6"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold mb-4 text-gray-800">Nutrition</h3>
          <div className="flex items-center space-x-4">
            <FaApple className="text-3xl text-red-500" />
            <div>
              <p className="text-sm text-gray-500">Calories Consumed</p>
              <p className="text-2xl font-bold">1,850 <span className="text-sm font-normal">kcal</span></p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-lg shadow-md p-6"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold mb-4 text-gray-800">Hydration</h3>
          <div className="flex items-center space-x-4">
            <FaWater className="text-3xl text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Water Intake</p>
              <p className="text-2xl font-bold">2.1 <span className="text-sm font-normal">L</span></p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-lg shadow-md p-6"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-xl font-bold mb-4 text-gray-800">Exercise</h3>
          <div className="flex items-center space-x-4">
            <FaRunning className="text-3xl text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Active Minutes</p>
              <p className="text-2xl font-bold">45 <span className="text-sm font-normal">min</span></p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-lg shadow-md p-6"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-xl font-bold mb-4 text-gray-800">Goals Progress</h3>
          <div className="flex items-center space-x-4">
            <FaChartLine className="text-3xl text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Overall Progress</p>
              <p className="text-2xl font-bold">75%</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}