import { FaBookmark, FaHeart, FaTrash } from "react-icons/fa"

/* eslint-disable react/prop-types */
const PostCard = ({userId, postId, status, uImg, uName, currentPostUser, currentPostContent, currentPostUserUimg, postContent, liked, likes, likePost, bookmarked, bookmarks, bookmarkPost, deletePost, datetime, openModal}) => {

  // document.querySelector('.content').appendChild(newLinkElem)

  const validateSize = (text) => {
    const strLength = text.length
    let newStr;

    if(strLength > 100) {
      newStr = text.substring(0, 100)
      return  newStr + '...'
    } else {

      return text
    }
  }

  return ( 
    <div className="w-full py-5 px-3 flex flex-col items-start text-sm rounded-md shadow-md hover:bg-slate-200/50 duration-200 transition-all">
        <div className="flex gap-2">
          <img src={uImg} alt="" className="w-10 h-10"/>
          <div>
            <div className="w-full flex gap-2 justify-center items-center">
              <h3 className="w-full font-bold text-left">{uName}</h3>
            </div>
            <div>
              <p className="content text-start">{validateSize(postContent)} {postContent.length > 100 && <a className="text-xs text-secondary cursor-pointer" onClick={openModal}>See more</a>}</p>
              <span className="w-full text-start text-[0.5rem] text-black/50">{datetime}</span>
            </div>
          </div>
        </div>  
        
        {
          status ? <div className="w-full flex gap-2 justify-between items-center pt-5 px-10 text-xs">
              <span className="flex justify-center items-center gap-1 hover:text-green-700 cursor-pointer" onClick={likePost}><FaHeart className={liked == false ? " text-sm" : "text-green-700 text-sm"}/>{likes} Like</span>
              <span className="flex justify-center items-center gap-1 hover:text-blue-600 cursor-pointer" onClick={bookmarkPost}><FaBookmark className={bookmarked == false ? " text-sm" : "text-blue-600 text-sm"}/>{bookmarks} Bookmark</span>
             {userId ? <span className="flex justify-center items-center gap-1 hover:text-red-700 cursor-pointer" onClick={deletePost}><FaTrash className=" text-sm" title={postId}/> Delete</span> : '' }
          </div> : ''
        }
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <div className="w-full flex gap-3 border-b-2 pb-3">
                <img src={currentPostUserUimg} alt="user image" className="w-10 h-10 border-[1px] border-black/30 rounded-full"/>
              <div>
                <h3 className="font-bold text-lg">{currentPostUser}</h3>
                <span className="w-full text-start text-[0.5rem] text-black/50">{datetime}</span>
              </div>
            </div>
            <div className="overflow-clip">
              <p className="py-4">{currentPostContent}</p>
            </div>  
        
        {
          status ? <div className="w-full flex gap-2 justify-between items-center pt-5 px-10 text-xs border-t-2">
              <span className="flex justify-center items-center gap-1 hover:text-green-700 cursor-pointer" onClick={likePost}><FaHeart className={liked == false ? " text-sm" : "text-green-700 text-sm"}/>{likes} Like</span>
              <span className="flex justify-center items-center gap-1 hover:text-blue-600 cursor-pointer" onClick={bookmarkPost}><FaBookmark className={bookmarked == false ? " text-sm" : "text-blue-600 text-sm"}/>{bookmarks} Bookmark</span>
             {userId && <span className="flex justify-center items-center gap-1 hover:text-red-700 cursor-pointer" onClick={deletePost}><FaTrash className=" text-sm" title={postId}/> Delete</span>}
          </div> : ''
        }
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
    </div>
  )
}

export default PostCard