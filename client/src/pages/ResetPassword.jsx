import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { UserContext } from '../context/userContext.js'
import axios from "axios"

const ResetPassword = () => {
    const [userData, setUserData] = useState({
        email: "",
        otp: "",
        newPassword: "",
        confirmPassword: ""
    })

    const [error, setError] = useState("")
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const emailFromLocation = location.state?.email || ""
        setUserData((prevState) => {
            return { ...prevState, email: emailFromLocation }
        })
    }, [])

    const changeInputHandle = (e) => {
        setUserData(prevState => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }

    const generateOTP = async (e) => {
        e.preventDefault()
        setError('')
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/reset-password`, userData)
            const user = await response.data
            console.log(user);

            if (response.status == 200) {
                navigate("/login")
            }

        } catch (error) {
            setError(error.response.data.message)
        }
    }


    return (
        <section className="login">
            <div className="container">
            <div className='login_heading' style={{ fontSize: '40px', fontWeight:'600', textAlign:'center' }}>Reset Password</div>
            <div style={{width:'100%', height:'1px', background:"gray", margin:'20px'}}></div>
                <form action="" className="form login_form" onSubmit={generateOTP}>
                    {
                        error && <p className="form_error-message">{error}</p>
                    }
                    <input type="email" placeholder='Enter email address' name='email' value={userData.email} readOnly />
                    <input type="text" placeholder='Enter 6 digit OTP' name='otp' value={userData.otp} onChange={changeInputHandle} autoFocus />
                    <input type="password" placeholder='Enter new password' name='newPassword' value={userData.newPassword} onChange={changeInputHandle} />
                    <input type="password" placeholder='Enter new confirm password' name='confirmPassword' value={userData.confirmPassword} onChange={changeInputHandle} />
                    <div className='form_button_container'>
                        <button type='submit' className='btn primary'>Change Password</button>
                    </div>
                </form>

                <small><Link to={'/login'}>Go To Login</Link></small>
            </div>
        </section>
    )
}

export default ResetPassword