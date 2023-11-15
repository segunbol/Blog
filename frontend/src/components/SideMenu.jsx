import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { URL } from "../url";
import { Link } from "react-router-dom";
import { Store } from "../context/UserContext";

const Menu = ({cat}) => {
  const [posts, setPosts] = useState([]);
  const { state } = useContext(Store);
  const { userInfo } = state;
  console.log(cat)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res  = await axios.get(`${URL}/api/v1/search?categories=${cat}`);
        console.log(res.data)
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
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
