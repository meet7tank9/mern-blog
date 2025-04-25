import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import { UserContext } from '../context/userContext'
import axios from "axios"

const Favourites = () => {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const { currentUser } = useContext(UserContext)
    const token = currentUser?.token

    // redirect to login page if user is not loggedin.
    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [])

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true)

            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/favourites/get-favourite`, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })
                // console.log(response.data.favourites)
                setPosts(response.data.favourites)

            } catch (error) {
                console.log(error);
            }
            setIsLoading(false)
        }

        fetchPosts()
    }, [])

    const handleRemove = async (postId) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/favourites/remove-favourite/${postId}`, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })
            console.log(response)
            // setPosts(response.data.favourites)
            if (response.status == 200) {
                alert(response.data.message)

            }
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/favourites/get-favourite`, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })
            // console.log(response.data.favourites)
            setPosts(res.data.favourites)

        } catch (error) {
            console.log(error)
        }
    }


    if (isLoading) {
        return <Loader />
    }
    return (
        <section className='dashboard' style={{ minHeight: "60vh" }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '37px', padding: '20px', fontWeight: '600' }}>Favourite Blogs</div>
            {
                posts.length > 0 ? <div className="container dashboard_container">
                    {
                        posts.map((post) => {
                            return <article key={post._id} className='dashboard_post' style={{height:'5rem'}}>
                                <div className="dashboard_post-info">
                                    <div className="dashboard_post-thumbnail">
                                        <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" />
                                    </div>
                                    <h5>{post.title}</h5>
                                </div>
                                <div className="dashboard_post-actions">
                                    <Link to={`/posts/${post._id}`} className='btn sm' >View</Link>
                                    <button className='btn sm primary' onClick={() => handleRemove(post._id)}>Remove</button>
                                </div>
                            </article>
                        })
                    }
                </div> : <h2 style={{ height: '45vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Posts Available In Favourites</h2>
            }
        </section>
    )
}

export default Favourites