import React, { useState, useEffect } from 'react'
import PostItem from '../components/PostItem'
import axios from 'axios'
import Loader from "../components/Loader"
import { useParams } from 'react-router-dom'

const CategoryPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const { category } = useParams()

  useEffect(() => {

    const fetchPosts = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/categories/${category}`)
        setPosts(response?.data)
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false)
    }

    fetchPosts()
  }, [category])

  if (isLoading) {
    return <Loader />
  }
  return (
    <section className='posts'>
      {
        posts.length > 0 ?
          <div className="container posts_container">
            {
              posts.map(({ _id: id, thumbnail, category, title, description, creator, createdAt, ratings }) => {
                return <PostItem key={id} postId={id} thumbnail={thumbnail} category={category} title={title} description={description} authorId={creator} ratings={ratings} createdAt={createdAt} />
              })
            }
          </div> : <h2 className='center' style={{ height: '45vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No posts found</h2>
      }
    </section>
  )
}

export default CategoryPosts