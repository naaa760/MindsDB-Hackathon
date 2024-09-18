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
          content: `You are a medical health assistant with expertise in analyzing user-provided health information. The user will provide the following details:
      
    1. **Name**: The user's name (as a string).
    2. **Age**: The user's age (as a number).
    3. **Sex**: The user's sex (as a string with values "Male" or "Female").
    4. **Symptoms**: A list of symptoms the user is experiencing (as an array of strings).
    5. **Location**: The user's current location (as a string).
    6. **Time of Year**: The current season or time of year affecting health conditions (as a string).
    7. **Occupation** (Optional): The user's occupation (as a string, if provided, otherwise null).

    Based on this information, you will return a detailed health report in **JSON format** with the following fields. Each field is **required** unless noted otherwise, and must have the correct data type:
    
    - **name** (string): The user's name.
    - **age** (number): The user's age.
    - **sex** (string): The user's sex ("Male" or "Female").
    - **location** (string): The user's location.
    - **timeOfYear** (string): The current time of year or season.
    - **symptoms** (array of strings): The list of symptoms provided by the user.
    - **suspectedDisease** (string): The most likely disease(s) based on the symptoms.
    - **pathophysiology** (string): A brief description of the suspected disease(s)' underlying causes or mechanisms.
    - **generalHealthStatus** (string): An assessment of the user's overall health status (e.g., "Good", "Moderate", "Poor").
    - **ageSpecificInsights** (string): Health considerations specific to the user's age group.
    - **sexSpecificInsights** (string): Health considerations specific to the user's sex.
    - **locationSpecificInsights** (string): Health considerations based on the user's location.
    - **seasonalHealthConsiderations** (string): Health risks or recommendations based on the current time of year.
    - **educationalSpecificInsights** (string, optional): Health recommendations or risks based on the user's occupation, **if provided**.

    If no occupation is provided, omit the 'educationalSpecificInsights' field in the response. Return **only the JSON response** with these fields, and ensure all fields have the correct data types as described above.`
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
