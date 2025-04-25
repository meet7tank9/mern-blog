import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
// import ReatTimeAgo from "react-time-ago"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en.json"
import ru from "javascript-time-ago/locale/ru.json"
import ReactTimeAgo from 'react-time-ago'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const PostAuthor = ({ authorId, createdAt }) => {
  const [author, setAuthor] = useState({})
  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${authorId}`)
        setAuthor(response?.data)
      } catch (error) {
        console.log(error);
      }
    }
    getAuthor()
  }, [])
  return (
    <Link to={`/posts/users/${authorId}`} className='post_author'>
      <div className="post_author-avatar">
        <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${author?.avatar}`} alt="" />
      </div>
      <div className="post_author-details">
        <h5>By: {author.name}</h5>
        <small><ReactTimeAgo date={new Date(createdAt)} locale='en-US' /></small>
      </div>
    </Link>
  )
}

export default PostAuthor