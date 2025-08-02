# Counter App 🔢

A simple yet feature-rich counter application built with React to demonstrate fundamental React concepts including state management, event handling, and component lifecycle.

## 🎯 Overview

The Counter App is a beginner-friendly React project that showcases essential React concepts while providing a clean, intuitive user interface. Despite its simplicity, this app includes several advanced features that make it a comprehensive learning tool for React fundamentals.

## ✨ Features

### Core Functionality
- **Increment/Decrement**: Basic counter operations with +/- buttons
- **Reset**: Reset counter to zero with a single click
- **Custom Step**: Set custom increment/decrement values
- **Keyboard Support**: Use arrow keys for quick operations
- **Value Input**: Directly set counter value via input field

### Enhanced Features
- **Multiple Counters**: Create and manage multiple independent counters
- **Counter History**: Track all changes with undo/redo functionality
- **Animations**: Smooth transitions and visual feedback
- **Themes**: Light and dark mode support
- **Persistence**: Save counter state in localStorage
- **Limits**: Set minimum and maximum counter values

### User Experience
- **Responsive Design**: Works perfectly on all screen sizes
- **Accessibility**: Full keyboard navigation and screen reader support
- **Visual Feedback**: Color-coded values (positive/negative/zero)
- **Sound Effects**: Optional audio feedback for operations
- **Haptic Feedback**: Vibration support on mobile devices

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks and functional components
- **useState**: State management for counter values
- **useEffect**: Side effects and lifecycle management
- **useReducer**: Complex state management for multiple counters
- **CSS3**: Modern styling with flexbox and grid
- **CSS Modules**: Scoped styling for components
- **Local Storage API**: Data persistence across sessions

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Navigate to the project directory**
   ```bash
   cd My-On-Going-ReactProjects/Counter
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
Counter/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Counter/
│   │   │   ├── Counter.jsx
│   │   │   ├── Counter.module.css
│   │   │   └── Counter.test.js
│   │   ├── CounterControls/
│   │   │   ├── CounterControls.jsx
│   │   │   └── CounterControls.module.css
│   │   ├── CounterDisplay/
│   │   │   ├── CounterDisplay.jsx
│   │   │   └── CounterDisplay.module.css
│   │   └── ThemeToggle/
│   │       ├── ThemeToggle.jsx
│   │       └── ThemeToggle.module.css
│   ├── hooks/
│   │   ├── useCounter.js
│   │   ├── useLocalStorage.js
│   │   └── useKeyboard.js
│   ├── utils/
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── styles/
│   │   ├── globals.css
│   │   └── variables.css
│   ├── App.jsx
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## 🔧 Key Components

### Main Counter Component
```jsx
import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Counter = () => {
  const [count, setCount] = useLocalStorage('counter', 0);
  const [step, setStep] = useState(1);
  const [min, setMin] = useState(-Infinity);
  const [max, setMax] = useState(Infinity);

  const increment = () => {
    setCount(prev => Math.min(prev + step, max));
  };

  const decrement = () => {
    setCount(prev => Math.max(prev - step, min));
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="counter">
      <CounterDisplay value={count} />
      <CounterControls 
        onIncrement={increment}
        onDecrement={decrement}
        onReset={reset}
        step={step}
        onStepChange={setStep}
      />
    </div>
  );
};

export default Counter;
```

### Custom useCounter Hook
```jsx
import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useCounter = (initialValue = 0, options = {}) => {
  const { min = -Infinity, max = Infinity, step = 1 } = options;
  const [count, setCount] = useLocalStorage('counter', initialValue);
  const [history, setHistory] = useState([initialValue]);

  const increment = useCallback(() => {
    setCount(prev => {
      const newValue = Math.min(prev + step, max);
      setHistory(hist => [...hist, newValue]);
      return newValue;
    });
  }, [step, max, setCount]);

  const decrement = useCallback(() => {
    setCount(prev => {
      const newValue = Math.max(prev - step, min);
      setHistory(hist => [...hist, newValue]);
      return newValue;
    });
  }, [step, min, setCount]);

  const reset = useCallback(() => {
    setCount(initialValue);
    setHistory([initialValue]);
  }, [initialValue, setCount]);

  const setValue = useCallback((value) => {
    const clampedValue = Math.max(min, Math.min(max, value));
    setCount(clampedValue);
    setHistory(hist => [...hist, clampedValue]);
  }, [min, max, setCount]);

  return {
    count,
    increment,
    decrement,
    reset,
    setValue,
    history,
    canIncrement: count < max,
    canDecrement: count > min
  };
};
```

## 🎨 Styling Features

### CSS Modules Implementation
```css
/* Counter.module.css */
.counter {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 400px;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: var(--bg-primary);
  transition: all 0.3s ease;
}

.counter:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.display {
  font-size: 3rem;
  font-weight: bold;
  margin: 1rem 0;
  padding: 1rem 2rem;
  border-radius: 8px;
  background: var(--bg-secondary);
  min-width: 120px;
  text-align: center;
  transition: all 0.3s ease;
}

.positive {
  color: var(--success-color);
}

.negative {
  color: var(--error-color);
}

.zero {
  color: var(--neutral-color);
}
```

### Theme Support
```css
/* variables.css */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #212529;
  --success-color: #28a745;
  --error-color: #dc3545;
  --neutral-color: #6c757d;
}

[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --text-primary: #ffffff;
  --success-color: #40e661;
  --error-color: #ff6b6b;
  --neutral-color: #a0a0a0;
}
```

## ⌨️ Keyboard Shortcuts

- **↑ / ↓**: Increment / Decrement
- **Space**: Reset counter
- **Enter**: Focus on value input
- **Esc**: Clear focus
- **+ / -**: Quick increment/decrement
- **0**: Reset to zero

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px (single column layout)
- **Tablet**: 768px - 1024px (compact controls)
- **Desktop**: > 1024px (full feature layout)

### Mobile Optimizations
- Touch-friendly button sizes (44px minimum)
- Swipe gestures for increment/decrement
- Haptic feedback on supported devices
- Optimized typography scaling

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage

# Run specific test file
npm test Counter.test.js
```

### Test Coverage
- ✅ Component rendering
- ✅ State management
- ✅ User interactions
- ✅ Keyboard events
- ✅ Edge cases (min/max limits)
- ✅ Local storage persistence

## 🚀 Performance Optimizations

- **React.memo**: Prevent unnecessary re-renders
- **useCallback**: Memoize event handlers
- **useMemo**: Optimize expensive calculations
- **Code Splitting**: Lazy load theme components
- **CSS Optimizations**: Minimize repaints and reflows

## 🔮 Future Enhancements

- [ ] **Counter Presets**: Save and load favorite configurations
- [ ] **Animation Library**: More sophisticated transitions
- **Charts**: Visual representation of counter history
- [ ] **Export Data**: Download counter history as CSV/JSON
- [ ] **Counter Groups**: Organize multiple counters into categories
- [ ] **Keyboard Customization**: User-defined shortcuts
- [ ] **Voice Control**: Voice commands for operations

## 🤝 Contributing

This is a learning project, but contributions and suggestions are welcome! Feel free to:
- Report bugs or issues
- Suggest new features
- Improve documentation
- Add tests
- Optimize performance

## 📚 Learning Outcomes

This project demonstrates:
- **React Fundamentals**: Components, state, props, events
- **Hooks**: useState, useEffect, custom hooks
- **Local Storage**: Data persistence in browsers
- **CSS Modules**: Scoped styling in React
- **Accessibility**: Semantic HTML and keyboard navigation
- **Testing**: Unit tests with Jest and React Testing Library
- **Performance**: Optimization techniques and best practices

## 🔗 Related Projects

- [AI Journal](../AIJournal) - Advanced state management and API integration
- [Todo List](../ToDoList) - CRUD operations and form handling
- [Quiz App](../QuizApp) - Complex state management
- [Face Detection](../FaceDetection) - Camera API and AI integration

---

**Simple. Elegant. Educational. 📈**
