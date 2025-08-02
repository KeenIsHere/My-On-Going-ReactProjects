import ReactMarkdown from 'react-markdown';
import { formatJournalDate } from '../utils/dateUtils';

const Timeline = ({ entries, onDelete, isLoading }) => {
  return (
    <div className={`timeline ${isLoading ? "loading" : ""}`}>
      <h2>Your Journal History</h2>
      {isLoading && entries.length === 0 ? (
        <p>Loading your journal...</p>
      ) : entries.length === 0 ? (
        <p className="empty-state">No entries yet. Write your first entry!</p>
      ) : (
        <div className="entries">
          {entries.map((entry) => (
            <article key={entry.date} className="entry-card">
              <div className="entry-header">
                <span className="mood">{entry.mood}</span>
                <time className="date">
                  {formatJournalDate(entry.date)}
                </time>
                <button
                  onClick={() => onDelete(entry.date)}
                  className="delete-btn"
                  disabled={isLoading}
                  aria-label="Delete entry"
                >
                  ×
                </button>
              </div>
              <div className="entry-content">
                <ReactMarkdown>{entry.text}</ReactMarkdown>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Timeline;