import axios from 'axios';

export async function sendMessage(messages) {
  const res = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
    model: "mistralai/mistral-7b-instruct:free",
    messages: [
      { role: "system", content: "You are a friendly, clear, and honest AI assistant. Answer simply and accurately. Never write code unless explicitly asked." },
      ...messages
    ],
    temperature: 0.7
  }, {
    headers: {
      "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`,
      "HTTP-Referer": window.location.origin,
      "X-Title": "Simple AI Chatbot"
    }
  });

  return res.data.choices[0].message.content;
}
