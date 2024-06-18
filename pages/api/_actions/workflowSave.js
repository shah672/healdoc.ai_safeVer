import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, state, workflowName, lastModified } = req.body;  // Extract necessary fields from the request body
    console.log('Request Body:', req.body); // Log request body

    try {
      if (!email || !state || !workflowName || !lastModified) {
        throw new Error('Email, state, workflowName, and lastModified are required');
      }

      // Find the user by email
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error('User not found');
      }

      // Append the new workflow to the existing workflows or create a new array if none exist
      const newWorkflow = {
        id: uuidv4(), 
        name: workflowName,
        state,
        lastModified,
      };
      const updatedWorkflows = user.workflows ? [...user.workflows, newWorkflow] : [newWorkflow];

      // Update the user's workflows
      const updatedUser = await prisma.user.update({
        where: { email },
        data: { workflows: updatedWorkflows },
      });

      res.status(201).json({ success: true, workflows: updatedUser.workflows });
    } catch (error) {
      console.error('Error in saving data:', error);
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (req.method === 'GET') {
    const { email } = req.query;
    try {
      if (!email) {
        return res.status(400).json({ success: false, error: 'Email parameter is required' });
      }

      // Find the user by email
      const user = await prisma.user.findUnique({
        where: { email },
        select: { workflows: true },
      });

      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }

      res.status(200).json({ success: true, workflows: user.workflows });
    } catch (error) {
      console.error('Error retrieving workflows by email:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}































// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { email, state } = req.body;  // Extract email and state from the request body
//     console.log('Request Body:', req.body); // Log request body

//     try {
//       if (!email) {
//         throw new Error('Email is required');
//       }

//       // Create or update the document in the MongoDB database using Prisma
//       const workflow = await prisma.workflowSave.upsert({
//         where: { email },
//         update: { state },
//         create: { email, state },
//       });
//       res.status(201).json({ success: true, id: workflow.id });
//     } catch (error) {
//       console.error('Error in saving data:', error);
//       res.status(400).json({ success: false, error: error.message });
//     }
//   } else if (req.method === 'GET') {
//     const { email } = req.query;
//     try {
//       if (!email) {
//         return res.status(400).json({ success: false, error: 'Email parameter is required' });
//       }

//       const state = await prisma.workflowSave.findUnique({
//         where: { email }
//       });
//       if (!state) {
//         return res.status(404).json({ success: false, error: 'State not found' });
//       } else {
//         const pageStateParsed = JSON.parse(state.state);
//         res.status(200).json({ success: true, pageState: pageStateParsed });
//       }
//     } catch (error) {
//       console.error('Error retrieving state by email:', error);
//       res.status(500).json({ success: false, error: error.message });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// }

















// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   const { user } = req.session;

//   if (!user) {
//     return res.status(401).json({ success: false, error: 'Unauthorized' });
//   }

//   const userEmail = user.email; // Use email instead of _id


//   if (req.method === 'POST') {
//     const { state } = req.body;  // Extract the serialized state from the request body
//     try {
//       // Create or update the document in the MongoDB database using Prisma
//       const workflow = await prisma.workflowSave.upsert({
//         where: { userEmail },
//         update: { state },
//         create: { userEmail, state },
//       });
//       res.status(201).json({ success: true, id: workflow.id });
//     } catch (error) {
//       console.error('Error in saving data:', error);
//       res.status(400).json({ success: false, error: error.message });
//     }
//   } else if (req.method === 'GET') {
//     try {
//       const state = await prisma.workflowSave.findUnique({
//         where: { userEmail }
//       });
//       if (!state) {
//         return res.status(404).json({ success: false, error: 'State not found' });
//       } else {
//         const pageStateParsed = JSON.parse(state.state);
//         res.status(200).json({ success: true, pageState: pageStateParsed });
//       }
//     } catch (error) {
//       console.error('Error retrieving state by user email:', error);
//       res.status(500).json({ success: false, error: error.message });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// }


// export default async function handler(req, res) { 

//     if (req.method === 'POST') {
//         const { userId, name, state } = req.body;  // Extract the serialized state from the request body

//         try {
//             // Create a new document in the MongoDB database using the WorkflowSave model
//             const newSave = new WorkflowSave({
//                 userId,
//                 name: name,  // Storing the workflow name
//                 pageState: state  // Storing the serialized state
//             });

//             const savedData = await newSave.save();  // Save the document in the database
//             console.log('data saved correctly');
//             res.status(201).json({ success: true, id: savedData._id.toString() });

//         } catch (error) {
        
//             console.error('Error in saving data:', error);
//             res.status(400).json({ success: false, error: error.message });    
//         }
        
//     } 


//     else if (req.method === 'GET') {
//         const { userId } = req.query;
//         try {
//           if (!userId) {
//             return res.status(400).json({ success: false, error: 'User ID parameter is required' });
//           }
    
//           const state = await WorkflowSave.findOne({ userId });
//           if (!state) {
//             return res.status(404).json({ success: false, error: 'State not found' });
//           } else {
//             const pageStateParsed = JSON.parse(state.pageState);
//             res.status(200).json({ success: true, pageState: pageStateParsed });
//           }
//         } catch (error) {
//           console.error('Error retrieving state by user ID:', error);
//           res.status(500).json({ success: false, error: error.message });
//         }
//       }    

//     else {
//         res.status(405).json({ error: "Method not allowed" });
//     }
// }





















