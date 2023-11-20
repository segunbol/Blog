import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Menu from "../components/SideMenu";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
// import { URL } from "../url";
import { useContext, useEffect, useState } from "react";
import { Store } from "../context/UserContext";
import Loader from "../components/Loader";
import DOMPurify from "dompurify";
import "../style.scss";

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [comments, setComments] = useState([]);
  const [writerImage, setWriterImage] = useState("");
  const [newComment, setNewComment] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  // console.log(userInfo);
  // const fetchPost = async () => {
  //   try {
  //     const res = await axios.get("/api/v1/posts/" + postId);
  //     console.log(res.data)
  //     setPost(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const fetchPost = () => {
    axios.get("/api/v1/posts/" + postId)
      .then((postResponse) => {
        const userId = postResponse.data.userId;
        setPost(postResponse.data)
        return axios.get("/api/v1/users/" + userId);
      })
      .then((userResponse) => {
        console.log(userResponse.data);
        setWriterImage(userResponse.data.userImg);
        ;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(writerImage)

  const handleDeletePost = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.delete("/api/v1/posts/" + postId, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPostComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get("/api/v1/comments/post/" + postId);
      setComments(res.data);
      setLoader(false);
    } catch (err) {
      setLoader(true);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, [postId]);
  // console.log(post.userImg)
  const postComment = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
       "/api/v1/comments/create",
        {
          comment: newComment,
          author: userInfo.username,
          postId: postId,
          userId: userInfo._id,
          token: userInfo.token,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
          withCredentials: true,
        }
      );

      setComments([...comments, res.data]);
      setNewComment("");

      // fetchPostComments()
      // setComment("")
      // window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="app">
          <div className="container ">
            <div className="single border-gray-700">
              <div className="content ">
                <img src={post?.photo} alt="" className="object" />
                <div className="user">
                  {writerImage ? (
                    <img src={writerImage} className="" alt="user" />
                  ) : (
                    <img
                      src="/user.png"
                      className="w-10 h-10 xs:w-8 xs:h-8 rounded-full object-cover"
                      alt="user"
                    />
                  )}
                  <div className="info text-orange-600">
                    <span>@{post.username}</span>
                    <span>
                      created :{" "}
                      {new Date(post.updatedAt).toString().slice(0, 15)}
                      {"  "}
                    </span>
                    <span>
                      {new Date(post.updatedAt).toString().slice(16, 24)}
                    </span>
                  </div>
                  {userInfo?._id === post?.userId && (
                    <div className="edit">
                      <p
                        className="cursor-pointer"
                        onClick={() => navigate("/edit/" + postId)}
                      >
                        <BiEdit />
                      </p>
                      <p className="cursor-pointer" onClick={handleDeletePost}>
                        <MdDelete className="bg-orange-900" />
                      </p>
                    </div>
                  )}
                </div>
                <h1>{post.title}</h1>
                <div className="flex items-center mt-8 space-x-4 font-semibold">
                  <p>Categories:</p>
                  <div className="flex justify-center items-center space-x-2">
                    <div className="bg-gray-300 rounded-lg px-3 py-1">
                      {post.categories}
                    </div>
                  </div>
                </div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.desc),
                  }}
                ></p>{" "}
                <div className="flex flex-col mt-4">
                  <h3 className="mt-6 mb-4 font-semibold text-gray-400">
                    Comments:
                  </h3>
                  {comments?.map((c) => (
                    <Comment key={c._id} c={c} post={post} />
                  ))}
                </div>
                {/* <video class="w-full h-auto max-w-full" controls>
                   <source src="https://www.youtube.com/watch?v=ZX3qt0UWifc" type="video/mp4" />
                        Your browser does not support the video tag.
                </video> */}
                {/* write a comment */}
                <div className="w-full flex flex-col mt-4 md:flex-row">
                  <input
                    onChange={(e) => setNewComment(e.target.value)}
                    value={newComment}
                    type="text"
                    placeholder="Write a comment"
                    className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0 rounded text-gray-900"
                  />
                  <button
                    onClick={postComment}
                    className="bg-gray-900 text-sm text-gray-100 px-2 py-2 md:w-[20%] mt-4 md:mt-0"
                  >
                    Add Comment
                  </button>
                </div>
              </div>
              <Menu cat={post.categories} />
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;
