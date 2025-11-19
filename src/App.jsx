import { useState, useRef, useEffect } from 'react';
import ChatMessage from './components/ChatMessage';
import InputBox from './components/InputBox';
import { sendMessage } from './lib/api';

export default function App() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your simple AI friend. Ask me anything — I’ll give clear, honest answers." }
  ]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  const scrollToBottom = () => endRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => scrollToBottom(), [messages]);

  const handleSend = async (text) => {
    if (!text.trim() || loading) return;
    const userMsg = { role: "user", content: text };
    setMessages(m => [...m, userMsg]);
    setLoading(true);

    try {
      const reply = await sendMessage([...messages, userMsg]);
      setMessages(m => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", content: "Sorry, I'm having trouble connecting right now." }]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex flex-col">
      <header className="bg-white shadow-sm border-b py-4 text-center">
        <h1 className="text-2xl font-semibold text-gray-800">Simple AI Chat</h1>
        <p className="text-sm text-gray-500">Just ask — no coding, no fluff</p>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-32">
        {messages.map((m, i) => <ChatMessage key={i} message={m} />)}
        {loading && <div className="text-center text-gray-500">thinking...</div>}
        <div ref={endRef} />
      </div>

      <InputBox onSend={handleSend} disabled={loading} />
    </div>
  );
}
