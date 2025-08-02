import { useState, useEffect, useRef } from 'react';
import { loadModel } from './lib/faceDetection';
import CameraFeed from './components/CameraFeed';
import Glasses3D from './components/Glasses3D';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  const [face, setFace] = useState(null);
  const [snapshots, setSnapshots] = useState([]);
  const [modelStatus, setModelStatus] = useState('loading');
  const canvasRef = useRef();

  useEffect(() => {
    loadModel()
      .then(() => setModelStatus('loaded'))
      .catch(err => {
        console.error(err);
        setModelStatus('error');
      });
  }, []);

  const captureSnapshot = () => {
    const canvas = document.createElement('canvas');
    const video = document.querySelector('.camera-feed');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    
    // Mirror the image
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);
    
    setSnapshots([...snapshots, canvas.toDataURL('image/png')]);
  };

  return (
    <ErrorBoundary>
      <div className="app">
        <header>
          <h1>Virtual Try-On</h1>
          <p>Test glasses in real-time</p>
        </header>

        <main>
          {modelStatus === 'loading' && (
            <div className="status-loading">
              <div className="spinner"></div>
              Loading AI model...
            </div>
          )}

          {modelStatus === 'error' && (
            <div className="status-error">
              Failed to load AI model. Refresh the page.
            </div>
          )}

          {modelStatus === 'loaded' && (
            <>
              <div className="ar-container">
                <CameraFeed 
                  onFaceDetected={setFace} 
                  onError={(msg) => setModelStatus(`error: ${msg}`)} 
                />
                <Glasses3D face={face} />
              </div>
              
              <button 
                onClick={captureSnapshot}
                className="capture-btn"
                disabled={!face}
              >
                📸 Capture
              </button>

              {snapshots.length > 0 && (
                <div className="snapshots-grid">
                  {snapshots.map((img, i) => (
                    <img 
                      key={i} 
                      src={img} 
                      alt={`Snapshot ${i}`}
                      className="snapshot"
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;