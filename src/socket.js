export const configureSockets = (io) => {
    io.on("connection", (socket) => {
      console.log(`Client connected ${socket.id}`);
  
      // Recibir mensaje del frontend y reenviarlo
      socket.on("message", (body) => {
        console.log(`Message received: ${body}`);
        socket.broadcast.emit("message", {
          body,
          from: socket.id.slice(6),
        });
      });
  
      // Manejar desconexión
      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  };
  