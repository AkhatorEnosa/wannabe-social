import { useState } from "react"
import Navbar from "./components/Navbar"
import { Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { login } from "./reducers/userSlice"

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const [loading, setLoading] = useState(false) 

    const user = useSelector((state) => state.user)

    const dispatch = useDispatch()


    const handleSubmit = () => {
            if(email !== '' && password !== '') {
               dispatch(login({
                    email,
                    password
                }))
            } else {
                console.log('input field empty')
                console.log(user.loading)
            }
        // reset fields
                setEmail('')
                setPassword('')
    }


  return (
    <div className="w-full flex flex-col gap-10 pb-20 items-center">
    <Navbar />

        <div className="w-96 flex flex-col gap-10 mt-40 border-[1px] border-black/20 rounded-md p-4">
            <>
            <h1 className="text-2xl font-medium">Login</h1>
                <input type="email" name="email" id="email" value={email} placeholder="Email Address" className="input input-bordered input-md" onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" name="password" id="password" value={password} placeholder="Password" className="input input-bordered input-md" autoComplete="" onChange={(e)=>setPassword(e.target.value)}/>
                <button className="btn btn-secondary" onClick={handleSubmit}>{(user.loading && user.error == null) ? <span className="loading loading-dots loading-sm text-white"></span> : 'Login'}</button></>
        </div>
        <p className="text-xs">Don&lsquo;t have an account? <Link to="/register" className="text-secondary cursor-pointer">Register</Link></p>
    </div>
  )
}

export default Login