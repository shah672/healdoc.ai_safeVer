// import UserModel from '../../../models/ContactUs';

// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         try {
//             const { firstName, lastName, email, number, company, title } = req.body;

//             // Create a new user document
//             const newUser = new UserModel({
//                 firstName,
//                 lastName,
//                 email,
//                 number,
//                 company,
//                 title
//             });

//             // Save the user document to the database
//             await newUser.save();

//             res.status(201).json({ message: 'User created successfully' });
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     } else {
//         res.status(405).json({ error: `Method ${req.method} Not Allowed` });
//     }
// }











