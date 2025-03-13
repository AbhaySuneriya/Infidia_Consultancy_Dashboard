import React from 'react'
import { Navigate,Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import 'react-toastify/dist/ReactToastify.css'
import ForgetPassword from './pages/ForgetPassword'
import EmailVerification from './pages/EmailVerification'

const App = () => {
  return (
  <>
<Routes>
  
<Route path="/" element={<Navigate to="/login" />} />
<Route path="/login" element={<Login/>} />
<Route path="/signup" element={<SignUp/>} />
<Route path="/home" element={<Home/>} />
<Route path="/forgetPassword" element={<ForgetPassword/>}
 />
 <Route path="/" element={<EmailVerification/>}/>

</Routes>
{/* <EmailVerification/> */}
  </>
  )
}

export default App
