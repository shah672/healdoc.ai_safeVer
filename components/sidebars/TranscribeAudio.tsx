// import React, { useState } from 'react';
// import './TranscribeAudio.css';

// interface TranscribeAudioProps {
//   onClose: () => void;
// }

// type VocabKey = 'phrase' | 'soundsLike' | 'ipa' | 'displayAs';

// const TranscribeAudio: React.FC<TranscribeAudioProps> = ({ onClose }) => {
//   const [vocabList, setVocabList] = useState<Array<Record<VocabKey, string>>>([
//     { phrase: '', soundsLike: '', ipa: '', displayAs: '' }
//   ]);

//   const handleInputChange = (index: number, field: VocabKey, value: string) => {
//     const updatedList = [...vocabList];
//     updatedList[index][field] = value;
//     setVocabList(updatedList);
//   };

//   const handleAddRow = () => {
//     setVocabList([...vocabList, { phrase: '', soundsLike: '', ipa: '', displayAs: '' }]);
//   };

//   const handleSave = () => {
//     console.log("Saved vocabulary list:", vocabList);
//   };

//   return (
//     <div className="sidebar5">
//       <h2 className="heading">Transcribe Audio</h2>
//       <p className="description">Provide details for transcribing audio.</p>

//       <div className="vocabTable">
//         <div className="tableHeader">
//           <div className="tableCell">Phrase</div>
//           <div className="tableCell">Sounds Like</div>
//           <div className="tableCell">IPA</div>
//           <div className="tableCell">Display As</div>
//         </div>
//         {vocabList.map((row, index) => (
//           <div className="tableRow" key={index}>
//             <div className="tableCell">
//               <input
//                 type="text"
//                 value={row.phrase}
//                 onChange={(e) => handleInputChange(index, 'phrase', e.target.value)}
//                 className="input"
//               />
//             </div>
//             <div className="tableCell">
//               <input
//                 type="text"
//                 value={row.soundsLike}
//                 onChange={(e) => handleInputChange(index, 'soundsLike', e.target.value)}
//                 className="input"
//               />
//             </div>
//             <div className="tableCell">
//               <input
//                 type="text"
//                 value={row.ipa}
//                 onChange={(e) => handleInputChange(index, 'ipa', e.target.value)}
//                 className="input"
//               />
//             </div>
//             <div className="tableCell">
//               <input
//                 type="text"
//                 value={row.displayAs}
//                 onChange={(e) => handleInputChange(index, 'displayAs', e.target.value)}
//                 className="input"
//               />
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="buttonContainer">
//         <button onClick={handleAddRow} className="addRowButton">Add Row</button>
//         <button onClick={handleSave} className="saveButton">Save</button>
//         <button onClick={onClose} className="closeButton">Close</button>
//       </div>
//     </div>
//   );
// };

// export default TranscribeAudio;

import React, { useState } from 'react';

interface TranscribeAudioProps {
  onClose: () => void;
}

type VocabKey = 'phrase' | 'soundsLike' | 'ipa' | 'displayAs';

const languageCodes = [
  'en-US',
  'en-GB',
  'fr-FR',
  'es-ES',
  'de-DE'
];

const maxSpeakerLabels = [
  '1',
  '2',
  '3',
  '4',
  '5', 
  '6',
  '7',
  '8',
  '9',
  '10'
];

const specialities = [
  'General Medicine',
  'Orthopedics specialities',
];

const TranscribeAudio: React.FC<TranscribeAudioProps> = ({ onClose }) => {
  const [vocabList, setVocabList] = useState<Array<Record<VocabKey, string>>>([
    { phrase: '', soundsLike: '', ipa: '', displayAs: '' }
  ]);

  const handleInputChange = (index: number, field: VocabKey, value: string) => {
    const updatedList = [...vocabList];
    updatedList[index][field] = value;
    setVocabList(updatedList);
  };

  const handleAddRow = () => {
    setVocabList([...vocabList, { phrase: '', soundsLike: '', ipa: '', displayAs: '' }]);
  };

  const handleSave = () => {
    console.log("Saved vocabulary list:", vocabList);
  };

  return (
    <div className="sidebar5">
      <div className="topRight">
        <button onClick={onClose} className="closeButton">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <h2 className="heading">Transcribe Audio</h2>
      <p className="description">Provide details for transcribing audio.</p>

      <div className="vocabTable">
        <div className="tableHeader">
          <div className="tableCell">Phrase</div>
          <div className="tableCell">Sounds Like</div>
          <div className="tableCell">IPA</div>
          <div className="tableCell">Display As</div>
        </div>
        {vocabList.map((row, index) => (
          <div className="tableRow" key={index}>
            <div className="tableCell">
              <input
                type="text"
                value={row.phrase}
                onChange={(e) => handleInputChange(index, 'phrase', e.target.value)}
                className="input_option"
              />
            </div>
            <div className="tableCell">
              <input
                type="text"
                value={row.soundsLike}
                onChange={(e) => handleInputChange(index, 'soundsLike', e.target.value)}
                className="input_option"
              />
            </div>
            <div className="tableCell">
              <input
                type="text"
                value={row.ipa}
                onChange={(e) => handleInputChange(index, 'ipa', e.target.value)}
                className="input_option"
              />
            </div>
            <div className="tableCell">
              <input
                type="text"
                value={row.displayAs}
                onChange={(e) => handleInputChange(index, 'displayAs', e.target.value)}
                className="input_option"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="buttonContainer">
        <button onClick={handleAddRow} className="addRowButton">Add Row</button>
        {/* <button onClick={handleSave} className="saveButton">Save</button>
        <button onClick={onClose} className="closeButton">Close</button> */}
      </div>

      <div className="selectContainer">
        <div className="selectLabel">
          <label htmlFor="languageCode">Setting up the language Code:</label>
        </div>
        <select id="languageCode" className="selectBox">
          {languageCodes.map((code, index) => (
            <option key={index} value={code}>{code}</option>
          ))}
        </select>
      </div>

      <div className="selectContainer">
        <div className="selectLabel">
          <label htmlFor="maxSpeakerLabels">Maximum number of speaker labels:</label>
        </div>
        <select id="maxSpeakerLabels" className="selectBox">
          {maxSpeakerLabels.map((label, index) => (
            <option key={index} value={label}>{label}</option>
          ))}
        </select>
      </div>

      <div className="selectContainer">
        <div className="selectLabel">
          <label htmlFor="speciality">Setting up Speciality:</label>
        </div>
        <select id="speciality" className="selectBox">
          {specialities.map((speciality, index) => (
            <option key={index} value={speciality}>{speciality}</option>
          ))}
        </select>
      </div>

      <div className="bottomRight">
        <button className="saveButton">Save</button>
      </div>

      {/* <div className="buttonContainer">
        <button onClick={handleAddRow} className="addRowButton">Add Row</button>
        <button onClick={handleSave} className="saveButton">Save</button>
        <button onClick={onClose} className="closeButton">Close</button>
      </div> */}
    </div>
  );
};

export default TranscribeAudio;