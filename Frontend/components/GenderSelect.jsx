import React, { useState } from 'react';
import { Label, Button } from "@/components/ui/select";

const GenderSelect = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedGender) => {
    onChange(selectedGender);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Label htmlFor="gender">Gender</Label>
      <Button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-black px-4 py-2 text-left border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 "
      >
        {value || "Select gender"}
        <span className="ml-2">▼</span>
      </Button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 text-black bg-white border border-gray-300 rounded shadow-lg">
          {["Male", "Female", "Other"].map((gender) => (
            <div
              key={gender}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(gender)}
            >
              {gender}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenderSelect;