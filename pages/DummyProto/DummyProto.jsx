import React, { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';     
import Sidebar, { SidebarItem, CardRow } from '../Sidebar';
import Link from 'next/link';
import { IoIosInformationCircleOutline } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import { GoWorkflow } from "react-icons/go";
import useSessionData from '../../hooks/useSessionData';
// import '../../styles/DummyProto.css';


const prisma = new PrismaClient();

export async function getServerSideProps(context) {
  console.log('getServerSideProps started');

  // Fetch the session data directly without using a hook
  const session = await getSession(context);
  console.log('Session:', session);

  // Check if the user is authenticated
  if (!session) {
    console.log('No session found, redirecting to sign-in');
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  const email = session.user.email;
  console.log('Email:', email);

  let user;
  try {
    // Fetch the user and their workflows from the database
    user = await prisma.user.findUnique({
      where: { email },
      // select: { workflows: true },
    });
     console.log('User fetched from database:', user);
  } catch (error) {
    console.error('Error fetching user from database:', error);
    return {
      notFound: true,
    };
  }

  // If no user is found, return a 404 error
  if (!user) {
    console.log('User not found, returning 404');
    return {
      notFound: true,
    };
  }

  const workflows = user.workflows ? user.workflows : [];

  // console.log('Returning props:', { workflows: user.workflows });

  return {
    props: {
      workflows,
    },
  };
}

const DummyProto = ({workflows = []}) => {
  const router = useRouter();
  const { sessions, loading } = useSessionData();

  if (loading) {
    return <div>Loading...</div>; // Render loading state until sessions are fetched
  }

  const handleRowClick = async (workflow) => {
    const email = sessions?.user?.email;
    const response = await fetch(`/api/_actions/getUserWorkflow?workflowId=${workflow.id}&email=${email}`);
    const data = await response.json();

    if (data.success) {
      router.push({
        pathname: '/workflowLoader/workflowLoader',
        query: { workflow: JSON.stringify(data.workflow) },
      });
    } else {
      console.error('Failed to fetch workflow state:', data.error);
    }
  };

  const initialColumns = ['Workflow Name', 'Last Modified'];
  // const data = workflows ? workflows.map(workflow => [workflow.name, new Date(workflow.lastModified).toLocaleString()]) : [];
  // const data = workflows.filter(workflow => workflow!== null) || [];
  const data = workflows.map(workflow => [workflow.name, new Date(workflow.lastModified).toLocaleString()]);



  return (
    <div className="bg_color">
      <div className="firstNavDiv">
        <nav className="fixedNav">
          <div className="all_workflows">
            <p>All Workflows</p>
          </div>
          <div className="nav-section end-section">
            <Link legacyBehavior href="../Ready/ready">
              <a><button className="button">
                <span className="button-content"> All Workflows+ </span>
              </button></a>
            </Link>
          </div>
        </nav>
      </div>

      <div className="firstNavDiv1">
        <nav className="fixedNav1">
          <div className="nav2container">
            <button className="recommendedButton">
              <IoIosInformationCircleOutline />Recommended</button>
            <button className="recentButton"><GrPowerReset />
              Recent</button>
          </div>
          <div className="browse-container">
            <button className="browseButton"><GoWorkflow style={{ marginRight: '8px' }} />
              Browse Workflow Library</button>
          </div>
        </nav>
      </div>

      <div style={{ width: "300px" }}>
        <Sidebar>
          <SidebarItem text="Home" />
          <SidebarItem text="Chat" />
          <SidebarItem text="Projects" />
          <SidebarItem text="Workflows +" />
          <SidebarItem text="Operating Systems" />
          <SidebarItem text="Workflow Library" />
          <SidebarItem text="Settings" />
          <SidebarItem text="Help" />
        </Sidebar>
      </div>

      <div className="lg:ml-72 pt-40">
        <CardRow />
      </div>

      <div className="table-container">
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                {initialColumns.map((column, index) => (
                  <th key={index}>
                    <div className="top-header"></div>
                    <div className="bottom-header">{column}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} onClick={() => handleRowClick(workflows[rowIndex])}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DummyProto;














// import React, { useState, useEffect } from 'react';
// // 
// import './DummyProto.css';
// import Sidebar, { SidebarItem } from './Sidebar';
// import { CardRow } from './Sidebar';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { IoIosInformationCircleOutline } from "react-icons/io";
// import { GrPowerReset } from "react-icons/gr";
// import { GoWorkflow } from "react-icons/go";
// import  WorkflowTable from '../components/WorkflowTable/WorkflowTable';
// import useSessionData from '../hooks/useSessionData';

// export default function DummyProto() {
//   const [models, setModels] = useState([]);

//   const newModelData = {
//     name: 'New Model',
//     description: 'This is a new model',
//     owner: 'John Doe',
//     lastModified: '2024-04-05',
//     dateCreated: '2024-04-01'
//     // You can include other necessary properties here
//   };
//   useSessionData();

//     const [formData, setFormData] = useState({
//       name: '',
//       password: ''
//     });

//     const handleInputChange = (e) => {
//       const { name, value } = e.target;
//       setFormData({
//         ...formData,
//         [name]: value
//       });
//     };

//     const handleSubmit = (e) => {
//       e.preventDefault();
//       console.log('Form submitted', formData);
//     };

//     // making changes to the table
//     const [workflowName, setWorkflowName] = useState('');
//     const [workflowDetails, setWorkflowDetails] = useState('');
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState('');

//   //for making a table
//   const initialColumns = ['Name', 'Description', 'Owner', 'Last Modified', 'Date Created'];
//   const initialData = [
//     ['New Workflow', 'No description provided', 'VV', '5/1/2024', '5/1/2024'],
//     ['New Workflow', 'No description provided', 'VV', '5/1/2024', '5/1/2024'],
//     ['New Workflow', 'No description provided', 'VV', '5/1/2024', '5/1/2024'],
//     ['New Workflow', 'No description provided', 'VV', '5/1/2024', '5/1/2024'],
//     ['New Workflow', 'No description provided', 'VV', '5/1/2024', '5/1/2024'],

//     // Add more rows of dummy data as needed
//   ];

//   // State to hold columns and data
//   const [columns, setColumns] = useState(initialColumns);
//   const [data, setData] = useState(initialData);

//   const handleWorkflowSaved = () => {
//     const newColumns = ['Name', 'Description', 'Owner', 'Last Modified', 'Date Created'];
//     const newData = [
//       ['Updated Workflow', 'Updated description', 'VV', '6/1/2024', '6/1/2024'],
//       // Add more rows of updated data as needed
//     ];

//     setColumns(newColumns);
//     setData(newData);
//   };


//   return (
//     <div className="">
 
//       <div className="">

//         <div className="firstNavDiv">
//               <nav className="fixedNav">
//                   <div className="nav-section start-section">
//                       <p>All Workflows</p>
//                   </div>

//                   <div className="nav-section end-section">
//                     <Link legacyBehavior href="./Ready/pagerRead">
//                       <a><button className="button">
//                             <span className="button-content"> All Workflows+ </span>
                        
//                           </button></a>
//                     </Link>
//                   </div>
//               </nav>
//          </div> 


//          <div className="firstNavDiv1">
//             <nav className="fixedNav1">
//               <div className="nav2container">
//                 <button className="recommendedButton">
//                   <IoIosInformationCircleOutline />Recommended</button>
//                 <button className="recentButton"><GrPowerReset />
//                 Recent</button>
//               </div>
//               <div className="browse-container">
//                 <button className="browseButton"><GoWorkflow style={{ marginRight: '8px' }} />
//                   Browse Workflow Library</button>
//                   {/* <p>Hi: {session.user.name}</p> */}
//               </div>
//             </nav>
//           </div>
      
//       <div className=""style={{ width: "300px" }}> 
//         <Sidebar>
//           <SidebarItem text="Home" />
//           <SidebarItem text="Chat" />
//           <SidebarItem text="Projects" />
//           <SidebarItem text="Workflows +" />
//           <SidebarItem text="Operating Systems" />
//           <SidebarItem text="Workflow Library" />
//           <SidebarItem text="Settings" />
//           <SidebarItem text="Help" />
//         </Sidebar>
//       </div>


//       <div className="lg:ml-72 pt-40">
//           <CardRow />
//           {/* <p>Hi: {useSessionData ? session.user.name : 'Loading...'}</p> */}
//       </div>

//        <div className="table-container">
//         <div className="table-wrapper">
//           <WorkflowTable columns={columns} data={data} />
//         </div>
//           <button onClick={handleWorkflowSaved}>Update Workflow</button>
//           {/* <button onClick={updateWorkflow}>Update Workflow</button>  */}
//       </div>    
//     </div>
//   </div>
//     );
// }


// // pages/DummyProto.js

// import { getSession } from 'next-auth/react';
// import { PrismaClient } from '@prisma/client';
// import React from 'react';
// import { useRouter } from 'next/router';
// import useSessionData from '../hooks/useSessionData';

// const prisma = new PrismaClient();

// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   // if (!session) {
//   //   return {
//   //     redirect: {
//   //       destination: '/api/auth/signin',
//   //       permanent: false,
//   //     },
//   //   };
//   // }

//   const email = session.user.email;

//   const user = await prisma.user.findUnique({
//     where: { email },
//     select: { workflows: true },
//   });

//   if (!user) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       workflows: user.workflows,
//     },
//   };
// }



//   const DummyProto = ({ workflows }) => {
//     const router = useRouter();
//     const { sessions } = useSessionData();

  
//     // const handleRowClick = (workflow) => {
//     //   router.push({
//     //     pathname: '/workflowLoader/workflowLoader',
//     //     query: { workflow: JSON.stringify(workflow) },
//     //   });
//     // };

//     const handleRowClick = async (workflow) => {
//       const email = sessions?.user?.email;
//       const response = await fetch(`/api/_actions/getUserWorkflow?workflowId=${workflow.id}&email=${email}`);
//       const data = await response.json();
  
//       if (data.success) {
//         router.push({
//           pathname: '/workflowLoader/workflowLoader',
//           query: { workflow: JSON.stringify(data.workflow) },
//         });
//       } else {
//         console.error('Failed to fetch workflow state:', data.error);
//       }
//     };

//   return (
//     <div>
//       <h1>Workflows</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Last Modified</th>
//           </tr>
//         </thead>
//         <tbody>
//           {workflows.map((workflow, index) => (
//             <tr key={index} onClick={() => handleRowClick(workflow)}>
//               <td>{workflow.name}</td>
//               <td>{new Date(workflow.lastModified).toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DummyProto;



















































