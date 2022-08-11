import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import styles from "./Movie.module.css";
import { useGlobalContext } from '../context'
import { useState, useEffect } from "react";
import noImgs from "./imgNotFound.png";
import { AiTwotoneStar, AiOutlinePlusCircle,  } from "react-icons/ai";
import {BsBookmarkPlus as Bs, BsFillBookmarkPlusFill} from "react-icons/bs"
import axios from 'axios'
import Favourites from "./Favourites";
import AddList from "./AddList";
import { ActionIcon } from "@mantine/core";
import baseUrl from "../BaseUrl";

function Movie({id, imgSrc, imgSrc2,title, rating, summary, genres, movie, setGenre, runtime}){

  const {handleFavouriteSubmit, favourites, setFavourites, user}=useGlobalContext();
  const [added, setAdded]=useState()
  const [list, setList]=useState([])
  
    const hours=runtime/60;
    const rhours=Math.floor(hours)
    const min=(hours-rhours)*60
    const rmin=Math.ceil(min)

    const variable={
      id: id,
      imgSrc: imgSrc,
      title: title,
      rating: rating,
      genres: genres,
      runtime: runtime,
    }
  
  

  const handleButton=(movie)=>{
    ;
    //buggy shit
    // if(favourites.includes(movie)){
    //   setAdded(true)
    // }else{
    //   setAdded(false)
    // }
  }
  
 
const handleAddList=(movieId)=>{
  console.log(movieId)
  const variable={
    id: id,
    imgSrc: imgSrc,
    title: title,
    rating: rating,
    genres: genres,
    runtime: runtime,
  }
  if (favourites.some(fav=>fav.id==movie.id)){
    console.log("already exists")//put deltte here
    deleteList(movieId)
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
const response= await axios.post(baseUrl+"/api/goals", listData, config)
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
const response= await axios.delete(baseUrl+"/api/goals/" + listId, config)
// console.log(response.data);
setFavourites(response.data)
return response.data

}

return(
          <div className={styles.container}>
            <div className={styles.box} >
              {/* <Link to={{pathname: `/movie/${id}`, state:{unit:"engineer"}, }} className={styles.photo}> */}
              <div className={styles.overlay}>
              <Link to={{pathname: `/movie/${id}`, state:{unit:"engineer"}, }} >
                <img src={imgSrc}  className={styles.realimg}/></Link>
                <img src={noImgs} className={styles.fakeimg}/> 
                <p className={styles.hour}>{rhours}h {rmin}m</p>
                <p className={styles.rating}> <AiTwotoneStar className={styles.icon}/> <p>{rating}</p></p>
                {/* <ActionIcon className={styles.customlisticon} variant="hover" color="orange" size="xl"><BsFillBookmarkPlusFill color="orange"  size={32}/></ActionIcon> */}
                <div className={styles.customlisticon}><AddList movieId={id} variable={variable}/></div>
              </div>
              {/* </Link> */}
              
              
              <div className={styles.content}>
              <div className={styles.genrecentre}>
              <h2 >
                  {/* <Link to={`/movie/${id}`} >{title}</Link> */}
                  <Link to={{pathname: `/movie/${id}`, state:{unit:"engineer"}, }} >{title}</Link>
                  
              </h2></div>
              {/* <p>{summary}</p> */}

              <div className={styles.genrecentre}>
              {movie.hasOwnProperty("genres") ? (<ul className={styles.list} >{genres.slice(0,2).map((g)=>(<li key={g}>{g}</li>))}</ul>) : null } 
              </div>
              
{/* 
              <div className={styles.tooltip}>
              <div className={styles.listbtn}> */}
              {/* <button className={styles.button1} onClick={()=>{ handleFavouriteSubmit(movie);}}> */}
              <div className={styles.genrecentre}>
              <Favourites movieId={id} variable={variable} />
              </div>
              {/* <AddList movieId={id} variable={variable}/> */}
              {/* <button className={styles.button1} onClick={()=>{ handleAddList1(id, variable);}}>
             {favourites.some(fav=>fav.id==movie.id)? 'remove from list': 'add to list'}
             <span class={styles.tooltiptext}>{user.token? (favourites.some(fav=>fav.id==movie.id)?'remove from list': 'add to list'): 'please login'}</span>
             {console.log('button')}
            </button> */}
            {/* </div>
            </div> */}

            </div>
            </div>
          </div>

            
)
}

Movie.propTypes={
    id: PropTypes.number.isRequired,
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,

};

export default Movie;

//{movie.hasOwnProperty("genres") ? (<ul>{movie.genres.map((g)=>(<li key={g}>{g}</li>))}</ul>) : null } 
//<ul>{genres.map((g)=>(<li key={g}>{g}</li>))}</ul>