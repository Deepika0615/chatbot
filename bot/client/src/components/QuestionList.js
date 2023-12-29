import React from 'react';

const questions = [
  'What are the symptoms of a heart attack?',
  'What are the symptoms of liver failure?',
  'What are the symptoms of a stroke?',
  'What are the symptoms of kidney failure?',
  'What are the symptoms of diabetes?',
];

const QuestionList = ({ onClick }) => {
  return (
    <div className="question-list">
      {questions.map((question, index) => (
        <div key={index} onClick={() => onClick(question)} className="question-item">
          {question}
        </div>
      ))}
    </div>
  );
};

export default QuestionList;

