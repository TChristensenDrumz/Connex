const express = require("express");
const socket = require("socket.io");
const PORT = process.env.PORT || 3001;
const cors = require("cors");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const app = express(),
  server = app.listen(PORT, () =>
    console.log("Server is listening on " + PORT)
  );

app.use(cors());
// Socket io Initialization
const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

io.on("connection", (socket) => {
  console.log("Socket now connected");

  const { roomName } = socket.handshake.query;
  socket.join(roomName);

  // Listens for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) =>
    io.in(roomName).emit(NEW_CHAT_MESSAGE_EVENT, data)
  );

  // Leave the room if user closes the socket
  socket.on("disconnect", () => socket.leave(roomName));
});
