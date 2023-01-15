import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Explore.module.css";
import { useGlobalContext } from "../context";
import { AiOutlineMenu } from "react-icons/ai";
import TopList from "../components/TopList";

function Explore() {
   useEffect(()=>{
      window.scrollTo(0, 0);
   }, [])
  return (
    <div className={styles.container}>
        <div className={styles.topContainer} >
           Top 10 Movies Worldwide this Week
        <TopList rating={7}/>
        </div>

        <div className={styles.topContainer} >
           Top 10 Romance Movies
        <TopList genre={"romance"} rating={7}/>
        </div>

        <div className={styles.topContainer} >
           Top 10 Thriller Movies
        <TopList genre={"thriller"} rating={7}/>
        </div>

        <div className={styles.topContainer} >
           Top 10 Horror Movies
        <TopList genre={"horror"} rating={7}/>
        </div>
        
    </div>
  )
}

export default Explore