import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ChatBox from '../../components/ChatBox/ChatBox';
import ChatBoxMessage from '../../components/ChatBoxMessage/ChatBoxMessage';
import ChatBoxTitle from '../../components/ChatBoxTitle/ChatBoxTitle';
import ChatRoomTitle from '../../components/ChatRoomTitle/ChatRoomTitle';
import useChat from '../../utils/useChat';
import "./ChatRoom.css";

const style = {
    button: {
        fontSize: '2rem',
        border: '1px solid black',
        backgroundColor: 'white',
        padding: '.5em',
        marginLeft: '.5em',
        borderRadius: "5px"
    }
}

const ChatRoom = () => {
    const { name } = useParams();
    const [chatRoomTitle, setChatRoomTitle] = useState();
    const [userInfo, setUserInfo] = useState();
    const [sendNewMessage, setSendNewMessage] = useState("");
    const { messages, sendMessage } = useChat(name)
    
    useEffect(() => {
        setChatRoomTitle(name);
        const userObj = JSON.parse(localStorage.getItem("userInfo"));
        setUserInfo(userObj);
    }, []);

    const handleChange = e => setSendNewMessage(e.target.value);

    const handleSendMessage = (e) => {
        e.preventDefault();
        sendMessage(sendNewMessage);
        setSendNewMessage("");
    }

    return (
        <div>
            <Link to="/" style={style.button}>Leave Room</Link>
            <ChatRoomTitle title={chatRoomTitle} />
            <ChatBox>
                <ChatBoxTitle name={userInfo?.username} title={userInfo?.title} avatar={userInfo?.avatar}/>
                <ChatBoxMessage changeEvent={handleChange} messages={sendNewMessage} handleSubmit={handleSendMessage} messageList={messages} name={'me'}/>
            </ChatBox>
        </div>
    )
};

export default ChatRoom;