import { useContext } from "react";
import { Store } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import { Link, useNavigate } from "react-router-dom";

const Menu = () => {
  const { dispatch: ctxDispatch } = useContext(Store);
  const {state} = useContext(Store);
  const {userInfo} = state
  // const { setUser } = useContext(Store);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(URL + "/api/v1/auth/logout", {
        withCredentials: true ,
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      ctxDispatch({ type: 'USER_SIGNOUT' });
      localStorage.removeItem('userInfo');
      // console.log(res)
      // setUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  
  return (
    <div className="bg-black w-[200px] z-10 flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-md p-4 space-y-4">
      {!userInfo && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to="/login">Login</Link>
        </h3>
      )}
      {!userInfo && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to="/register">Register</Link>
        </h3>
      )}
      {userInfo && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to={"/profile/" + userInfo._id}>Profile</Link>
        </h3>
      )}
      {userInfo && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to="/write">Write</Link>
        </h3>
      )}
      {userInfo && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to={"/myblogs/" + userInfo._id}>My blogs</Link>
        </h3>
      )}
      {userInfo && (
        <h3
          onClick={handleLogout}
          className="text-white text-sm hover:text-gray-500 cursor-pointer"
        >
          Logout
        </h3>
      )}
    </div>
  );
};

export default Menu;
