'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaHeartbeat, FaWalking, FaMoon, FaWeight, 
  FaApple, FaWater, FaRunning, FaChartLine 
} from 'react-icons/fa';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import UserDataForm from '@/components/UserDataForm';

const HealthMetric = ({ icon: Icon, title, value, unit, color, normalRange }) => {
  const isLow = value < normalRange[0];
  const isHigh = value > normalRange[1];

  return (
    <motion.div
      className={`bg-white rounded-lg p-4 shadow-md flex items-center space-x-4 ${isLow || isHigh ? 'border-2 border-red-500' : ''}`}
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
        <p className="text-xs text-gray-500">Normal: {normalRange[0]} - {normalRange[1]} {unit}</p>
      </div>
    </motion.div>
  );
};

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
  const [userData, setUserData] = useState(null);

  const handleFormSubmit = (data) => {
    setUserData(data);
  };

  const normalRanges = {
    heartRate: [60, 100],
    steps: [7000, 10000],
    sleepHours: [7, 9],
    weight: [50, 80], // This is a general range, should be personalized based on height, age, etc.
    caloriesConsumed: [1500, 2500],
    waterIntake: [2, 3],
    activeMinutes: [30, 60]
  };

  const getAlerts = () => {
    if (!userData) return [];

    return Object.entries(userData).filter(([key, value]) => {
      const range = normalRanges[key];
      return range && (value < range[0] || value > range[1]);
    }).map(([key, value]) => {
      const range = normalRanges[key];
      const isLow = value < range[0];
      return {
        title: `${key.charAt(0).toUpperCase() + key.slice(1)} ${isLow ? 'Low' : 'High'}`,
        description: `Your ${key} is ${isLow ? 'below' : 'above'} the normal range. Consider ${isLow ? 'increasing' : 'decreasing'} it.`
      };
    });
  };

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
      {userData ? (
        <>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <HealthMetric icon={FaHeartbeat} title="Heart Rate" value={userData.heartRate} unit="bpm" color="bg-red-500" normalRange={normalRanges.heartRate} />
            <HealthMetric icon={FaWalking} title="Steps" value={userData.steps} unit="steps" color="bg-blue-500" normalRange={normalRanges.steps} />
            <HealthMetric icon={FaMoon} title="Sleep" value={userData.sleepHours} unit="hours" color="bg-indigo-500" normalRange={normalRanges.sleepHours} />
            <HealthMetric icon={FaWeight} title="Weight" value={userData.weight} unit="kg" color="bg-green-500" normalRange={normalRanges.weight} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                  <p className="text-2xl font-bold">{userData.caloriesConsumed} <span className="text-sm font-normal">kcal</span></p>
                  <p className="text-xs text-gray-500">Normal: {normalRanges.caloriesConsumed[0]} - {normalRanges.caloriesConsumed[1]} kcal</p>
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
                  <p className="text-2xl font-bold">{userData.waterIntake} <span className="text-sm font-normal">L</span></p>
                  <p className="text-xs text-gray-500">Normal: {normalRanges.waterIntake[0]} - {normalRanges.waterIntake[1]} L</p>
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
                  <p className="text-2xl font-bold">{userData.activeMinutes} <span className="text-sm font-normal">min</span></p>
                  <p className="text-xs text-gray-500">Normal: {normalRanges.activeMinutes[0]} - {normalRanges.activeMinutes[1]} min</p>
                </div>
              </div>
            </motion.div>
          </div>

          {getAlerts().map((alert, index) => (
            <Alert key={index} variant="destructive" className="mb-4">
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>{alert.description}</AlertDescription>
            </Alert>
          ))}
        </>
      ):(<UserDataForm onSubmit={handleFormSubmit} />)}
      

      

      
    </div>
  );
}
