import React from "react";

const ChatBoxTitle = props => {
    return (
        <div className="chat-title">
            <h1>{props.name}</h1>
            <h2>{props.title}</h2>
            <figure className="avatar">
                <img src={props.avatar} alt="avatar" />
            </figure>
        </div>
    )
};

export default ChatBoxTitle;