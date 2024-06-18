// import { User, validateUser } from "../../../server/models/user.js"; 
// import connectDB from "../../../server/utils/connectDB";
// import bcrypt from "bcrypt";

// connectDB(); // Ensure your database is connected

// export default async function handler(req, res) {
//     if (req.method === "POST") {
//       try {
//         const { error } = validateUser(req.body);
//         if (error) return res.status(400).send({ message: error.details[0].message });
  
//         const { email, password } = req.body;
  
//         // Email validation checks
//         if (!email.includes('@')) {
//           return res.status(400).send({ message: "Invalid email address" });
//         }
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//           return res.status(400).send({ message: "Invalid email address" });
//         }
  
//         // Password validation checks
//         if (password.length < 8) {
//           return res.status(400).send({ message: "Password must be at least 8 characters long" });
//         }
//         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
//         if (!passwordRegex.test(password)) {
//           return res.status(400).send({ message: "Password must contain at least one uppercase letter, one lowercase letter, and one digit" });
//         }
  
//         const user = await User.findOne({ email: req.body.email });
//         if (user) return res.status(409).send({ message: "User with given email already exists!" });
          
//         const salt = await bcrypt.genSalt(Number(process.env.SALT));
//         const hashPassword = await bcrypt.hash(req.body.password, salt);

//         await new User({ ...req.body, password: hashPassword }).save();
//         res.status(201).send({ message: "User created successfully" });
//       } catch (error) {
//         res.status(500).send({ message: "Internal Server Error" });
//       }
//     } else {
//       res.status(405).send({ message: "Method Not Allowed" });
//     }
//   }


import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export default async function handler(req, res) {

  console.log("Request method:", req.body);

  // if (req.method !== 'POST') {
  //   return res.status(405).json({ message: 'Method Not Allowed' });
  // }

  const { name, email, password } = req.body;

  
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing name, email, or password" });
  }

  const exist = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  if (exist) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword
    }
  });

  return res.status(201).json(user);
}







