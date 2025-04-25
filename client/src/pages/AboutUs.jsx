import React from 'react'
import { Link } from 'react-router-dom'

const AboutUs = () => {
  return (
    <section className='about_section_container'>
      <div className="about_container"  >
        <h1 style={{ textAlign: 'center', marginBottom:'20px' }}>About Us</h1>
        <div className='about_para'>
          <h2>Empowering Voices, One Blog at a Time</h2>
          <p>Welcome to <b>DashBlog</b>, a dynamic platform where creativity meets expression. We believe that everyone has a story to tell, an idea to share, and knowledge to spread. That’s why we’ve built a space where users can create, publish, and explore diverse blogs with ease.</p>
        </div>
        <div className='about_para'>
          <h2>What We Offer</h2>
          <p>✍️ Create & Share: Write and publish your own blogs effortlessly.</p>
          <p>🔍 Discover & Filter: Explore posts by categories and authors.</p>
          <p>🏆 Engage & Inspire: Connect with like-minded readers and writers.</p>
        </div>
        <div className='about_para'>
          <h2>Our Mission</h2>
          <p>Our goal is to provide a seamless blogging experience that fosters creativity, knowledge-sharing, and community engagement. Whether you're a passionate writer, an industry expert, or a casual blogger, DashBlog gives you the tools to share your voice with the world.</p>
        </div>
        <div className='about_para'>
          <h2>Join Our Community</h2>
          <p>
            Start your blogging journey today! Sign up, write your first post, and become a part of an ever-growing network of storytellers.
            Have questions? Reach out to us at <Link to={'/contact'} style={{ color: 'blue' }}>Contact</Link> or follow us on Instagram - [DashBlog].
          </p>
        </div>


      </div>
    </section>
  )
}

export default AboutUs