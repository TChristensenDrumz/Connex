import { useState, useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage'; // Name of Event
const SOCKET_SERVER_ENDPOINT = "https://connexchatapp.herokuapp.com/";

const useChat = (roomName) => {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();
    useEffect(() => {
        // Create our websocket connection
        socketRef.current = socketIOClient(SOCKET_SERVER_ENDPOINT, {
            query: { roomName }
        });

        // Listen for incoming messages and set them to our messages array
        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
            const incomingMessages = {
                ...messages,
                ownedByCurrentUser: message.senderId === socketRef.current.id,
                body: message.body
            };
            setMessages((messages) => [...messages, incomingMessages])
        });

        // Destroy socket when the connection is closed
        return () => {
            socketRef.current.disconnect();
        };
    }, [roomName]);

    // Send messages to the server so everyone can see it
    const sendMessage = messageContent => {
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            body: messageContent,
            senderId: socketRef.current.id
        });
    };

    return { messages, sendMessage };
};

export default useChat;