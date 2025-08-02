export const playSound = (type) => {
    // Fallback for browsers that don't support AudioContext
    if (!window.AudioContext && !window.webkitAudioContext) return;
  
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
  
    // Configure sound based on type (correct/wrong)
    oscillator.type = "triangle";
    oscillator.frequency.value = type === "correct" ? 880 : 220; // High pitch for correct, low for wrong
    gainNode.gain.setValueAtTime(1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
  
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
  };