/* eslint-disable react/prop-types */


const ProfilePosts = ({p}) => {
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  // console.log(p)
  return (
    <div className="w-full flex mt-8 space-x-6">
    {/* left */}
    <div className="w-[35%] h-[200px] flex justify-center items-center">
    <img src={p.photo} alt="" className="h-full w-full object-cover"/>
    </div>
    {/* right */}
    <div className="flex flex-col w-[65%]">
      <h1 className="text-xl text-gray-400 font-bold md:mb-2 mb-1 md:text-2xl">
      {p.title.slice(0,50)+" ..."}
      </h1>
      <div className="flex mb-2 text-sm font-semibold text-gray-300 items-center justify-between md:mb-4">
       <p>@{p.username}</p>
       <div className="flex space-x-2 text-orange-900 font-bold italic">
       <p>{new Date(p.updatedAt).toString().slice(0,15)}</p>
       <p>{new Date(p.updatedAt).toString().slice(16,24)}</p>
       </div>
      </div>
      <p className="text-sm md:text-lg text-gray-100">{getText(p.desc.slice(0,200)+" ...")}</p>
    </div>

    </div>
  )
}

export default ProfilePosts