import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_UPSTAGE_API,
  baseURL: 'https://api.upstage.ai/v1/solar'
})
export async function POST(req) {
    const { messages } = await req.json();
const response = await openai.chat.completions.create({
    model: 'solar-pro',
    messages: [
        {
          role: "system",
          content: `You are a professional storyteller who has been hired to write a series of short stories for a new anthology. The stories should be captivating, imaginative, and thought-provoking. They should explore a variety of themes and genres, from science fiction and fantasy to mystery and romance. Each story should be unique and memorable, with compelling characters and unexpected plot twists.`,
        },
        ...messages,
      ],
    stream: true
  });
  return response;
}
