import {useEffect, useState} from "react";
import { useParams} from "react-router-dom";
import Moviedetail from "../components/Moviedetail";
import styles from "./Detail.module.css"
import { useLocation } from "react-router-dom";


function Detail(){
    const {id} = useParams();
    const [movie, setMovie]= useState([]);
    const [isLoading, setIsLoading] =useState(true)
    const location=useLocation()
    const {unit}=location.state
    
    const getMovie= async ()=>{
        // const json = await(
            // await fetch (`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json().then((json1)=>json1.data.movie);
            // console.log(json);
            // setMovie(json);
            // setIsLoading(false)
        const response= await fetch (`https://yts.mx/api/v2/movie_details.json?movie_id=${id}&with_images=true&with_cast=true`);
        
        const data= await response.json()
        setMovie(data.data.movie)
        setIsLoading(false)
      
        }

        

        useEffect(()=>{
            getMovie();
            console.log(unit)
        },[])

        console.log(movie);

        if(isLoading){
          return <div className={styles.loading}></div>
        }
      
        return (
          // if(isLoading){
          //   return <div className="loading"></div>
          // }
          // return
          <div>
          
              <Moviedetail
                key={movie.id}
                id={movie.id}
                imgSrc={movie.medium_cover_image}
                imgSrc2={movie.large_cover_image}
                title={movie.title}
                rating={movie.rating}
                runtime={movie.runtime}
                desc={movie.description_full}
                genres={movie.genres}
                movie={movie}
                youtube={movie.yt_trailer_code}
                year={movie.year}
                language={movie.language}
                pa={movie.mpa_rating}
                cast={movie.cast}
              />
          
          </div>
        );
}

export default Detail;