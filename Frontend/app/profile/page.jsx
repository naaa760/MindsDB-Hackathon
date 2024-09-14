'use client'
import React, { useState } from 'react';
import { MdKeyboardArrowLeft, MdEdit, MdSave } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import ProtectedRoute from '@/components/ProtectedRoute';
import { motion } from 'framer-motion';

const Profile = () => {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [height, setHeight] = useState('175 cm');
  const [weight, setWeight] = useState('70 kg');
  const [bloodType, setBloodType] = useState('A+');

  const userdata = useSelector((state) => state.chat.userdata);
  const user = useSelector((state) => state.chat.user);
  const names = useSelector((state) => state.chat.name);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const photoURL = userdata?.photoURL || 'https://images.unsplash.com/photo-1584627141989-76b4b7caa09c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';
  const displayName = userdata?.displayName || names;
  const Email = user;

  return (
    <ProtectedRoute>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-b from-sky-400 to-sky-200"
      >
        <div className="container mx-auto px-4 py-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => router.back()}
            className="mb-6 flex items-center text-white"
          >
            <MdKeyboardArrowLeft size={24} />
            <span className="ml-2">Back</span>
          </motion.button>
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-xl overflow-hidden"
          >
            <div className="h-48 bg-sky-500">
              <img src={photoURL} alt="Profile Cover" className="w-full h-full object-cover" />
            </div>
            <div className="relative px-8 py-6">
              <img src={photoURL} alt="Profile" className="w-32 h-32 rounded-full absolute -top-16 border-4 border-white shadow-lg" />
              <div className="mt-16">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-3xl font-bold text-gray-800">{displayName}</h1>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleEditToggle}
                    className={`${editMode ? 'bg-green-500' : 'bg-sky-500'} text-white px-4 py-2 rounded-full flex items-center`}
                  >
                    {editMode ? <MdSave className="mr-2" /> : <MdEdit className="mr-2" />}
                    {editMode ? 'Save' : 'Edit'}
                  </motion.button>
                </div>
                <p className="text-gray-600 mb-4">@{Email}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProfileField
                    label="Name"
                    value={name || displayName}
                    onChange={(e) => setName(e.target.value)}
                    editMode={editMode}
                  />
                  <ProfileField
                    label="Email"
                    value={email || Email}
                    onChange={(e) => setEmail(e.target.value)}
                    editMode={editMode}
                  />
                  <ProfileField
                    label="Height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    editMode={editMode}
                  />
                  <ProfileField
                    label="Weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    editMode={editMode}
                  />
                  <ProfileField
                    label="Blood Type"
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                    editMode={editMode}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </ProtectedRoute>
  );
};

const ProfileField = ({ label, value, onChange, editMode }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {editMode ? (
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
    ) : (
      <p className="text-gray-800">{value}</p>
    )}
  </div>
);

export default Profile;