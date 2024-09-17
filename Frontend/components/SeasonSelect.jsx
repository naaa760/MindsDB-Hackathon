import React, { useState } from 'react';
import { Label, Button } from "@/components/ui/select";

const SeasonSelect = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const seasons = ["Spring", "Summer", "Autumn", "Winter"];
  
  const handleSelect = (selectedSeason) => {
    onChange({ target: { name: 'timeOfYear', value: selectedSeason } });
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <Label htmlFor="timeOfYear">Time of Year</Label>
      <Button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-black px-4 py-2 text-left border border-gray-300 rounded shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2"
      >
        {value || "Select season"}
        <span className="ml-2">▼</span>
      </Button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 text-black bg-white border border-gray-300 rounded shadow-lg">
          {seasons.map((season) => (
            <div
              key={season}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(season)}
            >
              {season}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeasonSelect;