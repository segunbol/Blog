import { Link, useLocation } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useContext, useEffect, useState } from "react"
import {Store} from "../context/UserContext"
import axios from "axios"
// import { URL } from "../url"
import HomePosts from "../components/HomePosts"
import Loader from "../components/Loader"


const MyBlogs = () => {
    const {search}=useLocation()
  // console.log(search)
  const [posts,setPosts]=useState([])
  const [noResults,setNoResults]=useState(false)
  const [loader,setLoader]=useState(false)
  const { state }=useContext(Store)
  const { userInfo } = state
  console.log(userInfo._id)
  
  const fetchPosts=async()=>{
    setLoader(true)
    try{
      const res=await axios.get("/api/v1/posts/user/"+userInfo._id,  {
        headers: { Authorization: `Bearer ${userInfo.token}` },
        withCredentials: true,
      })
      // console.log(res.data)
      setPosts(res.data)
      if(res.data.length===0){
        setNoResults(true)
      }
      else{
        setNoResults(false)
      }
      setLoader(false)
      
    }
    catch(err){
      console.log(err)
      setLoader(true)
    }
  }

  useEffect(()=>{
    fetchPosts()

  },[search])

  return (
    <div>
        <Navbar/>
        <div className="px-8 md:px-[200px] min-h-[80vh] bg-gray-800 pt-12">
        {loader?<div className="h-[40vh] flex justify-center items-center"><Loader/></div>:!noResults?
        posts.map((post)=>(
          <>
          <Link to={userInfo?`/posts/post/${post._id}`:"/login"}>
          <HomePosts key={post._id} post={post}/>
          </Link>
          </>
          
        )):<h3 className="text-center text-gray-300 font-bold mt-16 pt-32">No posts available</h3>}
        </div>
        <Footer/>
    </div>
  )
}

export default MyBlogs