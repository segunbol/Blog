import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
// import { URL } from "../url";
// import { UserContext } from "../context/UserContext";
import { Store } from "../context/UserContext";
import Navbar from "../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  // const { setUser } = useContext(UserContext);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  // console.log(userInfo.data._id);
  // console.log(state);
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        "/api/v1/auth/login",
        { email, password },
        { withCredentials: true }
      );
      // console.log(data.data);
      ctxDispatch({ type: 'USER_SIGNIN', payload: (data.data) });
      localStorage.setItem('userInfo', JSON.stringify(data.data));
      navigate('/');
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);
  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <Navbar />
      </div>
      <div className="w-full flex justify-center items-center h-[80vh]  bg-gradient-to-r from-slate-900 via-purple-700 to-slate-800">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">
            Log in to your account
          </h1>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-900 outline-0"
            type="text"
            placeholder="Enter your email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-900 outline-0"
            type="password"
            placeholder="Enter your password"
          />
          <button
            onClick={handleLogin}
            className="w-full px-4 py-4 text-lg font-bold text-white bg-gray-900 rounded-lg hover:bg-gray-500 hover:text-gray-900 "
          >
            Log in
          </button>
          {error && (
            <h3 className="text-red-500 text-sm ">Something went wrong</h3>
          )}
          <div className="flex justify-center items-center space-x-3">
            <p>New here?</p>
            <p className="text-gray-500 hover:text-gray-900">
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
