import React, { useState } from 'react';
import './App.css';
import Chatbox from './components/Chatbox';
import QuestionList from './components/QuestionList';
import './components/Chatbox.css';

function App() {
  const [inputText, setInputText] = useState('');

  const handleQuestionClick = (question) => {
    setInputText(question);
  };

  return (
    <div className="App">
      <h1>Biomedical Chatbot</h1>
      <div className="container">
        <QuestionList onClick={handleQuestionClick} />
        <Chatbox inputText={inputText} setInputText={setInputText} />
      </div>
    </div>
  );
}

export default App;
