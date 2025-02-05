import app from "./app.js";
import { connectDB } from "./db.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { configureSockets } from "./socket.js"; // Importamos la configuración de sockets

connectDB();

const port = 3010;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Pasamos la instancia de `io` a la función de configuración
configureSockets(io);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
