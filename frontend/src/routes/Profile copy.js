import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Movie from "../components/Movie";
import { useGlobalContext } from "../context";
import styles from "./list.module.css";

import {Menu, Image,
  Card,
  Text,
  Group,
  Button,
  Modal,
  Input,
  Textarea,
  Title,
  createStyles,
  Avatar,
} from "@mantine/core";
import axios from "axios";
import CreateCustomList from "../components/CreateCustomList";

const Profile = () => {
  const { favourites, user, listTitles, list, getAllList, getCustomList } =
    useGlobalContext();
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const [listTitles2, setListTitles2] = useState([]);
  const [list2, setList2] = useState([]);

  const useStyles = createStyles((theme) => ({
    card: {
      backgroundColor: "#3c3c3c",
      maxWidth: 1280,
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      color: "white",
    },
    content: {
      color: "#FFAE42",
      margin: 10,
    },
    link:{
      color: "black",

      '&:hover':{
        color: "white",
      },
    },
    followers:{
      color: "black",
      

      '&:hover':{
        backgroundColor: "#3c3c3c",
        color:"white",

      },
     
    }
  }));
  const { classes } = useStyles();

  useEffect(() => {
    
    getProfile();
  }, []);

  useEffect(() => {
    
    getProfile();
  }, [id]);

  //load profile of user
  const getProfile = () => {
    const variables = {
      id: id,
    };
    axios
      .post("http://localhost:5000/api/profile/getProfile", variables)
      .then((response) => {
        if (response.data.success) {
          console.log('heehaw',response.data.result);
          // setProfile({
          //   ...response.data.result[0],
          //   followers: response.data.result[0].followers,
          // });
          let newProfile=response.data.result[0]
          setProfile({...newProfile});
        } else {
          alert("failed to get comments");
          console.log("failed");
        }
      });
  };

  //follow user
  const followUser = async() => {
    const variables = {
      userToFollow: id,
      user: user._id,
    };
    await axios
      .post("http://localhost:5000/api/profile/followUser", variables)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
        } else {
          alert("failed to get comments");
          console.log("failed");
        }
      });
      await getProfile();
  };

  const handleFollowUser = async () => {
    await followUser();
    
  };

  //get all titles of the custom list created by user in "profile"
  const getAllList2 = () => {
    const variable = {
      user: id,
    };
    axios
      .post("http://localhost:5000/api/list/getAllList", variable)
      .then((response) => {
        console.log(response.data.lists);
        setListTitles2(response.data.lists);
      });
  };

  //@ get all the contents of custom list titles
  const getCustomList2 = () => {
    const variable = {
      user: id,
    };

    const token = user.token;
    console.log(token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post("http://localhost:5000/api/list/getCustomList", variable, config)
      .then((response) => {
        if (response.data.success) {
          setList2(response.data.result);
          console.log(response.data);
        } else {
          alert("failed to get comments");
          console.log("failed");
        }
      });
  };

  useEffect(() => {
    getAllList2();
    getCustomList2();
  }, []);

  useEffect(() => {
    getAllList2();
    getCustomList2();
  }, [id]);

  //copy other user's custom list and its contents
  const copyList=(listId)=>{
    const variable = {
      listId: listId,
      user: user._id,
    };

  
    axios
      .post("http://localhost:5000/api/list/copyList", variable)
      .then((response) => {
        if (response.data.success) {
         
          console.log(response.data);
        } else {
          
          console.log("failed");
        }
      });

  }

  return (
    <>
      <Card my="md" p="lg" className={classes.card}>
        <Group>
          <Avatar src={profile.avatar} size={150} radius={100}></Avatar>
          <div>
            <Text size="xl" weight={700}>
              {profile.name}
            </Text>
            <Text>{profile.about}</Text>
            <Text mt="md">Gender: {profile.gender}</Text>
            <Text>Joined: {profile.user ? profile.user.createdAt : "NA"}</Text>
            
            <div>
            <Menu   variant="unstyled"
              trigger="hover"
              control={
                <Text>
                  Followers: {profile.followers ? profile.followers.length : 0}{" "}
                  person
                </Text>
              }
            >
              {profile.followers? (profile.followers.map((item) => (<Link className={classes.link} to={`/profile/${item._id}`}>
                    <Menu.Item className={classes.followers} variant="unstyled" p={5}>
                      
                      <Group>
                      <Avatar size={30} radius={100} color="indigo">

                        <Image
                          height={30}
                          src={item.profile.avatar}
                        />
                        
                      </Avatar>
                      
                      <Text>{item.profile.name}</Text>
                      </Group>
                    </Menu.Item></Link>
                    // <h1>{item.name}</h1>
                  )))
                : 'null'}
            </Menu></div>
              <div>
            <Menu   variant="unstyled"
              trigger="hover"
              control={
                <Text>
                  Following: {profile.following ? profile.following.length : 0}{" "}
                  person
                </Text>
              }
            >
              {profile.following? (profile.following.map((item) => (<Link className={classes.link} to={`/profile/${item._id}`}>
                    <Menu.Item className={classes.followers} variant="unstyled" p={5}>
                      
                      <Group>
                      <Avatar size={30} radius={100} color="indigo">

                        <Image
                          height={30}
                          src={item.profile.avatar}
                        />
                        
                      </Avatar>
                      
                      <Text>{item.profile.name}</Text>
                      </Group>
                    </Menu.Item></Link>
                    // <h1>{item.name}</h1>
                  )))
                : 'null'}
            </Menu></div>



          </div>
        </Group>
        {/* {console.log(profile.followers[0].name)} */}
        <Button onClick={handleFollowUser} fullWidth>Follow</Button>
      </Card>

      {listTitles2.map((title) => (
        <Card my="md" p="xs" className={classes.card}>
          <Group>
            <div className={classes.content}>
              <Title order={2}>{title.listTitle}</Title>
              <Text size="xs" color="white">
                {list2.filter((list) => list.list._id == title._id).length}{" "}
                movies in "{title.listTitle} list
              </Text>
            </div>
            {/* <Button onClick={()=>handleDelCustomList(title._id)}>delete</Button> */}
          </Group>
          <div className={styles.grid}>
            {list2
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
          <Button onClick={() => copyList(title._id)}>Copy list</Button>
        </Card>
      ))}
    </>
  );
};

export default Profile;
