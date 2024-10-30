import { useEffect } from "react";
import "./App.css";
import socket from "./server";
import InputField from "./components/InputField/InputField";
import MessageContainer from "./components/MessageContainer/MessageContainer";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  console.log("messageList : ", messageList);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessageList((prevState) => prevState.concat(message));
      // setMessageList([...messageList, message]);
    });

    askUserName();

  }, []);

  const askUserName =  () =>{
    const userName = prompt("Enter your name");
    console.log("userName : ", userName);

    socket.emit("login", userName, (response) => {
      if(response?.ok){
        setUser(response.data);
      }
    });
  }

  const sendMessage = (event) => {
    event.preventDefault();
    // 메세지 전송
    socket.emit("sendMessage", message, (response) => {
      console.log("response : ", response);
    });
    setMessage('');
  };

  return (
    <div>
      <div className="App">
        <MessageContainer messageList={messageList} user={user} />
        <InputField 
        message={message} 
        setMessage={setMessage} 
        sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

export default App;
