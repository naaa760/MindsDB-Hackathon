import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.UPSTAGE_API_KEY || ""; // Handle null case for apiKey
if (!apiKey) {
  throw new Error("API key is missing. Please ensure it is set in the environment variables.");
}

const client = new OpenAI({
  apiKey: apiKey,
  baseURL: "https://api.upstage.ai/v1/solar",
});

// Function to generate health report
async function generateHealthReport({
  name,
  age,
  sex,
  symptoms,
  location,
  timeOfYear,
  occupation,
}: {
  name: string;
  age: number;
  sex: "Male" | "Female";
  symptoms: string[];
  location: string;
  timeOfYear: string;
  occupation?: string;
}) {
  try {
    const chatCompletion = await client.chat.completions.create({
      model: "solar-pro",
      messages: [
        {
          role: "system",
          content: `You are a medical health assistant with expertise in analyzing user-provided health information. The user will provide you the following details:
    1. **Age**: The user's age (as a number).
    2. **Sex**: The user's sex (Male or Female).
    3. **Symptoms**: A list of symptoms the user is experiencing.
    4. **Location**: The user's current location (city, country).
    5. **Time of Year**: The current season or time of year affecting health conditions.
    6. **Occupation** (Optional): The user's occupation, which could influence health risks.
    
    Based on this information, you will return a detailed health report in **JSON format** with the following fields:
    
    - **name**: The user's name.
    - **age**: The user's age.
    - **sex**: The user's sex.
    - **location**: The user's location.
    - **timeOfYear**: The current time of year or season.
    - **symptoms**: The list of symptoms provided by the user.
    - **suspectedDisease**: The most likely disease(s) based on the symptoms.
    - **pathophysiology**: A brief description of the suspected disease(s)' underlying causes or mechanisms.
    - **generalHealthStatus**: An assessment of the user's overall health status.
    - **ageSpecificInsights**: Health considerations specific to the user's age group.
    - **sexSpecificInsights**: Health considerations specific to the user's sex.
    - **locationSpecificInsights**: Health considerations based on the user's location.
    - **seasonalHealthConsiderations**: Health risks or recommendations based on the current time of year.
    - **educationalSpecificInsights**: Health recommendations or risks based on the user's occupation (if provided).
    
    Return **only the JSON response** with these fields. No additional text or formatting is needed.`,
        },
        {
          role: "user",
          content: JSON.stringify({
            name,
            age,
            sex,
            symptoms,
            location,
            timeOfYear,
            occupation,
          }),
        }
      ],
    });

    const response = chatCompletion.choices[0].message.content || "";
    const parsedResponse = JSON.parse(response); // Parse the JSON response

    return parsedResponse; // Return the structured health report
  } catch (error) {
    console.error("Error generating health report:", error);
    throw new Error("Failed to generate health report");
  }
}

export default generateHealthReport;
