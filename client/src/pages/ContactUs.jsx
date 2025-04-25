import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from "../context/userContext"


const ContactUs = () => {
  const [userData, setUserData] = useState({
    name: "",
    mobile: "",
    subject: "",
    email: "",
    message: "",
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const { currentUser } = useContext(UserContext)
  const token = currentUser?.token

  // // redirect to login page if user is not loggedin.
  // useEffect(() => {
  //   if (!token) {
  //     navigate('/login')
  //   }
  // }, [])

  const changeInputHandle = (e) => {
    setUserData(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  const contactUs = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/contact-us`, userData)

      if (response.status == 200) {
        alert("Message sent successfully")
      }
      navigate('/')

    } catch (err) {
      setError(err.response.data.message)
    }
  }


  return (
    <>
      <section className="register" style={{ minHeight: '90vh' }}>

        <div className="container" >
          <h2 className='' style={{ fontSize: '33px', textAlign: 'center' }}>Contact Us</h2>
          <div style={{ width: '100%', height: '1px', background: "gray", margin: '10px' }}></div>
          <p style={{ fontWeight: '400', paddingBottom: '20px' }}>Have questions or need help? Feel free to reach out to us—we're here to help!</p>
          <form className="form register_form" onSubmit={contactUs}>
            {
              error && <p className="form_error-message">{error}</p>
            }
            <input type="text" placeholder='name' name='name' value={userData.name} onChange={changeInputHandle} style={{ border: '2px solid rgb(124, 124, 137)' }} />
            <input type="email" placeholder='Email' name='email' value={userData.email} onChange={changeInputHandle} style={{ border: '2px solid rgb(124, 124, 137)' }} />
            <input type="mobile" placeholder='mobile' name='mobile' value={userData.mobile} onChange={changeInputHandle} style={{ border: '2px solid rgb(124, 124, 137)' }} />
            <input type="text" placeholder='subject' name='subject' value={userData.subject} onChange={changeInputHandle} style={{ border: '2px solid rgb(124, 124, 137)' }} />
            <textarea type="text" rows={7} placeholder='Enter message here' name='message' value={userData.message} onChange={changeInputHandle} style={{ border: '2px solid rgb(124, 124, 137)' }} />
            <button type='submit' className='btn primary'>Send Message</button>
          </form>
        </div>
      </section>
      <div className='contact_details_container'>
        <h3>DashBlog - A Blog Platform</h3>
        <div className='contact_details'>Telephone: +91 8294757201</div>
        <div className='contact_details'>Fax: 0049 09952 - 685 67 89</div>
        <div className='contact_details'>Email: info@dashblog.co.in</div>
      </div>
    </>
  )
}

export default ContactUs