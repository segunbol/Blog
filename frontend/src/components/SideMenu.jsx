import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Store } from "../context/UserContext";

const Menu = ({cat}) => {
  const [post, setPosts] = useState([]);
  const { state } = useContext(Store);
  const { userInfo } = state;
  console.log(post)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(cat)
        await cat
        const res  = await axios.get(`/api/v1/search?categories=${cat}`);
        const {posts} = res.data
        // console.log(posts)
        setPosts(posts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);
  
  return (
    <>
      <div className="menu">
      <h1>Other posts you may like</h1>
      {post.map((post) => (
        <Link
          key={post._id}
          to={userInfo ? `/posts/post/${post._id}` : "/login"}
        >
          <div className="post" key={post.id}>
            <div>
              <img src={post?.photo} alt="" />
              <h2>{post.title.slice(0, 50)}...</h2>
              <button>Read More</button>
            </div>
          </div>
        </Link>
      ))}
    </div>
    </>
    
  );
};

export default Menu;
