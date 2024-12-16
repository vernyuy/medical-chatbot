import { useEffect, useState } from 'react'
import './App.css'
import { Interactions } from '@aws-amplify/interactions';
import { Amplify } from 'aws-amplify';
import { Button, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from './amplifyconfiguration.json';

Amplify.configure(config);

function App({ signOut, user }) {


  const [lexRes, setLexRes] = useState([]);
  let questions = []
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);

  const [letsChat, setLetsChat] = useState(false);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setMessages([...messages, userInput]);
      questions = [...questions, userInput]
      chat(userInput)
      console.log(questions);
      setUserInput("");
    }
  };

  const chat = async (userInput) => {
    console.log("I'm ccallled")
    const response = await Interactions.send({
      botName: "MedicalChatbot",
      message: userInput,
    });
    console.log(response)
    setLexRes(response.messages[0].content)
    setLetsChat(true)
  }

  return (
    <>
      <div>
        <div className='user'>
          <div>Hi!<h3>{user?.username}</h3></div>
          <button onClick={signOut}>Sign out</button>
        </div>
        <div className="chat-container">
          <div className="chat-box">

            <h1 className="chat-title">Welcome To AnyCompany Health</h1>
            <div>
              <div className="messages-container">
                {messages.map((message, index) => (
                  <div key={index} className="message">
                    {message}
                  </div>
                ))}
              </div>
            </div>
            <div>
              {
                lexRes
              }
            </div>
            {
              letsChat ? <>
                <div className="chat-input">
                  <input
                    type="text"
                    placeholder="AnyCompany Health Chatbot "
                    className="chat-textbox"
                    value={userInput}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                  />
                  <div className="chat-icons">
                    <button className="icon-button">📎</button>
                    <button className="icon-button">🎁</button>
                    <button className="icon-button">🎙️</button>
                  </div>
                </div>
              </> : <button onClick={() => chat('Hi')}>Start Chat</button>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default withAuthenticator(App);

