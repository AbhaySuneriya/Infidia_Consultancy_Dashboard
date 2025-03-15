import React from 'react'
import { Navigate,Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import 'react-toastify/dist/ReactToastify.css'

import EmailOtpVerification from './pages/EmailOtpVerification'
import ChangePassword from './pages/ChangePassword'

const App = () => {
  return (
  <>
<Routes>
  
<Route path="/" element={<Navigate to="/login" />} />
<Route path="/login" element={<Login/>} />
<Route path="/signup" element={<SignUp/>} />
<Route path="/home" element={<Home/>} />
 <Route path="/emailOtpVerification" element={<EmailOtpVerification/>}/>
 <Route path='/changePassword' element={<ChangePassword/>}/>
</Routes>

  </>
  )
}

export default App
