// src/App.js
import React from 'react';
import Quiz from './Components/Quiz';
import Result from './Components/Result';
import { QuizProvider, useQuiz } from './Context'
import Confetti from 'react-confetti'
function App() {
  return (
    <QuizProvider>
      <AppContent />
    </QuizProvider>
  );
}

function AppContent() {
  const { quizState , setQuizState ,score} = useQuiz();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-950 flex flex-col items-center justify-center p-4">
      {score > 3 && quizState === 'finished' &&<Confetti run/>}
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Quiz App</h1>

        {quizState === 'landing' ? (
           <div className=" max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg filter backdrop-blur-lg bg-opacity-10 flex flex-col gap-3 justify-center items-center">
           <h1 className='text-xl font-bold text-white'>LET'S FIND YOUR KNOWLEDGE !!!</h1>
           <button className='bg-blue-600/55 text-white hover:bg-blue-700 p-3 rounded-md transition-colors duration-300 '
           onClick={()=>setQuizState('playing')}>
             START QUIZ
           </button>
         </div>
        ) : (
          quizState === 'playing' ? (<Quiz />):(<Result />)
        )}
       
      </div>
    </div>
  );
}

export default App;
