import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config()

const apiKey = process.env.UPSTAGE_API_KEY
const client = new OpenAI({
  apiKey: apiKey,
  baseURL: 'https://api.upstage.ai/v1/solar'
})

// Define types for tool calls and responses
interface ToolCall {
  id: string;
  function: {
    name: string;
  };
}

interface ToolOutput {
  tool_call_id: string;
  output: string;
}

// Define the parameters for the assistant
interface AssistantParams {
  age: number;
  sex: 'Male' | 'Female';
  symptoms: string[];
  location: string;
  timeOfYear: string;
  occupation?: string;
}

// Async function to generate health report
const generateHealthReport = async (params: AssistantParams): Promise<any> => {
  // Create the assistant
  const assistant = await client.beta.assistants.create({
    model: "solar-pro",
    instructions:
      "You are a health assistant bot. Use the provided functions to gather information and construct a detailed health report.",
    tools: [
      {
        type: "function",
        function: {
          name: "getSuspectedDisease",
          description: "Get the suspected disease based on symptoms, age, sex, location, and time of year.",
          parameters: {
            type: "object",
            properties: {
              symptoms: {
                type: "array",
                items: { type: "string" },
                description: "List of symptoms experienced by the patient.",
              },
              age: { type: "integer", description: "Age of the patient." },
              sex: { type: "string", enum: ["Male", "Female"], description: "Sex of the patient." },
              location: { type: "string", description: "Current location of the patient." },
              timeOfYear: { type: "string", description: "Time of the year (e.g., Spring, Summer, Fall, Winter)." },
            },
            required: ["symptoms", "age", "sex", "location", "timeOfYear"],
            additionalProperties: false,
          },
          strict: true,
        },
      },
      // Add other tool definitions here
    ],
  });

  // Create a thread
  const thread = await client.beta.threads.create();

  // Create a user message in the thread with the prompt
  const message = await client.beta.threads.messages.create(thread.id, {
    role: 'user',
    content: JSON.stringify({
      prompt: `Using the following data, generate a health report:
        Age: ${params.age}
        Sex: ${params.sex}
        Symptoms: ${params.symptoms.join(", ")}
        Location: ${params.location}
        Time of Year: ${params.timeOfYear}
        Occupation: ${params.occupation || 'Not provided'}`,
    }),
  });

  // Function to handle required actions if there are any tool calls that require outputs
  const handleRequiresAction = async (run: any): Promise<void> => {
    if (
      run.required_action &&
      run.required_action.submit_tool_outputs &&
      run.required_action.submit_tool_outputs.tool_calls
    ) {
      const toolCalls: ToolCall[] = run.required_action.submit_tool_outputs.tool_calls;

      const toolOutputs: ToolOutput[] = toolCalls.map((tool) => {
        // Example of how to handle specific tool names and generate outputs
        if (tool.function.name === "getSuspectedDisease") {
          return {
            tool_call_id: tool.id,
            output: JSON.stringify({
              suspectedDisease: "Example Disease", // Replace with actual value
            }),
          };
        }
        // Add handling for other tools here if necessary
        return null;
      }).filter((output): output is ToolOutput => output !== null);

      if (toolOutputs.length > 0) {
        run = await client.beta.threads.runs.submitToolOutputsAndPoll(thread.id, run.id, {
          tool_outputs: toolOutputs,
        });
        console.log("Tool outputs submitted successfully.");
      } else {
        console.log("No tool outputs to submit.");
      }

      await handleRunStatus(run);
    }
  };

  // Function to handle the run status
  const handleRunStatus = async (run: any): Promise<any> => {
    if (run.status === "completed") {
      const messages = await client.beta.threads.messages.list(thread.id);
      console.log(messages.data);
      return messages.data;
    } else if (run.status === "requires_action") {
      console.log(run.status);
      return await handleRequiresAction(run);
    } else {
      console.error("Run did not complete:", run);
      throw new Error("Run did not complete successfully.");
    }
  };

  // Create and poll the assistant's run
  try {
    let run = await client.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: assistant.id,
    });

    return await handleRunStatus(run);
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

// Example usage
//const exampleParams: AssistantParams = {
//  age: 30,
//  sex: 'Female',
//  symptoms: ['fever', 'headache'],
//  location: 'New York',
//  timeOfYear: 'Fall',
//  occupation: 'Teacher',
//};
//
//generateHealthReport(exampleParams).then(result => {
//  console.log("Health report result:", result);
//}).catch(error => {
//  console.error("Failed to generate health report:", error);
//});

export default generateHealthReport;
