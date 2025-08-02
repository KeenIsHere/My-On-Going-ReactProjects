import { useEffect, useRef, useState } from 'react';
import { detectFace } from '../lib/faceDetection';

const CameraFeed = ({ onFaceDetected, onError }) => {
  const videoRef = useRef();
  const animationRef = useRef();
  const [fps, setFps] = useState(0);

  useEffect(() => {
    let stream;
    const initCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user' 
          } 
        });
        
        videoRef.current.srcObject = stream;
        await new Promise(resolve => {
          videoRef.current.onloadedmetadata = resolve;
        });
        
        const detectLoop = async (timestamp) => {
          const startTime = performance.now();
          
          try {
            const predictions = await detectFace(videoRef.current);
            if (predictions?.[0]) {
              onFaceDetected(predictions[0]);
            }
          } catch (err) {
            console.error("Detection error:", err);
          }
          
          const frameTime = performance.now() - startTime;
          setFps(Math.floor(1000 / frameTime));
          animationRef.current = requestAnimationFrame(detectLoop);
        };
        
        animationRef.current = requestAnimationFrame(detectLoop);
      } catch (err) {
        onError(`Camera Error: ${err.message}`);
      }
    };

    initCamera();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="camera-container">
      <video 
        ref={videoRef}
        autoPlay 
        playsInline 
        muted
        className="camera-feed"
      />
      <div className="fps-counter">FPS: {fps}</div>
    </div>
  );
};

export default CameraFeed;