/* eslint-disable react/prop-types */
import {IF} from '../url'


const HomePosts = ({post}) => {
'https://res.cloudinary.com/djt6ixhup/image/upload/v1696866266/2648921_rcdf66.jpg'
'https://res.cloudinary.com/djt6ixhup/image/upload/v1696865349/4102879_971_2_haairg.jpg'
  return (
    <div className="w-full flex mt-8 space-x-4">
    {/* left */}
    <div className="w-[35%] h-[200px] flex justify-center items-center">
    {/* {console.log(post.photo)} */}
    <img src={`https://res.cloudinary.com/djt6ixhup/image/upload/${post.photo}`} alt={post.photo} className="h-full w-full object-cover"/>
    </div>
    {/* right */}
    <div className="flex flex-col w-[65%]">
      <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
      {post.title}
      </h1>
      <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
       <p>@{post.username}</p>
       <div className="flex space-x-2 text-sm">
       <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
       <p>{new Date(post.updatedAt).toString().slice(16,24)}</p>
       </div>
      </div>
      <p className="text-sm md:text-lg">{post.desc.slice(0,200)+" ...Read more"}</p>
    </div>

    </div>
  )
}

export default HomePosts

