import React, { useEffect, useState, useRef} from "react";
import {Link, useLocation} from "react-router-dom";
import moment from 'moment';

import {
  Card, Image, Menu, 
  createStyles,
  Text,
  Avatar,
  Group,
  TypographyStylesProvider,
  Paper,
  Button,
  Textarea,
  Badge,
  ActionIcon,
  Modal,
  TextInput,
  Select, Popover,
} from "@mantine/core";
import { useGlobalContext } from "../context";
import axios from "axios";
import {
  AiFillEdit,
  AiFillDelete,
  AiFillStar,
  AiOutlineUp,
  AiOutlineDown,
} from "react-icons/ai";

function SingleComment({
  comment,
  postId,
  updateComment,
  updateAfterDelete,
  getAllComments,
  commentList, title
}) {
  const { user } = useGlobalContext();

  const [editContent, setEditContent] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editRating, setEditRating] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [upAction, setUpAction] = useState(false);
  const [downAction, setDownAction] = useState(false);
  const [upvotes, setUpvotes] = useState(0)
  const [downvotes, setDownvotes] = useState(0)
  const [userCard, setUserCard]= useState(false)

  const useStyles = createStyles((theme) => ({
    container: {
      padding: "5px",
      margin: "10px 0",
      backgroundColor: "black",
      border: "2px solid white",
      color: "white",

      '&:hover':{
        border: "2px solid orange",
      },

      [`@media (max-width: 420px)`]: {
        margin: "10px 0",
        
      },
    },
    // menuBorder:{
    //   border: "solid white",
    // },
voteSection:{
display: "flex",
},
    user:{
      color:"white",
      display: "flex",
      flexDirection: "column",
      '&:hover':{
        color: "orange",
      },
    },
content:{
  whiteSpace: "pre-wrap",
  // margin: "0 5px",

  [`@media (max-width: 420px)`]: {
    fontSize: '1rem',
   
  },
},
voteValue:{
  margin: "0 10px",
   [`@media (max-width: 420px)`]: {
    fontSize: '12px',
   
  },
},
voteButton:{
  [`@media (max-width: 420px)`]: {
    fontSize: '12px',
    // width: "0.5rem",
    height: "20px",
    minHeight: "20px",
    width: "20px",
    minWidth: "20px",
    
   
  },
},
    
    left:{
      // backgroundColor: "gray",
    },
    commentButton:{
      fontSize:"10rem",
    },
    commentText:{
      fontSize: "10rem",

      // [`@media (max-width: 420px)`]: {
      //   fontSize: '50rem',
        
      // },
    },
    containerLeft:{
      width: "8%",
      // [`@media (max-width: 420px)`]: {
      //   width: "12%",
        
      // },
    },
    containerRight:{
      width: "85%",
      // [`@media (max-width: 420px)`]: {
      //   width: "80%",
        
      // },
    },
    commentBody:{
      // [`@media (max-width: 420px)`]: {
      //   fontSize: "2rem",
      //   lineHeight: "2.5rem",
        
      // },
    },
  }));
  const { classes } = useStyles();

  //   const handleChange=(e)=>{
  //   setEditContent(e.currentTarget.value)
  // }

  // //delete comment OLD DELETE STYLE
  // const deleteComment = async (comment) => {
  //   const token = user.token;
  //   const commentId = comment._id;
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     data: {
  //       postId: postId,
  //       //instead of this, must use data object as shown above due to delete request
  //     },
  //   };
  //   const response = await axios.delete(
  //     "http://localhost:5000/api/comment/deleteComment/" + commentId,
  //     config
  //   );
  //   // updateAfterDelete(response.data.comments)
  //   getAllComments();
  //   return response.data;
  // };

//   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();

//         document.querySelector(this.getAttribute('href')).scrollIntoView({
//             behavior: 'smooth'
//         });
//     });
// });
  const location = useLocation()
  console.log("location", location)
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

  const deleteComment= async (comment) =>{
    const token = user.token;
    const commentId= comment._id;
    const config={
      headers:{
        Authorization: `Bearer ${token}`,
      },
    };

    const data={
      active: false,
      userId: user._id,
    commentId: comment._id,
    postId: postId,
    movieTitle: comment.movieTitle,
    }

    const response= await axios.put("http://localhost:5000/api/comment/deleteComment/" + commentId, data, config);

    console.log(response.data)
    getAllComments();
    return response.data;
  }

  const handleEdit = () => {
    setIsEditing(!isEditing);
    setEditContent(comment.content);
    setEditTitle(comment.title);
    setEditRating(comment.rating);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    editComment(comment);
  };

  //update comment
  const editComment = async (comment) => {
    const token = user.token;
    const commentId = comment._id;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = {
      content: editContent,
    };

    const response = await axios.put(
      "http://localhost:5000/api/comment/editComment/" + commentId,
      data,
      config
    );
    console.log(response.data);
    getAllComments();
    setIsEditing(false);
    return response.data;
  };

//like dislke functions

useEffect(()=>{
  const variable={
    
    commentId: comment._id

  }
  //get all upvotes
  axios.post("http://localhost:5000/api/vote/getUpvotes/", variable).then(response=>{
    if(response.data.success){
      console.log("upvotes",response.data.result)
      setUpvotes(response.data.result.length)
      response.data.result.map(upvote=>{
        if(upvote.userId._id==user._id){
          setUpAction(true)
          console.log("upaction")
        }
      })
    }else{
      alert("get failed")
    }
  })

  //get all DOWNVOTES
  axios.post("http://localhost:5000/api/vote/getDownvotes/", variable).then(response=>{
    if(response.data.success){
      console.log(response.data)
      setDownvotes(response.data.result.length)
      response.data.result.map(downvote=>{
        if(downvote.userId._id==user._id){
          setDownAction(true)
        }
      })
    }else{
      alert("get failed")
    }
  })

}, [])


//upvote 
const onUp= async(comment)=>{

  const variable={
    userId: user._id,
    commentId: comment._id,
    postId: postId,
    movieTitle: comment.movieTitle,
  }

  console.log(variable)
  //if not upvoted yet
  if (!upAction){

    const response= await axios.post("http://localhost:5000/api/vote/upvote/", variable)

      if(response.data.success){
        console.log(response.data)
        setUpAction(true)
        setUpvotes(upvotes+1)
        if(downAction==true){
          setDownAction(false)
          setDownvotes(downvotes-1)
        }
        //another thing
      }else{
        console.log("vote failed")
        //
      }
    }

    //if akready upvoted but clicked once more
  else{
    const response= await axios.post("http://localhost:5000/api/vote/undoUpvote/", variable)
    if(response.data.success){
      setUpAction(false)
      setUpvotes(upvotes-1)
    }
  }

}

//DOWNVOTE
const onDown= async(comment)=>{

  const variable={
    userId: user._id,
    commentId: comment._id,
    postId: postId,
    movieTitle: comment.movieTitle,
    
  }

  console.log('varable', variable)
  //if not downvoted yet
  if (!downAction){

    const response= await axios.post("http://localhost:5000/api/vote/downvote/", variable)

      if(response.data.success){
        console.log(response.data)
        setDownAction(true)
        setDownvotes(downvotes+1)

        //another thing(if upvote , minus it)
        if(upAction==true){
          setUpAction(false)
          setUpvotes(upvotes-1)
        }
      }else{
        console.log("vote failed")
        //
      }
    }

    //if akready downvoted but clicked once more
  else{
    const response= await axios.post("http://localhost:5000/api/vote/undoDownvote/", variable)
    if(response.data.success){
      setDownAction(false)
      setDownvotes(downvotes-1)
    }
  }

}

const handleHover = () => {
  console.log("mouse over");
}

//profile card experiment
const profileCard = (
  <>
    <div>
      {comment.writer.profile.avatar ? (
        <Avatar size={120} radius={100} my="auto" color="indigo">
          {" "}
          <Image height={120} src={comment.writer.profile.avatar} />
        </Avatar>
      ) : (
        <Avatar radius="xl" color="indigo" />
      )}
      <Text align="center" size="lg" weight={500}>
        {comment.writer.name}
      </Text>
    </div>

<div className={classes.menuBorder}></div>

    <Group mt="md" position="center" spacing={30}>
      <div>
        <Text align="center" size="lg" weight={500}>
          {comment.writer.profile.followers.length}
        </Text>
        <Text align="center" size="sm" color="dimmed">
          Followers
        </Text>
      </div>
      <div>
        <Text align="center" size="lg" weight={500}>
        {comment.writer.profile.following.length}
        </Text>
        <Text align="center" size="sm" color="dimmed">
          Following
        </Text>
      </div>
    </Group>

    <Link to={`/profile/${comment.writer._id}`}>
      <Button fullWidth radius="md" mt="md" size="md">
        View Profile
      </Button>
    </Link>
  </>
);


  return (
    <>
      {console.log("singlecomment", comment)}

      <Card p="xs" radius="md" className={classes.container} id={comment._id}>
        <Group>
          {/* UPVOTE DOWNVOTE */}
          <Card.Section className={classes.containerLeft}>
            <div className={classes.voteSection}>
              <ActionIcon
                color="yellow"
                variant={upAction ? "filled" : "outline"}
                onClick={() => onUp(comment)} className={classes.voteButton}
              >
                <AiOutlineUp/>
              </ActionIcon>
              <Text className={classes.voteValue}>{upvotes}</Text>
              </div>

              <div className={classes.voteSection}>
              <ActionIcon
                color="yellow"
                variant={downAction ? "filled" : "outline"}
                onClick={() => onDown(comment)} className={classes.voteButton}
              >
                <AiOutlineDown/>
              </ActionIcon>
              <Text className={classes.voteValue}>{downvotes}</Text>
            </div>
          </Card.Section>
          <div className={classes.containerRight}>
            <Group position="apart"  >
              <Group >
              <Menu withArrow
                position="bottom"
                placement="center"
                delay={300}
                trigger="hover"
                control={
                  // <Group>
                    <div >
                      {comment.writer.profile.avatar ? (
                        <Avatar size={40} radius={100} color="indigo">
                          {" "}
                          <Image
                            height={40}
                            src={comment.writer.profile.avatar}
                          />
                        </Avatar>
                      ) : (
                        <Avatar radius="xl" color="indigo" />
                      )}
                    </div>
                   
                  // </Group>
                }
              >
                {/* <div>
                  {comment.writer.profile.avatar ? (
                    <Avatar size={120} radius={100} mx="auto" color="indigo">
                      {" "}
                      <Image height={120} src={comment.writer.profile.avatar} />
                    </Avatar>
                  ) : (
                    <Avatar radius="xl" color="indigo" />
                  )}
                  <Text align="center" size="lg" weight={500}>
                    {comment.writer.name}
                  </Text>
                </div>

                <Group mt="md" position="center" spacing={30}>
                  <div>
                    <Text align="center" size="lg" weight={500}>
                      10
                    </Text>
                    <Text align="center" size="sm" color="dimmed">
                      Following
                    </Text>
                  </div>
                  <div>
                    <Text align="center" size="lg" weight={500}>
                      10
                    </Text>
                    <Text align="center" size="sm" color="dimmed">
                      Following
                    </Text>
                  </div>
                </Group>

                <Link to={`/profile/${comment.writer._id}`}>
                  <Button fullWidth radius="md" mt="md" size="md">
                    View Profile
                  </Button>
                </Link> */}
                {profileCard}
              </Menu>

              <div className={classes.user}>
                      <Link to={`/profile/${comment.writer._id}`}>
                        {comment.writer.name}
                      </Link>

                      <Menu size="xs" withArrow
                position="right"
                placement="center"
                delay={300}
                trigger="hover"
                control={
                      <Text size="xs" color="dimmed">
                        {moment(comment.createdAt).format("LL")}
                      </Text>}>
                      <Text size="xs" color="dimmed">
                        {moment(comment.createdAt).format('MMMM DD, YYYY [at] h:mm a')}
                      </Text>
                      </Menu>
                    </div>
</Group>
              {/* <Group>
                <div>
                {comment.writer.profile.avatar ? (
                  <Avatar size={60} radius={100} color="indigo">
                    {" "}
                    <Image height={60} src={comment.writer.profile.avatar} />
                  </Avatar>
                ) : (
                  <Avatar radius="xl" color="indigo" />
                )}
                </div>
                <div>
                  
                    <Link to={`/profile/${comment.writer._id}`}>
                      {comment.writer.name}
                    </Link>

                  <Text size="xs" color="dimmed">
                    {comment.createdAt}
                  </Text>
                </div>
              </Group> */}

              {console.log("1", user)}
              {console.log("2", comment)}

              {/* Edit/delete post */}
              <div>
                {user._id == comment.writer._id ? (
                  <Group className={classes.commentButton} spacing="xs">
                    <ActionIcon onClick={handleEdit} variant="transparent" >
                      <AiFillEdit size={16} color="white" />
                    </ActionIcon>

                    <ActionIcon
                      variant="transparent"
                      onClick={() => deleteComment(comment)}
                    >
                      <AiFillDelete size={16} color="white" />
                    </ActionIcon>
                  </Group>
                ) : null}
              </div>
            </Group>

            <Group mt={20}  >
              <Text weight={700} size="lg" className={classes.content}>
                {comment.title}
              </Text>
              <Badge
                ml={20}
                size="lg"
                radius="sm"
                color="gray"
                leftSection={
                  <ActionIcon
                    size="xs"
                    color="gray"
                    radius="xl"
                    variant="transparent"
                  >
                    <AiFillStar size={25} />
                  </ActionIcon>
                }
              >
                {comment.rating}/5
              </Badge>
            </Group>

            {isEditing ? (
              // <form onSubmit={onSubmit}>
              // <div>
              //     <Textarea value={editContent} placeholder="Write your review here" onChange={(e)=>setEditContent(e.target.value)} />
              //     <Button type='submit' color="yellow" radius="md">Update</Button>
              // </div>
              // </form>
              <Modal
                opened={isEditing}
                onClose={() => setIsEditing(false)}
                title="Leave a review"
              >
                <form onSubmit={onSubmit}>
                  <div>
                    <TextInput
                      value={editTitle}
                      placeholder="Title"
                      onChange={(event) =>
                        setEditTitle(event.currentTarget.value)
                      }
                      py={6}
                    ></TextInput>
                    <Select
                      placeholder="Rating"
                      value={editRating}
                      onChange={setEditRating}
                      data={[
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                        { value: "3", label: "3" },
                        { value: "4", label: "4" },
                        { value: "5", label: "5" },
                      ]}
                      py={6}
                    ></Select>
                    <Textarea
                      value={editContent}
                      placeholder="Write your review here"
                      onChange={(e) => setEditContent(e.currentTarget.value)}
                      minRows={8}
                      py={6}
                    />
                  </div>

                  <div>
                    <Button type="submit" color="yellow" radius="md" py={6}>
                      Submit
                    </Button>
                  </div>
                </form>
              </Modal>
            ) : (
              <Text  size="sm" className={classes.commentBody}>
                {comment.content}
              </Text>
            )}
          </div>
        </Group>
      </Card>
    </>
  );
}

export default SingleComment;
