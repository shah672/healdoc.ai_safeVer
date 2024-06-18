import React from 'react';

interface RecordPatientProps {
  onClose: () => void;
}

const RecordPatient: React.FC<RecordPatientProps> = ({ onClose }) => {
  return (
    <div className="sidebar">
      <h2>Record Patient Audio</h2>
      <p>Details about recording patient audio.</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default RecordPatient;
