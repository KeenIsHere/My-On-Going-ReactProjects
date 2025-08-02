import { useState } from 'react';

const Snapshots = ({ images, onDelete }) => {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="snapshots-container">
      {images.length > 0 && (
        <>
          <h3>Your Snapshots ({images.length})</h3>
          <div className="snapshots-grid">
            {images.map((img, index) => (
              <div 
                key={index} 
                className="snapshot-item"
                onClick={() => setSelectedImg(img)}
              >
                <img src={img} alt={`Snapshot ${index}`} />
                <button 
                  className="delete-snapshot"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(index);
                  }}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          {selectedImg && (
            <div className="snapshot-modal" onClick={() => setSelectedImg(null)}>
              <img src={selectedImg} alt="Enlarged snapshot" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Snapshots;