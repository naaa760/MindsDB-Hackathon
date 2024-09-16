// healthReportGenerator.ts
const generateHealthReportContent = (
  name: string,
  age: number,
  sex: string,
  location: string,
  timeOfYear: string,
  symptoms: string[],
  suspectedDisease: string,
  pathophysiology: string,
  generalHealthStatus: string,
  ageSpecificInsights: string,
  sexSpecificInsights: string,
  locationSpecificInsights: string,
  seasonalHealthConsiderations: string,
  educationalSpecificInsights: string
): string => `
**Health Report**

**Patient Information:**
- **Name:** ${name}
- **Age:** ${age}
- **Sex:** ${sex}
- **Current Location:** ${location}
- **Time of Year:** ${timeOfYear}

---

### **Health Overview**

**1. General Health Status**
- **Overall Health:** ${generalHealthStatus}
- **Recent Health Trends:** [Highlight any notable trends in health metrics such as steps, sleep, weight, etc.]

**2. Suspected Disease**
- **Disease:** ${suspectedDisease}
- **Pathophysiology:** ${pathophysiology}
- **Symptoms:** ${symptoms.join(', ')}

**3. Age-Specific Insights**
- **${age} Years Old:** ${ageSpecificInsights}
- **Health Risks:** [Mention any risks or common health issues associated with the patient’s age]

**4. Sex-Specific Insights**
- **${sex}:** ${sexSpecificInsights}
- **Health Risks:** [Discuss any health risks or considerations specific to the patient’s sex]

**5. Location-Specific Insights**
- **Current Location:** ${location}
- **Health Risks:** ${locationSpecificInsights}

**6. Seasonal Health Considerations**
- **Current Time of Year:** ${timeOfYear}
- **Seasonal Health Tips:** ${seasonalHealthConsiderations}

**7. Educational Specific Insights**
- **Insights:** ${educationalSpecificInsights}

---

### **Detailed Health Data**

**1. Physical Activity**
- **Steps Taken:** [Number of steps taken per day or week]
- **Active Minutes:** [Total active minutes per day or week]
- **Recommendations:** [Provide recommendations based on the patient's physical activity levels]

**2. Sleep Patterns**
- **Average Sleep Duration:** [Average sleep duration per night]
- **Sleep Quality:** [Comments on sleep quality based on available data]
- **Recommendations:** [Provide recommendations for improving sleep, if needed]

**3. Weight Management**
- **Current Weight:** [Patient’s current weight]
- **Weight Trend:** [Trend in weight over time]
- **Recommendations:** [Provide recommendations for weight management based on trends]

**4. Dietary Intake**
- **Calories Consumed:** [Average calorie intake per day]
- **Water Intake:** [Average water intake per day]
- **Recommendations:** [Provide dietary recommendations based on intake data]

**5. Symptom Tracking**
- **Reported Symptoms:** ${symptoms.join(', ')}
- **Symptom Trends:** [Trend or pattern in symptoms]
- **Recommendations:** [Provide recommendations or next steps based on symptoms]

---

### **Action Plan**

1. **Health Goals:** [Set specific health goals based on the report]
2. **Recommended Actions:** [List recommended actions or lifestyle changes]
3. **Follow-Up:** [Suggest any necessary follow-up appointments or actions]

---

**Note:** This report is based on the available data and may require adjustments based on further medical evaluation or changes in health conditions.
`;

export default generateHealthReportContent;

