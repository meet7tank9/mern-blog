import React, { useContext, useEffect, useState } from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from "../context/userContext"
import DeletePost from "./DeletePost"
import Loader from "../components/Loader"
import axios from "axios"
import Comments from '../components/Comments'
import PostRating from '../components/PostRating'
import { FaHeart } from "react-icons/fa6";

const PostDetail = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { currentUser } = useContext(UserContext)

  const token = currentUser?.token

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true)

      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`)
        setPost(response.data)
      } catch (error) {
        setError(error)
      }

      setIsLoading(false)
    }
    getPost();
  }, [])

  const handleFavourite = async () => {

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/favourites/add-to-favourite/${id}`, {}, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })

      if (response.status == 200) {
        alert(response.data.message)
      }
    } catch (error) {

      setError(error)
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <section className="post-detail">
      {
        error && <p className='error'>{error}</p>
      }

      {post && <div className="conatiner post-detail_container">

        <div className="post-detail_header">

          <PostAuthor authorId={post.creator} createdAt={post.createdAt} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

            {
              currentUser?.id == post?.creator && <div className="post-detail_buttons">

                <Link to={`/posts/${post?._id}/edit`} className='btn sm primary'>Edit</Link>
                <DeletePost postId={id} />

              </div>
            }
            {
              token && <FaHeart style={{ fontSize: '40px', color: "red", borderRadius: '50px', boxShadow: '0px 0px 20px 1px gray', padding: '7px', cursor: 'pointer' }} onClick={handleFavourite} />
            }
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className='post-detail_total_words'>Total Words : {post.description.split(" ").length}</div>
          <PostRating postId={id} ratings={post.ratings} />
        </div>
        <h1>{post.title}</h1>

        <div className="post-detail_thumbnail">
          <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" />
        </div>

        <p dangerouslySetInnerHTML={{ __html: post.description }}></p>

      </div>}

      <Comments postId={id} />
    </section>
  )
}

export default PostDetail