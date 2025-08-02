const moods = [
    { emoji: "😊", label: "Happy" },
    { emoji: "😢", label: "Sad" },
    { emoji: "😡", label: "Angry" },
    { emoji: "😴", label: "Tired" },
    { emoji: "🤩", label: "Excited" }
  ];
  
  const MoodPicker = ({ selectedMood, onSelect }) => {
    return (
      <div className="mood-picker">
        <h3>Today's Mood:</h3>
        <div className="moods">
          {moods.map((mood) => (
            <button
              key={mood.label}
              onClick={() => onSelect(mood.emoji)}
              className={`mood-btn ${selectedMood === mood.emoji ? "active" : ""}`}
              aria-label={mood.label}
            >
              {mood.emoji}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default MoodPicker;