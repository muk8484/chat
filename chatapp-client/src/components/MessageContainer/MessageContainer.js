import React, { useState } from "react";
import "./MessageContainer.css";
import { Container } from "@mui/system";

const MessageContainer = ({ messageList, user }) => {
  return (
    <div>
      {messageList.map((message, index) => {

        // 이전 메시지와 현재 메시지의 사용자가 다른 경우에만 이름 표시
        const showName = index === 0 || 
          messageList[index - 1].user.name !== message.user.name;

        return (
          <Container key={`${message._id}-${index}`} className="message-container">
            {message.user.name === "system" ? (
              <div className="system-message-container">
                <p className="system-message">{message.chat}</p>
              </div>
            ) : message.user.name === user.name ? (
              <div className="my-message-container">
                <div className="my-message">{message.chat}</div>
              </div>
            ) : (
              <div className="your-message-container">
                <img
                  src="/profile.jpeg"
                  className="profile-image"
                  style={
                    (index === 0
                      ? { visibility: "visible" }
                      : messageList[index - 1].user.name === user.name) ||
                    messageList[index - 1].user.name === "system"
                      ? { visibility: "visible" }
                      : { visibility: "hidden" }
                  }
                />
                {showName && (
                  <span className="user-name">{message.user.name}</span>
                )}
                <div className="your-message">{message.chat}</div>
              </div>
            )}
          </Container>
        );
      })}
    </div>
  );
};

export default MessageContainer;
