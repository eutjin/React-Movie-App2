import React, { useEffect, useState, useRef, createRef } from "react";
import { Link } from "react-router-dom";
import Movie from "../components/Movie";
import { useGlobalContext } from "../context";
import styles from "./list.module.css";

import {
  Card,
  Text,
  Group,
  Button,
  Modal,
  Input,
  Textarea,
  Title,
  createStyles,
  Center,
} from "@mantine/core";
import axios from "axios";
import CreateCustomList from "../components/CreateCustomList";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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
import { BsBookmarkPlus, BsChatLeftText, BsBox } from "react-icons/bs";

import baseUrl from "../BaseUrl";
import { set } from "mongoose";

const List = () => {
  const { favourites, user, listTitles, list, getAllList, getCustomList } =
    useGlobalContext();
  const [deleteModal, setDeleteModal] = useState(false);
  const [titleId, setTitleId] = useState("");
  const [customListToEdit, setCustomListToEdit] = useState({});
  const [editListModal, setEditListModal] = useState(false);
  const [descOpenArr, setDescOpenArr] = useState([]);
  const ref = useRef(null);
  // const ref2 = useRef(null);
  // const elementsRef= useRef(listTitles.map(()=>createRef()))
  //   const [createList, setCreateList]= useState(false)
  //   const [listTitle, setListTitle] =useState('')
  //   const [listDesc, setListDesc] = useState('')

  //   const onSubmit=(e)=>{
  //     e.preventDefault()
  //     console.log('submit')
  //     createCustomListName()
  // }

  // const createCustomListName=()=>{
  //   const variables={
  //     listTitle: listTitle,
  //     listDesc: listDesc,
  //     user: user._id,
  //   }

  //   axios.post('http://localhost:5000/api/list/createList', variables).then(response=>{
  //         if(response.data.success){
  //             // setComment('')
  //             console.log(response.data.result)
  //             // updateComment(response.data.result)
  //             setListDesc('')
  //             setListTitle('')
  //             setCreateList(false)
  //             getAllList()
  //         }else{
  //             alert('Failed to comment')
  //             console.log(response)
  //         }
  //     })
  // }

  const useStyles = createStyles((theme) => ({
    card: {
      backgroundColor: "#3c3c3c",
    },
    content: {
      color: "#FFAE42",
      margin: 10,
    },
  }));
  const { classes } = useStyles();

  useEffect(() => {
    const arr = listTitles.map((item, index) => ({
      index: index,
      listId: item._id,
      descOpen: false,
    }));
    console.log("arr", arr);
    setDescOpenArr(arr);
  }, [listTitles]);

  const handleDelCustomList = async () => {
    const response = await axios.delete(
      baseUrl + "/api/list/deleteList/" + titleId
    );
    console.log(response.data);

    await getAllList();
    await getCustomList();
    await setDeleteModal(false);
    await setTitleId("");
    return response.data;

    console.log("mickey");
  };

  const handleDeleteBtn = (id) => {
    setTitleId(id);
    setDeleteModal(true);
  };

  const handleEditBtn = (customList) => {
    console.log("toEdt", customList);
    setCustomListToEdit(customList);
    setEditListModal(true);
  };

  const onChangeList = (e) => {
    console.log("aiya", e.target);
    setCustomListToEdit({
      ...customListToEdit,
      [e.target.name]: e.target.value,
    });
  };

  const editListName = (e) => {
    e.preventDefault();

    const variables = {
      listTitle: customListToEdit.listTitle,
      listDesc: customListToEdit.listDesc,
      listId: customListToEdit._id,
    };

    axios.post(baseUrl + "/api/list/editList", variables).then((response) => {
      if (response.data.success) {
        // setComment('')
        console.log(response.data.result);
        setEditListModal(false);
        getAllList();
        setCustomListToEdit({});
      } else {
        alert("Failed to ");
        console.log(response);
      }
    });
  };

  useEffect(() => {
    getAllList();
    getCustomList();
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      partialVisibilityGutter: 20,
    },
    tablet: {
      breakpoint: { max: 768, min: 481 },
      items: 3.5,
      partialVisibilityGutter: 20,
    },
    mobile: {
      breakpoint: { max: 480, min: 320 },
      items: 2,
      // partialVisibilityGutter: 20,
    },
  };

  // const CustomRightArrow = ({ onClick }) => {
  //   return (
  //     <AiFillRightCircle
  //       className={styles.rightButton}
  //       onClick={() => onClick()}
  //     />
  //   );
  // };

  const handleLeftButton = () => {
    var width = Math.max(window.innerWidth);
    console.log("width", width);
    let size;
    if (width < 488) {
      size = 190;
    } else {
      size = 235;
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

    let endScroll = favourites.length * size - e.getBoundingClientRect().width;
    console.log("endScroll", endScroll);

    // e.scrollLeft-= 905.6;
    // console.log("scrollx", e.scrollLeft)

    if (endScroll - e.scrollLeft < 10) {
      e.scrollLeft -= scroll2;
    } else {
      e.scrollLeft -= scroll1;
    }
  };

  const handleLeftButton2 = (index) => {
    var width = Math.max(window.innerWidth);
    console.log("width", width);
    let size;
    if (width < 488) {
      size = 190;
    } else {
      size = 235;
    }

    const e = document.getElementById(index);
    console.log("scrollGET", e, e.scrollLeft);
    let val1 = Math.floor(e.getBoundingClientRect().width / size);
    console.log("val1", val1);

    let scroll1 = size * val1;
    console.log("scroll1", scroll1);

    let val2 = (e.getBoundingClientRect().width - size * val1) / 2;
    console.log("val2", val2);

    let scroll2 = scroll1 - val2;
    console.log("scroll2", scroll2);

    let endScroll = favourites.length * size - e.getBoundingClientRect().width;
    console.log("endScroll", endScroll);

    if (endScroll - e.scrollLeft < 10) {
      e.scrollLeft -= scroll2;
    } else {
      e.scrollLeft -= scroll1;
    }
  };

  const handleRightButton = () => {
    var width = Math.max(window.innerWidth);
    console.log("width", width);
    let size;
    if (width < 488) {
      size = 190;
    } else {
      size = 235;
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

    let endScroll = favourites.length * size - e.getBoundingClientRect().width;
    console.log("endScroll", endScroll);

    // e.scrollLeft-= 905.6;
    // console.log("scrollx", e.scrollLeft)

    if (e.scrollLeft == 0) {
      e.scrollLeft += scroll2;
    } else {
      e.scrollLeft += scroll1;
    }
  };

  const handleRightButton2 = (index) => {
    var width = Math.max(window.innerWidth);
    console.log("width", width, index);
    let size;
    if (width < 488) {
      size = 190;
    } else {
      size = 235;
    }

    const e = document.getElementById(index);

    console.log("scrollGET", e);
    let val1 = Math.floor(e.getBoundingClientRect().width / size);
    console.log("val1", val1);

    let scroll1 = size * val1;
    console.log("scroll1", scroll1);

    let val2 = (e.getBoundingClientRect().width - size * val1) / 2;
    console.log("val2", val2);

    let scroll2 = scroll1 - val2;
    console.log("scroll2", scroll2);

    let endScroll = favourites.length * size - e.getBoundingClientRect().width;
    console.log("endScroll", endScroll);

    if (e.scrollLeft == 0) {
      e.scrollLeft += scroll2;
    } else {
      e.scrollLeft += scroll1;
    }
  };

  // const handleLeftButton2=()=>{
  //   const e=ref.current;
  //   console.log("scroll", e)
  //   e.scrollLeft-= 940;
  //   console.log("scroll2", e.scrollLeft)
  // }

  // const handleRightButton2=()=>{
  //   const e=ref.current;
  //   console.log("scroll", e.getBoundingClientRect())
  //   e.scrollLeft+= 940;
  //   console.log("scroll2", e.scrollLeft)
  // }

  const handleDescToggle = (id) => {
    console.log("id", id);
    const stateArr = descOpenArr.map((item) =>
      item.listId == id ? { ...item, descOpen: !item.descOpen } : item
    );
    console.log("state", stateArr);
    setDescOpenArr(stateArr);
  };

  const displayDesc = (id) => {
    console.log("pian");
    const item = descOpenArr.filter((item) => item.listId == id);
    console.log("item", item[0]);
    if (item.length > 0 && item[0].descOpen) {
      return styles.descContainer;
    } else {
      return styles.descContainerNone;
    }
  };

  return (
    <section className={styles.contents}>
      {user._id ? (
        <>
          <Card my="md" p="xs" className={classes.card}>
            <Group>
              <div className={styles.listTitleGroup}>
                <Title order={2} weight={100} color="#FFAE42">
                  Watchlist
                </Title>

                <Text size="xs" color="white">
                  {favourites.length} movies in watchlist
                </Text>
              </div>
              {/* <Button onClick={()=>setCreateList(true)}>Create custom list</Button> */}
              {/* <CreateCustomList /> */}
            </Group>

            {/* <div className={styles.carouselContainer}>
              <Carousel
                responsive={responsive}
                customRightArrow={<CustomRightArrow />}
                showDots={false}
              >
                {favourites.map((movie) => (
                  <Movie
                    key={movie.id}
                    id={movie.id}
                    rating={movie.rating}
                    imgSrc={movie.imgSrc}
                    title={movie.title}
                    summary={movie.summary}
                    genres={movie.genres}
                    movie={movie}
                    runtime={movie.runtime}
                  />
                ))}
              </Carousel>
            </div> */}

            {favourites.length > 0 ? (
              <div className={styles.sliderContainer}>
                <button
                  className={styles.sliderButtonLeft}
                  onClick={() => handleLeftButton()}
                >
                  <AiOutlineLeft size={18} />
                </button>

                <div ref={ref} className={styles.gridScroll}>
                  {favourites.map((movie) => (
                    <Movie
                      key={movie.id}
                      id={movie.id}
                      rating={movie.rating}
                      imgSrc={movie.imgSrc}
                      title={movie.title}
                      summary={movie.summary}
                      genres={movie.genres}
                      movie={movie}
                      runtime={movie.runtime}
                    />
                  ))}
                </div>
                <button
                  className={styles.sliderButtonRight}
                  onClick={() => handleRightButton()}
                >
                  <AiOutlineRight size={18} />
                </button>
              </div>
            ) : (
              <div className={styles.emptyListContainer}>
                <Text size="xl" weight={600}>
                  No movies in watchlist
                </Text>
                <Text size="sm" weight={200}>
                  view movies and add them to watchlist
                </Text>
                <Link to={"/"}>
                  <button className={styles.toHomeButton}>Browse movies</button>
                </Link>
              </div>
            )}
          </Card>

          <Card my="md" p="xs" className={classes.card}>
            <div className={styles.addListContainer}>
              <div className={styles.addListText}>
                <Text size="xl" weight={600}>
                  Custom list
                </Text>
                <Text size="sm" weight={200}>
                  create unlimited customized watchlists
                </Text>
              </div>
              <CreateCustomList />
            </div>
          </Card>

          {/* start */}
          {listTitles.map((title, index) => (
            <>
              <Card my="md" p="xs" className={classes.card}>
                <div className={styles.contentTop}>
                  <div className={styles.contentLeft}>
                    <div className={classes.content}>
                      <Title order={2}>{title.listTitle}</Title>
                      <Text size="xs" color="white">
                        {
                          list.filter((list) => list.list._id == title._id)
                            .length
                        }{" "}
                        movies in "{title.listTitle} list
                      </Text>
                    </div>
                    <button
                      className={styles.descToggle}
                      onClick={() => handleDescToggle(title._id)}
                    >
                      <AiFillCaretDown size={18} />
                    </button>
                  </div>

                  <div className={styles.contentOptions}>
                    <button
                      onClick={() => handleEditBtn(title)}
                      className={styles.optionBtn}
                    >
                      <AiFillEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteBtn(title._id)}
                      className={styles.optionBtn}
                    >
                      <AiFillDelete size={18} />
                    </button>
                  </div>

                  {/* <Button onClick={()=>handleDelCustomList(title._id)}>delete</Button> */}
                </div>
                {/* {descOpenArr.length>0 ?
(descOpenArr[index].descOpen && <div className={styles.descContainer}><Text size="sm">{title.listDesc}</Text></div>):null
}  */}

                <div className={displayDesc(title._id)}>
                  <Text size="sm">{title.listDesc}</Text>
                </div>

                {list
                        .filter((list) => list.list._id == title._id).length > 0 ? (
                  <div className={styles.sliderContainer}>
                    <button
                      className={styles.sliderButtonLeft}
                      onClick={() => handleLeftButton2(index)}
                    >
                      <AiOutlineLeft size={18} />
                    </button>

                    <div id={index} className={styles.gridScroll}>
                      {list
                        .filter((list) => list.list._id == title._id)
                        .map((list) => (
                          <Movie
                            key={list.id}
                            id={list.id}
                            rating={list.rating}
                            imgSrc={list.imgSrc}
                            title={list.title}
                            summary={list.summary}
                            genres={list.genres}
                            movie={list}
                            runtime={list.runtime}
                          />
                        ))}
                    </div>

                    <button
                      className={styles.sliderButtonRight}
                      onClick={() => handleRightButton2(index)}
                    >
                      <AiOutlineRight size={18} />
                    </button>
                  </div>
                ) : (
                  <div className={styles.emptyListContainer}>
                    <Text size="xl" weight={600}>
                      No movies in watchlist
                    </Text>
                    <Text size="sm" weight={200}>
                      view movies and add them to watchlist
                    </Text>
                    <Link to={"/"}>
                      <button className={styles.toHomeButton}>
                        Browse movies
                      </button>
                    </Link>
                  </div>
                )}

                <Modal
                  size="sm"
                  opened={deleteModal}
                  onClose={() => setDeleteModal(false)}
                  title="Are you sure to delete this list? This action cannot be undone."
                >
                  <Center>
                    <Group>
                      <Button onClick={() => handleDelCustomList()}>Yes</Button>
                      <Button onClick={() => setDeleteModal(false)}>No</Button>
                    </Group>
                  </Center>
                </Modal>
              </Card>
            </>
          ))}

          <Modal
            opened={editListModal}
            onClose={() => setEditListModal(false)}
            title="Create custom list"
          >
            <form onSubmit={editListName}>
              <Input
                my="md"
                value={customListToEdit.listTitle}
                name="listTitle"
                placeholder="List Title"
                onChange={(e) => onChangeList(e)}
              />
              <Textarea
                my="md"
                value={customListToEdit.listDesc}
                name="listDesc"
                placeholder="List Description"
                onChange={(e) => onChangeList(e)}
              />

              <Button
                type="submit"
                color="yellow"
                radius="xs"
                className={classes.submit}
              >
                Edit List
              </Button>
            </form>
          </Modal>

          {/* <Modal
          opened={createList}
          onClose={() => setCreateList(false)}
          title="Create custom list">
          <form onSubmit={onSubmit}>
          <Input value={listTitle} placeholder="List Title" onChange={(e)=>setListTitle(e.target.value)} />
          <Textarea value={listDesc} placeholder="List Description" onChange={(e)=>setListDesc(e.target.value)} />

          <Button type='submit' color="yellow" radius="md">Create List</Button>

          </form>
          
        </Modal> */}

          {/* <div>
        <Link to="/">BACK HOME</Link>
      </div> */}
        </>
      ) : (
        <div className={styles.noUserPrompt}>
          <div className={styles.noUserLeft}>
            <div className={styles.noUserLeftTitle}>
              Benefits of your free MoviReVue account
            </div>
            <div className={styles.noUserLeftContent1}>
              <BsBookmarkPlus size={22} /> Your Watchlist
            </div>
            <div className={styles.noUserLeftContent2}>
              Track every moves your want to watch and add them into your
              watchlist
            </div>

            <div className={styles.noUserLeftContent1}>
              <BsBox size={22} />
              Custom List
            </div>
            <div className={styles.noUserLeftContent2}>
              Create and share customized watchlists
            </div>

            <div className={styles.noUserLeftContent1}>
              <BsChatLeftText size={22} />
              Movie Reviews
            </div>
            <div className={styles.noUserLeftContent2}>
              Write reviews for movies which you have watched
            </div>
          </div>
          <div className={styles.noUserRight}>
            <div className={styles.noUserRightTitle}>Get Started</div>
            <Link to="/login">
              <button className={styles.login}>Login</button>
            </Link>
            <Link to="/register">
              <button className={styles.register}>Register</button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default List;
