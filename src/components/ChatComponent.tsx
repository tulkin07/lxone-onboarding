import React, { useState, useRef, useEffect } from "react";
import { Input } from "./Input";
import { SendHorizonal } from "lucide-react";
import ChatEmptyImage from "../../public/chat.svg";
import Image from "next/image";

interface Message {
  id: number;
  text: string;
  sender: "me" | "other";
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Salom!", sender: "other" },
    { id: 2, text: "Yaxshimisiz?", sender: "other" },
    { id: 3, text: "Assalomu alaykum!", sender: "me" },
    { id: 4, text: "Yaxshi rahmat, o'zingizchi?", sender: "me" },
  ]);

  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null); // scroll target

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "me",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-[300px] rounded-xl p-0 flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-2 mb-4 px-2">
        {messages.length === 0 ? (
          <p className="text-center text-gray-400 mt-10 flex flex-col items-center">
            <Image src={ChatEmptyImage} alt="chat" />
            <span className="mt-2 text-black dark:text-white">No Messages Here Yet</span>
          </p>
        ) : (
          <>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-1 text-xs font-normal rounded-lg max-w-[70%] ${
                    msg.sender === "me" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} /> 
          </>
        )}
      </div>

      <div className="flex gap-2 px-2 pb-2">
        <Input
          type="text"
          placeholder="Type here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={sendMessage}
        >
          <SendHorizonal size={18} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
