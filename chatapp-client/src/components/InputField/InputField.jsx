import React, { useState, useEffect } from 'react'
import { Input } from "@mui/base/Input";
import { Button } from "@mui/base/Button";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import './InputField.css'

const InputField = ({message, setMessage, sendMessage}) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [inputElement, setInputElement] = useState(null);

  // 이모티콘 선택 시 메시지에 추가
  const addEmoji = (emoji) => {
    setMessage(prev => prev + emoji.native);
    setShowEmoji(false);
    if (inputElement) {
      inputElement.focus();
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey && message.trim()) {
      event.preventDefault();
      sendMessage(event);
    }
  };

  // showEmoji 상태가 변경될 때마다 포커스 설정
  useEffect(() => {
    if (inputElement) {
      inputElement.focus();
    }
  }, [showEmoji, inputElement]);

  return (
    <div className="input-area">
      <div className="plus-button">+</div>
        <form onSubmit={sendMessage} className="input-container">
        <div className="input-wrapper">
          <Input
            slotProps={{
              input: {
                ref: setInputElement
              }
            }}
            placeholder="Type in here…"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={handleKeyPress}
            multiline={false}
            rows={1}
          />
          <div className="emoji-button" onClick={() => setShowEmoji(!showEmoji)}>
            😊
          </div>
        </div>
          {showEmoji && (
            <div className="emoji-picker-container">
              <Picker 
                data={data} 
                onEmojiSelect={addEmoji}
                theme="light"
                previewPosition="none"
                skinTonePosition="none"
                maxFrequentRows={2}
              />
            </div>
          )}
          <Button
            type="submit"
            disabled={!message.trim()}
            className="send-button"
          >
            전송
          </Button>
        </form>
      </div>
  )
}

export default InputField