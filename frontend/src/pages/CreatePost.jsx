import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import { ImCross } from "react-icons/im";
import { useContext, useEffect, useState } from "react";
import { Store } from "../context/UserContext";
// import { URL } from "../url";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../style.scss";



const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  // const [value, setValue] = useState("");
  const [postImg, setPostImg] = useState(null);
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [categories, setCategories] = useState([]);
  const [cats, setCats] = useState([]);
  const navigate = useNavigate();

  console.log(cats)

  const fetchCategories = async () => {
    // setLoader(true);
    try {
      const res = await axios.get("/api/v1/categories");
      console.log(res.data)
      setCategories(res.data);
      // if (res.data.length === 0) {
      //   setNoResults(true);
      // } else {
      //   setNoResults(false);
      // }
      // setLoader(false);
    } catch (err) {
      console.log(err);
      // setLoader(true);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // const deleteCategory = (i) => {
  //   let updatedCats = [...cats];
  //   updatedCats.splice(i);
  //   setCats(updatedCats);
  // };

  const handlePostImageUpload = (e) => {
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
        setPostImg(reader.result);
      };
    } else {
      setPostImg("");
    }
  };

  // const addCategory = () => {
  //   let updatedCats = [...cats];
  //   updatedCats.push(cat);
  //   setCat("");
  //   setCats(updatedCats);
  // };
  
  const handleCreate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: userInfo.username,
      userId: userInfo._id,
      userImg: userInfo.userImg,
      categories: cats,
      photo: postImg,
    };
    console.log(post)
    //post upload
    try {
      const res = await axios.post("/api/v1/posts/create", post, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      navigate("/posts/post/" + res.data._id);
      // console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="app">
        <div className="container">
          <div className="add">
            <div className="content">
              <input
                type="text"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-100"
              />
              <div className="editorContainer">
                <ReactQuill
                  className="editor bg-gray-100"
                  theme="snow"
                  value={desc}
                  onChange={setDesc}
                />
              </div>
            </div>
            <div className="menu">
              <div className="item">
                <ImagePreview className="bg-gray-100">
                  {postImg ? (
                    <>
                      <img src={postImg} alt="error!" />
                    </>
                  ) : (
                    <p>Post image upload preview will appear here!</p>
                  )}
                </ImagePreview>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="imgUpload"
                  name="image"
                  accept="image/*"
                  onChange={handlePostImageUpload}
                  className="px-4"
                />
                <label className="file text-gray-100" htmlFor="imgUpload">
                  Upload Image
                </label>
              </div>
              <div className="item text-gray-100">
                <h1>Publish</h1>
                <span>
                  <b>Status: </b> Draft
                </span>
                <span>
                  <b>Visibility: </b> Public
                </span>

                <div className="buttons">
                  <button>Save as a draft</button>
                  <button onClick={handleCreate}>Publish</button>
                </div>
              </div>
              <div className="item">
                <h1>Category</h1>
                  {categories.map((category) => (
                <div key={category.id} className="cat">
                      <input
                        type="radio"
                        checked={cats === category.name}
                        name="cat"
                        value={category.name}
                        id={category.name}
                        onChange={(e) => setCats(e.target.value)}
                      />
                      <label htmlFor={category.name}>{category.name}</label>
                </div>
                  ))}
                </div>
            </div>
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
export default CreatePost;
