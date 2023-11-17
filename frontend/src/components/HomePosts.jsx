/* eslint-disable react/prop-types */

const HomePosts = ({ post }) => {
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div
      className="w-full xl:flex lg:flex md:flex lg:space-x-4 md:space-x-4 sm:flex xs:block xs:p-4 xs:space-x-0 lg:py-10 border-t-2  border-gray-700 "
      key={Math.random()}
    >
      {/* left */}
      <div className="lg:w-[35%] md:h-[200px] md:w-[35%] lg:h-[200px] xs:w-[100%] xs:h-[200px] xs:px-2 flex justify-center items-center">
        {/* {console.log(post.photo)} */}
        <img
          src={post.photo}
          alt={post.title}
          className="h-full rounded m-8 w-54 object-cover"
        />
      </div>
      {/* right */}
      <div className="flex flex-col w-[65%] xs:w-[100%] xs:p-3 xs:mx-1 ">
        <h1 className="text-xl text-gray-300 font-bold md:mb-2 mb-1 md:text-2xl xs:m-0">
          {post.title.slice(0, 50)}...
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-orange-600 items-center justify-between md:mb-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2 text-sm italic font-bold">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className="text-sm text-gray-100 md:text-lg text-justify">
          {getText(post.desc.slice(0, 200) + " ...Read More")}
        </p>
      </div>
    </div>
  );
};

export default HomePosts;
