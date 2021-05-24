import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ChatRoomTitle from "../../components/ChatRoomTitle/ChatRoomTitle";
import ChatBox from "../../components/ChatBox/ChatBox";
import ChatBoxTitle from "../../components/ChatBoxTitle/ChatBoxTitle";
import ChatBoxMessage from "../../components/ChatBoxMessage/ChatBoxMessage";
import useChat from "../../utils/useChat";
import "./ChatRoom.css";
const style = {
  button: {
    fontSize: "2rem",
    border: "1px solid black",
    backgroundColor: "white",
    padding: ".5em",
    marginLeft: ".5em",
    borderRadius: "5px",
  },
};

const ChatRoom = () => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState();
  const [sendNewMessage, setSendNewMessage] = useState();
  const { messages, sendMessage } = useChat(id);

  useEffect(() => {
    const userObj = JSON.parse(localStorage.getItem("userInfo"));
    setUserInfo(userObj);
  }, []);

  const handleChange = (e) => setSendNewMessage(e.target.value);

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage(sendNewMessage);
    setSendNewMessage("");
  };

  return (
    <>
      <Link to="/" style={style.button}>
        Return to Main Page
      </Link>
      <ChatRoomTitle title={id} />
      <ChatBox>
        <ChatBoxTitle
          name={userInfo?.username}
          title={userInfo?.title}
          avatar={userInfo?.avatar}
        />
        <ChatBoxMessage
          changeEvent={handleChange}
          messages={sendNewMessage}
          messageList={messages}
          handleSubmit={handleSendMessage}
          ownerName={userInfo?.username}
        />
      </ChatBox>
    </>
  );
};

export default ChatRoom;
