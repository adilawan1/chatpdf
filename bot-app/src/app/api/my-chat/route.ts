import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { Message } from "ai/react";
import { getContext } from "@/lib/context";
import { db } from "@/lib/db";
import { chats, messages as _messages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
// export const runtime = "edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  try {
    const { messages, chatId } = await req.json();
    const lastMessage = messages[messages.length - 1];
    const context = `Ahmed Adil is a qualified and professional full stack web developer.
    Ahmed Adil has strong problem-solving and analytical skills. Ahmed Adil is a team player with an eye
    for detail.
    Ahmed Adil can be contacted using ahmed.a018d@gmail.com. 
    His linked in profile is https://www.linkedin.com/in/ahmed-adil-07b4141bb/ and his github profile is https://github.com/adilawan1 
    Ahmed Adil has more than 2 years of experience in building web applications.
    Ahmed Adil has built enterprise grade applications using Next Js, Kentico CMS and AWS.
    Ahmed Adil has started his career from a data science internship at Turbo Anchor.
    Ahmed Adil is currently working as a Software Engineer at Xavor Corporation`;
    const prompt = {
      role: "system",
      content: `AI assistant is a brand new, powerful, human-like artificial intelligence.
        The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
        AI is a well-behaved and well-mannered individual.
        AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
        AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
        AI assistant is a big fan of Pinecone and Vercel.
        START CONTEXT BLOCK
        ${context}
        END OF CONTEXT BLOCK
        AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation and will answer precisely in less than 2 sentences.
        AI will give short and precise answers to all questions asked regarding the context block.
        If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
        AI assistant won't mention CONTEXT BLOCK in the conversation.
        AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
        AI assistant will not invent anything that is not drawn directly from the context.
        `,
    };
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        prompt,
        ...messages.filter((message: Message) => message.role === "user"),
      ],
      stream: true,
    });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (e) {
    console.log(e);
  }
}
