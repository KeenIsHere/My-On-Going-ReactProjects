import { useState } from 'react';
import { quizData } from './data/quizData';
import QuizCard from './components/QuizCard';
import Scoreboard from './components/Scoreboard';
import './App.css';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScoreboard, setShowScoreboard] = useState(false);

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScoreboard(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScoreboard(false);
  };

  return (
    <div className="app">
      <h1>React Quiz Game</h1>
      {showScoreboard ? (
        <Scoreboard 
          score={score} 
          totalQuestions={quizData.length} 
          resetQuiz={resetQuiz} 
        />
      ) : (
        <QuizCard
          question={quizData[currentQuestion].question}
          options={quizData[currentQuestion].options}
          answer={quizData[currentQuestion].answer}
          onNext={handleNext}
          updateScore={(isCorrect) => isCorrect && setScore(score + 1)}
        />
      )}
    </div>
  );
}

export default App;