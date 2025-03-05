import axios from 'axios';
// require('dotenv').config();

const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_KEY = process.env.API_KEY;
  console.log("Server-side API Key:", API_KEY ? "Loaded ✅" : "Not Found ❌");
export const sendMessageToEchoGPT = async (message) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "EchoGPT", 
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: message }
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
      }
    );

    return response.data.choices[0]?.message?.content || "No response from AI.";
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    return error.response?.data?.message || "An error occurred while fetching the response.";
  }
};
