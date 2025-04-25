import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import axios from "axios"

const ForgotPassword = () => {
    const [userData, setUserData] = useState({
        email: ""
    })
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const emailFromLogin = location.state?.email || ""
        setUserData((prevState) => {
            return { ...prevState, email: emailFromLogin }
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
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/forgot-password`, userData)
            const user = await response.data
            // console.log(user);

            if (response.status == 200) {
                navigate("/reset-password", { state: { email: userData.email } })
            }
        } catch (error) {
            setError(error.response.data.message)
        }
    }


    return (
        <section className="login">
            <div className="container">
                <div className='login_heading' style={{ fontSize: '40px', fontWeight: '600', textAlign: 'center' }}>Forgot Password</div>
                <div style={{ width: '100%', height: '1px', background: "gray", margin: '20px' }}></div>
                <form action="" className="form login_form" onSubmit={generateOTP}>
                    {
                        error && <p className="form_error-message">{error}</p>
                    }
                    <input type="email" placeholder='Enter email address' name='email' value={userData.email} onChange={changeInputHandle} autoFocus />
                    <div className='form_button_container'>
                        <button type='submit' className='btn primary'>Generate OTP</button>
                    </div>
                </form>

                <small><Link to={'/login'}>Go Back</Link></small>
            </div>
        </section>
    )
}

export default ForgotPassword