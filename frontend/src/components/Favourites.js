import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import styles from "./Favourites.module.css"
import { AiOutlinePlus, AiOutlinePlusCircle, AiOutlineCheckCircle, AiOutlineCheck } from "react-icons/ai";
import { useGlobalContext } from '../context'
import { useState, useEffect } from "react";

import axios from 'axios'



function Favourites({movieId, variable}){
const {handleFavouriteSubmit, favourites, setFavourites, user}=useGlobalContext();

    

    const handleAddList1=(movieId, variable)=>{
        
        
        if (favourites.some(fav=>fav.id==variable.id)){
          console.log("already exists")//put deltte here
          deleteList(movieId, variable)
        }
      else{
        createList(variable)
        
      }
      }


      //create new List
const createList =async(listData)=>{
    const token= user.token
    console.log(token)
    const config={
        headers:{
            Authorization: `Bearer ${token}`
        }   
    }
    console.log(config)
  const response= await axios.post("http://localhost:5000/api/goals", listData, config)
  // console.log(response.data);
  setFavourites(response.data)
  return response.data
  }
  
  //delete List
  const deleteList =async(movieId)=>{
  
    const listId= favourites.find(x=>x.id==movieId)._id
    console.log(listId)
    const token= user.token
    console.log(token)
    const config={
        headers:{
            Authorization: `Bearer ${token}`
        }   
    }
    console.log(config)
  const response= await axios.delete("http://localhost:5000/api/goals/" + listId, config)
  // console.log(response.data);
  setFavourites(response.data)
  return response.data
  
  }
    
    
  

//   function handleAddList1=(movieId, variable)=>{
//     console.log(movieId)
    
//     if (favourites.some(fav=>fav.id==variable.id)){
//       console.log("already exists")//put deltte here
//       deleteList(movieId)
//     }
//   else{
//     createList(variable)
    
//   }
//   }

return (
  <>
  <div className={styles.tooltip}>
              <div className={styles.listbtn}>
    <button
      className={styles.button1}
      onClick={() => {
        handleAddList1(movieId, variable);
      }}
    >
      {favourites.some((fav) => fav.id == variable.id)
        ? <div className={styles.buttonAligner}><AiOutlineCheck /><p style={{paddingLeft: 10}}> in Watchlist</p> </div>
        : <div className={styles.buttonAligner}><AiOutlinePlusCircle /><p style={{paddingLeft: 10}}> Watchlist</p> </div>}
      <span class={styles.tooltiptext}>
        {user.token
          ? favourites.some((fav) => fav.id == variable.id)
            ? "remove from Watchlist"
            : "add to Watchlist"
          : "please login"}
      </span>
      
    </button>
    </div></div>
  </>
);

}
  export default Favourites;