import axios from "axios";
// import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import { useContext } from "react";
import { Store } from "../context/UserContext";

const Comment = ({ c, post }) => {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const deleteComment = async (id) => {
    
    try {
      await axios.delete("/api/v1/comments/" + id, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(post.userId)
  // console.log(user._id)
  // console.log(post)
  // console.log(user)
  return (
    <div className="px-2 py-2 bg-gray-700  rounded-lg my-2">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900">@{c.author}</h3>
        <div className="flex justify-center items-center space-x-4 text-gray-900">
          <p>{new Date(c.updatedAt).toString().slice(0, 15)}</p>
          <p>{new Date(c.updatedAt).toString().slice(16, 24)}</p>
          {userInfo?._id === c?.userId ? (
            <div className="flex items-center justify-center space-x-2">
              <p
                className="cursor-pointer"
                onClick={() => deleteComment(c._id)}
              >
                <MdDelete />
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <p className="px-4 mt-2 text-gray-900">{c.comment}</p>
    </div>
  );
};

export default Comment;
