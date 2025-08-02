import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import MoodPicker from './MoodPicker';

const EntryEditor = ({ entry, onSave, isLoading }) => {
  const [text, setText] = useState(entry?.text || "");
  const [mood, setMood] = useState(entry?.mood || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || !mood) return;
    onSave({ text, mood, date: new Date().toISOString() });
  };

  return (
    <div className="editor-container">
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Dear diary..."
          className="markdown-input"
          disabled={isLoading}
        />
        <div className="preview">
          <ReactMarkdown>{text || "*Nothing to preview*"}</ReactMarkdown>
        </div>
        <MoodPicker 
          selectedMood={mood} 
          onSelect={setMood} 
          disabled={isLoading}
        />
        <button 
          type="submit" 
          disabled={!text.trim() || !mood || isLoading}
        >
          {isLoading ? "Saving..." : "Save Entry"}
        </button>
      </form>
    </div>
  );
};

export default EntryEditor;