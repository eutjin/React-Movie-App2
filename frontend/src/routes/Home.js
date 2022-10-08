import { useState, useEffect } from "react";
import Movie from "../components/Movie";
import { useGlobalContext } from "../context";
import styles from "./home.module.css";
import { AiOutlineLeft, AiOutlineRight, AiOutlineSearch } from "react-icons/ai";

function Home() {
  const [loadingArray, setLoadingArray] = useState([...Array(20).keys()]);
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
  const genre_list = [
    "comedy",
    "sci-fi",
    "horror",
    "romance",
    "action",
    "thriller",
    "drama",
    "mystery",
    "crime",
    "animation",
  ];

  const {
    loading,
    movies, fetchMovie,
    rating, setRating,
    genre,
    setGenre,
    onChangeGenre,
    onChangeRating,
    query,
    setQuery,
    handleSubmit,
    results,
    page,
    numPage,
    setNumPage,
    nextPage,
    prevPage,
  } = useGlobalContext();

  useEffect(() => {}, []);

  useEffect(() => {
    let nb = Math.ceil(results / 20);
    setNumPage(nb);
  }, [results]);

  // useEffect(()=>{
  //   document.getElementById("genre").value= genre;

  // },[genre])

const handleBackHome=()=>{
  setGenre("all")
  setQuery("")
  setRating(0)
fetchMovie()
  
}

  return (
    <section className={styles.header}>
      <div className={styles.genre}>
        <h2>Genre is: {genre}</h2>
        <h4> {results} results</h4>

        {/* <form>
          <div>
          <input type='text' onChange={onChangeQuery}/>
          </div>
        </form> */}
        {/* <button onClick={useEffect}>Search</button> */}
        <div className={styles.text}>
          <h2>Look no further.</h2>
          <h4>Your search for movies start here.</h4>
        </div>

        <div className={styles.barcontainer}>
          <div className={styles.bars}>
            {/* genre */}

            <div className={styles.genrebar}>
              <select
                value={genre}
                id="genre"
                placeholder={genre}
                type="text"
                onChange={onChangeGenre}
              >
                <option value="all">All Genres</option>
                {genre_list.map((g) => (
                  <option value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div className={styles.ratingbar}>
              <select
                value={rating}
                id="rating"
                placeholder={rating}
                type="number"
                onChange={onChangeRating}
              >
                <option value="0">All Ratings</option>
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
            </div>

            <div className={styles.formbar}>
              <form>
                <input
                  type="text"
                  placeholder="search"
                  value={query}
                  className={styles.formsize}
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                />
                <button className={styles.button} onClick={handleSubmit}>
                  <AiOutlineSearch />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contents}>
        {loading ? (
          <div className={styles.grid}>
            {loadingArray.map((movie) => (
              <div className={styles.dummyContainer}></div>
            ))}
          </div>
        ) : movies ? (
          <div className={styles.grid}>
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                rating={movie.rating}
                imgSrc={movie.medium_cover_image}
                imgSrc2={movie.large_cover_image}
                title={movie.title}
                summary={movie.summary}
                genres={movie.genres}
                movie={movie}
                runtime={movie.runtime}
              />
            ))}
          </div>
        ) : (
          <div className={styles.noResults} >
            <div className={styles.noResultsLine1}> No search results. </div>
            <div className={styles.noResultsLine2}> Please change your search terms. </div>
            <div className={styles.noResultsButton} onClick={()=>handleBackHome()}> Back to Home </div>
          </div>
        )}
      </div>

{movies ? (<div className={styles.pageset}>
        <div className={styles.pagesetPrev} onClick={prevPage}>
          <AiOutlineLeft />
        </div>
        <p className="">
          {page}/{numPage} pages
        </p>
        <div className={styles.pagesetNext} onClick={nextPage}>
          <AiOutlineRight />
        </div>
        <div
          className={styles.pagesetTop}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          Back to Top
        </div>
      </div>):(null)}
      
    </section>
  );
}

export default Home;
