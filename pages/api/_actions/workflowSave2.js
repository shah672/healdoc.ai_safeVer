// import healdoc_final from '../../../config/database';
// import WorkflowSave from '../../../server/models/workflowSave';  // Importing the Mongoose model

// export default async function handler(req, res) {
//     await healdoc_final();  

//     if (req.method === 'POST') {
//         const { name, state } = req.body;  // Extract the serialized state from the request body

//         try {
//             // Create a new document in the MongoDB database using the WorkflowSave model
//             const newSave = new WorkflowSave({
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

//         try {
//             const latestWorkflow = await WorkflowSave.findOne().sort({ createdAt: -1 }); // Fetch the latest document based on the creation time
//             if (latestWorkflow) {
//                 res.json({ name: latestWorkflow.name, pageState: JSON.parse(latestWorkflow.pageState) });
 
//             } else {
//                 res.json({ name: "No workflows found", pageState: {} });
//             }
//         } catch (error) {
//             console.error("Error fetching latest workflow:", error);
//             res.status(500).send("Internal server error");
//         }
//     }         
// }




































