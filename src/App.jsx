import React from 'react'
import { Navigate,Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
  <>
<Routes>
  <Route path="/" element={<Navigate to="/login" />} />

<Route path="/login" element={<Login/>} />
<Route path="/signup" element={<SignUp/>} />
<Route path="/home" element={<Home/>} />
</Routes>
  </>
  )
}

export default App
