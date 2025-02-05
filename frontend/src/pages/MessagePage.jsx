import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("/");

function MessagePage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const receivedMessage = (message) =>
      setMessages((state) => [...state, message]);

    socket.on("message", receivedMessage);

    return () => {
      socket.off("message", receivedMessage);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) return; // Evitar enviar mensajes vacíos

    const newMessage = { body: message, from: "Me" };
    
    setMessages([...messages, newMessage]);
    socket.emit("message", message);
    
    setMessage(""); // Limpiar input
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-[#c350a5] p-10 rounded-lg">
        <h1 className="text-2xl font-bold my-2">HeyNow</h1>
        <input
          type="text"
          placeholder="Write your message..."
          className="border-2 p-2 w-full rounded-lg outline-none"
          value={message} // Asegurar que el input se limpie después de enviar
          onChange={(e) => setMessage(e.target.value)}
        />
        <ul>
          {messages.map((message, i) => (
            <li
              key={i}
              className={`my-2 p-2 table rounded-lg ${
                message.from === "Me" ? "bg-[#ff9e56] ml-auto" : "bg-[#830f8e]"
              }`}
            >
              <span className="text-xs text-slate-400 block">{message.from}</span>
              <span className="text-md">{message.body}</span>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default MessagePage;
