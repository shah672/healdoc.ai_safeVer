// import { useState } from "react";
// // Adjust the path accordingly
// // import { useRouter } from "next/router";
// import { useRouter } from 'next/navigation';
// import styles from "../../styles/signup.module.css";


// const Signup = () => {
//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState<string>("");
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const url = "/api/_actions/users";
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });
//       const responseData = await response.json();
//       console.log(responseData);
//       if (response.ok) {
//         // Redirect to login page or any other page
//         router.push("../Login/login");

//       } else {
//         setError(responseData.message || "Something was wrong"); // error is here.
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setError("Something is wrong");
//     }
//   };

//   return (
//     <div className={styles.signupContainer}>
//       <div className={styles.signupFormContainer}>
//         <div className={styles.left}>
//           <h1>Welcome Back</h1>
//         </div>
//         <div className={styles.right}>
//           <form className={styles.formContainer} onSubmit={handleSubmit}>
//             <h1>Create Account</h1>
//             <input
//               type="text"
//               placeholder="Name"
//               name="name"
//               onChange={handleChange}
//               value={data.name}
//               required
//               className={styles.input}
//             />
//             <input
//               type="text"
//               placeholder="email"
//               name="email"
//               onChange={handleChange}
//               value={data.email}
//               required
//               className={styles.input}
//             />
//             <div className={styles.passwordContainer}>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="password"
//                 name="password"
//                 onChange={handleChange}
//                 value={data.password}
//                 required
//                 className={styles.input}
//               />
//               <input
//                 type="checkbox"
//                 id="show_password"
//                 onChange={() => setShowPassword(!showPassword)}
//               />
//               <label htmlFor="show_password">Show password</label>
//             </div>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <button type="submit" className={styles.greenBtn}>
//               Sign Up
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;



import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from './signup.module.css'; // Import your CSS module


const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = "/api/_actions/users";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        // Redirect to login page or any other page
        router.push("../newLogin/newLogin");
      } else {
        setError(responseData.message || "Something was wrong"); // error is here.
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something is wrong");
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupFormContainer}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
        </div>
        <div className={styles.right}>
          <form className={styles.formContainer} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={data.name}
              required
              className={styles.inputsign}
            />
            <input
              type="text"
              placeholder="email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.inputsign}
            />
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className={styles.inputsign}
              />
              <input
                type="checkbox"
                id="show_password"
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="show_password">Show password</label>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" className={styles.greenBtn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
