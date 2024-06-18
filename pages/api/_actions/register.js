// import { getToken } from 'next-auth/jwt';
// import { User } from '../../../server/models/user';
// import connectDB from '../../../server/utils/connectDB';

// connectDB();

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const token = await getToken({ req, secret: process.env.JWT_SECRET });
//     if (!token) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const { taxID, NationalProviderIdentifier, userId } = req.body;
//     if (!taxID || !NationalProviderIdentifier || !userId) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     try {
//       const user = await User.findById(userId);
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }

//       user.taxID = taxID;
//       user.NationalProviderIdentifier = NationalProviderIdentifier;
//       await user.save();

//       res.status(200).json({ message: 'Provider details saved successfully' });
//     } catch (error) {
//       console.error('Error saving provider details:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method Not Allowed' });
//   }
// }


