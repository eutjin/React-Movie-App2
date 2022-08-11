import React , {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Movie from "../components/Movie";
import { useGlobalContext } from '../context'
import styles from './list.module.css'


import {Card, Text, Group, Button, Modal, Input, Textarea, Title, createStyles, Center} from "@mantine/core"
import axios from 'axios';
import CreateCustomList from "../components/CreateCustomList"

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { AiOutlineLeft, AiOutlineRight, AiOutlineSearch, AiFillRightCircle} from "react-icons/ai";
import baseUrl from "../BaseUrl";

const List=()=>{
    

    const {favourites, user, listTitles, list, getAllList, getCustomList}=useGlobalContext();
    const [deleteModal, setDeleteModal]=useState(false)
    const [titleId, setTitleId]= useState('')
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

    const handleDelCustomList=async()=>{
      
      const response=  await axios.delete(baseUrl+"/api/list/deleteList/"+titleId)
      console.log(response.data)
      
      await getAllList()
      await getCustomList()
      await setDeleteModal(false)
      await setTitleId('')
      return response.data

      console.log('mickey')
    }

    const handleDeleteBtn=(id)=>{
      setTitleId(id)
      setDeleteModal(true)
    }

    useEffect(()=>{
      
      getAllList()
      getCustomList()
    }, [])

    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
        partialVisibilityGutter: 20

      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        // partialVisibilityGutter: 20
      },
      mobile: {
        breakpoint: { max: 420, min: 1 },
        items: 1,
        // partialVisibilityGutter: 20,
      }
    };


    const CustomRightArrow = ({ onClick }) => {
      return <AiFillRightCircle className={styles.rightButton} onClick={() => onClick()} />;
    };
    return (
      <section className={styles.contents}>
        <Card my="md" p="xs" className={classes.card}>
          <Group>
            <div className={styles.listTitleGroup}>
            <Title order={2} weight={100}color="#FFAE42">Watchlist</Title>
              
              <Text size="xs" color="white">
                {favourites.length} movies in watchlist
              </Text>
            </div>
            {/* <Button onClick={()=>setCreateList(true)}>Create custom list</Button> */}
            <CreateCustomList/>
          </Group>

          
<div className={styles.carouselContainer}>
          <Carousel responsive={responsive} customRightArrow={<CustomRightArrow />} showDots={false}>
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
          </Carousel></div>

          {/* <div className={styles.grid}>
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
          </div> */}
        </Card>

        {listTitles.map((title)=><>
        <Card my="md" p="xs" className={classes.card} >
          <Group>
          <div className={classes.content}>
          <Title order={2}>{title.listTitle}</Title>
          <Text size="xs" color="white">{(list.filter(list=>list.list._id==title._id)).length} movies in "{title.listTitle} list</Text>
          </div>
          <Button onClick={()=>handleDeleteBtn(title._id)} className={styles.deleteButton}>Delete List</Button>
          {/* <Button onClick={()=>handleDelCustomList(title._id)}>delete</Button> */}
          </Group>
          <div className={styles.grid}>
            {list.filter(list=>list.list._id==title._id).map((list)=>
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
            )}
          </div>
        
          <Modal size="sm" opened={deleteModal} onClose={()=>setDeleteModal(false)} title="Are you sure to delete this list? This action cannot be undone.">
         <Center>
          <Group>
          <Button onClick={()=>handleDelCustomList()}>Yes</Button>
          <Button onClick={()=>setDeleteModal(false)}>No</Button>
          </Group>
          </Center>
    </Modal>
        </Card>
          
    </>
        )}
       

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

        <div>
          <Link to="/">BACK HOME</Link>
        </div>
      </section>
    );

}

export default List