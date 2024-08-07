// src/components/Result.js
import React from 'react';
import { useQuiz } from '../Context';


function Result() {
  const { score, setQuizState, setScore, setCurrentQuestion } = useQuiz();

  const handlePlayAgain = () => {
    setScore(0);
    setCurrentQuestion(0);
    setQuizState('playing');
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-3xl filter rounded-lg shadow-lg p-8 text-center">
      <h2 className="text-2xl font-bold mb-4 text-white">Quiz Completed!</h2>
      <p className="text-xl mb-6 text-white">Your Score: <span className="font-bold text-blue-400">{score}</span></p>
      <button 
        onClick={handlePlayAgain}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Play Again
      </button>
    </div>
  );
}

export default Result;