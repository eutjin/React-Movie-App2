import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./Navbar.module.css"
import { useGlobalContext } from '../context'


const Navbar=()=>{

    const {resetTerm, user, setUser, setFavourites}=useGlobalContext();


    //logout
    const logout= ()=>{
      localStorage.removeItem('user')
      localStorage.removeItem('favourites')
      setUser('')
      setFavourites([])
  }


return (
  <nav className={styles.container}>
    <div className={styles.navbar}>
      <Link to="/" onClick={resetTerm}>
        <div className={styles.logo}>
          <div className={styles.logoContainer}><p>M</p></div>
          <div className={styles.logoText}><p>MoviReVue</p></div>
        </div>
      </Link>
      <ul className={styles.navlinks}>
        <li>
          <Link to="/" onClick={resetTerm}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/list">My List</Link>
        </li>
        {/* <li>
          <Link to="/register">Register</Link>
        </li> */}
        {user.token ? (
          <li onClick={()=>logout()}><Link to="/">Logout</Link></li>
          // <li><button onClick={()=>logout()}>logout</button></li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </div>
  </nav>
);

}

export default Navbar