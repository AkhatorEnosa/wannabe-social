import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Home"
import Login from "./Login"
import Register from "./Register"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const App = () => {

  return (
    <div className="w-screen h-full flex flex-col justify-center items-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          {/* <Route path="/:id" element={<Home />}></Route> */}
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
        <ToastContainer/>
      </BrowserRouter>
    </div>
  )
}

export default App
