// // // pages/api/signup.js

// // export default async function handler(req, res) {
// //     if (req.method === 'POST') {
// //       const { name, hospitalTaxID, nationalProviderIdentity } = req.body;
// //       // Handle signup logic here, e.g., save data to a database
// //       console.log(name, hospitalTaxID, nationalProviderIdentity);
// //       res.status(200).json({ message: 'Signup successful' });
// //     } else {
// //       res.status(405).json({ error: 'Method Not Allowed' });
// //     }
// //   }
  



// import { User, validateHomeSignUp } from "../../../server/models/logUser"; // Adjust the import path based on your project structure
// import bcrypt from "bcrypt";
// import connectDB from "../../../server/utils/connectDB"; // Adjust the import path based on your project structure

// connectDB(); // Ensure your database is connected

// export default async function handler(req, res) {
//     if (req.method === "POST") {
//       try {
//         const { error } = validateHomeSignUp(req.body);
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