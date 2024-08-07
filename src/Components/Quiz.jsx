// src/components/Quiz.js
import React, { useState, useEffect } from 'react';
import { useQuiz } from '../Context';
import questions from '../Components/Questions';

function Quiz() {
  const { setQuizState, setScore, currentQuestion, setCurrentQuestion } = useQuiz();
  const [timeLeft, setTimeLeft] = useState(5);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(null);
    }
  }, [timeLeft, showResult]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prevQuestion => prevQuestion + 1);
        setTimeLeft(5);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizState('finished');
      }
    }, 5000);
  };

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className=" max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg filter backdrop-blur-lg bg-opacity-10">
      <h2 className="text-2xl font-bold mb-4 text-white/70">Question {currentQuestion + 1}</h2>
      <p className="text-lg mb-4 text-white/70 ">{currentQuestionData.question}</p>
      <p className="text-sm font-semibold mb-4 text-white/70">Time left: {timeLeft} seconds</p>
      <div className="grid grid-cols-1 gap-4 mb-4">
        {currentQuestionData.options.map((option, index) => (
          <button 
            key={index} 
            onClick={() => !showResult && handleAnswer(option)}
            disabled={showResult}
            className={`p-3 rounded-md transition-colors duration-300 ${
              showResult
                ? option === currentQuestionData.correctAnswer
                  ? 'bg-green-600 text-white'
                  : option === selectedAnswer
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-700 text-gray-300'
                : 'bg-blue-600/55 text-white hover:bg-blue-700'
            } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {option}
          </button>
        ))}
      </div>
      {showResult && (
        <p className={`text-center font-semibold ${
          selectedAnswer === currentQuestionData.correctAnswer 
            ? 'text-green-400' 
            : 'text-red-400'
        }`}>
          {selectedAnswer === currentQuestionData.correctAnswer 
            ? 'Correct!' 
            : `Incorrect. The correct answer is ${currentQuestionData.correctAnswer}.`}
        </p>
      )}
    </div>
  );
}

export default Quiz;