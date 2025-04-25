import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../images/dashblog.png'
import { FaBars } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import { UserContext } from '../context/userContext'
import Search from './Search'

const Header = () => {
  const [isNavShowing, setisNavShowing] = useState(window.innerWidth > 800 ? true : false)
  const { currentUser } = useContext(UserContext)

  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setisNavShowing(false)
    } else {
      setisNavShowing(true)
    }
  }

  return (
    <nav>
      <div className="container nav_container">
        <Link to='/' className='nav_logo'>
          <img src={Logo} alt="" className='nav_logo_image' />
          <div className='nav_logo_heading'>DashBlog</div>
        </Link>

        {
          currentUser?.id && isNavShowing && <Search />
        }
        {
          currentUser?.id && isNavShowing && <ul className="nav_menu">
            <li><Link to="/" onClick={closeNavHandler}>Home</Link></li>
            <li><Link to="/authors" onClick={closeNavHandler}>Authors</Link></li>
            <li><Link to="/favourites" onClick={closeNavHandler}>Favourites</Link></li>
            <li><Link to="/create" onClick={closeNavHandler}>Create Post</Link></li>
            <li><Link to="/contact" onClick={closeNavHandler}>Contact Us</Link></li>
            <li><Link to="/about" onClick={closeNavHandler}>About Us</Link></li>
            <li><Link to={`/profile/${currentUser.id}`} onClick={closeNavHandler}>Profile</Link></li>
            <li><Link to="/logout" onClick={closeNavHandler}>Logout</Link></li>
          </ul>}

        {
          !currentUser?.id && isNavShowing && <ul className="nav_menu">
            <li><Link to="/" onClick={closeNavHandler}>Home</Link></li>
            <li><Link to="/authors" onClick={closeNavHandler}>Authors</Link></li>
            <li><Link to="/contact" onClick={closeNavHandler}>Contact Us</Link></li>
            <li><Link to="/about" onClick={closeNavHandler}>About Us</Link></li>
            <li><Link to="/login" onClick={closeNavHandler}>Login</Link></li>
          </ul>}
        <button className="nav_toggle-btn" onClick={() => setisNavShowing(!isNavShowing)}>
          {
            isNavShowing ? <AiOutlineClose /> : <FaBars />
          }
        </button>
      </div>
    </nav>
  )
}

export default Header