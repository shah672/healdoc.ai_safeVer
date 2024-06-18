import { PrismaClient } from '@prisma/client';
import useSessionData from '../../../hooks/useSessionData';

const prisma = new PrismaClient();


export default async function handler(req, res) {
  if (req.method === 'GET') {

    const { workflowId, email } = req.query;


    if (!workflowId) {
        return res.status(400).json({ success: false, error: 'Workflow ID is required' });
      }

      if (!email) {
        return res.status(400).json({ success: false, error: 'Email is required' });
      }
  

    try {
      const user = await prisma.user.findUnique({
        where: { email },
        select: { workflows: true },
      });

      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }

      const workflow = user.workflows.find(wf => wf.id === workflowId);

      if (!workflow) {
        return res.status(404).json({ success: false, error: 'Workflow not found' });
      }


      res.status(200).json({ success: true, workflow });
    } catch (error) {
      console.error('Error retrieving workflow state:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}









// import { PrismaClient } from '@prisma/client';
// import { getSession } from 'next-auth/react';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   const session = await getSession({ req });

//   if (!session) {
//     return res.status(401).json({ success: false, error: 'Unauthorized' });
//   }

//   if (req.method === 'GET') {
//     try {
//       const user = await prisma.user.findUnique({
//         where: { email: session.user.email },
//         select: { workflows: true },
//       });

//       if (!user) {
//         return res.status(404).json({ success: false, error: 'User not found' });
//       }

//       res.status(200).json({ success: true, workflows: user.workflows });
//     } catch (error) {
//       console.error('Error fetching workflows:', error);
//       res.status(500).json({ success: false, error: error.message });
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// }







