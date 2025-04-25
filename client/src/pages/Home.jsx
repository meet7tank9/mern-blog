import React from 'react'
import Posts from '../components/Posts.jsx'
import { Link } from 'react-router-dom'
import BlogCarousel from '../components/BlogSlide.jsx'
import blog16 from '../images/blog16.jpg'
import { blog17 } from '../images/blog17.jpg'
import { blog18 } from '../images/blog18.jpg'

const Home = () => {

  return (
    <>
      <div style={{ marginTop: '90px' }}>
        <BlogCarousel />
      </div>
      <ul className="footer_categories" style={{ marginTop: `50px` }}>
        <li><Link to="/posts/categories/Agriculture">Agriculture</Link></li>
        <li><Link to="/posts/categories/Business">Business</Link></li>
        <li><Link to="/posts/categories/Entertainment">Entertainment</Link></li>
        <li><Link to="/posts/categories/Art">Art</Link></li>
        <li><Link to="/posts/categories/Investment">Investment</Link></li>
        <li><Link to="/posts/categories/Education">Education</Link></li>
        <li><Link to="/posts/categories/Weather">Weather</Link></li>
        <li><Link to="/posts/categories/Uncategorized">Uncategorized</Link></li>
      </ul >
      <Posts />
    </>
  )
}

export default Home