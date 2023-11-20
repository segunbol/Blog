import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
// import { URL } from "../url";
import Navbar from "../components/Navbar";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleRegister = async () => {
    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    if (!username || !email || !password || !password2) {
      // alert("Please fill All Fields");
      setErrorMessage("Please fill All Fields");
      setError(true);
      return;
    }
    if (!isEmailValid) {
      setErrorMessage("Please enter valid email");
      setError(true);
      return;
    }
    if (password !== password2) {
      // alert("Passwords Don't Match");
      setErrorMessage("Passwords Don't Match");
      setError(true);
      return;
    }

    if (username && email && password && password2) {
      try {
        const res = await axios.post(`/api/v1/auth/register`, {
          username,
          email,
          password,
          password2,
        });
        // console.log("e reach here");
        setUsername(res.data.username);
        setEmail(res.data.email);
        setPassword(res.data.password);
        // setPassword2()
        setError(false);
        navigate("/login");
      } catch (err) {
        setErrorMessage(err.response.data);
        setError(true);
        console.log(err.response.data);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <Navbar />
      </div>
      <div className="w-full flex justify-center items-center h-[80vh] bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">Create an account</h1>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="text"
            placeholder="Enter your username"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="text"
            placeholder="Enter your email"
          />
          <div className="relative w-full">
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-900 outline-0"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <span
              onClick={handleShowPassword}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="relative w-full">
            <input
              onChange={(e) => setPassword2(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-900 outline-0"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <span
              onClick={handleShowPassword}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button
            onClick={handleRegister}
            className="w-full px-4 py-4 text-lg font-bold text-white bg-gray-900 rounded-lg hover:bg-gray-500 hover:text-gray-900 "
          >
            Register
          </button>
          {error && (
            <h3 className="text-red-500 text-sm ">
              Something went wrong: {errorMessage}
            </h3>
          )}
          <div className="flex justify-center items-center space-x-3">
            <p>Already have an account?</p>
            <p className="text-gray-500 hover:text-gray-900">
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
