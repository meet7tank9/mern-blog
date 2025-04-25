import React, { useEffect, useState } from 'react'
import axios from "axios"
import PostItem from './PostItem'
import Loader from "../components/Loader"
import { useLocation } from 'react-router-dom'

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [filterdPosts, setFilteredPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()

  const searchQuery = new URLSearchParams(location.search).get("search")

  useEffect(() => {

    const fetchPosts = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`)
        setFilteredPosts(response?.data)
        setPosts(response?.data)
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false)
    }

    fetchPosts()
  }, [])

  useEffect(() => {
    try {

      if (searchQuery && posts?.length > 0) {
        const postArray = posts?.filter(post => post.title?.toLowerCase().includes(searchQuery?.toLowerCase()))

        setFilteredPosts(postArray)
      }
      else {
        setFilteredPosts(posts)
      }
    } catch (error) {
      console.log(error);
    }
  }, [searchQuery, posts])

  if (isLoading) {
    return <Loader />
  }
  return (
    <section className='posts'>
      {
        filterdPosts.length > 0 ?
          <div className="container posts_container">
            {
              filterdPosts.map((
                { _id: id,
                  thumbnail,
                  category,
                  title,
                  description,
                  creator,
                  ratings,
                  createdAt
                }) => {
                return <PostItem
                  key={id}
                  postId={id}
                  thumbnail={thumbnail}
                  category={category}
                  title={title}
                  description={description}
                  authorId={creator}
                  ratings={ratings}
                  createdAt={createdAt}
                />
              })
            }
          </div> : <h2 className='center' style={{ height: '45vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No posts found</h2>
      }
    </section>
  )
}

export default Posts