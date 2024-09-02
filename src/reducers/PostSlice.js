import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, database } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

let initialState = {
    isLoading: false,
    posts: [],
    singlePost: null,
    likes: [],
    bookmarks: [],
    error: false
}

export const addPost = createAsyncThunk("post/addPost", async(postData, thunkAPI) => {
    try {
        // await setDoc(doc(database, "posts"), postData)
        // console.log("post added")
            const user = auth.currentUser

        if(user) {
           await setDoc(doc(database, "posts", postData.id), {
                    id: postData.id,
                    body: postData.body,
                    datetime: postData.datetime,
                    u_name: postData.u_name,
                    user_id: postData.user_id,
                    u_img: postData.u_img
           })
                console.log("Post sent")
                toast.success("Post sent", {
                    position: 'top-right',
                    autoClose: 2000
                })
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err.res.data.errors)
    }
})

export const addLike = createAsyncThunk("post/addLike", async(postData, thunkAPI) => {
    try {
            const user = auth.currentUser

        if(user) {
           await setDoc(doc(database, "likes", postData.id), {
                    id: postData.id,
                    post_id: postData.postId,
                    user_id: postData.userId
           })
                console.log("Liked")
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err.res.data.errors)
    }
})

export const addBookmark = createAsyncThunk("post/addBookmark", async(postData, thunkAPI) => {
    try {
            const user = auth.currentUser

        if(user) {
           await setDoc(doc(database, "bookmarks", postData.id), {
                    id: postData.id,
                    post_id: postData.postId,
                    user_id: postData.userId
           })
                console.log("Bookmarked")
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err.res.data.errors)
    }
})

// export const deletePost = createAsyncThunk("post/deletePost", async(id) => {
//     await axios.delete(`http://localhost:1997/posts/${id}`)
//     return id
// })

// export const removeLike = createAsyncThunk("post/removeLike", async(id) => {
//     const dbVal = await getDocs(collection(database, 'likes'))
//     setLikes(dbVal.docs.map(doc => ({...doc.data(), id:doc.id})))
//     if(res.data.id == id) {
//         await await deleteDoc(doc(database, "likes", id));
//         return id
//     }
// })

// export const removeBookmark = createAsyncThunk("post/removeBookmark", async(id) => {
//     const res = await axios.get(`http://localhost:1997/bookmarks/${id}`)
//     if(res.data.id == id) {
//         await axios.delete(`http://localhost:1997/bookmarks/${id}`)
//         return id
//     }
// })

// export const fetchSinglePost  = createAsyncThunk("post/fetchSinglePost", async(id) => {
//     const res = await axios.get(`http://localhost:1997/posts/${id}`)
//     return res.data
// })

const PostSlice = createSlice({
    name: 'posts',
    initialState,
    extraReducers: builder => {
        builder
            // .addCase(fetchPosts.pending, (state) => {
            //     state.isLoading = true,
            //     state.posts = null
            // })
            // .addCase(fetchPosts.fulfilled, (state, action) => {
            //     state.isLoading = false,
            //     state.posts = action.payload
            // })
            // .addCase(fetchPosts.rejected, (state) => {
            //     state.isLoading = false,
            //     state.posts = null,
            //     state.error = true
            // })
            // .addCase(addPost.pending, (state) => {
            //     state.isLoading = true,
            //     state.posts = [...state.posts]
            // })
            // .addCase(addPost.fulfilled, (state, action) => {
            //     state.isLoading = false,
            //     state.posts = [...state.posts, action.payload]
            // })
            // .addCase(addPost.rejected, (state) => {
            //     state.isLoading = false,
            //     state.posts = null,
            //     state.error = true
            // })
            // .addCase(fetchLikes.pending, (state) => {
            //     state.isLoading = true,
            //     state.likes = null
            // })
            // .addCase(fetchLikes.fulfilled, (state, action) => {
            //     state.isLoading = false,
            //     state.likes = action.payload
            // })
            // .addCase(fetchLikes.rejected, (state) => {
            //     state.isLoading = false,
            //     state.likes = null,
            //     state.error = true
            // })
            // .addCase(addLike.pending, (state) => {
            //     state.updateLikes = true,
            //     state.likes = [...state.likes]
            // })
            // .addCase(addLike.fulfilled, (state, action) => {
            //     state.updateLikes = false,
            //     state.likes = [...state.likes, action.payload]
            // })
            // .addCase(addLike.rejected, (state) => {
            //     state.updateLikes = false,
            //     state.likes = null,
            //     state.error = true
            // })
            // .addCase(fetchBookmarks.pending, (state) => {
            //     state.isLoading = true,
            //     state.bookmarks = null
            // })
            // .addCase(fetchBookmarks.fulfilled, (state, action) => {
            //     state.isLoading = false,
            //     state.bookmarks = action.payload
            // })
            // .addCase(fetchBookmarks.rejected, (state) => {
            //     state.isLoading = false,
            //     state.bookmarks = null,
            //     state.error = true
            // })
            // .addCase(addBookmark.pending, (state) => {
            //     state.bookmarks = [...state.bookmarks]
            // })
            // .addCase(addBookmark.fulfilled, (state, action) => {
            //     state.bookmarks = [...state.bookmarks, action.payload]
            // })
            // .addCase(addBookmark.rejected, (state) => {
            //     state.updateLikes = false,
            //     state.bookmarks = null,
            //     state.error = true
            // })
            // .addCase(deletePost.fulfilled, (state, action) => {
            //     const updatedPosts = state.posts.filter(post => post.id !== action.payload)
            //     state.isLoading = false,
            //     state.posts = updatedPosts
            //     state.error = false
            // })
            // .addCase(deletePost.rejected, (state) => {
            //     state.isLoading = false,
            //     state.posts = null,
            //     state.error = true
            // })
            // .addCase(removeLike.fulfilled, (state, action) => {
            //     const updatedLikes = state.likes.filter(like => like.id !== action.payload)
            //     state.isLoading = false,
            //     state.likes = updatedLikes
            //     state.error = false
            // })
            // .addCase(removeLike.rejected, (state) => {
            //     state.isLoading = false,
            //     state.posts = null,
            //     state.error = true
            // })
            // .addCase(removeBookmark.fulfilled, (state, action) => {
            //     const updatedBookmarks = state.bookmarks.filter(bookmark => bookmark.id !== action.payload)
            //     state.isLoading = false,
            //     state.bookmarks = updatedBookmarks
            //     state.error = false
            // })
            // .addCase(removeBookmark.rejected, (state) => {
            //     state.isLoading = false,
            //     state.posts = null,
            //     state.error = true
            // })
            // .addCase(fetchSinglePost.fulfilled, (state, action) => {
            //     state.isLoading = false,
            //     state.singlePost = action.payload
            //     state.error = false
            // })
    }
})

export default PostSlice.reducer