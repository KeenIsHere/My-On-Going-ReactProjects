import React from 'react';
import { useState } from 'react';
import { playSound } from '../utils/sound';

const QuizCard = ({ question, options, answer, onNext, updateScore }) => {
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleCheck = (option) => {
    if (selected !== null) return;
    
    setSelected(option);
    const correct = option === answer;
    setIsCorrect(correct);
    
    // Play generated sound
    playSound(correct ? "correct" : "wrong");
    updateScore(correct);
  };

  return (
    <div className="quiz-card">
      <h2>{question}</h2>
      <div className="options">
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleCheck(option)}
            className={`option 
              ${selected === option ? (isCorrect ? 'correct' : 'wrong') : ''}
              ${selected !== null && option === answer ? 'correct' : ''}
            `}
            disabled={selected !== null}
          >
            {option}
          </button>
        ))}
      </div>
      {selected !== null && (
        <button onClick={onNext} className="next-btn">
          Next Question
        </button>
      )}
    </div>
  );
};

export default QuizCard;