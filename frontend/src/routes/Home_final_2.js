import { useState, useEffect } from "react";
import Movie from "../components/Movie";
import { useGlobalContext } from '../context'
import styles from './home.module.css'

function Home(){
  //   const [loading, setLoading] = useState(true);
  // const [movies, setMovies] = useState([]);
  // //rating selector view
  // const [rating, setRating] = useState(1);
  // const [genre, setGenre]= useState("comedy")
  // const onChange = (event) => {setGenre(event.target.value);};

  // useEffect(() => {
  //   fetch(
  //     `https://yts.mx/api/v2/list_movies.json?genre=${genre}&sort_by=year`
  //   )
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setMovies(json.data.movies);
  //       setLoading(false);
  //     });
  // }, [genre]);
const genre_list= ['all', 'comedy', 'sci-fi', 'horror', 'romance', 'action', 'thriller', 'drama', 'mystery', 'crime', 'animation'];

  const{loading,
    movies,
    rating,
    genre,
    setGenre,
    onChangeGenre,
  onChangeRating,

}= useGlobalContext()
  console.log(movies);
  console.log(rating)
  return (
    <section className={styles.header}>
      <div>
        <h1>Genre is: {genre}</h1>
        {/* <form>
          <div>
            <input type='text' onChange={onChangeQuery}/>
          </div>
        </form> */}
          {/* <button onClick={useEffect}>Search</button> */}
          <select
          value={genre}
          id="genre"
          placeholder={genre}
          type="number"
          onChange={onChangeGenre}>
           <option value="all">all</option>
            <option value="comedy">comedy</option>
            <option value="sci-fi">sci-fi</option>
            <option value="horror">horror</option>
            <option value="romance">romance</option>
            <option value="action">action</option>
            <option value="thriller">thriller</option>
            <option value="drama">drama</option>
            <option value="mystery">mystery</option>
            <option value="crime">crime</option>
            <option value="animation">animation</option>
          </select>

          <select
          value={rating}
          id="rating"
          placeholder={rating}
          type="number"
          onChange={onChangeRating}>
            <option value="0">all</option>
            <option value="9">9</option>
            <option value="8">8</option>
            <option value="7">7</option>
            <option value="6">6</option>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
            
          </select>
          <h1>.</h1>
      </div>
      
    <div className={styles.contents}>
      {loading ? 
        <h1>Loading...</h1>
       : 
        <div className={styles.grid}>
          {movies.map((movie) => (<Movie key= {movie.id}  id={movie.id} rating={movie.rating} imgSrc= {movie.medium_cover_image} title= {movie.title} summary={movie.summary} genres={movie.genres} movie={movie}/>
            
          ))}
        </div>
      }
    </div>
    </section>
  );
}

export default Home;