// import { NextApiRequest, NextApiResponse } from "next";
// import bcrypt from "bcrypt";
// import connectDB from "../../../server/utils/connectDB"; // Assuming you have a utility to connect to your database
// import session from 'express-session';
// import { User, validateHomeLogin } from "../../../server/models/logUser";

// connectDB(); // Ensure your database is connected

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   // await startSession(req, res);
//   if (req.method === "POST") {
//     try {
//       const { error } = validateHomeLogin(req.body);
//       if (error) return res.status(400).send({ message: error.details[0].message });

//       const user = await User.findOne({ email: req.body.email });
//       if (!user) return res.status(401).send({ message: "Invalid Email or Password" });

//        const validPassword = await bcrypt.compare(req.body.password, user.password);
//        if (!validPassword) return res.status(401).send({ message: "Invalid Email or Password" });

//       const token = user.generateAuthToken();

//       res.status(200).send({ data: token, message: "Logged in successfully" });
//     } catch (error) {
//       res.status(500).send({ message: "Internal Server Error" });
//     }
//   } else {
//     res.status(405).send({ message: "Method Not Allowed" });
//   }
// }


































