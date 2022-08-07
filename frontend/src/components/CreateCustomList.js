import React , {useState} from 'react'
import {Link} from 'react-router-dom'
import Movie from "./Movie";
import { useGlobalContext } from '../context'
// import styles from './list.module.css'

import {Card, Text, Group, Button, Modal, Input, Textarea, Title} from "@mantine/core"
import axios from 'axios';


const CreateCustomList=()=>{
    

    const {favourites, user, listTitles, list, getAllList}=useGlobalContext();
    const [createList, setCreateList]= useState(false)
    const [listTitle, setListTitle] =useState('')
    const [listDesc, setListDesc] = useState('')

    const onSubmit=(e)=>{
      e.preventDefault()
      console.log('submit')
      createCustomListName()
  }

  const createCustomListName=()=>{
    const variables={
      listTitle: listTitle,
      listDesc: listDesc,
      user: user._id,
    }

    axios.post('http://localhost:5000/api/list/createList', variables).then(response=>{
          if(response.data.success){
              // setComment('')
              console.log(response.data.result)
              // updateComment(response.data.result)
              setListDesc('')
              setListTitle('')
              setCreateList(false)
              getAllList()
          }else{
              alert('Failed to comment')
              console.log(response)
          }
      })
  }

    return (
     <>
            <Button radius="xl" variant="outline" color="#FFAE42" onClick={()=>setCreateList(true)}>Create</Button>
         

        <Modal
          opened={createList}
          onClose={() => setCreateList(false)}
          title="Create custom list">
          <form onSubmit={onSubmit}>
          <Input value={listTitle} placeholder="List Title" onChange={(e)=>setListTitle(e.target.value)} />
          <Textarea value={listDesc} placeholder="List Description" onChange={(e)=>setListDesc(e.target.value)} />

          <Button type='submit' color="yellow" radius="md">Create List</Button>

          </form>
          
        </Modal>

        </>
    );

}

export default CreateCustomList