# AI Journal 📝🤖

An intelligent journaling application built with React that helps users reflect on their thoughts and experiences with AI-powered insights and suggestions.

## 🎯 Overview

AI Journal is a modern, interactive journaling application that combines traditional journaling with artificial intelligence to provide users with personalized insights, mood tracking, and writing suggestions. This project demonstrates advanced React concepts including state management, API integration, and modern UI/UX design.

## ✨ Features

### Core Functionality
- **Smart Writing Assistant**: AI-powered suggestions and writing prompts
- **Mood Tracking**: Automatic sentiment analysis of journal entries
- **Entry Management**: Create, edit, delete, and search journal entries
- **Tagging System**: Organize entries with custom tags and categories
- **Calendar View**: Visual timeline of journaling activity
- **Export Options**: Download entries as PDF or text files

### AI-Powered Features
- **Sentiment Analysis**: Real-time mood detection from text
- **Writing Prompts**: AI-generated prompts based on previous entries
- **Insight Generation**: Weekly/monthly summaries and patterns
- **Keyword Extraction**: Automatic tagging and theme identification
- **Goal Tracking**: AI suggestions for personal development goals

### User Experience
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Auto-save**: Never lose your thoughts with automatic saving
- **Search & Filter**: Find entries by date, mood, or keywords
- **Privacy First**: All data stored locally with optional cloud sync

## 🛠️ Technologies Used

- **React 18**: Latest React features with hooks and concurrent rendering
- **TypeScript**: Type-safe development and better IDE support
- **Styled Components**: CSS-in-JS for dynamic styling
- **React Router**: Client-side routing and navigation
- **Context API**: Global state management for user preferences
- **Local Storage**: Client-side data persistence
- **OpenAI API**: AI-powered features and text analysis
- **Date-fns**: Date manipulation and formatting
- **React Hook Form**: Form handling and validation
- **Framer Motion**: Smooth animations and transitions

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- OpenAI API key (for AI features)

### Installation

1. **Navigate to the project directory**
   ```bash
   cd My-On-Going-ReactProjects/AIJournal
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in the project root
   echo "REACT_APP_OPENAI_API_KEY=your_openai_api_key" > .env
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
AIJournal/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── journal/
│   │   │   ├── EntryForm.jsx
│   │   │   ├── EntryList.jsx
│   │   │   ├── EntryCard.jsx
│   │   │   └── CalendarView.jsx
│   │   └── ai/
│   │       ├── MoodAnalyzer.jsx
│   │       ├── WritingPrompts.jsx
│   │       └── InsightPanel.jsx
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   ├── useAIAnalysis.js
│   │   └── useMoodTracking.js
│   ├── services/
│   │   ├── aiService.js
│   │   ├── storageService.js
│   │   └── analyticsService.js
│   ├── context/
│   │   ├── JournalContext.js
│   │   └── ThemeContext.js
│   ├── utils/
│   │   ├── dateHelpers.js
│   │   ├── textAnalysis.js
│   │   └── exportHelpers.js
│   ├── styles/
│   │   ├── GlobalStyles.js
│   │   └── theme.js
│   ├── App.jsx
│   └── index.js
├── .env.example
├── package.json
└── README.md
```

## 🔧 Key Components

### EntryForm Component
```jsx
// Handles journal entry creation and editing
const EntryForm = ({ entry, onSave, onCancel }) => {
  const [content, setContent] = useState(entry?.content || '');
  const [mood, setMood] = useState(entry?.mood || 'neutral');
  
  // AI-powered features
  const { getSuggestions, analyzeMood } = useAIAnalysis();
  
  return (
    <form onSubmit={handleSubmit}>
      <textarea 
        value={content}
        onChange={handleContentChange}
        placeholder="What's on your mind today?"
      />
      {/* AI suggestions and mood indicator */}
    </form>
  );
};
```

### MoodAnalyzer Component
```jsx
// Real-time sentiment analysis
const MoodAnalyzer = ({ text }) => {
  const [mood, setMood] = useState(null);
  const [confidence, setConfidence] = useState(0);
  
  useEffect(() => {
    if (text.length > 50) {
      analyzeSentiment(text).then(result => {
        setMood(result.mood);
        setConfidence(result.confidence);
      });
    }
  }, [text]);
  
  return (
    <div className="mood-indicator">
      <MoodIcon mood={mood} />
      <span>{mood} ({confidence}% confident)</span>
    </div>
  );
};
```

## 🎨 Features in Detail

### AI Writing Assistant
- **Smart Prompts**: Context-aware writing suggestions
- **Grammar Check**: Real-time writing improvement suggestions
- **Tone Analysis**: Help maintain consistent writing tone
- **Word Choice**: Vocabulary enhancement recommendations

### Mood Tracking Dashboard
- **Mood Trends**: Visual charts showing emotional patterns
- **Trigger Identification**: AI identifies potential mood triggers
- **Wellness Tips**: Personalized suggestions for mental health
- **Progress Tracking**: Monitor emotional growth over time

### Privacy & Security
- **Local-First**: All data stored locally by default
- **Encryption**: Optional encryption for sensitive entries
- **Export Control**: Full control over data portability
- **Anonymous Analytics**: Optional usage analytics (no personal data)

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run with coverage
npm test -- --coverage

# Run integration tests
npm run test:integration
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured experience with sidebar navigation
- **Tablet**: Adaptive layout with collapsible panels
- **Mobile**: Touch-optimized interface with bottom navigation

## 🔮 Future Enhancements

- [ ] Voice-to-text entry creation
- [ ] Collaborative journaling with friends/therapists
- [ ] Advanced analytics and personal insights
- [ ] Integration with fitness and health apps
- [ ] Multi-language support
- [ ] Offline synchronization
- [ ] Custom AI model training

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is part of a learning repository and is available under the MIT License.

## 🔗 Related Projects

- [Counter App](../Counter) - Basic React state management
- [Todo List](../ToDoList) - CRUD operations with React
- [Quiz App](../QuizApp) - Interactive React application
- [Face Detection](../FaceDetection) - AI integration with React

---

**Built with React ⚛️ | Powered by AI 🤖 | Designed for reflection 🧘‍♀️**
