import io from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const socket = io("/");

function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Usuario seleccionado para chatear
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  // Scroll automático al recibir un nuevo mensaje
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Emitir el nombre del usuario al conectarse
    if (user) {
      socket.emit("userConnected", user.username);
    }

    // Manejar la recepción de mensajes privados
    const receivedPrivateMessage = (message) => {
      setMessages((state) => [...state, message]);
    };

    socket.on("privateMessage", receivedPrivateMessage);

    // Manejar la lista de usuarios conectados
    const updateUserList = (userList) => {
      const filteredUsers = userList.filter(
        (username) => username !== user.username
      );
      setUsers(filteredUsers);
    };

    socket.on("userList", updateUserList);

    return () => {
      socket.off("privateMessage", receivedPrivateMessage);
      socket.off("userList", updateUserList);
    };
  }, [user]);

  // Seleccionar un usuario para chatear
  const handleSelectUser = (username) => {
    setSelectedUser(username);
    setMessages([]); // Limpiar mensajes anteriores al cambiar de usuario
  };

  // Enviar mensaje privado
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim() || !selectedUser) return; // Evitar enviar mensajes vacíos o sin destinatario

    // Enviar el mensaje al servidor
    socket.emit("privateMessage", { to: selectedUser, body: message });

    setMessage(""); // Limpiar input
  };

  return (
    <div className="h-full flex gap-2">
      {/* Panel lateral con la lista de usuarios */}
      <div className="w-70 bg-white text-slate-600 rounded-r-2xl shadow-lg">
        <h2 className="text-2xl text-center font-bold w-full my-4">
          Users Connected
        </h2>
        <ul className="w-full font-bold">
          {users.map((username, i) => (
            <li
              key={i}
              className={`w-full m-1 p-4 flex items-center gap-2 rounded-r-lg hover:bg-gray-100 transition-colors cursor-pointer ${
                selectedUser === username ? "bg-gray-200" : ""
              }`}
              onClick={() => handleSelectUser(username)}
            >
              <p className="bg-green-600 w-2 h-2 rounded-full"></p>
              {username}
            </li>
          ))}
        </ul>
      </div>

      {/* Área de chat */}
      <div className="w-3/4 flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-[#c350a5] h-screen w-full p-6 flex flex-col justify-between rounded-2xl shadow-lg"
        >
          <ul className="overflow-y-auto flex-1">
            {messages.map((message, i) => (
              <li
                key={i}
                className={`my-2 p-3 table rounded-lg max-w-[80%] ${
                  message.from === "Me"
                    ? "bg-[#ff9e56] ml-auto"
                    : "bg-[#830f8e]"
                }`}
              >
                <span className="text-xs text-slate-200 block">
                  {message.from}
                </span>
                <span className="text-md text-white">{message.body}</span>
              </li>
            ))}
            <div ref={messagesEndRef} />{" "}
            {/* Referencia para el scroll automático */}
          </ul>
          <div className="flex items-center gap-3 mt-4">
            <input
              type="text"
              placeholder="Write your message..."
              className="border-2 p-2 w-full rounded-lg outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={!selectedUser} // Deshabilitar input si no hay usuario seleccionado
            />
            <button
              type="submit"
              className="hover:bg-[#97347d] w-12 h-10 border-2 rounded-2xl flex items-center justify-center transition-colors"
              disabled={!selectedUser} // Deshabilitar botón si no hay usuario seleccionado
            >
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="text-white text-[19px]"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatPage;
