import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { Store } from "../context/UserContext";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  // console.log(prompt)

  const showMenu = () => {
    setMenu(!menu);
  };

  const { state } = useContext(Store);
  const { userInfo } = state;

  return (
    <div className="z-50 flex items-center bg-gray-900 justify-between px-6 md:px-[100px] fixed top-0 left-0 right-0 py-4">
      <img src="/Shoboleyoke-logo1.jpg" className="w-8 h-8 rounded" alt="logo" />
      <h1 className="text-lg md:text-xl  text-white font-extrabold ">
        <Link to="/">Shoboloyoke</Link>
      </h1>
      <span className="w-24 text-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 text-gray-100 hover:text-black  hover:bg-gray-300 rounded-full bg-cover bg-center">
        <Link to="/?cat=art">
          <h6>Art</h6>
        </Link>
      </span>
      <Link
        className="w-24 text-center text-gray-100 hover:transition ease-in-out delay-150 hover:text-black animate-bounce hover:bg-gray-300 rounded-full bg-cover bg-center"
        to="/?cat=science"
      >
        <h6>Science</h6>
      </Link>
      <Link
        className="w-24 text-center text-gray-100 hover:transition ease-in-out delay-150 hover:text-black animate-bounce hover:bg-gray-300 rounded-full bg-cover bg-center"
        to="/?cat=technology"
      >
        <h6>Technology</h6>
      </Link>
      <Link
        className="w-24 text-center text-gray-100 hover:transition ease-in-out delay-150 hover:text-black animate-bounce hover:bg-gray-300 rounded-full bg-cover bg-center"
        to="/?cat=cinema"
      >
        <h6>Cinema</h6>
      </Link>
      <Link
        className="w-24 text-center text-gray-100 hover:transition ease-in-out delay-150 hover:text-black animate-bounce hover:bg-gray-300 rounded-full bg-cover bg-center"
        to="/?cat=design"
      >
        <h6>Design</h6>
      </Link>
      <Link
        className="w-24 text-center text-gray-100 hover:transition ease-in-out delay-150 hover:text-black animate-bounce hover:bg-gray-300 rounded-full bg-cover bg-center"
        to="/?cat=food"
      >
        <h6>Food</h6>
      </Link>

      {path === "/" && (
        <div className="flex justify-center items-center space-x-2">
          <p
            onClick={() =>
              navigate(prompt ? "?search=" + prompt : navigate("/"))
            }
            className="cursor-pointer"
          >
            <BsSearch className="text-white" />
          </p>
          <input
            onChange={(e) => setPrompt(e.target.value)}
            className="outline-none px-3 rounded text-gray-100 bg-gray-600"
            placeholder="Search a post"
            type="text"
          />
        </div>
      )}
      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4 ">
        {userInfo ? (
          <h3>
            <Link
              to="/write"
              className="w-24 text-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 text-gray-100 hover:text-black  hover:bg-gray-300 rounded-full bg-cover bg-center"
            >
              Write
            </Link>
          </h3>
        ) : (
          <h3>
            <Link to="/login">Login</Link>
          </h3>
        )}
        {userInfo ? (
          <div onClick={showMenu}>
            <p className="cursor-pointer relative">
              <FaBars className="w-24 text-center text-white " />
            </p>
            {menu && <Menu />}
          </div>
        ) : (
          <h3>
            <Link to="/register">Register</Link>
          </h3>
        )}
      </div>
      <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative">
          <FaBars />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
