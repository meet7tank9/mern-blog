import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext.js'
import axios from 'axios'

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const { setCurrentUser } = useContext(UserContext)

  const changeInputHandle = (e) => {
    setUserData(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  const loginUser = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, userData)
      const user = await response.data
      setCurrentUser(user)

      navigate("/")
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  const handleClick = () => {
    navigate('/forgot-password', { state: { email: userData.email } })
  }

  return (
    <section className="login login_image">
      <div className="container">
        <div className='login_heading' style={{ fontSize: '40px', fontWeight:'600', textAlign:'center' }}>Sign In</div>
        <div style={{width:'100%', height:'1px', background:"gray", margin:'20px'}}></div>
        <form action="" className="form login_form" onSubmit={loginUser}>
          {
            error && <p className="form_error-message">{error}</p>
          }
          <input type="email" placeholder='Enter email' name='email' value={userData.email} onChange={changeInputHandle} autoFocus style={{ border: '2px solid rgb(124, 124, 137)' }} />
          <input type="password" placeholder='Enter password' name='password' value={userData.password} onChange={changeInputHandle} style={{ border: '2px solid rgb(124, 124, 137)' }} />
          <div className='form_button_container'>
            <button type='submit' className='btn primary' style={{width:'90px'}}>Login</button>
          </div>
          <div className='forgot_link' onClick={handleClick}><b>Forgot Password?</b></div>
        </form>

        <small>Don't have an account? <Link to={'/register'}><b>Sign Up</b></Link></small>
      </div>
    </section>
  )
}

export default Login