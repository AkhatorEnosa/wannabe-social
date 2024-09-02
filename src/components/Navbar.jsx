import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { FaSignOutAlt } from "react-icons/fa"
import { auth, database } from "../firebase"
import { doc, getDoc } from "firebase/firestore"

const Navbar = () => {

  // classlist state 
  const [showLogout, setShowLogout] = useState(false)
  
  const [name, setName] = useState('')
  const [u_img, setUimg] = useState('')
  const navigate = useNavigate()

  const getCurrUser  = async() => {
    auth.onAuthStateChanged(async(user) => {
        // console.log(user)
      
      if(user) {
        const docRef = doc(database, 'users', user.uid)
        const docSnap = await getDoc(docRef)

        if(docSnap.exists) {
            setName(docSnap.data().name)
            setUimg(docSnap.data().u_img)
        }
      }
    })
  }


  useEffect(() => {
    getCurrUser()
  }, [])
  

  const toggleShowLogout = () => {
    setShowLogout(!showLogout)
  }

  const handleLogout = async() => {
    try {
        await auth.signOut()
        console.log("Logged out")
        navigate('/login')
    } catch (error) {
        console.log(error.message)
    }
    setName('')
    setUimg('')
  }

  return (
    <header className='w-full flex justify-between items-center px-20 py-5 shadow-sm fixed top-0 bg-white/30 backdrop-blur-lg'>
        <Link to='/'> <h1 className='text-base md:text-3xl font-black'>Wannabe Social</h1> </Link>
        <ul className='flex gap-5 justify-center items-center text-sm font-medium'>
           { name ? <div className="relative flex flex-col gap-5 justify-center items-center"><div className="flex gap-2 justify-center items-center bg-white px-2 py-1 rounded-full shadow-md cursor-pointer z-30" onClick={toggleShowLogout}><img src={u_img} alt="profile_pic" className="w-10 h-10 border-[1px] border-black/30 rounded-full"/><li className="tracking-tight">{name}</li></div> <div className={!showLogout ? "opacity-0 w-full flex justify-center items-center gap-2 px-2 bg-white absolute top-[20px]" : "opacity-100 cursor-pointer absolute w-full flex justify-center items-center gap-2 bg-[#f5f5f5] rounded-t-lg py-2 rounded-b-lg pt-12 text-right border-t-[1px] top-[10px] mt-2 px-2 text-error hover:underline z-0 transition-all duration-300 ease-in-out shadow-md"} onClick={handleLogout}><FaSignOutAlt /> <p className="">Logout</p></div></div> :
            <>
              <Link to={'/login'}><li className="text-info hover:underline">Login</li></Link>
              <Link to={'/register'}><li className="text-primary hover:underline">Register</li></Link>
            </>
          }
        </ul>
    </header>
  )
}

export default Navbar