import { useParams} from "react-router-dom";
import {useEffect} from "react";
import Moviedetail from "../components/Moviedetail";

function Detail(){
    const {id} = useParams();
    const getMovie= async ()=>{
        const json = await(
            await fetch (`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json().then((json1)=>json1.data.movie);
            console.log(json);
        }
        useEffect(()=>{
            getMovie();
        },[])
      
        return (
          <div>
            {/* {json.map((movie) => (
              <Moviedetail
                key={movie.id}
                id={movie.id}
                imgSrc={movie.medium_cover_image}
                title={movie.title}
                rating={movie.rating}
                runtime={movie.runtime}
                desc={movie.description_full}
                genres={movie.genres}
                movie={movie}
              />
            ))} */}
          </div>
        );
}

export default Detail;