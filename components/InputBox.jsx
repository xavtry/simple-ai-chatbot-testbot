export default function InputBox({ onSend, disabled }) {
  let inputValue = '';

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim()) {
        onSend(inputValue.trim());
        e.target.value = '';
        inputValue = '';
      }
    } else {
      {
      inputValue = e.target.value;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
      <div className="max-w-3xl mx-auto flex gap-3">
        <input
          type="text"
          placeholder="Ask me anything..."
          className="flex-1 px-5 py-3 border rounded-full focus:outline-none focus:border-indigo-500"
          onKeyDown={handleKey}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
