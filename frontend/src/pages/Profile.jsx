import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
// import { URL } from "../url";
import { Store } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Profile = () => {
  const param = useParams().id;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userImg, setUserImg] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updated, setUpdated] = useState(false);
  // console.log(user)

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/api/v1/users/" + userInfo._id);
      setUsername(res.data.username);
      setUserImg(res.data.userImg);
      setEmail(res.data.email);
      setPassword(res.data.password);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserImageUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
    TransformFileData(file);
  };

  const TransformFileData = (file) => {
    const reader = new FileReader();
    console.log(file);
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setUserImg(reader.result);
      };
    } else {
      setUserImg("");
    }
  };
  console.log(userImg);
  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      await axios.put(
        "/api/v1/users/" + userInfo._id,
        { username, email, password, userImg },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
          withCredentials: true,
        }
      );
      // console.log(res.data)
      setUpdated(true);
    } catch (err) {
      console.log(err);
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    try {
      await axios.delete("/api/v1/users/" + userInfo._id, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
        withCredentials: true,
      });
      ctxDispatch({ type: "USER_SIGNOUT" });
      localStorage.removeItem("userInfo");
      navigate("/");
      // console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(userInfo)
  const fetchUserPosts = async () => {
    try {
      const res = await axios.get("/api/v1/posts/user/" + userInfo._id, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
        withCredentials: true,
      });
      // console.log(res.data)
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [param]);

  useEffect(() => {
    fetchUserPosts();
  }, [param]);

  return (
    <div>
      <Navbar />
      <div className="bg-gray-800 p-12 min-h-[80vh] px-8 md:px-[30px] lg:px-[100px] gap-x-8 mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
        <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
          <h1 className="text-xl  text-gray-400 font-bold mb-4">Your posts:</h1>
          {posts?.map((p) => (
            <ProfilePosts key={p._id} p={p} />
          ))}
        </div>
        <div className="md:sticky md:top-12  flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end ">
          <div className=" flex flex-col space-y-4 items-start">
            <h1 className="text-xl font-bold mb-4 text-gray-400">Profile</h1>
            <div className="item">
              <ImagePreview>
                {userImg ? (
                  <>
                    <img src={userImg} alt="error!" />
                  </>
                ) : (
                  <>
                    <img src="/user.png" alt="error!" />
                  </>
                )}
              </ImagePreview>
              <input
                style={{ display: "none" }}
                type="file"
                id="imgUpload"
                // value={userImg}
                name="image"
                accept="image/*"
                onChange={handleUserImageUpload}
                className="px-4"
              />
              <label className="file text-gray-400" htmlFor="imgUpload">
                Upload Image
              </label>
            </div>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your username"
              type="text"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your email"
              type="email"
            />

            {/* <input onChange={(e)=>setPassword(e.target.value)} value={password} className="outline-none px-4 py-2 text-gray-500" placeholder="Your password" type="password"/> */}
            <div className="flex items-center space-x-4 mt-8">
              <button
                onClick={handleUserUpdate}
                className="text-white font-semibold bg-gray-900 px-4 py-2 hover:text-black hover:bg-gray-400"
              >
                Update
              </button>
              <button
                onClick={handleUserDelete}
                className="text-white font-semibold bg-gray-900 px-4 py-2 hover:text-black hover:bg-gray-400"
              >
                Delete
              </button>
            </div>
            {updated && (
              <h3 className="text-green-500 text-sm text-center mt-4">
                user updated successfully!
              </h3>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const ImagePreview = styled.div`
  border: 2px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  color: rgb(78, 78, 78);
  border-radius: 5px;

  img {
    max-width: 100%;
  }
`;

export default Profile;
