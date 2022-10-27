import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import styles from "./Favourites.module.css"
import { AiOutlinePlus, AiOutlinePlusCircle, AiOutlineCheckCircle, AiOutlineCheck } from "react-icons/ai";
import {BsPlusLg,BsBookmarkPlus as Bs, BsFillBookmarkPlusFill, BiBookmarkPlus} from "react-icons/bs"

import { useGlobalContext } from '../context'
import { useState, useEffect } from "react";
import { createStyles, Divider, Text, ThemeIcon, Avatar, Group, TypographyStylesProvider, Paper, Button, Textarea, Menu, MenuItem, ActionIcon, } from '@mantine/core';
import CreateCustomList from "./CreateCustomList";
import baseUrl from "../BaseUrl";

import axios from 'axios'

function AddList({movieId, variable, }) {
    const {user, listTitles, setList, list, getCustomList }= useGlobalContext();
    
    // useEffect(()=>{
    //         getAllList()
    // }, [])

    // const getAllList=()=>{
    //     const variable={
    //         user: user._id,
    //     }
    //     axios.post('http://localhost:5000/api/list/getAllList', variable).then(response=>{
    //         console.log(response.data)
    //     })
    // }

    const useStyles= createStyles((theme)=>({
      list:{
        
        // backgroundColor: theme.colors.gray[3],
        // marginTop: "5px",
     display: "flex",
     
     width: "100%",
     justifyContent: "space-between",
     alignItems: "center",
    },
    listTitle:{
      width: "50%",
    },
    listAdded:{
      
      margin: "0 60px",
      fontSize: "1.2rem",
      padding: 0,
      color: theme.colors.orange[3],
          },
    button:{
      color: "white",
      // boxShadow: 3,
    
      backgroundColor:"orange",

      '&:hover':{
        color:"green",
      },
    },
    menuBody:{
      backgroundColor: "#2c2c2c",
      border: "none",
      width: "180px",
    }
  }))

    const { classes } = useStyles();
    const handleAddtoList=async(listid)=>{
       
      console.log(list.filter(list=>list.list._id==listid))
      console.log(list.filter(list=>list.list._id==listid).some(list=>list.id==movieId))
      // console.log('listid', listid)
      // console.log*''
     if(list.filter(list=>list.list._id==listid).some(list=>list.id==movieId)){
      await removeFromList(listid)
      await getCustomList()
      console.log('remove')
     }else{
      await addtoList(listid)
      await getCustomList()
      console.log('add')

     }
      
    }

    //get

    //add moviie to custom list
    const addtoList=async(listid)=>{
      variable.list=listid //add more stuff to exisitng variable object
      variable.user=user._id
      console.log(variable)

      const token= user.token
      console.log(token)
      const config={
        headers:{
            Authorization: `Bearer ${token}`
        }   
    }
    const response= await axios.post(baseUrl+"/api/list/addToList", variable, config)
    console.log(response.data)
    // setList(response.data.result)
    return response.data
    }

    //remove movie from custom list
    const removeFromList=async(listid)=>{

      const deleteId= list.filter(list=>list.list._id==listid).find(list=>list.id==movieId)._id
      console.log('deleteId', deleteId)

  const response= await axios.delete(baseUrl+"/api/list/removeFromList/" + deleteId)
  console.log(response.data)
  // setList(response.data.result)
  
  return response.data
    }

  // //@ get all custom list movies
  // const getCustomList=()=>{

  //     const variable={
  //       user: user._id,
  //     }

  //     const token= user.token
  //     console.log(token)
  //     const config={
  //       headers:{
  //           Authorization: `Bearer ${token}`
  //       }   
  //   }
  //   axios.post('http://localhost:5000/api/list/getCustomList', variable, config).then(response=>{
  //     if(response.data.success){
  //       setList(response.data.result)
  //       console.log(response.data)
  //     }else{
  //       alert('failed to get comments')
  //       console.log('failed')
  //     }
  //   })
  //   }
    

  return (
    <div>
      <Menu trigger="hover" position="right" classNames={{body: classes.menuBody,}}
        control={
          <ActionIcon variant="filled" className={classes.button} radius="xl" size="sm"  >
          
            <BsPlusLg size={15} />
           </ActionIcon>
        }
      >
        <Menu.Label>Custom lists</Menu.Label>
        <Divider/>

        {/* <Menu.Item><CreateCustomList/></Menu.Item> */}
        {listTitles.map((list1) => (
          <Menu.Item
           
            onClick={() => handleAddtoList(list1._id)}

          >
            <div className={classes.list}>
            <div className={classes.listTitle}>
            {list1.listTitle}
            </div>
            <div className={classes.listAdded}>
              {list
                .filter((list) => list.list._id == list1._id)
                .some((list) => list.id == movieId)
                ? <AiOutlineCheck/>
                : null}
            </div></div>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
}

export default AddList