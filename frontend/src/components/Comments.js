import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {Link, useLocation} from "react-router-dom";
import { useGlobalContext } from '../context'
import styles from './Comments.module.css'
import SingleComment from './SingleComment'
import { Tooltip, createStyles, Text, Avatar, Group, TypographyStylesProvider, Paper, Textarea, TextInput,Button, Select, Modal, Card} from '@mantine/core';
import baseUrl from "../BaseUrl";


function Comments({movieId, updateComment, commentList, updateAfterDelete, getAllComments, title}) {
    const {user}= useGlobalContext();
    const [comment, setComment]= useState("")
    const [commentTitle, setCommentTitle]= useState("")
    const [rating, setRating] =useState("")
    const [addComment, setAddComment]= useState(false)

    const useStyles = createStyles((theme) => ({
      container: {
        padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
        margin: '10px',
        backgroundColor: 'black',
        border: '2px solid white',
        color: 'white',
      },
      button:{
        backgroundColor: 'white',
        color: 'black',

        [`@media (max-width: 420px)`]: {
          width: "calc(100% - 20px)",
        },
      }
    
     
    }));
    const { classes } = useStyles();

    const location = useLocation()

useEffect(()=> {
  console.log('bad3')
  if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1))
      if (elem) {
          elem.scrollIntoView({behavior: "smooth"})
      }
  } else {
  window.scrollTo({top:0,left:0, behavior: "smooth"})
  }
}, [])

// useEffect(()=> {
//   console.log('bad3')
//   if (location.hash) {
//       let elem = document.getElementById(location.hash.slice(1))
//       if (elem) {
//           elem.scrollIntoView({behavior: "smooth"})
//       }
//   } else {
//   window.scrollTo({top:0,left:0, behavior: "smooth"})
//   }
// }, [])

    const handleChange=(e)=>{
        setComment(e.currentTarget.value)
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        
        const variables={
            content: comment,
            writer: user._id,//here
            postId: movieId,
            title: commentTitle,
            rating: rating,
            movieTitle: title,
            active: true,

        }
        console.log(variables)
        axios.post(baseUrl+'/api/comment/saveComment', variables).then(response=>{
            if(response.data.success){
                setComment('')
                setCommentTitle('')
                setRating('')
                console.log("after comment",response.data.result)
                // updateComment(response.data.result)
                getAllComments()
                setAddComment(false)
                
            }else{
                alert('Failed to comment')
            }
        })
    }

  return (
    <div className={styles.comment}>
      
  
      {user._id?
      <Button className={classes.button} onClick={() => setAddComment(true)} mx={10} my={20} color="gray">Review Movie</Button>
      : 
      <Tooltip label="Login to start writing reviews" withArrow arrowSize={5}>
      <Button className={classes.button} onClick={() => setAddComment(true)} mx={10} my={20} color="gray" disabled>Review Movie</Button>
      </Tooltip>
    }

      <Modal
        opened={addComment}
        onClose={() => setAddComment(false)}
        title="Leave a review"
      >
        <form onSubmit={onSubmit}>
          <div>
            <TextInput
              value={commentTitle}
              placeholder="Title"
              onChange={(event) => setCommentTitle(event.currentTarget.value)} py={6}
            ></TextInput>
            <Select
              placeholder="Rating"
              value={rating}
              onChange={setRating}
              data={[
                { value: "1", label: "1" },
                { value: "2", label: "2" },
                { value: "3", label: "3" },
                { value: "4", label: "4" },
                { value: "5", label: "5" },
              ]}
              py={6}></Select>
            <Textarea
              value={comment}
              placeholder="Write your review here"
              onChange={handleChange}
              minRows={8} py={6}
            />
          </div>

          <div>
            {/* <button type='submit' >
                Submit Comment    
                </button>   */}
            <Button type="submit" color="yellow" radius="md" py={6}>
              Submit
            </Button>
          </div>
        </form>
      </Modal>

      {console.log("zzz",commentList)}

      {commentList.length>0?(
        commentList.map((comment, index) => (
          <SingleComment
            comment={comment}
            postId={movieId}
            updateAfterDelete={updateAfterDelete}
            updateComment={updateComment}
            getAllComments={getAllComments}
            commentList={commentList}
            title={title}
          />
        ))): (<Card radius="md" mx={10} className={classes.container}>No reviews for this movie yet</Card>) }


    </div>
  );
}

export default Comments