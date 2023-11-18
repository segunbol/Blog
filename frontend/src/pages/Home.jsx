import axios from "axios";
import Footer from "../components/Footer";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
// import { URL } from "../url";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { Store } from "../context/UserContext";

const Home = () => {
  const { search } = useLocation();
  console.log(search)
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { state } = useContext(Store);
  const {userInfo} = state
  // console.log(user)

  const fetchPosts = useCallback(
    async () => {
    setLoader(true);
    try {
      const res = await axios.get("/api/v1/posts/" + search);
      console.log(res.data)
      setPosts(res.data);
      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(true);
    }
  }, [search]
  ) 
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  
  return (
    <>
      <Navbar />
      <div className="lg:px-32 md:px-[50px] sm:px-[50px] min-h-[80vh] bg-gray-800 mt-12" key={Math.random()}>
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          posts.map((post) => (
            <>
              <Link key={post._id} to={userInfo ? `/posts/post/${post._id}` : "/login"}>
                <HomePosts key={post._id} post={post} />
              </Link>
            </>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16">No posts available</h3>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
