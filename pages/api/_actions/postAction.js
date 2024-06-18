// 'use server'

// import PostModel from '../../../server/models/postModel';
// import healdoc_final from '../../../config/database';

// export default async function handler(req, res) {
//     if (req.method === 'GET') {
//         try {
//             // Initialize the database connection
//             await healdoc_final();

//             // Fetch posts from the database
//             const posts = await PostModel.find();
            
//             res.status(200).json({ posts });
//         } catch (error) {
//             console.error('Database fetch error:', error);
//             res.status(500).json({ error: error.message });
//         }
//     } else {
//         res.setHeader('Allow', ['GET']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }



// /*
// export async function getPosts() {
//     try {
//         await healdoc_final();
//         const data = JSON.parse(JSON.stringify(await PostModel.find()));

//         console.log("Retrieved data", data);

//         return data;
//     }
//     catch (error) {
//         console.error("Error fetching data", error);
//         return { errMsg: error.message }
//     }
// }
// */








