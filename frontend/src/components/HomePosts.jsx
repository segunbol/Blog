/* eslint-disable react/prop-types */


const HomePosts = ({post}) => {

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className="w-full xl:flex lg:flex md:flex sm:block xs:flex xs:px-2 space-x-4 py-8 border-t-2 border-gray-700 "  key={Math.random()}>
    {/* left */}
    <div className="w-[35%] h-[200px] flex justify-center items-center">
    {/* {console.log(post.photo)} */}
    <img src={post.photo} alt={post.photo} className="h-full rounded m-8 w-54 object-cover"/>
    </div>
    {/* right */}
    <div className="flex flex-col w-[65%]">
      <h1 className="text-xl text-gray-300 font-bold md:mb-2 mb-1 md:text-2xl">
      {post.title.slice(0,50)}...
      </h1>
      <div className="flex mb-2 text-sm font-semibold text-orange-600 items-center justify-between md:mb-4">
       <p>@{post.username}</p>
       <div className="flex space-x-2 text-sm italic font-bold">
       <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
       <p>{new Date(post.updatedAt).toString().slice(16,24)}</p>
       </div>
      </div>
      <p className="text-sm text-gray-100 md:text-lg">{getText(post.desc.slice(0,200)+" ...Read More")}</p>
    </div>

    </div>
  )
}

export default HomePosts

