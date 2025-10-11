import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { Agent } from "@convex-dev/agent";
import { components } from "../../_generated/api";

const googleProvider = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY, // ensure this is set
});

export const supportAgent = new Agent(components.agent, {
    chat: googleProvider("gemini-2.5-flash"),
    instructions: "You are a customer support agent",
});
