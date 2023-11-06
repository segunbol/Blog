import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
// import { ImCross } from "react-icons/im";
import axios from "axios";
import { URL } from "../url";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../context/UserContext";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../style.scss";


const EditPost = () => {
  const postId = useParams().id;
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [postImg, setPostImg] = useState(null);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  // const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/v1/posts/" + postId);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setPostImg(res.data.photo);
      setCats(res.data.categories);
    } catch (err) {
      console.log(err);
    }
  };

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: userInfo.username,
      userId: userInfo._id,
      categories: cats,
      photo: postImg,
    };

    //post upload

    try {
      const res = await axios.put(URL + "/api/v1/posts/" + postId, post, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
        withCredentials: true,
      });
      navigate("/posts/post/" + res.data._id);
      // console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  // const deleteCategory = (i) => {
  //   let updatedCats = [...cats];
  //   updatedCats.splice(i);
  //   setCats(updatedCats);
  // };

  // const addCategory = () => {
  //   let updatedCats = [...cats];
  //   updatedCats.push(cat);
  //   setCat("");
  //   setCats(updatedCats);
  // };
  return (
    <div>
      <Navbar />
      <div className="app">
        <div className="container">
          <div className="add">
            <div className="content">
              <input
                type="text"
                value={title}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="editorContainer">
                <ReactQuill
                  className="editor"
                  theme="snow"
                  value={desc}
                  onChange={setDesc}
                />
              </div>
            </div>
            <div className="menu">
              <div className="item">
                <ImagePreview>
                  {postImg ? (
                    <>
                      <img src={postImg} alt="error!" />
                    </>
                  ) : (
                    <p>Product image upload preview will appear here!</p>
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
                <label className="file" htmlFor="imgUpload">
                  Upload Image
                </label>
              </div>
              <div className="item">
                <h1>Update</h1>
                <span>
                  <b>Status: </b> Draft
                </span>
                <span>
                  <b>Visibility: </b> Public
                </span>

                <div className="buttons">
                  <button>Save as a draft</button>
                  <button onClick={handleUpdate}>Update</button>
                </div>
              </div>
              <div className="item">
                <h1>Category</h1>
                <div className="cat">
                  <input
                    type="radio"
                    checked={cats === "art"}
                    name="cat"
                    value="art"
                    id="art"
                    onChange={(e) => setCats(e.target.value)}
                  />
                  <label htmlFor="art">Art</label>
                </div>
                <div className="cat">
                  <input
                    type="radio"
                    checked={cats === "science"}
                    name="cat"
                    value="science"
                    id="science"
                    onChange={(e) => setCats(e.target.value)}
                  />
                  <label htmlFor="science">Science</label>
                </div>
                <div className="cat">
                  <input
                    type="radio"
                    checked={cats === "technology"}
                    name="cat"
                    value="technology"
                    id="technology"
                    onChange={(e) => setCats(e.target.value)}
                  />
                  <label htmlFor="technology">Technology</label>
                </div>
                <div className="cat">
                  <input
                    type="radio"
                    checked={cats === "cinema"}
                    name="cat"
                    value="cinema"
                    id="cinema"
                    onChange={(e) => setCats(e.target.value)}
                  />
                  <label htmlFor="cinema">Cinema</label>
                </div>
                <div className="cat">
                  <input
                    type="radio"
                    checked={cats === "design"}
                    name="cat"
                    value="design"
                    id="design"
                    onChange={(e) => setCats(e.target.value)}
                  />
                  <label htmlFor="design">Design</label>
                </div>
                <div className="cat">
                  <input
                    type="radio"
                    checked={cats === "food"}
                    name="cat"
                    value="food"
                    id="food"
                    onChange={(e) => setCats(e.target.value)}
                  />
                  <label htmlFor="food">Food</label>
                </div>
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
export default EditPost;
