const express = require('express');
const socket = require('socket.io');
const PORT = process.env.PORT || 3001;
const cors = require('cors');

const app = express(),
      server = app.listen(PORT, () => console.log("Server is listening on " + PORT));

app.use(cors())
// Socket io Initialization
const io = socket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

io.on("connection", socket => {
    console.log("Socket now connected");

    const { roomName } = socket.handshake.query;
    socket.join(roomName);

    // Listens for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, data => io.in(roomName).emit(NEW_CHAT_MESSAGE_EVENT, data));

    // Leave the room if user closes the socket
    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        socket.leave(roomName);
    });
});


// Goes into LandingPage page
// const style = {
//     wrapper: {
//         margin: "0 auto",
//         marginTop: '12em',
//         width: '50em',
//         textAlign: 'center'
//     },
//     h1Title: {
//         fontSize: '100px',
//         fontWeight: 200,
//         border: "3px solid #c88b96",
//         borderRadius: '3px',
//         marginBottom: '.25em',
//         backgroundColor: '#252830',
//         color: '#c88b96'
//     },
//     input: {
//         fontSize: '2rem',
//         borderRadius: '5px',
//         border: '1px solid #c88b96'
//     }
// };

// Goes into ChatRoom Page
// const style = {
//     button: {
//         fontSize: '2rem',
//         border: '1px solid black',
//         backgroundColor: 'white',
//         padding: '.5em',
//         marginLeft: '.5em',
//         borderRadius: "5px"
//     }
// }