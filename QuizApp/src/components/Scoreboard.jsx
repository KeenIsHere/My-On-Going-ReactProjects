import Confetti from 'react-confetti';

const Scoreboard = ({ score, totalQuestions, resetQuiz }) => {
  return (
    <div className="scoreboard">
      {score === totalQuestions && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <h2>Your Score: {score}/{totalQuestions}</h2>
      {score === totalQuestions ? (
        <h3>🎉 Perfect! You're a genius!</h3>
      ) : score > totalQuestions / 2 ? (
        <h3>👍 Good job!</h3>
      ) : (
        <h3>😅 Keep practicing!</h3>
      )}
      <button onClick={resetQuiz} className="reset-btn">
        Play Again
      </button>
    </div>
  );
};

export default Scoreboard;