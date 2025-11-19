export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-xs md:max-w-md px-5 py-3 rounded-2xl shadow-md ${
          isUser
            ? "bg-indigo-600 text-white"
            : "bg-white text-gray-800 border border-gray-200"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
