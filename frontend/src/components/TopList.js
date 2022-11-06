import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./TopList.module.css";
import { useGlobalContext } from "../context";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineSearch,
  AiFillRightCircle,
  AiFillEdit,
  AiFillDelete,
  AiOutlineDown,
  AiOutlineUp,
  AiFillCaretDown,
} from "react-icons/ai";

function TopList({ genre, rating }) {
  //   const { topTen } = useGlobalContext();
  const [hoverId, setHoverId] = useState(22222);
  const [coordinate, setCoordinate] = useState({ x: 0, y: 0 });
  const [topTen, setTopTen] = useState([]);
  const [loadingTopTen, setLoadingTopTen]= useState([1,2,3,4,5,6,7,8,9,10])
  const ref = useRef(null);

  console.log("top", topTen);

  useEffect(() => {
    let url;
    if (genre && rating) {
      console.log("yes", rating, genre);
      url = `https://yts.mx/api/v2/list_movies.json?page=1&genre=${genre}&minimum_rating=${rating}&sort_by=year`;
    } else if (rating) {
      url = `https://yts.mx/api/v2/list_movies.json?page=1&minimum_rating=${rating}&sort_by=year`;
    }

    axios.post(url).then((response) => {
      console.log("dfdf", response.data.data.movies);
      setTopTen(response.data.data.movies);
    });
  }, []);

  const handleLeftButton = () => {
    var width = Math.max(window.innerWidth);
    console.log("width2", width);
    let size;
    if (width < 488) {
      size = 190;
    } else {
      size = 220;
    }

    const e = ref.current;
    console.log("scrollGET", e, e.scrollLeft);
    let val1 = Math.floor(e.getBoundingClientRect().width / size);
    console.log("val1", val1);

    let scroll1 = size * val1;
    console.log("scroll1", scroll1);

    let val2 = (e.getBoundingClientRect().width - size * val1) / 2;
    console.log("val2", val2);

    let scroll2 = scroll1 - val2;
    console.log("scroll2", scroll2);

    let endScroll = topTen.length * size - e.getBoundingClientRect().width;
    console.log("endScroll", endScroll);

    // e.scrollLeft-= 905.6;
    // console.log("scrollx", e.scrollLeft)

    if (endScroll - e.scrollLeft < 10) {
      e.scrollLeft -= scroll2;
    } else {
      e.scrollLeft -= scroll1;
    }
  };

  const handleRightButton = () => {
    var width = Math.max(window.innerWidth);
    console.log("width2", width);
    let size;
    if (width < 488) {
      size = 190;
    } else {
      size = 220;
    }
    // const e=ref.current;
    // console.log("scroll", e.getBoundingClientRect())
    // e.scrollLeft+= 905.6;
    // console.log("scroll2", e.scrollLeft)
    const e = ref.current;
    console.log("scroll", e);
    console.log("scrollGET", e.scrollLeft);
    let val1 = Math.floor(e.getBoundingClientRect().width / size);
    console.log("val1", val1);

    let scroll1 = size * val1;
    console.log("scroll1", scroll1);

    let val2 = (e.getBoundingClientRect().width - size * val1) / 2;
    console.log("val2", val2);

    let scroll2 = scroll1 - val2;
    console.log("scroll2", scroll2);

    let endScroll = topTen.length * size - e.getBoundingClientRect().width;
    console.log("endScroll", endScroll);

    // e.scrollLeft-= 905.6;
    // console.log("scrollx", e.scrollLeft)

    if (e.scrollLeft == 0) {
      e.scrollLeft += scroll2;
    } else {
      e.scrollLeft += scroll1;
    }
  };

  const handleItemHover = (e) => {
    // console.log(item.id);
    // setHoverId(item.id);
    var rect = e.target.getBoundingClientRect();
    console.log(rect);
    setCoordinate({ x: rect.x, y: 0 });
  };

  return (
    <div className={styles.topListContainer}>
      {topTen.length > 0 ? (
        <div
          className={styles.sliderContainer}
          onMouseOver={(e) => handleItemHover(e)}
        >
          <button
            className={styles.sliderButtonLeft}
            onClick={() => handleLeftButton()}
          >
            <AiOutlineLeft size={18} />
          </button>
          <div ref={ref} className={styles.gridScroll}>
            {topTen.length > 0 &&
              topTen.slice(0, 10).map((item, index) => (
                <Link
                to={{ pathname: `/movie/${item.id}`, state: { unit: "engineer" } }}
              >
                <div className={styles.topListSingleContainer}>
                  <div className={styles.singleLeft}>{index + 1}</div>
                  <div className={styles.singleRight}>
                    <img
                      src={item.medium_cover_image}
                      className={styles.singleRightImage}
                    />
                  </div>
                </div></Link>
              ))}
          </div>
          <button
            className={styles.sliderButtonRight}
            onClick={() => handleRightButton()}
          >
            <AiOutlineRight size={18} />
          </button>
          {/* {coordinate.x && <div  className={styles.topListSingleContainerHovered} style={{ position: 'absolute', left:`${coordinate.x}px`, top:`${coordinate.y}px` }}>f</div>} */}
        </div>
      ) : (
        <div  className={styles.sliderContainer}>
             <div ref={ref} className={styles.gridScroll}>
{loadingTopTen.map((item)=>( <div className={styles.loadingSingleContainer}></div>))}
             </div>
        </div>
      )}
      

      {/* {hoverId && <div   onMouseLeave={() => setHoverId()} className={styles.topListSingleContainerHovered} style={{left:`${coordinate.x}px`, top:`${coordinate.y}px` }}>f</div>} */}
    </div>
  );
}

export default TopList;
