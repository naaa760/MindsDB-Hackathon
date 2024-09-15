'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Input, Button, Label } from "@/components/ui/select";
import { Bell, Heart, Clipboard, User, Calendar } from 'lucide-react';
import GenderSelect from '@/components/GenderSelect';  // Make sure to import the new component

const HealthReportPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    symptoms: '',
  });
  const [response, setResponse] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleGenderChange = (value) => {
    setFormData(prevState => ({
      ...prevState,
      gender: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call or processing
    setTimeout(() => {
      setResponse({
        recommendation: `General Recommendation for a ${formData.age}-year-old ${formData.gender} with symptoms: ${formData.symptoms}
Increase Vitamin B12 intake. Consider fortified cereals and B12 supplementation, especially for vegetarians/vegans. Iron supplementation may be beneficial. Consider iron-rich foods like lean meats, beans, and leafy greens. Address potential Omega-3 fatty acids deficiency. Consult a healthcare professional for specific dietary advice or supplementation.`,
        topSupplement: {
          name: "B12 Liquid",
          price: "12.22AUD",
          purchaseLink: "https://au.iherb.com/pr/now-foods-liquid-b-12-b-complex-2-fl-oz-59-ml/419?_gl=1",
          imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now00464/v/34.jpg"
        },
        specificRecommendations: [
          "Highly Recommended: B12 Liquid is an excellent match for your needs.",
          "Adult men may benefit from supplements that support heart health, muscle function, and overall vitality.",
          "To improve cognitive function, look for supplements containing vitamin B12, iron, and omega-3 fatty acids.",
          "While B12 Liquid is the top recommendation, Eagle Sublingual B12 1000 could be an alternative option to consider.",
          "Remember to maintain a balanced diet alongside any supplementation. Always consult with a healthcare professional before starting any new supplement regimen, especially if you have existing health conditions or are taking medications."
        ],
        reminders: [
          "Don't forget to stay hydrated throughout the day!",
          "Take a moment to stand up and stretch!"
        ]
      });
      setIsLoading(false);
    }, 1000);
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
              <div className="flex-grow text-black">
                <GenderSelect
                  value={formData.gender}
                  onChange={handleGenderChange}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Clipboard className="text-green-500" size={24} />
              <div className="flex-grow">
                <Label htmlFor="symptoms">Symptoms</Label>
                <Input
                  id="symptoms"
                  name="symptoms"
                  value={formData.symptoms}
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

      {response && (
        <Card className="mt-8 shadow-xl border border-blue-100">
          <CardHeader className="bg-blue-500 text-white">
            <h2 className="text-2xl font-semibold flex items-center"><Clipboard className="mr-2" /> Your Health Report</h2>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-blue-700 mb-2">General Recommendation:</h3>
              <p className="text-gray-700">{response.recommendation}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-blue-700 mb-2">Top recommended supplement:</h3>
              <div className="flex items-center space-x-4">
                <img src={response.topSupplement.imageUrl} alt={response.topSupplement.name} className="w-24 h-24 object-cover rounded" />
                <div>
                  <p className="font-medium">{response.topSupplement.name}</p>
                  <p className="text-gray-600">Price: {response.topSupplement.price}</p>
                  <a href={response.topSupplement.purchaseLink} className="text-blue-500 hover:underline">Purchase here</a>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-blue-700 mb-2">Specific Recommendations:</h3>
              <ul className="list-disc pl-5 space-y-2">
                {response.specificRecommendations.map((rec, index) => (
                  <li key={index} className="text-gray-700">{rec}</li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter className="bg-blue-50">
            <div className="w-full">
              <h3 className="font-semibold text-blue-700 flex items-center mb-2"><Bell className="mr-2" /> Reminders:</h3>
              <ul className="list-disc pl-5 space-y-2">
                {response.reminders.map((reminder, index) => (
                  <li key={index} className="text-gray-700">{reminder}</li>
                ))}
              </ul>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default HealthReportPage;