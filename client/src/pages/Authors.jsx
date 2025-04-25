import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader'

const Authors = () => {
  const [authors, setAuthors] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getAuthors = async () => {
      setIsLoading(true)

      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`)
        setAuthors(response?.data)
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false)
    }
    getAuthors()
  }, [])

  if (isLoading) {
    return <Loader />
  }
  return (
    <section className='authors' style={{minHeight:'60vh'}}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '37px', padding: '20px', fontWeight: '600' }}>Authors</div>
      {/* <div style={{width:'100%', height:'1px', background:"gray", margin:'15px 0px'}}></div> */}
      {
        authors.length > 0 ? <div className="container authors_container">
          {
            authors.map(({ _id, avatar, name, posts }) => {
              return <Link to={`/posts/users/${_id}`} key={_id} className='author'>
                <div className="author_avatar">
                  <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`} alt={`image of ${name}`} />
                </div>
                <div className="author_info">
                  <h4>{name}</h4>
                  <p>{posts}</p>
                </div>
              </Link>
            })
          }
        </div> : <h2 className='center'>No users/authors found.</h2>
      }
    </section>
  )
}

export default Authors