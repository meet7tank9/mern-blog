import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

// require('dotenv').config()

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const changeInputHandle = (e) => {
    setUserData(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  const registerUser = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, userData)
      const newUser = await response.data;

      if (!newUser) {
        setError("Couldn't register user. Please try again")
      }
      navigate('/login')

    } catch (err) {
      setError(err.response.data.message)
    }
  }


  return (
    <section className="register">
      <div className="container">
        <div className='login_heading' style={{ fontSize: '40px', fontWeight: '600', textAlign: 'center' }}>Sign Up</div>
        <div style={{ width: '100%', height: '1px', background: "gray", margin: '20px' }}></div>
        <form className="form register_form" onSubmit={registerUser}>
          {
            error && <p className="form_error-message">{error}</p>
          }
          <input type="text" placeholder='Enter full name' name='name' value={userData.name} onChange={changeInputHandle} autoFocus style={{ border: '2px solid rgb(124, 124, 137)' }} />
          <input type="email" placeholder='Enter email' name='email' value={userData.email} onChange={changeInputHandle} style={{ border: '2px solid rgb(124, 124, 137)' }} />
          <input type="password" placeholder='Enter password' name='password' value={userData.password} onChange={changeInputHandle} style={{ border: '2px solid rgb(124, 124, 137)' }} />
          <input type="password" placeholder='Enter confirm password' name='cPassword' value={userData.cPassword} onChange={changeInputHandle} style={{ border: '2px solid rgb(124, 124, 137)' }} />
          <button type='submit' className='btn primary' style={{ width: '90px' }}>Register</button>
        </form>

        <small>Already have an account? <Link to={'/login'}><b>Sign In</b></Link></small>
      </div>
    </section>
  )
}

export default Register