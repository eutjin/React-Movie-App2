import { useState, useEffect } from "react";
import Movie from "../components/Movie";

function Home(){
    const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch(
      "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year"
    )
      .then((response) => response.json())
      .then((json) => {
        setMovies(json.data.movies);
        setLoading(false);
      });
  }, []);
  console.log(movies);
  return (
    
    <div>
      {loading ? 
        <h1>Loading...</h1>
       : 
        <div>
          {movies.map((movie) => (<Movie key= {movie.id} id={movie.id} imgSrc= {movie.medium_cover_image} title= {movie.title} summary={movie.summary} genres={movie.genres} movie={movie}/>
            
          ))}
        </div>
      }
    </div>
  );
}

export default Home;