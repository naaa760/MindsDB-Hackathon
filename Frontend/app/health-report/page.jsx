'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input, Button, Label } from "@/components/ui/select";
import { Bell, Heart, Clipboard, User, Calendar, MapPin, Briefcase, Sun } from 'lucide-react';

const CustomSelect = ({ label, options, value, onChange, name }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedOption) => {
    onChange({ target: { name, value: selectedOption } });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Label htmlFor={name}>{label}</Label>
      <Button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-black px-4 py-2 text-left border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2"
      >
        {value || `Select ${label.toLowerCase()}`}
        <span className="ml-2">▼</span>
      </Button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 text-black bg-white border border-gray-300 rounded shadow-lg">
          {options.map((option) => (
            <div
              key={option}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const HealthReportPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    sex: "",
    symptoms: [],
    location: "",
    timeOfYear: "",
    occupation: "",
    email: "",
    places: []
  });
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleArrayInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value.split(',').map(item => item.trim())
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formattedData = {
        ...formData,
        age: parseInt(formData.age, 10),
        symptoms: formData.symptoms.map(symptom => `"${symptom}"`),
        places: formData.places.map(place => `"${place}"`)
      };

      const response = await fetch('https://healthpulse-hbaq.onrender.com/api/get-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'insomnia/10.0.0'
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch report');
      }

      const data = await response.json();
      setReport(data);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while generating the report. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const LoadingDots = () => (
    <div className="flex space-x-1 justify-center items-center">
      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
      <Card className="shadow-xl border border-green-100">
        <CardHeader className="bg-green-500 text-white">
          <h1 className="text-3xl font-bold flex items-center"><Heart className="mr-2" /> Health Report</h1>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-4">
              <User className="text-green-500" size={24} />
              <div className="flex-grow">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="text-green-500" size={24} />
              <div className="flex-grow">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Calendar className="text-green-500" size={24} />
              <div className="flex-grow">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <User className="text-green-500" size={24} />
              <div className="flex-grow">
                <CustomSelect
                  label="Sex"
                  options={["Male", "Female", "Other"]}
                  value={formData.sex}
                  onChange={handleInputChange}
                  name="sex"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Clipboard className="text-green-500" size={24} />
              <div className="flex-grow">
                <Label htmlFor="symptoms">Symptoms (comma-separated)</Label>
                <Input
                  id="symptoms"
                  name="symptoms"
                  value={formData.symptoms.join(', ')}
                  onChange={handleArrayInputChange}
                  required
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="text-green-500" size={24} />
              <div className="flex-grow">
                <Label htmlFor="places">Places (comma-separated)</Label>
                <Input
                  id="places"
                  name="places"
                  value={formData.places.join(', ')}
                  onChange={handleArrayInputChange}
                  required
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Sun className="text-green-500" size={24} />
              <div className="flex-grow">
                <CustomSelect
                  label="Time of Year"
                  options={["Spring", "Summer", "Autumn", "Winter"]}
                  value={formData.timeOfYear}
                  onChange={handleInputChange}
                  name="timeOfYear"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Briefcase className="text-green-500" size={24} />
              <div className="flex-grow">
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? <LoadingDots /> : 'Generate Health Report'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Card className="mt-8 shadow-xl border border-red-100">
          <CardHeader className="bg-red-500 text-white">
            <h2 className="text-2xl font-semibold flex items-center"><Clipboard className="mr-2" /> Error</h2>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      {report && (
        <Card className="mt-8 shadow-xl border border-blue-100">
          <CardHeader className="bg-blue-500 text-white">
            <h2 className="text-2xl font-semibold flex items-center"><Clipboard className="mr-2" /> Your Health Report</h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <p><strong>Name:</strong> {report.name}</p>
              <p><strong>Age:</strong> {report.age}</p>
              <p><strong>Sex:</strong> {report.sex}</p>
              <p><strong>Places:</strong> {report.places?.join(', ') || 'N/A'}</p>
              <p><strong>Time of Year:</strong> {report.timeOfYear}</p>
              <p><strong>Symptoms:</strong> {report.symptoms?.join(', ') || 'N/A'}</p>
              <p><strong>Suspected Diseases:</strong> {report.suspectedDisease?.join(', ') || 'N/A'}</p>
              <div>
                <strong>Pathophysiology:</strong>
                <p>{report.pathophysiology || 'N/A'}</p>
              </div>
              <div>
                <strong>General Health Status:</strong>
                <p>{report.generalHealthStatus || 'N/A'}</p>
              </div>
              <div>
                <strong>Age-specific Insights:</strong>
                <p>{report.ageSpecificInsights || 'N/A'}</p>
              </div>
              <div>
                <strong>Sex-specific Insights:</strong>
                <p>{report.sexSpecificInsights || 'N/A'}</p>
              </div>
              <div>
                <strong>Location-specific Insights:</strong>
                <p>{report.locationSpecificInsights || 'N/A'}</p>
              </div>
              <div>
                <strong>Seasonal Health Considerations:</strong>
                <p>{report.seasonalHealthConsiderations || 'N/A'}</p>
              </div>
              <div>
                <strong>Occupation-specific Insights:</strong>
                <p>{report.occupationSpecificInsights || 'N/A'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HealthReportPage;


