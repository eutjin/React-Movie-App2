import React, { useState, useContext, useReducer, useEffect } from 'react'
import axios from 'axios'

const AppContext = React.createContext()

const getLocalStorage=()=>{
  let storage=localStorage.getItem('favourites')
  if(storage){
    return JSON.parse(storage)
  }else{
    return [];
  }
}

const getLocalStorageUser=()=>{
  let storage=localStorage.getItem('user')
  if(storage){
    return JSON.parse(storage)
  }else{
    return [];
  }
}


const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    //rating selector view
    const [rating, setRating] = useState(0);
    const [genre, setGenre]= useState("all");
    const [query, setQuery]=useState("");
    const onChangeGenre = (event) => {setGenre(event.target.value);};
    const onChangeRating = (event) => {setRating(event.target.value);};
    // const [favourites, setFavourites]=useState(getLocalStorage());
    const [favourites, setFavourites]=useState(getLocalStorage());
    const [results, setResults]=useState();
    const [page, setPage]=useState(1)
    const [numPage, setNumPage]= useState()
    const [user, setUser] = useState(getLocalStorageUser())
    const [userProfile, setUserProfile]=useState({})
    const [listTitles, setListTitles]= useState([])
    const [list, setList]= useState([])
    const [adding, setAdding]= useState(false)
    // const onChangeQuery = (event) => {setQuery(event.target.value);};
  
    // const fetchMovie=()=>{
    //   setLoading(true)
    //   fetch(
    //     `https://yts.mx/api/v2/list_movies.json?genre=${genre}&minimum_rating=${rating}&query_term=${query}&sort_by=year`
    //   )
    //     .then((response) => response.json())
    //     .then((json) => {
    //       setMovies(json.data.movies);
    //       setLoading(false);
    //     });
    // }

    const fetchMovie= async ()=>{
      setLoading(true)
      let url;
      if(query){
        url= `https://yts.mx/api/v2/list_movies.json?query_term=${query}&page=${page}&sort_by=year`
      }else{
        url= `https://yts.mx/api/v2/list_movies.json?genre=${genre}&page=${page}&minimum_rating=${rating}&sort_by=year`
      }

      try{
        const response = await fetch (url);
        const data = await response.json();
        console.log(data)
        setMovies(data.data.movies);
        setLoading(false)
        setResults(data.data.movie_count)
        

        console.log(url)
      }catch(error){
        setLoading(true)
        console.log(error)
      }
      
    }

    useEffect(() => {
        fetchMovie();
    }, [rating, genre, page]);

    const handleSubmit=(e)=>{
      e.preventDefault()
      fetchMovie()
      console.log('hello')
    }

    const handleFavouriteSubmit=(fav)=>{
      console.log(fav)
      if ( favourites.includes(fav)){
        const newFavourites=favourites.filter((movie)=>movie.id!=fav.id);
        setFavourites(newFavourites)
      }else{
      const newFavourites=[...favourites, fav]
      setFavourites(newFavourites)
      }
    }

    const prevPage=()=>{
      setPage((oldPage)=>{
        let prevPage=oldPage-1
        if (prevPage<1){
          prevPage=numPage
        }
        return prevPage
      })
    }

    const nextPage=()=>{
      setPage((oldPage)=>{
        let nextPage=oldPage+1
        if (nextPage>numPage){
          nextPage=1
        }
        return nextPage
      })
    }

    useEffect(()=>{
      localStorage.setItem('favourites', JSON.stringify(favourites))
      // if(favourites.length>0){
        
      //   createList({text: favourites[favourites.length-1].id})
      // }
      // console.log(favourites[favourites.length-1].id)
    },[favourites])


    //reset API search terms when we press home button/home logo
    const resetTerm=()=>{
      setRating(0);
      setGenre("all");
      setQuery("");
      setPage(1);
    }


    const getAllList=()=>{
      const variable={
          user: user._id,
      }
      axios.post('http://localhost:5000/api/list/getAllList', variable).then(response=>{
          console.log(response.data.lists)
          setListTitles(response.data.lists)
      })
  }

  useEffect(()=>{
    getProfile()
getAllList()
getCustomList()

  }, [])

//load user profile, user must have completed profile first
  const getProfile = () => {
    const variables = {
      id: user._id,
    };
    return axios
      .post("http://localhost:5000/api/profile/getProfile", variables)
      .then((response) => {
        if (response.data.success) {
          console.log("heehaw", response.data.result);
          // setProfile({
          //   ...response.data.result[0],
          //   followers: response.data.result[0].followers,
          // });
          if(response.data.result.length>0){
          let newProfile = response.data.result[0];
          setUserProfile({ ...newProfile });
          console.log("doneeeeee")

          
          }
        } else {
          alert("failed to get comments");
          console.log("failed");
        }
      })

     
  };

  //populat user's custom list and custom list conteentts
  useEffect(() => {
    if (user) {
      getAllList();
      getCustomList();
    } else {
      setListTitles([]);
      setList([]);
    }
  }, [user]);


    const addList= ()=>{
      const token= user.token
      
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

return response.data
}
  
 //@ get all custom list movies
  const getCustomList=()=>{

      const variable={
        user: user._id,
      }

      const token= user.token
      console.log(token)
      const config={
        headers:{
            Authorization: `Bearer ${token}`
        }   
    }
    axios.post('http://localhost:5000/api/list/getCustomList', variable, config).then(response=>{
      if(response.data.success){
        setList(response.data.result)
        console.log(response.data)
      }else{
        alert('failed to get comments')
        console.log('failed')
      }
    })
    }

  return (
    <AppContext.Provider
      value={{
        loading,
        movies,
        rating,
        genre,
        setGenre,
        onChangeGenre,
        onChangeRating,
        query, setQuery, handleSubmit, handleFavouriteSubmit, setFavourites, favourites, results, page, numPage, setNumPage, nextPage, prevPage, resetTerm, user, userProfile, getProfile, setUser, listTitles, list, setList, getCustomList, getAllList
        
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
