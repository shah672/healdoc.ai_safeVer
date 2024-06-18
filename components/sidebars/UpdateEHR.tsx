// import React, {useState} from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';


// interface UpdateEHRProps {
//   onClose: () => void;
// }

// const UpdateEHR: React.FC<UpdateEHRProps> = ({ onClose }) => {

//   const [formData, setFormData] = useState({
//     APIEndPoint: ''
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };


//   return (
//     <div className="sidebarComp">
//       <div className="closeButtonContainer">
//         <button onClick={onClose}>
//           <FontAwesomeIcon icon={faTimes} />
//         </button>
//       </div>
//       <h2>Update EHR</h2>
//       <p>Enter your EHR's API key endpoint  </p>
//     </div>
//   );
// };


// export default UpdateEHR;




import React, { useState } from 'react';
import styles from './UpdateEHR.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface UpdateEHRProps {
  onClose: () => void;
}

const UpdateEHR: React.FC<UpdateEHRProps> = ({ onClose }) => {
  const [apiKey, setApiKey] = useState<string>('');

  const handleSave = () => {
    // Logic to save the API key
    console.log('API Key Saved:', apiKey);
    onClose();
  };

  return (
    <div className={styles.sidebar9}>
      <div className={styles.closeButtonContainer}>
        <button onClick={onClose} className={styles.iconButton}>
          <FontAwesomeIcon icon={faTimes} className={styles.icon} />
        </button>
      </div>
      <h2 className={styles.heading}>Update EHR</h2>
      <p className={styles.description}>Enter your EHR&apos;s API key endpoint</p>
      <div className={styles.formGroup}>
        <input
          type="text"
          placeholder="Enter your API key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className={styles.inputBox}
        />
      </div>
      <div className={styles.buttonGroup}>
        <button type="button" onClick={handleSave} className={styles.saveButton}>
          Save
        </button>
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default UpdateEHR;