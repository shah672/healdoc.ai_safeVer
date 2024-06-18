import { useState } from "react";
 // Adjust the path accordingly
import { useRouter } from "next/router";
import Link from "next/link";
import { signIn } from "next-auth/react";

const Login = () => {
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await signIn('credentials', {
        ...data,
        redirect: false,
      });
      router.push("../DummyProto/DummyProto");
    };

  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="left">
          <form className="form_container" onSubmit={handleSubmit}> 
            <h1>Login to Your Account</h1>

            <input
              type="text"
              placeholder="email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="input"
            />
            {/* <input
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="input"
            /> */}

            <div className="password_container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className="input"
              />
              <input
                type="checkbox"
                id="show_password"
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="show_password">Show password</label>
            </div>
            
            {error && <div className="error_msg">{error}</div>}
            <button type="submit" className="green_btn">
              Sign In
            </button>
          </form>
        </div>
        <div className="right">
          <h1>New Here?</h1>
          <p className="subtitle">Create an account to get started</p>
          <Link href="../SignUp/signup">
            <button className="white_btn">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;















  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     const url = "/api/_actions/auth";
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     const responseData = await response.json();
  //     console.log(responseData);
  //     if (response.ok) {
  //       // Redirect to dashboard or any other page after successful login
  //       router.push("../Ready");
  //     } else {
  //       setError(responseData.message || "Something did go wrong");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setError("Something is wrong");
  //   }
  // };