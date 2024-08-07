import React, { useContext, useState } from 'react';
import { QuizContext } from '../Context';

const Question = ({ question }) => {
  const { setScore, nextQuestion } = useContext(QuizContext);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleAnswer = (option) => {
    setSelectedOption(option);
    if (option === question.answer) {
      setScore((prevScore) => prevScore + 1);
    }
    setTimeout(() => nextQuestion(), 5000);
  };

  return (
    <div className="question text-center">
      <h2 className="text-2xl font-bold mb-6">{question.question}</h2>
      <div className="options grid grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-lg font-medium text-white ${
              selectedOption === option ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            onClick={() => handleAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
