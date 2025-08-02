

# Quiz App 🧠✨

An interactive quiz application built with React that features dynamic question loading, real-time scoring, and comprehensive result analytics with multiple quiz categories and difficulty levels.

## 🎯 Overview

The Quiz App is a comprehensive React application that demonstrates advanced state management, API integration, and interactive user interfaces. It provides an engaging quiz experience with multiple categories, difficulty levels, and detailed performance analytics.

## ✨ Features

### Core Quiz Features
- **Multiple Categories**: Science, History, Sports, Entertainment, Geography, and more
- **Difficulty Levels**: Easy, Medium, and Hard questions
- **Question Types**: Multiple choice, True/False, and Fill-in-the-blank
- **Timer System**: Configurable time limits per question
- **Progress Tracking**: Visual progress bar and question counter
- **Instant Feedback**: Immediate response validation with explanations

### Advanced Features
- **Adaptive Difficulty**: Questions adjust based on performance
- **Streak Tracking**: Monitor consecutive correct answers
- **Lifelines**: 50/50, Ask the Audience, and Skip Question
- **Custom Quizzes**: Create and share your own quizzes
- **Multiplayer Mode**: Compete with friends in real-time
- **Offline Support**: Download quizzes for offline play

### Analytics & Reporting
- **Detailed Results**: Comprehensive performance breakdown
- **Progress History**: Track improvement over time
- **Category Analysis**: Strengths and weaknesses by topic
- **Leaderboards**: Global and friend rankings
- **Achievement System**: Unlock badges and milestones
- **Export Results**: Download detailed reports

## 🛠️ Technologies Used

### Core Technologies
- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Type-safe development and better code quality
- **React Router**: Multi-page navigation and routing
- **Context API**: Global state management for quiz data
- **React Query**: Server state management and caching

### UI/UX Libraries
- **Styled Components**: Dynamic styling with theme support
- **Framer Motion**: Smooth animations and page transitions
- **React Spring**: Physics-based animations
- **React Confetti**: Celebration effects for achievements
- **React Circular Progressbar**: Visual progress indicators

### Data & APIs
- **Open Trivia DB**: Free trivia questions API
- **JSONPlaceholder**: Mock API for custom quizzes
- **Local Storage**: Offline data persistence
- **IndexedDB**: Advanced client-side database

### Testing & Quality
- **Jest**: Unit and integration testing
- **React Testing Library**: Component testing utilities
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- Internet connection for quiz data (optional for offline mode)

### Installation

1. **Navigate to the project directory**
   ```bash
   cd My-On-Going-ReactProjects/QuizApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
QuizApp/
├── public/
│   ├── quizzes/            # Offline quiz data
│   ├── sounds/             # Audio feedback files
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Quiz/
│   │   │   ├── QuizSetup.jsx
│   │   │   ├── QuestionCard.jsx
│   │   │   ├── AnswerOptions.jsx
│   │   │   ├── QuizProgress.jsx
│   │   │   └── QuizTimer.jsx
│   │   ├── Results/
│   │   │   ├── ResultsScreen.jsx
│   │   │   ├── ScoreBreakdown.jsx
│   │   │   ├── PerformanceChart.jsx
│   │   │   └── ShareResults.jsx
│   │   ├── Common/
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ConfirmModal.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   └── Notification.jsx
│   │   └── Layout/
│   │       ├── Header.jsx
│   │       ├── Navigation.jsx
│   │       └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── QuizPage.jsx
│   │   ├── ResultsPage.jsx
│   │   ├── Leaderboard.jsx
│   │   ├── Profile.jsx
│   │   └── Settings.jsx
│   ├── hooks/
│   │   ├── useQuiz.js
│   │   ├── useTimer.js
│   │   ├── useLocalStorage.js
│   │   ├── useSound.js
│   │   └── useAnalytics.js
│   ├── context/
│   │   ├── QuizContext.js
│   │   ├── UserContext.js
│   │   └── ThemeContext.js
│   ├── services/
│   │   ├── quizAPI.js
│   │   ├── userService.js
│   │   ├── analyticsService.js
│   │   └── storageService.js
│   ├── utils/
│   │   ├── helpers.js
│   │   ├── constants.js
│   │   ├── validators.js
│   │   └── formatters.js
│   ├── types/
│   │   ├── quiz.types.ts
│   │   ├── user.types.ts
│   │   └── api.types.ts
│   ├── styles/
│   │   ├── GlobalStyles.js
│   │   ├── theme.js
│   │   └── animations.js
│   ├── App.jsx
│   └── index.js
├── package.json
└── README.md
```

## 🔧 Key Components

### Main Quiz Hook
```jsx
import { useState, useEffect, useReducer } from 'react';
import { fetchQuizData } from '../services/quizAPI';

const quizReducer = (state, action) => {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload, loading: false };
    case 'NEXT_QUESTION':
      return { ...state, currentQuestion: state.currentQuestion + 1 };
    case 'ANSWER_QUESTION':
      return {
        ...state,
        answers: [...state.answers, action.payload],
        score: action.payload.correct ? state.score + 1 : state.score
      };
    case 'RESET_QUIZ':
      return { ...initialState };
    default:
      return state;
  }
};

const initialState = {
  questions: [],
  currentQuestion: 0,
  answers: [],
  score: 0,
  loading: true,
  timeRemaining: 30
};

export const useQuiz = (category, difficulty, amount) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const questions = await fetchQuizData(category, difficulty, amount);
        dispatch({ type: 'SET_QUESTIONS', payload: questions });
      } catch (error) {
        console.error('Failed to load quiz:', error);
      }
    };

    loadQuiz();
  }, [category, difficulty, amount]);

  const answerQuestion = (answer) => {
    const currentQ = state.questions[state.currentQuestion];
    const isCorrect = answer === currentQ.correct_answer;
    
    dispatch({
      type: 'ANSWER_QUESTION',
      payload: {
        questionId: currentQ.id,
        answer,
        correct: isCorrect,
        timeSpent: 30 - state.timeRemaining
      }
    });

    if (state.currentQuestion + 1 < state.questions.length) {
      dispatch({ type: 'NEXT_QUESTION' });
    } else {
      setIsComplete(true);
    }
  };

  const resetQuiz = () => {
    dispatch({ type: 'RESET_QUIZ' });
    setIsComplete(false);
  };

  return {
    ...state,
    isComplete,
    answerQuestion,
    resetQuiz,
    progress: ((state.currentQuestion) / state.questions.length) * 100
  };
};
```

### Question Card Component
```jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const QuestionContainer = styled(motion.div)`
  background: ${props => props.theme.cardBackground};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin: 1rem 0;
`;

const QuestionText = styled.h2`
  font-size: 1.5rem;
  color: ${props => props.theme.textPrimary};
  margin-bottom: 2rem;
  line-height: 1.4;
`;

const AnswerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const AnswerButton = styled(motion.button)`
  padding: 1rem 1.5rem;
  border: 2px solid ${props => props.theme.primary};
  border-radius: 12px;
  background: ${props => props.selected ? props.theme.primary : 'transparent'};
  color: ${props => props.selected ? 'white' : props.theme.primary};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.primary};
    color: white;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const QuestionCard = ({ question, onAnswer, timeRemaining }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    // Shuffle answers to prevent pattern recognition
    const answers = [...question.incorrect_answers, question.correct_answer];
    setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
  }, [question]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer);
      setSelectedAnswer('');
    }
  };

  // Auto-submit when time runs out
  useEffect(() => {
    if (timeRemaining === 0 && selectedAnswer) {
      handleSubmit();
    }
  }, [timeRemaining]);

  return (
    <AnimatePresence mode="wait">
      <QuestionContainer
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -300 }}
        transition={{ duration: 0.3 }}
      >
        <QuestionText 
          dangerouslySetInnerHTML={{ __html: question.question }}
        />
        
        <AnswerGrid>
          {shuffledAnswers.map((answer, index) => (
            <AnswerButton
              key={index}
              selected={selectedAnswer === answer}
              onClick={() => handleAnswerSelect(answer)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          ))}
        </AnswerGrid>

        <motion.button
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          style={{
            marginTop: '2rem',
            padding: '1rem 2rem',
            backgroundColor: selectedAnswer ? '#4CAF50' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            cursor: selectedAnswer ? 'pointer' : 'not-allowed'
          }}
          whileHover={selectedAnswer ? { scale: 1.05 } : {}}
        >
          Submit Answer
        </motion.button>
      </QuestionContainer>
    </AnimatePresence>
  );
};

export default QuestionCard;
```

### Timer Component
```jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const TimerContainer = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
`;

const TimerText = styled.div`
  text-align: center;
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => props.urgent ? '#ff4444' : props.theme.textPrimary};
`;

const QuizTimer = ({ initialTime, onTimeUp, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const isUrgent = timeLeft <= 10;

  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, onTimeUp]);

  const percentage = (timeLeft / initialTime) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <TimerContainer>
        <CircularProgressbar
          value={percentage}
          text={`${minutes}:${seconds.toString().padStart(2, '0')}`}
          styles={buildStyles({
            textColor: isUrgent ? '#ff4444' : '#333',
            pathColor: isUrgent ? '#ff4444' : '#4CAF50',
            trailColor: '#f0f0f0',
            textSize: '16px'
          })}
        />
      </TimerContainer>
      
      {isUrgent && (
        <TimerText urgent>
          Time running out!
        </TimerText>
      )}
    </div>
  );
};

export default QuizTimer;
```

## 🎮 Game Features

### Scoring System
- **Correct Answer**: +10 points (base score)
- **Time Bonus**: +1 point per second remaining
- **Streak Bonus**: +5 points for consecutive correct answers
- **Difficulty Multiplier**: Easy (1x), Medium (1.5x), Hard (2x)

### Lifelines
- **50/50**: Remove two incorrect answers
- **Skip Question**: Move to next question without penalty
- **Extra Time**: Add 15 seconds to current question

### Achievement System
- 🏆 **Perfect Score**: Answer all questions correctly
- 🔥 **Speed Demon**: Complete quiz in under 2 minutes
- 📚 **Scholar**: Score 90%+ in Hard difficulty
- 🎯 **Sharpshooter**: 10 consecutive correct answers
- 🌟 **Jack of All Trades**: Complete quizzes in 5 different categories

## 📊 Analytics Dashboard

### Performance Metrics
```jsx
// Example analytics data structure
const analyticsData = {
  totalQuizzes: 45,
  averageScore: 78.5,
  bestCategory: 'Science',
  weakestCategory: 'History',
  streakRecord: 15,
  timeSpentStudying: '12h 34m',
  accuracyTrend: [65, 70, 75, 78, 82, 78],
  categoryBreakdown: {
    Science: { attempted: 12, average: 85 },
    History: { attempted: 8, average: 72 },
    Sports: { attempted: 10, average: 80 }
  }
};
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch

# Run specific test suite
npm test -- QuizComponent.test.js
```

### Test Coverage Areas
- ✅ Quiz flow and state management
- ✅ Timer functionality
- ✅ Scoring calculations
- ✅ API error handling
- ✅ User interaction scenarios
- ✅ Performance benchmarks

## 🎨 Customization

### Theme Configuration
```javascript
const lightTheme = {
  primary: '#2196F3',
  secondary: '#FF9800',
  success: '#4CAF50',
  error: '#F44336',
  background: '#ffffff',
  cardBackground: '#f8f9fa',
  textPrimary: '#333333',
  textSecondary: '#666666'
};

const darkTheme = {
  primary: '#64B5F6',
  secondary: '#FFB74D',
  success: '#81C784',
  error: '#E57373',
  background: '#121212',
  cardBackground: '#1e1e1e',
  textPrimary: '#ffffff',
  textSecondary: '#aaaaaa'
};
```

## 🚀 Performance Optimization

- **React.memo**: Prevent unnecessary re-renders
- **Code Splitting**: Lazy load components with React.lazy
- **Image Optimization**: WebP format with fallbacks
- **Caching**: Service worker for offline functionality
- **Bundle Analysis**: Webpack bundle analyzer for optimization

## 🔮 Future Enhancements

- [ ] **Voice Questions**: Audio-based quiz questions
- [ ] **Video Integration**: Video clips as question context
- [ ] **Social Features**: Study groups and challenges
- [ ] **AI Question Generation**: Custom AI-generated questions
- [ ] **Adaptive Learning**: Personalized difficulty adjustment
- [ ] **Mobile App**: React Native version
- [ ] **VR Mode**: Virtual reality quiz experience

## 🤝 Contributing

We welcome contributions! Please check our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Add tests for new features
4. Ensure all tests pass
5. Submit a pull request

## 📚 Learning Outcomes

This project demonstrates:
- **Complex State Management**: useReducer and Context API
- **API Integration**: External data fetching and caching
- **Performance Optimization**: Memoization and lazy loading
- **Animation Libraries**: Framer Motion and React Spring
- **Testing Strategies**: Unit, integration, and e2e testing
- **TypeScript Integration**: Type safety in React applications

## 🔗 Related Projects

- [Counter App](../Counter) - Basic React state management
- [Todo List](../ToDoList) - CRUD operations and forms
- [AI Journal](../AIJournal) - Advanced AI integration
- [Face Detection](../FaceDetection) - Camera and ML integration

---

**Challenge Your Mind 🧠 | Learn While Playing 🎮 | Track Your Progress 📈**
