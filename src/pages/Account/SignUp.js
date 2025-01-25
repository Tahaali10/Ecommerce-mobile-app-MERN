import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FooterBottom from "../../components/home/Footer/FooterBottom";
import axios from 'axios'; // Add axios for API calls

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  // Email validation
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
  
    if (!username) setError("Enter your username");
    if (!email || !EmailValidation(email)) setError("Enter a valid email");
    if (!password || password.length < 6) setError("Passwords must be at least 6 characters");
    if (!checked) return setError("You must accept the terms and conditions.");
  
    if (username && email && password && EmailValidation(email)) {
      try {
        const response = await axios.post("http://localhost:5000/api/auth/register", {
          username,
          email,
          password,
        });
  
        const { token, username: registeredUsername } = response.data;
        localStorage.setItem("user", JSON.stringify({ token, username: registeredUsername }));
  
        setSuccessMsg(`Hello ${registeredUsername}, you have signed up successfully! Redirecting to home...`);
        
        // Redirect after success
        setTimeout(() => {
          navigate("/"); // Navigate to home or any other route
          window.location.reload(); // Refresh the page after successful sign-up
        }, 2000);
      } catch (err) {
        setError("Failed to sign up, please try again.");
      }
    }
  };

  return (
    <div>
      <div className="w-full h-screen flex items-center justify-start">
        <div className="w-full h-full flex flex-col justify-center">
          {successMsg ? (
            <div className="w-[500px]">
              <p className="w-full px-4 py-5 text-green-500 font-medium font-titleFont">
                {successMsg}
              </p>
            </div>
          ) : (
            <form className="w-full h-screen flex items-start justify-start mt-5" onSubmit={handleSignUp}>
              <div className="px-3 py-2 w-full h-[90%] flex flex-col justify-start">
                <h1 className="font-titleFont text-[#317248] font-semibold text-3xl mb-4">
                  Create Your Account
                </h1>
                <div className="flex flex-col gap-3">
                  {/* Username */}
                  <div className="flex flex-col gap-.5">
                    <p className="font-titleFont text-base font-semibold text-[#317248]">Username</p>
                    <input
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder="eg. johndoe"
                      autoComplete="username"
                    />
                  </div>
                  {/* Email */}
                  <div className="flex flex-col gap-.5">
                    <p className="font-titleFont text-base font-semibold text-[#317248]">Email</p>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="email"
                      placeholder="john@gmail.com"
                      autoComplete="email"
                    />
                  </div>
                  {/* Password */}
                  <div className="flex flex-col gap-.5 relative">
                    <p className="font-titleFont text-base font-semibold text-[#317248]">Password</p>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type={showPassword ? "text" : "password"} // Toggle input type
                      placeholder="Create password"
                      autoComplete="current-password"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-8 cursor-pointer text-gray-600 hover:text-black"
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </span>
                  </div>
                  {/* Checkbox */}
                  <div className="flex items-start gap-1">
                    <input
                      onChange={() => setChecked(!checked)}
                      className="w-4 h-4 cursor-pointer"
                      type="checkbox"
                    />
                    <p className="text-sm text-[#317248]">
                      I agree to the Jhang Rang Online Store's <span className="text-[#f9cc1f]">Terms of Service </span> and{" "}
                      <span className="text-[#f9cc1f]">Privacy Policy</span>.
                    </p>
                  </div>
                  <button
                    type="submit"
                    className={`${
                      checked ? "bg-[#317248] text-white cursor-pointer" : "bg-gray-500 cursor-none"
                    } w-full text-white-200 text-base font-medium h-10 rounded-md duration-300`}
                  >
                    Create Account
                  </button>
                  {error && <p className="text-red-500">{error}</p>}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
      {/* <FooterBottom /> */}
    </div>
  );
};

export default SignUp;
