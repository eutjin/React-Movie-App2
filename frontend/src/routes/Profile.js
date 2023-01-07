import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Movie from "../components/Movie";
import { useGlobalContext } from "../context";
import styles from "./list.module.css";
import moment from "moment";
import baseUrl from "../BaseUrl";


import {
  Menu,
  Image,
  Grid,
  Center,
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

const Profile = () => {
  const { favourites, user, listTitles, list, getAllList, getCustomList, getProfile} =
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
    link: {
      color: "black",

      "&:hover": {
        color: "white",
      },
    },
    followers: {
      // color: "black",

      "&:hover": {
        backgroundColor: "#3c3c3c",
        color: "white",
      },
    },
    menu2:{
      backgroundColor: "green",
      color: "green",
    },
    listCopy:{
      backgroundColor: "#FFAE42",
      border: "none",
      height: "1.9rem",
      padding: "0 30px",
      color: "white",
     
      borderRadius: "5px",

      display: "flex",
      alignItems: "center",
      "&:hover":{
        backgroundColor: "#ffb95c",
      }
    },
    followButton:{
      backgroundColor: "#FFAE42",
      border: "none",
      height: "2.2rem",
      padding: "0 30px",
      color: "white",
     fontSize:"1rem",
      borderRadius: "5px",

      display: "flex",
      alignItems: "center",
      justifyContent:"center",
      "&:hover":{
        backgroundColor: "#ffb95c",
      }
    },
  }));
  const { classes } = useStyles();

  useEffect(() => {
    getCurrentProfile();
  }, []);

  useEffect(() => {
    getCurrentProfile();
  }, [id]);

  //load profile of user
  const getCurrentProfile = () => {
    const variables = {
      id: id,
    };
    axios
      .post(baseUrl+"/api/profile/getProfile", variables)
      .then((response) => {
        if (response.data.success) {
          console.log("heehaw", response.data.result);
          // setProfile({
          //   ...response.data.result[0],
          //   followers: response.data.result[0].followers,
          // });
          let newProfile = response.data.result[0];
          setProfile({ ...newProfile });
        } else {
          alert("failed to get comments");
          console.log("failed");
        }
      });
  };

  //follow user
  const followUser = async () => {
    const variables = {
      userToFollow: id,
      user: user._id,
    };
    await axios
      .post(baseUrl+"/api/profile/followUser", variables)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
        } else {
          alert("failed to get comments");
          console.log("failed");
        }
      });
    await getCurrentProfile();
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
      .post(baseUrl+"/api/list/getAllList", variable)
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
      .post(baseUrl+"/api/list/getCustomList", variable, config)
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
  const copyList = (listId) => {
    const variable = {
      listId: listId,
      user: user._id,
    };

    axios
      .post(baseUrl+"/api/list/copyList", variable)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
        } else {
          console.log("failed");
        }
      });
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
  
  return (
    <>
      <Card my="md" p="lg" className={classes.card}>
        <Grid grow gutter={40} px="md">
          <Grid.Col span={2} px="md">
            <Center>
              <Avatar
                src={profile.avatar}
                size={150}
                radius={100}
                mb="lg"
              ></Avatar>
            </Center>
            {profile.user? 
            ( <Button color="yellow"onClick={handleFollowUser} fullWidth className={classes.followButton}>
              {profile.followers.some((item)=>(item._id==user._id))? "Unfollow": "Follow"}
            </Button>): null
          }
           
            
          </Grid.Col>
          <Grid.Col span={9}>
            <div>
              <Text size="xl" weight={700}>
                {profile.name}
              </Text>
              <Text>{profile.about}</Text>
              <Text mt="md">Gender: {profile.gender}</Text>
              <Text>
                Joined: {profile.user ? moment(profile.user.createdAt).format('MMMM DD, YYYY') : "NA"}
              </Text>

              <Group spacing="xl" pt="md">
                <Menu 
                  variant="unstyled"
                  trigger="hover"
                  control={
                    <div>
                      <Text size="sm" style={{cursor:'pointer'}}>Followers:</Text>
                      <Text weight={500} size="lg" style={{lineHeight: 1, cursor:'pointer'}}>
                        {" "}
                        {profile.followers ? profile.followers.length : 0}{" "}
                        person
                      </Text>
                    </div>
                  }
                >
                  {profile.followers
                    ? profile.followers.map((item) => (
                        <Link
                          className={classes.link}
                          to={`/profile/${item._id}`}
                        >
                          <Menu.Item 
                            className={classes.followers}
                            variant="unstyled"
                            p={5}
                          >
                            <Group>
                              <Avatar size={30} radius={100} color="indigo">
                                <Image height={30} src={item.profile.avatar} />
                              </Avatar>

                              <Text>{item.profile.name}</Text>
                            </Group>
                          </Menu.Item>
                        </Link>
                        // <h1>{item.name}</h1>
                      ))
                    : "null"}
                </Menu>
              

              
                <Menu
                  variant="unstyled"
                  trigger="hover"
                  control={
                    <div>
                      <Text size="sm" style={{cursor:'pointer'}}>Following:</Text>
                      <Text weight={500} size="lg" style={{lineHeight: 1, cursor:'pointer'}}>
                        {profile.following ? profile.following.length : 0}{" "}
                        person
                      </Text>
                    </div>
                  }
                >
                  {profile.following
                    ? profile.following.map((item) => (
                        <Link
                          className={classes.link}
                          to={`/profile/${item._id}`}
                        >
                          <Menu.Item
                            className={classes.followers}
                            variant="unstyled"
                            p={5}
                          >
                            <Group>
                              <Avatar size={30} radius={100} color="indigo">
                                <Image height={30} src={item.profile.avatar} />
                              </Avatar>

                              <Text>{item.profile.name}</Text>
                            </Group>
                          </Menu.Item>
                        </Link>
                        // <h1>{item.name}</h1>
                      ))
                    : "null"}
                </Menu>
              </Group>
            </div>
          </Grid.Col>
        </Grid>
        {/* {console.log(profile.followers[0].name)} */}
      </Card>

      {listTitles2.map((title,index) => (
        <Card my="md" p="xs" className={classes.card}>
          <Group position="apart">
            <div className={classes.content}>
              <Title order={2}>{title.listTitle}</Title>
              <Text size="xs" color="white">
                {list2.filter((list) => list.list._id == title._id).length}{" "}
                movies in "{title.listTitle} list
              </Text>
            </div>
            <Button mr="xs"color="yellow" onClick={() => copyList(title._id)} className={classes.listCopy}>Copy list</Button>
            {/* <Button onClick={()=>handleDelCustomList(title._id)}>delete</Button> */}
          </Group>
          {/* <div className={styles.grid}>
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
          </div> */}

        
                  <div className={styles.sliderContainer}>
                    <button
                      className={styles.sliderButtonLeft}
                      onClick={() => handleLeftButton2(index)}
                    >
                      <AiOutlineLeft size={18} />
                    </button>

                    <div id={index} className={styles.gridScroll}>
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

                    <button
                      className={styles.sliderButtonRight}
                      onClick={() => handleRightButton2(index)}
                    >
                      <AiOutlineRight size={18} />
                    </button>
                  </div>
                
                  


          {/* <Button onClick={() => copyList(title._id)}>Copy list</Button> */}
        </Card>
      ))}
    </>
  );
};

export default Profile;
