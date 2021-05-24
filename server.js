const express = require("express");
const session = require("express-session");
const socket = require("socket.io");
const cors = require("cors");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));

const server = app.listen(PORT, () =>
  console.log("Server is listening on " + PORT)
);

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
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    socket.leave(roomName);
  });
});
