import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';

const Chatbox = ({ inputText, setInputText }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    const newMessages = [...messages, { text: inputText, user: 'user' }];
    setMessages(newMessages);
    setInputText('');

    setIsLoading(true);
    try {
      const response = await axios.post('/chatbot', { question: inputText });
      const botResponse = response.data.response;
      const botMessages = [...newMessages, { text: botResponse, user: 'bot' }];

      // Check if the user asked for example questions
      const exampleRegex = /\d+\./; // Regex to match numbers followed by a dot (e.g., 1., 2., etc.)
      if (exampleRegex.test(inputText)) {
        // If it's an example request, split the response into lines and format it
        const examples = botResponse.split('\n').filter(Boolean); // Filter out empty lines
        const exampleMessages = examples.map((example, index) => ({
          text: example,
          user: 'bot',
        }));
        setMessages([...newMessages, ...exampleMessages]);
      } else {
        // If it's not an example request, display the bot's response in a single paragraph
        setMessages(botMessages);
      }
    } catch (error) {
      console.error('Error sending the question:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInput = (e) => {
    setInputText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chatbox whenever new messages are added
    const chatbox = document.getElementById('chatbox');
    chatbox.scrollTop = chatbox.scrollHeight;
  }, [messages]);

  return (
    <div className="chatbox">
      <div id="chatbox" className="chatbox-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message message-${message.user}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chatbox-input">
        <input
          type="text"
          value={inputText}
          onChange={handleInput}
          onKeyPress={handleKeyPress}
          placeholder="Ask a question..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      {isLoading && (
        <div className="loading-spinner">
          <BallTriangle color="#007bff" height={24} width={24} />
        </div>
      )}
    </div>
  );
};

export default Chatbox;
