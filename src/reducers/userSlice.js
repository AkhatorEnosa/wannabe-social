import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";


let initialState = {
        loading: false,
        // logged_in: false,
        // user: [],
        error: null
    }

export const register  = createAsyncThunk("user/register", async(userData) => {


    if(userData.name === "" || userData.u_name === "" || userData.gender === "" || userData.email === "" || userData.password === "") {
        userData = initialState
    } else {
        try {
            await createUserWithEmailAndPassword(auth, userData.email, userData.password);
            const user = auth.currentUser
            console.log(user)

        if(user) {
           await setDoc(doc(database, "users", user.uid), {
                name: userData.name,
                u_name: userData.u_name,
                email: userData.email,
                gender: userData.gender,
                u_img: userData.gender == "Male" ? `https://avatar.iran.liara.run/public/boy?username=${userData.u_name}` : `https://avatar.iran.liara.run/public/girl?username=${userData.u_name}`,
                // createdAt: datenow.toString()
                createdAt: serverTimestamp()
            })
                console.log("success")
                toast.success("Registered successfully", {
                    position: 'top-right',
                    autoClose: 2000
                })

                window.location.href = '/'
        }

        console.log("Registration successfull")
        } catch (error) {
            console.log(error.message)
                toast.error(error.message, {
                    position: 'top-right',
                    autoClose: 2000
                })
        }
    }
})  

export const login  = createAsyncThunk("user/login", async(userData, thunkAPI) => {
    if(userData.email === "" || userData.password === "") {
        userData = initialState
    } else {
        try {
            await signInWithEmailAndPassword(auth, userData.email, userData.password)
            console.log("Access Granted");
            toast.success("Access Granted", {
                    position: 'top-right',
                    autoClose: 3000
                })
                    window.location.href = '/'
        } catch (err) {
            toast.error(err.message, {
                    position: 'top-right',
                    autoClose: 3000
                })
            return thunkAPI.rejectWithValue(err.res.data.errors)
        }
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(register.pending, state => {
                state.loading = true
            })
            .addCase(register.fulfilled, (state) => {
                    state.loading = false,
                    state.error = null
            })
            .addCase(register.rejected, (state) => {
                state.loading = false,
                state.error = true
            })
            .addCase(login.pending, state => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state) => {
                    state.loading = false,
                    state.error = null
            })
            .addCase(login.rejected, (state) => {
                state.loading = false,
                state.error = true
            })
            // .addCase(logout.fulfilled, (state) => {
            //     state.loading = false,
            //     state.user = []
            // })
    }
})

export default userSlice.reducer