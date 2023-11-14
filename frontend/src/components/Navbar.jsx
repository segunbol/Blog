import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import Menu from "./Menu";
import { Store } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const path = useLocation().pathname;
  const [showSearchInput, setShowSearchInput] = useState(false);

  // console.log(prompt)

  const fetchCategories = async () => {
    try {
      const res = await axios.get(URL + "/api/v1/categories");
      console.log(res.data);
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // const categoryPost = async (x) => {
  //   try {
  //     const res = await axios.get(URL + "/api/v1/categories" + x.)
  //     set
  //   } catch (error) {

  //   }
  // }

  const showMenu = () => {
    setMenu(!menu);
  };

  const handleSearch = () => {
    if (prompt) {
      navigate(prompt ? "?search=" + prompt : navigate("/"));
    }
  };

  const handleSearchInputKeyUp = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearchIconClick = () => {
    setShowSearchInput(!showSearchInput);
  };

  const { state } = useContext(Store);
  const { userInfo } = state;
  console.log(userInfo);
  return (
    <div className="z-50 flex items-center bg-gray-900 justify-between lg:px-[20px] md:px-[30px] sm:px-[30px] xs:px-[30px]  fixed top-0 left-0 right-0 py-4">
      <div className="flex items-center space-x-2">
        <img
          src="/Shoboleyoke-logo1.jpg"
          className="w-8 h-8 rounded"
          alt="logo"
        />
        <h1 className="text-lg md:text-xl  text-white font-extrabold ">
          <Link to="/">Shoboloyoke</Link>
        </h1>
      </div>
      <div className=" items-center lg:flex md:hidden xs:hidden sm:hidden">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/?cat=${category.name}`}
            className="w-24 text-center text-gray-100 hover:transition ease-in-out delay-150 hover:text-black hover:bg-gray-300 rounded-full bg-cover bg-center"
          >
            <h6>{category.name}</h6>
          </Link>
        ))}
      </div>

      <div className="flex justify-center items-center space-x-2 grid-cols-4 absolute right-36">
        {showSearchInput && (
          <input
            onKeyUp={handleSearchInputKeyUp}
            onChange={(e) => setPrompt(e.target.value)}
            className="outline-none px-3 h-10 w-64 rounded text-gray-100 bg-gray-600"
            placeholder="Search a post"
            type="text"
          />
        )}
        <p onClick={handleSearchIconClick} className="cursor-pointer">
          <BsSearch className="text-white" />
        </p>
      </div>

      <div className="md:flex items-center justify-center space-x-2 md:space-x-4 ">
        {userInfo ? (
          <div className="flex space-x-1 items-center">
            <div className="flex space-x-6 pr-2 ">
              <Link to={"/profile/" + userInfo._id} className="justify-center">
                <img
                  src={userInfo.userImg}
                  className="w-10 h-10 rounded-full object-cover"
                  alt="user"
                />
              </Link>
            </div>
            <div onClick={showMenu}>
              <p className="cursor-pointer relative">
                <FaBars className="h-10 w-10 pr-3 mr-3 text-center text-white " />
              </p>
              {menu && <Menu />}
            </div>
          </div>
        ) : (
          <div className="flex space-x-1 items-center">
            {path === "/login" ? (
              <div className="flex space-x-4 pr-2 text-center ">
                <Link to="/register" className="text-center text-gray-100">
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex space-x-4 pr-2 text-center ">
                <Link to="/login" className="text-center text-gray-100">
                  Login
                </Link>
              </div>
            )}

            <div onClick={showMenu}>
              <p className="cursor-pointer relative">
                <FaBars className="h-10 w-10 pr-3 mr-3 text-center text-white " />
              </p>
              {menu && <Menu />}
            </div>
          </div>
        )}
      </div>
      {/* <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative">
          <FaBars />
        </p>
        {menu && <Menu />}
      </div> */}
    </div>
  );
};

export default Navbar;
