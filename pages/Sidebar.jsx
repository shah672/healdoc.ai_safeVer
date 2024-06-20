import React from 'react';

import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react"
import { useContext, createContext, useState } from "react"

import { FaHome, FaCommentDots, FaProjectDiagram, FaStream, FaBoxOpen, FaInfoCircle, FaRegPlusSquare } from 'react-icons/fa';
import { SiOpslevel } from "react-icons/si";

import useSessionData from '../hooks/useSessionData';



const SidebarContext = createContext()

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);  
  const { sessions, loading } = useSessionData();


  return (   
    <aside className="sidebar lg:w-64 md:w-32 w-50 l-100 fixed top-0 h-full left-0 z-1 transition-all transform ${expanded ? '' : '-translate-x-full'}">
      <nav className="  h-full flex flex-col bg-white border-r shadow-sm transition-all transform ${expanded ? '' : '-translate-x-full'}">
        <div className="p-4 pb-2 flex justify-between items-center">
            <h2 className="font-bold text-xl text-black">{sessions?.user?.name}&apos;s Workspace</h2>       
            {/* <h2 className="font-bold text-xl">Workspace</h2>     */}
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{sessions?.user?.name}</h4>
              <span className="text-xs text-gray-600">{sessions?.user?.email}</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  )
}

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext)
  
  return (
    <li
      className={`
        relative flex items-center py-2 px-1 my-5
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  )
}






export function SidebarLeft() {
   const { sessions, loading } = useSessionData();

  
  // const [isOpen, setIsOpen] = useState(false);

  // const toggleSidebar = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <div className="sidebar_open">
      <div className="section">
        <h2 className="title">{sessions?.user?.name}&apos;s Workspace</h2>
        {/* Add dropdown functionality as needed */}
      </div>

      <div className="section">
        <h3>Teamspaces</h3>
        <ul>
          <li>
            <FaHome className="icon_colorz mr-4" />
            <span>Home</span>
          </li>
          <li>
            <FaCommentDots className="mr-4" />
            <span>Chat</span>
            <FaRegPlusSquare className="ml-auto" />
          </li>
          <li>
            <FaProjectDiagram className="mr-4" />
            <span>Projects</span>
          </li>
        </ul>
      </div>

      <div className="section">
        <h3>AI Tools</h3>
        {/* Add content here */}
      </div>

      <div className="section">
        <h3>Automation</h3>
        <ul>
          <li>
            <FaStream className="mr-4" />
            <span>Workflows</span>
            <FaRegPlusSquare className="ml-auto" />
          </li>
          <li>
            <FaBoxOpen className="mr-4" />
            <span>Operating Systems</span>
            <span className="badge new">NEW</span>
          </li>
          <li>
            <FaInfoCircle className="mr-4" />
            <span>Workflow Library</span>
          </li>
        </ul>
      </div>

      <div className="section upgrade-section">
        <button className="upgrade-button">
          Upgrade to Pro
          <SiOpslevel />
        </button>
      </div>

    </div>
  );
};









export function Card ({ label,description }) {
  return (
    <div className="card card-padding">
      <div className="flex-row">
        <span className="label">
          {label}
        </span>
      </div>
      <p className="text-gray-700">{description}</p>
      <button className="trythisbutton">
        Try this
      </button>
    </div>
  );
}

export function CardRow () {
  const workflows = [
    {
      label: 'Digital Front Door',
      description: 'A Q&A chatbot, built on RAG, enables patients to inquire about plan benefits, copay, out-of-pocket expenses, and additional details',
    },

    {
      label: 'Smart Scheduling',
      description: 'AI Powered smart appointment scheduling considering provider availability and patient preferences',
    },

    {
      label: 'Live CC, Instant Translation',
      description: 'Generate Realtime Closed Captions and/or language translation in a Telehealth or in patient session',
    },

    {
      label: 'Visit Summaries',
      description: 'Effortlessly create clinical notes from patient-clinician conversations using generative AI',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 justify-center items-center md:ml-4">
      {workflows.map((workflow, index) => (
        <Card key={index} {...workflow} />
      ))}
    </div>
  );
};

// sidebar for + sign