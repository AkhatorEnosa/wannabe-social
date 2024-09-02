import { useState } from "react"
import Navbar from "./components/Navbar"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { register } from "./reducers/userSlice"
import { serverTimestamp } from "firebase/firestore"

const Register = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    // const datenow = new Date();

    const [name, setName] = useState("")
    const [u_name, setUname] = useState("")
    const [email, setEmail] = useState("")
    const [gender, setGender] = useState("Male")
    const [password, setPassword] = useState("")

  // const randomNum = (min, max) => { // min and max range
  //   return Math.floor(Math.random() * (max - min + 1) + min);
  // }


    const handleSubmit = (e) => {
        e.preventDefault();

        if(name !== '' && u_name !== '' && email !== '' && gender !== '' && password !== '' ) {
            dispatch(register({
                name,
                u_name,
                email,
                gender,
                password,
                u_img: gender == "Male" ? `https://avatar.iran.liara.run/public/boy?username=${u_name}` : `https://avatar.iran.liara.run/public/girl?username=${u_name}`,
                // createdAt: datenow.toString()
                createdAt: serverTimestamp()
            }))
        } else {
            console.log(name)
            console.log(email)
            console.log(gender)
            console.log(password)
        }

        // reset fields
                setUname('')
                setName('')
                setGender('')
                setEmail('')
                setPassword('')
    }


  return (
    <div className="w-full flex flex-col gap-10 pb-20 items-center">
    <Navbar />

        <div className="w-96 flex flex-col gap-10 mt-32 border-[1px] border-black/20 rounded-md p-4">
            <h1 className="text-2xl font-medium">Register</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input type="text" name="name" id="name" value={name} placeholder="Fullname" className="w-full input input-bordered input-md" onChange={(e)=>setName(e.target.value)}/>
                <input type="text" name="username" id="username" value={u_name} placeholder="Username" className="w-full input input-bordered input-md" onChange={(e)=>setUname(e.target.value)}/>
                <select className="select select-bordered w-full" onChange={(e) => setGender(e.target.value)}>
                    <option disabled>Gender?</option>
                    <option value={gender}>Male</option>
                    <option>Female</option>
                </select>
                <input type="email" name="email" id="email" value={email} placeholder="Email" className="w-full input input-bordered input-md" onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" name="password" id="password" value={password} placeholder="Password" className="w-full input input-bordered input-md" autoComplete="" onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit" className="btn btn-secondary">{(user.loading && user.error == null) ? <span className="loading loading-dots loading-sm text-white"></span> : 'Register'}</button>
            </form>
        </div>
        <p className="text-xs">Already have an account? <Link to="/login" className="text-secondary cursor-pointer">Login</Link></p>
    </div>
  )
}

export default Register