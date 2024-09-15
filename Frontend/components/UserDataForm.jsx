import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input, Button, Label } from "@/components/ui/select";

const UserDataForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    heartRate: '',
    steps: '',
    sleepHours: '',
    weight: '',
    caloriesConsumed: '',
    waterIntake: '',
    activeMinutes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Enter Your Health Data</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
          <Input
            id="heartRate"
            name="heartRate"
            type="number"
            value={formData.heartRate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="steps">Steps</Label>
          <Input
            id="steps"
            name="steps"
            type="number"
            value={formData.steps}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="sleepHours">Sleep (hours)</Label>
          <Input
            id="sleepHours"
            name="sleepHours"
            type="number"
            step="0.1"
            value={formData.sleepHours}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            name="weight"
            type="number"
            step="0.1"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="caloriesConsumed">Calories Consumed</Label>
          <Input
            id="caloriesConsumed"
            name="caloriesConsumed"
            type="number"
            value={formData.caloriesConsumed}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="waterIntake">Water Intake (L)</Label>
          <Input
            id="waterIntake"
            name="waterIntake"
            type="number"
            step="0.1"
            value={formData.waterIntake}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="activeMinutes">Active Minutes</Label>
          <Input
            id="activeMinutes"
            name="activeMinutes"
            type="number"
            value={formData.activeMinutes}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
          Submit Data
        </Button>
      </form>
    </motion.div>
  );
};

export default UserDataForm;