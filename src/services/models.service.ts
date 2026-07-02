import { ChatGoogle } from "@langchain/google";
import config from "../config/config.js";

const geminiModel = new ChatGoogle({
    model: "gemini-2.5-flash-lite",
    apiKey: config.GOOGLE_API_KEY
});