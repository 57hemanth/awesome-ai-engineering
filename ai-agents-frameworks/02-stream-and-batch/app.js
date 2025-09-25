import { initChatModel } from "langchain";
import dotenv from "dotenv";

dotenv.config();

(async() => {

    // Initialize the model
    const model = await initChatModel("google-genai:gemini-2.5-flash");
    
    // Stream the response
    // const chunks = await model.stream("What is langchain?");

    // for await (const chunk of chunks) {
    //     console.log(chunk.content);
    // }

    // Batch the response
    const responses = await model.batch([
        "What is langchain?",
        "What is langgraph?",
        "What is mcp?",
    ], {
        maxConcurrency: 10, // Maximum number of concurrent requests
    });

    for(const response of responses){
        console.log(response.content);
    }

})()