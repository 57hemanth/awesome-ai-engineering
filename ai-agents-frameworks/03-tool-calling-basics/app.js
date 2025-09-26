import { initChatModel, tool } from "langchain";
import dotenv from "dotenv";
import z from "zod";

dotenv.config();

const getWeather = tool(
    (input) => {
        return `It's rainy in ${input.location}`;
    }, {
        name: "get_weather",
        description: "Get the weather at a location.",
        schema: z.object({
            location: z.string().describe("The location to get the weather")
        })
    }
);

const getTime = tool(
    (input) => {
        return `Time in ${input.location} is ${new Date.now()}`;
    }, {
        name: "get_time",
        description: "Get current time.",
        schema: z.object({
            location: z.string().describe("Location to get the time.")
        })
    }
);

(async () => {

    const model = await initChatModel("google-genai:gemini-2.5-pro");

    // const modelWithTools = model.bindTools([getWeather]);

    // 4 Ways of tool calling //

    // 1. Tool Execution Loop

    // let messages = [{ "role": "user", "content": "What is the weather is Hyderabad, India?" }];

        // Step 1: Invoke model with tools

    // const response = await modelWithTools.invoke(messages);
    // messages.push(response);
    // console.log("Meesages: \n", messages);
    // const toolCalls = response.tool_calls || [];

        // Step 2: Calling the tools

    // for(const tool_call of toolCalls){
    //     const response = await getWeather.invoke(tool_call.args);
    //     console.log(`Tool ${tool_call.id} response: `, response);
    //     messages.push(response);
    // }
    // console.log("Messages: \n", messages);

        // Step 3: Final response

    // messages.push({ "role": "user", "content": "Can I go out without umbrella?" });
    // const final_response = await modelWithTools.invoke(messages);
    // console.log("Final response: \n", final_response);
    
    // 2. Forcing tool calls

    // Model can choose any tool
    // modelWithTools.bindTools([getWeather], { toolChoice: "any" })
    // Force use of specif tool
    // modelWithTools.bindTools([getWeather], { toolChoice: "getWeather" })

    // 3. Parallel tool calls

    // const modelWithTools = model.bindTools([getTime, getWeather]);
    // let messages = [{ "role": "user", "content": "How is the weather and time in Hyderabad?" }];
    // const response = await modelWithTools.invoke(messages);
    // console.log("Multiple Tools Calls: \n");
    // console.log(response.tool_calls);

    // 4. Streaming tool calls

    const modelWithTools = model.bindTools([getTime, getWeather]);
    const chunks = await modelWithTools.stream("How is the weather and time in Hyderabad?");

    for await(const chunk of chunks){
        console.log(chunk);
    }
    
})();