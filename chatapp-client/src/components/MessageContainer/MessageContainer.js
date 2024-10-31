import React from "react";
import "./MessageContainer.css";
import { Container } from "@mui/system";

const MessageContainer = ({ messageList, user }) => {
  return (
    <div>
      {messageList.map((message, index) => {

        // 이전 메시지와 현재 메시지의 사용자가 다른 경우에만 이름 표시
        const showName = index === 0 || 
          messageList[index - 1].user.name !== message.user.name;

        // 프로필 이미지와 이름을 표시할지 결정하는 함수
        const shouldShowProfileImage = () => {
          if (index === 0) return true;
          const prevUserName = messageList[index - 1].user.name;
          return prevUserName !== message.user.name && message.user.name !== "system";
        };

        // 고유한 key 생성
        const uniqueKey = `${message._id}-${index}-${message.user.name}`;

        return (
          <Container key={uniqueKey} className="message-container">
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
                {shouldShowProfileImage() && (
                  <img src="/profile.jpeg" className="profile-image" alt="profile" />
                )}
                {showName && <span className="user-name">{message.user.name}</span>}
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
