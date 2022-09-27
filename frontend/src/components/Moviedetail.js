import PropTypes from "prop-types";
import {Link, useLocation} from "react-router-dom";
import Home from "../routes/Home";
import { useGlobalContext } from '../context'
import styles from "./Moviedetail.module.css";
import YoutubeEmbed from "./YoutubeEmbed";
import { useState, useEffect } from "react";
import { AiOutlineClose, AiTwotoneStar, AiOutlinePlayCircle , AiOutlineRollback, AiOutlineShareAlt} from "react-icons/ai";
import Comments from "./Comments";
import Modal2 from "./Modal2"
import axios from "axios";
import Favourites from "./Favourites";
import baseUrl from "../BaseUrl";

function Moviedetail({id, imgSrc, imgSrc2, title, genres, movie, rating, runtime, desc, youtube, year, cast, pa, language}){

const{setGenre}=useGlobalContext()
const [modal, setModal]=useState(false)
const [readMore, setReadMore]= useState(false)
const [modal2, setModal2]= useState(false) //modal for share link modal
const [commentList, setCommentList]=useState([])

const variable={
  id: id,
  imgSrc: imgSrc,
  title: title,
  rating: rating,
  genres: genres,
  runtime: runtime,
}

const location = useLocation()


useEffect(()=> {
  console.log('bad2')
  if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1))
      if (elem) {
          elem.scrollIntoView({behavior: "smooth"})
      }
  } else {
  window.scrollTo({top:0,left:0, behavior: "smooth"})
  }
}, [])

useEffect(()=>{
  getAllComments()
//   const variables={
//     postId: id,
// }
// axios.post('http://localhost:5000/api/comment/getComment', variables).then(response=>{
//   if(response.data.success){
//     setCommentList(response.data.comments)
//     console.log(response)
//   }else{
//     alert('failed to get comments')
//     console.log('failed')
//   }
// })
},[])


const getAllComments=()=>{
  const variables={
    postId: id,
}
axios.post(baseUrl+'/api/comment/getComment', variables).then(response=>{
  if(response.data.success){
    setCommentList(response.data.comments)
    console.log(response)
  }else{
    alert('failed to get comments')
    console.log('failed')
  }
})
}


const updateComment=(newComment)=>{
  setCommentList(commentList.concat(newComment))//unused, partially works due to "profile" field being incomplete(no avatar loaded)
}

const updateAfterDelete=(remainingComments)=>{
  console.log(remainingComments)
  setCommentList(remainingComments)
}

const openModal=()=>{
setModal(true)
}

const closeModal=()=>{
  setModal(false)
   }

   console.log(desc.length)
switch(language){
  case 'ko': language='Korean';
  break;
  case 'en': language='English'
  break;
  case 'nl': language='English'
  break;
  case 'zh': language='Chinese'
  break;
  case 'ja': language='Japanese'
  break;
  case 'fr': language='French'
  break;
  case 'de': language='German'
  break;
  case 'hi': language='Hindi'
  break;
  case 'it': language='Italian'
  break;
  case 'la': language='Latin'
  break;
  case 'es': language='Spanish'
  break;

}

const minimodal2= document.querySelector("#minimodal2");
console.log(minimodal2)

// window.addEventListener('click', closeModal);
  
return (
  <section className={styles.container}>
    <div key={id} className={styles.contents}>
      <div className={styles.imgSection}>
        <img src={imgSrc2} alt={title} />
        <div className={styles.imgButtons}>
        <button onClick={openModal} className={styles.play}>
          <AiOutlinePlayCircle className={styles.play2} />
          <p className={styles.play3}>Watch Trailer</p>{" "}
        </button>
        <Favourites movieId={id} variable={variable}/>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.title}>
          <h3>{title} </h3>
          <p> |  {year}</p>
        <div className={styles.titleIcons}>
        <AiOutlineShareAlt style={{cursor:"pointer"}} size={30} onClick={() => setModal2(true)} /> <Link to={"/"}><AiOutlineRollback size={30}/></Link>
        </div>
        </div>
        
        
        <div className={styles.info2}>

          {/*check for desc length. to test, search 'the finellis movie'  */}
        {desc.length>1200? (<p>{readMore? desc: `${desc.substring(0, 1200)}...` } 
        <button className={styles.showdesc} onClick={()=>setReadMore(!readMore)}>{readMore? 'show less': 'show more'}</button>
        </p>): desc}
        </div>
        
        <div className={styles.infoContainer}>
        <p>Rating: 
          <h2>{rating}/10</h2>
        </p>
        <p>Runtime: <h2>{runtime} mins</h2></p>
        <p>Language: <h2>{language}</h2></p>
        <p>PA: <h2>{pa? pa: 'PG-13'}</h2></p>

        </div>
        
        <div className={styles.castgenre}>
        {movie.hasOwnProperty("cast") ? (
          <div className={styles.cast}>
            <h3>Cast</h3>
            {cast.map((actor) => (
              
              <div className={styles.actor}>
                <div className={styles.actorimg}>
                  <img src={actor.url_small_image}/>
                </div>
                <div className="">
                  <a href={`https://www.imdb.com/name/nm${actor.imdb_code}/`}>{actor.name}  </a>as {actor.character_name}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>no cast info</div>
        )}

        {movie.hasOwnProperty("genres") ? (
          <div className={styles.genre}>
            <h3>Genre</h3>
            <div className={styles.genrebtn}>
            {genres.map((g) => (
              <Link to={"/"} value={g}>
                <button
                  className={styles.button1}
                  key={g}
                  onClick={() => setGenre(g)}
                >
                  {g}
                </button>
              </Link>
            ))}</div>
          </div>
        ) : null}
        </div>
        
        {/* <button className={styles.back}>
        </button> */}
        {/* <button onClick={() =>  navigator.clipboard.writeText(window.location.href)}>SHARE</button> */}
        {/* <button onClick={() => setModal2(true)}>SHARE</button> */}

    <Comments  commentList={commentList} movieId={id} title={title} updateComment={updateComment} updateAfterDelete={updateAfterDelete} getAllComments={getAllComments}/>


        
        
        
      </div>
    </div>

    {modal ? (
      <div className={modal ? styles.modalopen : styles.modelclose}>
        <div className={styles.modalcontent}>
          <div className={styles.closecontainer} onClick={closeModal}>
            <AiOutlineClose className={styles.cancel2} />
            ppp
          </div>
          <div className={styles.framecontainer}>
            <YoutubeEmbed embedId={youtube} />
          </div>
        </div>
      </div>
    ) : null}

{modal2 && <Modal2 setModal2={setModal2}/>}

  </section>
);
}

Moviedetail.propTypes={
    id: PropTypes.number.isRequired,
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    // summary: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,

};

export default Moviedetail;

//{movie.hasOwnProperty("genres") ? (<ul>{movie.genres.map((g)=>(<li key={g}>{g}</li>))}</ul>) : null } 
//<ul>{genres.map((g)=>(<li key={g}>{g}</li>))}</ul>