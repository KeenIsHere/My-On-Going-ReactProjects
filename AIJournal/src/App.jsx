import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import EntryEditor from './components/EntryEditor';
import Timeline from './components/Timeline';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  const [entries, setEntries] = useLocalStorage("journalEntries", []);
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (newEntry) => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setEntries([newEntry, ...entries]);
    setIsLoading(false);
  };

  const handleDelete = async (dateToDelete) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    setEntries(entries.filter((entry) => entry.date !== dateToDelete));
    setIsLoading(false);
  };

  return (
    <ErrorBoundary>
      <div className={`app ${darkMode ? "dark" : "light"}`}>
        <header>
          <h1>AI Journal</h1>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </header>
        <main>
          <EntryEditor onSave={handleSave} isLoading={isLoading} />
          <Timeline 
            entries={entries} 
            onDelete={handleDelete} 
            isLoading={isLoading} 
          />
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;