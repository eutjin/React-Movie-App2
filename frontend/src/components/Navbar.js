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
          <li>
            <Link to="/" onClick={()=>handleClickHome()}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={()=>setMenu(false)}>About</Link>
          </li>
          <li>
            <Link to="/list" onClick={()=>setMenu(false)}>My List</Link>
          </li>
          {/* <li>
          <Link to="/register">Register</Link>
        </li> */}
          {user.token ? (
            <li onClick={() => logout()}>
              <Link to="/">Logout</Link>
            </li>
          ) : (
            // <li><button onClick={()=>logout()}>logout</button></li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul></div>

      </div>
    </nav>
  );
};

export default Navbar;
