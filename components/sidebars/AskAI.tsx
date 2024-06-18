import React from 'react';

interface AskAIProps {
    onClose: () => void;
}

const AskAI: React.FC<AskAIProps> = ({ onClose }) => {
    const [isOpen, setIsOpen] = React.useState(true);

    const closeSidebar = () => {
        setIsOpen(false);
        onClose(); // Call the onClose prop function to handle the close action
    };

    if (!isOpen) {
        return null;
    }


    return (
        <div className="sidebarai">
            <div className="sidebar-section">
                <h3 className="section-title">Advanced Settings</h3>
                <div className="closenow">
                    <button className="close-button" onClick={closeSidebar}>&times;</button>
                </div>

                <div className="setting-item">
                    <label className="setting-label">Model selection</label>
                    <div className="setting-value">
                        <select className="model-select">
                            <option>Anthropic - Claude 3 Opus (New)</option>
                            <option>Anthropic - Claude 3.0 Sonnet (New)</option>
                            <option>Anthropic - Claude 3 Haiku (new)</option>
                            <option>Anthropic - Claude Claude 2.0</option>
                            <option>Anthropic - Claude Claude 2.1</option>
                            <option>OpenAI</option>
                            <option>GPT-4 32k</option>
                            <option>GPT-4.0 (new)</option>
                            <option>GPT-4 </option>
                            <option>GPT-4 Turbo</option>
                            <option>GPT-3.5</option>
                        </select>
                    </div>
                </div>
                <div className="setting-item">
                    <label className="setting-label">Temperature</label>
                    <div className="setting-value">
                        <input type="range" min="0" max="1" step="0.1" defaultValue="0.7" />
                        <span>0.7 - Recommended</span>
                    </div>
                </div>
                <div className="setting-item">
                    <label className="setting-label">Words or Characters</label>
                    <div className="setting-value">
                        <select className="words-characters-select">
                            <option>Characters</option>
                        </select>
                    </div>
                </div>
                <div className="setting-item">
                    <label className="setting-label">Prompt</label>
                    <textarea className="large-input"></textarea>
                </div>
                <div className="setting-item">
                    <label className="setting-label">Background</label>
                    <textarea className="large-input"></textarea>
                </div>
                <div className="setting-item">
                    <label className="setting-label">Min Length</label>
                    <input type="text" className="length-input" />
                </div>
                <div className="setting-item">
                    <label className="setting-label">Max Length</label>
                    <input type="text" className="length-input" />
                </div>
            </div>
        </div>
    );
}

export default AskAI;
