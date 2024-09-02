/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import PostCard from "./components/PostCard"
import Navbar from "./components/Navbar"
import { useDispatch } from "react-redux"
import { addBookmark, addLike, addPost } from "./reducers/PostSlice"
import { auth, database } from "./firebase"
import { collection, deleteDoc, doc, getDoc, getDocs} from "firebase/firestore"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const [newPost, setNewPost] = useState("")
  const [name, setName] = useState('')
  const [status, setStatus] = useState(false)
  // const [status, setStatus] = useState('')
  const [uid, setUid] = useState('')
  const [u_img, setUImg] = useState('')

  const [posts, setPosts] = useState([])
  const [likes, setLikes] = useState([])
  const [bookmarks, setBookmarks] = useState([])

  const [singlePost, setSinglePost] = useState([])
  const [error, setError] = useState(false)

  const value = collection(database, "posts")
  const navigate = useNavigate()

  // const [userDetails, setUserDetails] = useState(null)

  const dispatch = useDispatch()
  const date = new Date()

  const getCurrUser  = async() => {
    auth.onAuthStateChanged(async(user) => {
        // console.log(user)\
        if(user) {
          const docRef = doc(database, 'users', user.uid)
          const docSnap = await getDoc(docRef)

          if(docSnap.exists) {
              setUid(user.uid)
              setName(docSnap.data().name)
              setUImg(docSnap.data().u_img)
              setStatus(true)
          } else {
            setStatus(false)
          }
        } else {
          navigate('/login')
        }
    })
  }


  const deletePost = async(id) => {
        deleteDoc(doc(database, "posts", id))
    // }); 
    return await deleteDoc(doc(database, "posts", id));
  }

  const fetchLikes = async() => {
    try {

      const dbVal = await getDocs(collection(database, 'likes'))
      setLikes(dbVal.docs.map(doc => ({...doc.data(), id:doc.id})))
      return likes
      
    } catch (error) {
      setError(true)
      console.log(error)
    }
  }

  const removeLike = async(id) => {
    return await deleteDoc(doc(database, "likes", id));
  }

  const fetchSinglePost = async(id) => {
    const post = await getDoc(doc(database, "posts", id));
    setSinglePost(post.data())
    console.log(post.data())
  }

  const fetchBookmarks = async() => {
    const dbVal = await getDocs(collection(database, 'bookmarks'))
    setBookmarks(dbVal.docs.map(doc => ({...doc.data(), id:doc.id})))
    return bookmarks
  }

  const removeBookmark = async(id) => {
    return await deleteDoc(doc(database, "bookmarks", id));
  }


  useEffect(() => {
    getCurrUser()
    fetchLikes()
    fetchBookmarks()
  }, [getCurrUser, fetchBookmarks, fetchLikes])

   useEffect(() => {
    const getData = async() => {
      const dbVal = await getDocs(value)
      setPosts(dbVal.docs.map(doc => ({...doc.data(), id:doc.id})))
    }
    getData()
  }, [value])

  function randomNum(min, max) { // min and max range
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

//  //Add New Post
  const handleSubmit = (e) => {
    e.preventDefault()
    if(newPost !== '') {
      dispatch(addPost({
        id: String(randomNum(1290443493, 903438802823)), //create id
        body: newPost,
        datetime: date.toString(),
        u_name: name,
        user_id: uid,
        u_img: u_img
      }))
    }
      setNewPost('')
  }

   const countLikes = (id) => {
    if(likes !== null) {
      const filterLikes = likes.filter(like => like.post_id == id)
      if(filterLikes) {
        return filterLikes.length
      } else {
        console.log("Jembe")
      }
    }
  }

  const likedPost = (id) => {
    if(likes !== null) {
      const filterLiked = likes.find(like => (like.post_id == id) && (like.user_id == uid))
      if(filterLiked) {
        return true
      } else {
        return false
      }
    }
  }

   const countBookmarks = (id) => {
    if(bookmarks !== null) {
      const filterBookmarks = bookmarks.filter(bookmark => bookmark.post_id == id)
      if(filterBookmarks) {
        return filterBookmarks.length
      } else {
        console.log("Jembe")
      }
    }
  }

  const bookmarkedPost = (id) => {
    if(bookmarks !== null) {
      const filterBookmarked = bookmarks.find(bookmark => (bookmark.post_id == id) && (bookmark.user_id == uid))
      if(filterBookmarked) {
        return true
      } else {
        return false
      }
    }
  }

  let newPostForm;
  let content;

        {name !== '' ? newPostForm = <div className="w-full flex flex-col gap-10 justify-center items-center">
          <form className="w-full flex flex-col gap-5">
            <textarea rows={5} name="post" id="post" 
              className="rounded-lg p-2 placeholder:text-sm"
              placeholder="What do you have in mind?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}></textarea>
              <button className={newPost !== '' ? "btn btn-secondary" : "hidden"} onClick={handleSubmit}>Post</button>
          </form>
        </div> : ''}

  
  if(posts.length > 0) {
    
    // sort posts before mapping
    content = posts.toSorted((a, b) => new Date(b.datetime) - new Date(a.datetime)).map(post => (
                <PostCard 
                  key={post.id} 
                  userId={post.user_id == uid ? true : false}
                  uImg={post.u_img} 
                  uName={post.u_name} 
                  postContent={post.body}
                  datetime={post.datetime}
                  postId={post.id}
                  status={status}
                  likes={countLikes(post.id)}
                  liked={likedPost(post.id)}
                  bookmarks={countBookmarks(post.id)}
                  bookmarked={bookmarkedPost(post.id)}
                  likePost={() => {
                          const verifyLike = likes.find(x => ((x.post_id == post.id) && (x.user_id == uid)))
                            if(verifyLike == undefined) {
                              dispatch(addLike({
                                "id" : String(randomNum(1290443493, 903438802823)),
                                "postId" : post.id,
                                "userId" : uid
                              }))
                            } else {
                                removeLike(verifyLike.id)
                            }
                      }}
                  bookmarkPost={() => {
                          const verifyBookmark = bookmarks.find(x => ((x.post_id == post.id) && (x.user_id == uid)))
                            if(verifyBookmark == undefined) {
                              dispatch(addBookmark({
                                "id" : String(randomNum(1290443493, 903438802823)),
                                "postId" : post.id,
                                "userId" : uid
                              }))
                            } else {
                                removeBookmark(verifyBookmark.id)
                            }
                      }}
                  openModal={() => {
                    const verifyPost = posts.find(x => x.id == post.id)
                    if(verifyPost) {
                      // console.log("there is a post like tihs")
                      fetchSinglePost(post.id)
                      document.getElementById('my_modal_2').showModal()
                    } 
                  }}
                  currentPostUser = {singlePost !== null && singlePost.u_name}
                  currentPostUserUimg = {singlePost !== null && singlePost.u_img}
                  currentPostContent = {singlePost !== null && singlePost.body}
                  deletePost={()=> deletePost(post.id)}
                />))
  }else if(error == true) {
    content = <div className="w-full h-56 flex flex-col justify-center items-center">Network error. Try reload page.</div>
  }else if (posts !== null && posts.length === 0) {
    content = <div className="w-full h-56 flex flex-col justify-center items-center">No posts to see yet</div>
  } else {
    content = <div className="w-full h-56 flex flex-col justify-center items-center"><span className="loading loading-dots loading-lg text-secondary"></span></div>
  }

  return (
    <div className="w-full flex flex-col items-center p-0 m-0">
        <Navbar params={name}/>
        <div className="w-96 flex flex-col items-center pt-28 pb-10 gap-10">

          <div className="w-full flex flex-col gap-5 justify-center items-center">
            {newPostForm}
            {content}
          </div>
        </div>
    </div>
  )
}

export default Home