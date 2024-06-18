// pages/api/getWorkflowState.js

// import workflowSave from '../../../models/postModel';
// import healdoc_final from '../../../config/database';

// export default async function handler(req, res) {
//     await healdoc_final();

//     if (req.method === 'GET') {
//         try {
//             const state = await workflowSave.findById(req.query.id);
//             if (!state) {
//                 return res.status(404).send({ success: false, error: 'Not found' });
//             }
//             res.status(200).send({ success: true, pageState: JSON.parse(state.pageState) });
//         } catch (error) {
//             res.status(500).send({ success: false, error: error.message });
//         }
//     } else {
//         res.status(405).send({ error: "Method not allowed" });
//     }
// }







































