import { useState, useEffect } from "react";
import Movie from "../components/Movie";

function Home(){
    const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  //rating selector view
  const [rating, setRating] = useState(1);
  const onChange = (event) => {setRating(event.target.value);};

  useEffect(() => {
    fetch(
      `https://yts.mx/api/v2/list_movies.json?minimum_rating=${rating}&sort_by=year`
    )
      .then((response) => response.json())
      .then((json) => {
        setMovies(json.data.movies);
        setLoading(false);
      });
  }, [rating]);
  console.log(movies);
  return (
    <div>
      <div>
        <h1>seach here</h1>
        <input
            value={rating}
            id="rating"
            placeholder="Rating"
            type="number"
            onChange={onChange}
          />
          {/* <button onClick={useEffect}>Search</button> */}
      </div>
      
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
    </div>
  );
}

export default Home;