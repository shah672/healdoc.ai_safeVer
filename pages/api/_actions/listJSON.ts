// // pages/api/list-json-files.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import AWS from 'aws-sdk';

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   sessionToken: process.env.AWS_SESSION_TOKEN,
//   region: 'us-east-1',  // Replace with your region
// });

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   const { bucket, folder } = req.body;

//   const params: AWS.S3.ListObjectsV2Request = {
//     Bucket: bucket,
//     Prefix: `${folder}/`,
//   };

//   try {
//     // const data = await s3.getObject(params).promise();
//     // const fileContent = data.Body?.toString('utf-8');
//     // res.status(200).json(JSON.parse(fileContent));

//     const data = await s3.listObjectsV2(params).promise();
//     const jsonFiles = data.Contents?.filter(item => item.Key?.endsWith('.json')) || [];


//     const jsonContents: any[] = [];

//     for (const file of jsonFiles) {

//       if (!file.Key) {
//         console.log(`Skipping file with no key: ${file}`);
//         continue;
//       }

//       const fileParams: AWS.S3.GetObjectRequest = {
//         Bucket: bucket,
//         Key: file.Key,
//       };

//       const fileData = await s3.getObject(fileParams).promise();
//       const fileContent = fileData.Body?.toString('utf-8');

//       if (fileContent) {
//         const jsonContent = JSON.parse(fileContent);
//         jsonContents.push(jsonContent);
//       } else {
//         console.log(`Skipping file with no content: ${file.Key}`);
//       }
//       // const jsonContent = JSON.parse(fileContent);

//       // jsonContents.push(jsonContent);
//     }


//     res.status(200).json(jsonContents);


//   } catch (err) {
//     console.error('Error listing JSON files:', err);
//     res.status(500).json({ error: 'Error listing JSON files' });
//   }
// };










