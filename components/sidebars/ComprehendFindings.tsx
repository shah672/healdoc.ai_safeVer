
// import '../../styles/ComprehendFindings.css';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface ComprehendFindingsProps {
  onClose: () => void;
}

const AImodels = [
  'Anthropic - Claude 3 Opus (New)',
  'Anthropic - Claude 3.0 Sonnet (New)',
  'Anthropic - Claude 3 Haiku (new)',
  'Anthropic - Claude Claude 2.0',
  'Anthropic - Claude Claude 2.1',
  'GPT-4.0 (new)',
  'OpenAI',
  'GPT-4 32k',
  'GPT-4 Turbo',
  'GPT-3.5',
  'Claude 2.0',
  'Claude 2.1'
];





const ComprehendFindings: React.FC<ComprehendFindingsProps> = ({ onClose }) => {

  const [heading, setHeading] = useState("Comprehend Findings");

  const handleHeadingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeading(event.target.value);
  };



  return (
    <div className="sidebarComp">
      <div className="closeButtonContainer">
        <button onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <h2>
        <input
          type="Comprehend Findings"
          value={heading}
          onChange={handleHeadingChange}
          className="headingInput"
        />
      </h2>
      <p>Use any of the LLM models to generate text</p>

      <div className="selectContainerComp">
        <div className="selectLabelComp">
          <label htmlFor="languageCodeComp">Choose your preferred AI model:</label>
        </div>
        <select id="languageCodeComp" className="selectBoxComp">
          {AImodels.map((code, index) => (
            <option key={index} value={code}>{code}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default ComprehendFindings;






