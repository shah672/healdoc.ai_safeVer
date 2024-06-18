import React, { useState } from 'react';
import {SidebarLeft} from '../Sidebar';

import { CiCircleInfo } from "react-icons/ci";
import Image, { StaticImageData } from 'next/image';
type IconMapType = Record<string, StaticImageData>;
import { faTrashAlt, faEdit, faCopy } from '@fortawesome/free-solid-svg-icons';

import smart2 from "../../public/sandclock_trial2.svg";
import digital from "../../public/digital.svg";
import liveCC from "../../public/liveCC.svg";
import visitSum from "../../public/visitSum.svg";
import textExt from "../../public/textExt.svg";
import popHealth from "../../public/popHealth.svg";
import clinicalParse from "../../public/clinicalParse.svg";
import AIimg from "../../public/AIimg.svg";
import inputImg from "../../public/inputImg.svg";
import AIchat from "../../public/AIchat.svg";
import output from "../../public/output.svg";

//import new actions images
import recording from '../../public/HealDocRecording.svg';
import comprehend from '../../public/HealDocComprehend.svg';
import transcribe from '../../public/HealDocTranscribe.svg';
import update from '../../public/HealDocUpdateEHR.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faArrowUp, faArrowDown, faSearch } from '@fortawesome/free-solid-svg-icons';

//import all sidebars 
import TranscribeAudio from '../../components/sidebars/TranscribeAudio';
import ComprehendFindings from '../../components/sidebars/ComprehendFindings';
import UpdateEHR from '../../components/sidebars/UpdateEHR';
import Link from 'next/link';
import useSessionData from '../../hooks/useSessionData';
import AskAI from '../../components/sidebars/AskAI';
// import 'tailwindcss/tailwind.css';

// import { SessionProvider } from 'next-auth/react';

//icons section 
const actionIcons: IconMapType = {
  'Digital Front Door': digital,
  'Smart Scheduling': smart2,
  'Live CC, Instant Translation':liveCC,
  'Visit Summaries':visitSum,
  'Text Extraction':textExt,
  'Next Best Actions':smart2,
  'Population Health':popHealth,
  'Clinical Parsing':clinicalParse,
  // Add more mappings for each action
};

const modelIcons: IconMapType = {
  'Anthropic - Claude 3 Sonnet': AIimg,
  'Anthropic - Claude 3 Opus': AIimg,
  'Anthropic - Claude 3 Haiku': AIimg,
  'Anthropic - Claude 2.0': AIimg,
  'Anthropic - Claude 2.1': AIimg,
  'OpenAI - GPT-3.5 15k': AIimg,
  'OpenAI - GPT-3.5 16k': AIimg,
  'OpenAI - GPT-4 Turbo': AIimg,
  'OpenAI - GPT-4 (latest)': AIimg,
  'OpenAI - GPT-4 32k': AIimg
};


interface SidebarProps {
  onClose: () => void;
  onSelectItem: (item: string) => void;
  onEditDone?: (type: string, index: number, newValue: string) => void;
}


const Sidebarz: React.FC<SidebarProps> = ({ onClose, onSelectItem }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories: Record<string, string[]> =  {
    All: [ 'Ask AI','Record patient audio', 'Transcribe audio recording', 'Comprehend findings', 'Update EHR / EMR', 'Tranform Text', 'Translate Text with AI', 'Format Output', 'Extract Info from Text', 'Generate Text'],
    Text: ['Tranform Text', 'Translate Text with AI', 'Format Output', 'Extract Info from Text', 'Generate Text'],
    Integrations: ['Epic Systems', 'Cerner', 'Alscripts', 'Meditech', 'NextGen', 'GE Healthcare', 'Athenahealth', 'Allscripts', 'eClinicalWorks', 'Practice Fusion'],
    Research: ['Item 10', 'Item 11', 'Item 12'],
    Images: ['Extract Text from Image', 'Describe Image Content'],
    Orchestration: ['Run Workflow (Inline)', 'Run Workflow', 'Send Notification Email'],
  };

  return (
    <div className="sidebar7">
      <div className="header7">
        <h1>Add Action</h1>
        <div className="action-buttons">
          <button onClick={() => {}}><FontAwesomeIcon icon={faArrowUp} /></button>
          <button onClick={() => {}}><FontAwesomeIcon icon={faArrowDown} /></button>
          <button onClick={onClose}><FontAwesomeIcon icon={faTimes} /></button>
        </div>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Search actions" />
        <button><FontAwesomeIcon icon={faSearch} /></button>
      </div>

      <div className="content7">
        <div className="categories7">
          {Object.keys(categories).map((category) => (
            <div key={category} className={category === selectedCategory ? "selected" : ""} onClick={() => setSelectedCategory(category)}>
              {category}
            </div>
          ))}
        </div>
        <div className="subitems7">
          {categories[selectedCategory].map((item) => (
            <div key={item} onClick={() => onSelectItem(item)}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

type ReadyProps = {
  onSave: (testLabel: string) => void; // Specifies that onSave takes one string argument
  // session: any;
};


const Ready = ( ) => {

    const [elements, setElements] = useState(['Input', '+', 'Output']);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [plusIndex, setPlusIndex] = useState(-1);
    const [sidebar1Open, setSidebar1Open] = useState(true);
    const [hoveredBox, setHoveredBox] = useState<number | null>(null); // Track hovered box

    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState<string>("");
    const [editBox, setEditBox] = useState<string | null>(null);
    const {sessions}: any = useSessionData();
    // console.log(sessions?.user?.name); 

    const [workflowName, setWorkflowName] = useState<string>("");
    const [lastModified, setLastModified] = useState<string>("");
    const [showWorkflowDetails, setShowWorkflowDetails] = useState<boolean>(false);

    const handleDelete = (index: number) => {
      const newElements = [...elements];
      // Remove the box and the line (with the plus sign) below the box
      if (index > 0 && index < newElements.length - 1) {
        newElements.splice(index, 2);
      } else {
        // Handle edge cases for first or last element
        newElements.splice(index, 1);
      }
      setElements(newElements);
    };
    
    const handleCopy = (index: number) => {
      const newElements = [...elements];
      // Insert a new box and add a line (with a plus sign) above the new box
      newElements.splice(index + 1, 0, '+', elements[index]);
      setElements(newElements);
    };
    
    const handleEdit = (index: number) => {
      setEditIndex(index);
      setEditValue(elements[index]);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditValue(e.target.value);
    };


    const handleEditSave = () => {
      if (editIndex !== null) {
        const newElements = [...elements];
        newElements[editIndex] = editValue;
        setElements(newElements);
        setEditIndex(null);
      }
    };


    // const [selectedBox, setSelectedBox] = useState<string | null>(null); 
    const handleBoxClick = (element: string) => {
      setEditBox(element);
    };
  

    function savePage() {
      const pageState = {
          elements: elements,
          showDropdown: showDropdown,
          selectedIndex: selectedIndex,
          plusIndex: plusIndex,
          sidebar1Open: sidebar1Open,
      };

      // Convert the state to a JSON string
      return JSON.stringify(pageState);
  }
      const handleSave = async () => {
        const serializedState = savePage();  // Get the serialized state from savePage()

        const workflowDetails = {
          name: workflowName,
          owner: sessions?.user?.email,
          lastModified: new Date().toISOString()
        };

        const dataToSave = {
          email: workflowDetails.owner,
           state: serializedState,
           workflowName: workflowDetails.name,
           lastModified: workflowDetails.lastModified
    };
        try {
            const response = await fetch('/api/_actions/workflowSave', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSave)
            });
    
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log('Save successful:', jsonResponse);
                console.log('Saved ID:', jsonResponse.id);
                setLastModified(workflowDetails.lastModified);
                setShowWorkflowDetails(true);
            } else {
                throw new Error('Failed to save page state.');
            }
        } catch (error) {
            console.error('Error saving page state:', error);
            // Additional actions based on error (e.g., show error message)  
          }
        };


    
    const handlePlusClick = (plusIndex: React.SetStateAction<number>) => {
            setShowDropdown(true);
            setPlusIndex(plusIndex);
        };
    
        const handleClose = () => {
            setShowDropdown(false);
        };

      const handleSelectItem = (item: string) => {
        console.log(elements);
        const updatedElements = [...elements];
        
        if (selectedIndex !== -1) { 
            updatedElements.splice(plusIndex, 0, '+', item );
            setElements(updatedElements);
            setShowDropdown(false);
        }
      }; 

      const handleMouseEnter = (index: number) => {
        setHoveredBox(index);
      };
    
      const handleMouseLeave = () => {
        setHoveredBox(null);
      };

      const renderSidebar = () => {
        switch (editBox) {
          // case 'Record patient audio':
          //   return <RecordPatient onClose={() => setEditBox(null)} />;
          case 'Transcribe audio recording':
            return <TranscribeAudio onClose={() => setEditBox(null)} />;
          case 'Comprehend findings':
            return <ComprehendFindings onClose={() => setEditBox(null)} />;
          case 'Update EHR / EMR':
            return <UpdateEHR onClose={() => setEditBox(null)} />;
          case 'Ask AI':
            return <AskAI onClose={() => setEditBox(null)} />;
          // Add cases for other actions
          default:
            return null;
        }
      };

      const iconMap = {
        'Input': inputImg, // Replace '/path/to/input_icon.svg' with actual path
        'Output': output,
        'Digital Front Door': digital,
        'Smart Scheduling': smart2,
        'Live CC, Instant Translation':liveCC,
        'Visit Summaries':visitSum,
        'Text Extraction':textExt,
        'Next Best Actions':smart2,
        'Population Health':popHealth,
        'Clinical Parsing':clinicalParse,

        'Record patient audio': recording,
        'Transcribe audio recording': transcribe,
        'Comprehend findings': comprehend,
        'Update EHR / EMR': update,


        'Anthropic - Claude 3 Sonnet': AIimg,
        'Anthropic - Claude 3 Opus': AIimg,
        'Anthropic - Claude 3 Haiku': AIimg,
        'Anthropic - Claude 2.0': AIimg,
        'Anthropic - Claude 2.1': AIimg,
        'OpenAI - GPT-3.5 15k': AIchat,
        'OpenAI - GPT-3.5 16k': AIchat,
        'OpenAI - GPT-4 Turbo': AIchat,
        'OpenAI - GPT-4 (latest)': AIchat,
        'OpenAI - GPT-4 32k': AIchat
    };
  
  // if (status === "authenticated") 

    return (
      <div className="dotted-background">
        <div className="flex flex-col items-center relative">
          
            <div className="firstNavDiv">
              <nav className="fixedNav">
                  <div className="nav-section start-section">
                    <button className="nav-button-with-border">Workflows / Call Summary</button>
                  </div>

                  <div className="nav-section middle-section">
                      <button className="nav-button">Build</button>
                        <Link legacyBehavior href="./checkOutput/checkOutput">
                          <a className="nav-button"> Run </a> 
                        </Link>
                      {/* <button className="nav-button">Run</button> */}
                      <button className="nav-button">Table</button>
                      <button className="nav-button">API </button>
                      <button className="nav-button">Form</button>
                      {/* {session.isLoggedIn && <LogoutForm/>} */}
                  </div>


                  <div className="nav-section end-section">
                    <button className="nav-button-with-border">
                        <span className="credits-text">Credits: Bonus Credits: 200</span>
                        <CiCircleInfo size={20} className="icon-example" />
                    </button>
                  </div>
              </nav>

             </div>


             <div>
               <nav className="secondNav">
                   <Link legacyBehavior href="../ProviderForm/ProviderForm">
                     <a>
                       <button className="publish-button">
                           Publish
                       </button>
                     </a>
                   </Link>
              

                   <button className="saveas-button" onClick={handleSave}>
                       Quick Save
                   </button>
               </nav>
            </div> 

            <div className="" style={{ width: '150px' }}>
                  <SidebarLeft />
            </div>


    
            <div className="content-padding">
            {/* <button>
              <div className="svg-wrapper-1">
                <div className="svg-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="30"
                    height="20"
                    className="icon"
                  >
                    <path
                      d="M22,15.04C22,17.23 20.24,19 18.07,19H5.93C3.76,19 2,17.23 2,15.04C2,13.07 3.43,11.44 5.31,11.14C5.28,11 5.27,10.86 5.27,10.71C5.27,9.33 6.38,8.2 7.76,8.2C8.37,8.2 8.94,8.43 9.37,8.8C10.14,7.05 11.13,5.44 13.91,5.44C17.28,5.44 18.87,8.06 18.87,10.83C18.87,10.94 18.87,11.06 18.86,11.17C20.65,11.54 22,13.13 22,15.04Z"
                    ></path>
                  </svg>
                </div>
              </div>
              <span>Test Workflows</span>


            </button> */}

            <div className="workflow-name-section">
              <label htmlFor="workflowName">Workflow Name:</label>
              <input
                type="text"
                id="workflowName"
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
              />
            </div>
          
            </div>
            <div className="workflows-css">
                {elements.map((element, index) => (
                    <React.Fragment key={index}>
                        {element === '+' ? (
                            <>
                                <div className="flex flex-col items-center">
                                    <div className="w-0.5 bg-black" style={{ height: "20px" }}></div>

                                         <button
                                            title="Add New"
                                            className="group cursor-pointer outline-none hover:rotate-90 duration-300"
                                            onClick={() => handlePlusClick(index)}
                                            >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="30px"
                                                height="30px"
                                                viewBox="0 0 24 24"
                                                className="stroke-purple-400 fill-none group-hover:fill-purple-800 group-active:stroke-purple-200 group-active:fill-purple-600 group-active:duration-0 duration-300"
                                            >
                                                <path
                                                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                                strokeWidth="1.5"
                                                ></path>
                                                <path d="M8 12H16" strokeWidth="1.5"></path>
                                                <path d="M12 16V8" strokeWidth="1.5"></path>
                                            </svg>
                                        </button>


                                    <div className="w-0.5 bg-black" style={{ height: "20px" }}></div>
                                </div>                  
                            </>       
                        ) : (                         
                            <div className="" onClick={() => handleBoxClick(element)}> 
                               
                              {/* onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave} */}

                              <div className="boxz w-80 h-24 bg-white rounded-xl flex justify-center items-center border border-orange-300">

                                {editIndex === index ? (
                                  <div className="flex items-center">
                                    <input
                                      type="text"
                                      value={editValue}
                                      onChange={handleEditChange}
                                      className="edit-input"
                                    />
                                    <button onClick={handleEditSave} className="icon-button">
                                      Save
                                    </button>
                                  </div>
                                ) : (

                              <div className="flex items-center">
                                {iconMap[element as keyof typeof iconMap] && (
                                  <Image src={iconMap[element as keyof typeof iconMap]} alt={`${element} icon`} width={30} height={30} className="icon-size  ml-10" />
                                )}
                                <h2 className="custom-heading3 ml-3">{element}</h2>
                              </div>
                              )}
                          
                              {/* {hoveredBox === index && ( */}
                                <div className="icon-container flex space-x-1">
                                  <button className="icon-button" onClick={() => handleCopy(index)}>
                                    <FontAwesomeIcon icon={faCopy} />
                                  </button>
                                  <button className="icon-button" onClick={() => handleDelete(index)}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                  </button>
                                </div>
                              {/* )} */}
                              </div>  
                            </div>     
                        )}
                    </React.Fragment>
                ))}
            </div>
            {showDropdown && (<Sidebarz onClose={handleClose} onSelectItem={handleSelectItem} />)} 
            {editBox && renderSidebar()}
              {/* // <Sidebarz
              //   onClose={() => setSelectedBox(null)}
              //   onSelectItem={handleSelectItem}
              // />
            //)}    */}
          </div>  
        </div>
         );
    };

 export default Ready;




