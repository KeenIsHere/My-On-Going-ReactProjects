export const calculateGlassesPosition = (landmarks) => {
    // Get nose bridge and eye landmarks
    const noseTop = landmarks[168];  // Top of nose bridge
    const leftEye = landmarks[33];   // Left eye outer corner
    const rightEye = landmarks[263]; // Right eye outer corner
  
    // Calculate center point between eyes
    const centerX = (leftEye[0] + rightEye[0]) / 2;
    const centerY = (leftEye[1] + rightEye[1]) / 2;
  
    // Calculate rotation angle
    const dx = rightEye[0] - leftEye[0];
    const dy = rightEye[1] - leftEye[1];
    const angle = Math.atan2(dy, dx);
  
    return {
      position: [centerX, centerY, noseTop[2]],
      rotation: angle,
      scale: Math.sqrt(dx * dx + dy * dy) / 100
    };
  };