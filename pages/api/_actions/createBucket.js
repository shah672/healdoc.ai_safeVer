// import { NextApiRequest, NextApiResponse } from 'next';
// import s3 from '../../../utils/AWS'; // Make sure the import path is correct


// function generateProviderID() {
//     // Generate a random 9-digit number
//     const providerID = Math.floor(100000000 + Math.random() * 900000000);
//     return providerID.toString().substring(0, 9); // Ensure the length is exactly 9 digits
//   }


// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { taxID, NationalProviderIdentifier } = req.body;

//     if (!taxID || !NationalProviderIdentifier) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     try {

//       const providerID = generateProviderID();   
//       const bucketName = `${taxID}`;
//       const bucketParams = {
//         Bucket: bucketName,
//         ACL: 'private',
//       };
//       const headBucket = await s3.headBucket(bucketParams).promise().catch(() => null);

//       if (!headBucket) {
//         await s3.createBucket(bucketParams).promise();
      
//       const encryptionParams = {
//         Bucket: bucketName,
//         ServerSideEncryptionConfiguration: {
//           Rules: [
//             {
//               ApplyServerSideEncryptionByDefault: {
//                 SSEAlgorithm: 'AES256', // or 'aws:kms' for KMS encryption
//               },
//             },
//           ],
//         },
//       };

//       await s3.putBucketEncryption(encryptionParams).promise();
//     }

//     const folderParams = {
//         Bucket: bucketName,
//         Key: `${NationalProviderIdentifier}/`,
//       };

//     await s3.putObject(folderParams).promise();

//     const concatenatedID = `${taxID}.${NationalProviderIdentifier}.${providerID}`;

//       const manifestParams = {
//         Bucket: bucketName,
//         Key: `${NationalProviderIdentifier}/manifest.txt`,
//         Body: concatenatedID,
//       };

//       await s3.putObject(manifestParams).promise();

      
//       return res.status(200).json({ message: 'Bucket and folder created successfully' });
//     } catch (error) {
//       console.error('Error creating bucket:', error);
//       return res.status(500).json({ error: 'please enter the correct Tax ID' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }












