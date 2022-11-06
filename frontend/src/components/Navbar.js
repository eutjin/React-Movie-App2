import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useGlobalContext } from "../context";
import { AiOutlineMenu } from "react-icons/ai";
import { useSetState } from "@mantine/hooks";

const Navbar = () => {
  const { resetTerm, user, setUser, setFavourites } = useGlobalContext();
  const [menu, setMenu] = useState(false);

  //logout
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("favourites");
    setUser("");
    setFavourites([]);
  };

  useEffect(()=>{

window.addEventListener("resize", resizer);

    return () => window.removeEventListener("resize", resizer);

}, [])

const resizer=()=>{
 console.log("change window")

}

const handleClickHome=()=>{
  resetTerm()
  setMenu(false)
}

  return (
    <nav className={styles.container}>
      <div className={styles.navbar}>
        <Link to="/" onClick={resetTerm}>
          <div className={styles.logo}>
            <div className={styles.logoContainer}>
              <p>M</p>
            </div>
            <div className={styles.logoText}>
              <p>MoviReVue</p>
            </div>
          </div>
        </Link>
        <div
          className={styles.menuLogoContainer}
          onClick={() => setMenu(!menu)}
        >
          <AiOutlineMenu className={styles.menuLogo} />
        </div>
{/* {menu? ():null} */}
<div className={menu?styles.navlinkContainerOn:styles.navlinkContainerOff}>
        <ul className={styles.navlinks}  >
          
            <Link to="/" onClick={()=>handleClickHome()}>
            <li> Home</li>
            </Link>

            <Link to="/explore" >
            <li> Explore</li>
            </Link>
          
          {user._id && <Link to="/about" onClick={()=>setMenu(false)}><li>About</li></Link>}
            
          
          
            <Link to="/list" onClick={()=>setMenu(false)}><li>My List</li></Link>
          
          {/* <li>
          <Link to="/register">Register</Link>
        </li> */}
          {user.token ? (
            
              <Link to="/" onClick={() => {logout(); setMenu(false)}}><li >Logout</li></Link>
            
          ) : (
            // <li><button onClick={()=>logout()}>logout</button></li>
           
              <Link to="/login" onClick={()=>setMenu(false)}> <li>Login</li></Link>
            
          )}
        </ul></div>

      </div>
    </nav>
  );
};

export default Navbar;
