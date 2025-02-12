export const configureSockets = (io) => {
  let users = []; // Almacenar objetos { socketId, username }

  io.on("connection", (socket) => {
    console.log(`Client connected ${socket.id}`);

    // Escuchar el evento "userConnected" desde el frontend
    socket.on("userConnected", (username) => {
      // Verificar si el usuario ya está en la lista
      const userExists = users.some((user) => user.username === username);
      if (!userExists) {
        // Agregar usuario a la lista de usuarios conectados
        users.push({ socketId: socket.id, username });
      }

      // Emitir la lista de usuarios a todos los clientes
      io.emit(
        "userList",
        users.map((user) => user.username)
      );
    });

    // Manejar mensajes privados
    socket.on("privateMessage", ({ to, body }) => {
      const recipient = users.find((user) => user.username === to);
      const sender = users.find((user) => user.socketId === socket.id);

      if (recipient && sender) {
        // Enviar el mensaje al destinatario
        io.to(recipient.socketId).emit("privateMessage", {
          body,
          from: sender.username,
        });

        // Enviar el mensaje al remitente (para que lo vea en su chat)
        io.to(socket.id).emit("privateMessage", {
          body,
          from: "Me",
        });
      }
    });

    // Manejar desconexión
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      users = users.filter((user) => user.socketId !== socket.id);
      io.emit(
        "userList",
        users.map((user) => user.username)
      ); // Enviar lista actualizada
    });
  });
};
