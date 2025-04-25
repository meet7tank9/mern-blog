import React, { useEffect, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import axios from 'axios'

const Comments = ({ postId }) => {
    const [userData, setUserData] = useState({
        description: ""
    })
    const [comments, setComments] = useState([])
    const [error, setError] = useState("")
    const { currentUser } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)

    const token = currentUser?.token

    const navigate = useNavigate()

    const handleOnchange = (e) => {
        setUserData(prevState => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/comments/create/${postId}`, userData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })

            if (response.status == 201) {
                setUserData({
                    description: ""
                })
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/comments/getComments/${postId}`)
                
                setComments(response.data)
                // navigate(`/posts/${postId}`)
            }
        } catch (error) {
            setError(error.response.data.message)
            console.log(error);
        }
    }

    useEffect(() => {
        const getComments = async () => {
            setIsLoading(true)

            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/comments/getComments/${postId}`)
                
                setComments(response.data)
            } catch (error) {
                setError(error)
            }

            setIsLoading(false)
        }
        getComments();
    }, [])

    const handleDeleteComment = async ({ id }) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/comments/deleteComments/${id}`, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })

            navigate(`/posts/${postId}`)
        } catch (error) {
            setError(error.response.data.message)
            console.log(error);
        }
    }

    return (
        <section className="">
            <div className="">
                <h1 style={{ marginBottom: '20px' }}>Write A Comment</h1>
                <form action="" className="form login_form" onSubmit={handleOnSubmit}>
                    {
                        error && <p className="form_error-message">{error}</p>
                    }
                    <textarea rows={5} placeholder='Write comment here...' name='description' value={userData.description} onChange={handleOnchange} style={{ border: '2px solid black' }} />
                    <div className='form_button_container'>
                        <button type='submit' className='btn primary'>Add Comment</button>
                    </div>
                </form>
            </div>

            <section className='post_comments_container'>
                <div className=""  >
                    <h1 style={{ textAlign: 'left', paddingLeft:'10px' }}>All Comments</h1>
                    <div style={{width:'100%', height:'1px', background:"gray", margin:'10px'}}></div>
                    {
                        comments.length > 0 ?
                            <div>
                                {
                                    comments.map((item, i) => <>
                                        <div className='about_para post_comments' key={i}>
                                            <div>By: &nbsp; {item.user.name}</div>
                                            <div style={{ border: '1px dashed black', height: '1px', width: 'full' }} ></div>
                                            <div className='post_description_btn'>
                                                <p>{item.description}</p>
                                                {
                                                    item.user?._id == currentUser?.id && <Link className='post-detail_delete_btn' onClick={() => handleDeleteComment({ id: item._id })}>Delete</Link>
                                                }
                                            </div>
                                        </div>
                                    </>
                                    )
                                }
                            </div>
                            :
                            <h2 className='center'>No comments in this post</h2>
                    }
                </div>
            </section>
        </section>

    )
}

export default Comments