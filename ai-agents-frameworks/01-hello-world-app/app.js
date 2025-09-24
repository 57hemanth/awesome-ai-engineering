import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

// Load environment variables
dotenv.config();

// Initialize the model
const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash", // Model name
    temperature: 0, // Temperature
    apiKey: process.env.GOOGLE_API_KEY, // API key
});

// Invoke the model
// 1. Direct Invocation
// const response = await model.invoke("Please say 'Hello world!'");
// 2. Pass structured messages
// const response = await model.invoke([{ role: "user", content: "Please say 'Hello world!'" }]);
// 3. Passing a List of Messages
const response = await model.invoke([
    new SystemMessage("You are a helpful assistant."),
    new HumanMessage("Please say 'Hello world!'")
]);

console.log("Response: \n");
console.log(response);