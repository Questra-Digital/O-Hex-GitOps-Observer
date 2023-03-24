import { useState } from "react";

const Message = () => {
  const [message, setMessage] = useState("");

  const handleInputChange = (e: any) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(`Sending message: ${message}`);
    setMessage("");
  };

  return (
    <>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Message</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Write a message..."
              value={message}
              onChange={handleInputChange}
              className="w-full mr-4 py-2 px-4 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Message;
