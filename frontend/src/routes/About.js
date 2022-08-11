import React, {
  useImperativeHandle,
  useEffect,
  useRef,
  forwardRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  ActionIcon,
  Select,
  Table,
  ScrollArea,
  Badge,
  Image,
  Menu,
  TextInput,
  Card,
  Text,
  Group,
  Button,
  Modal,
  Input,
  Textarea,
  Title,
  createStyles,
  Divider,
} from "@mantine/core";
import axios from "axios";
import { useGlobalContext } from "../context";
import { HashLink } from "react-router-hash-link";
import {
  BsPlusLg,
  BsBookmarkPlus as Bs,
  BsFillBookmarkPlusFill,
  BiBookmarkPlus,
} from "react-icons/bs";

import moment from "moment";
import baseUrl from "../BaseUrl";


import Styles from "./About.module.css";

const About = () => {
  const { user, userProfile, getProfile } = useGlobalContext();
  const [activityComments, setActivityComments] = useState([]);
  const [allActions, setAllActions] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [initProfile, setInitProfile] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [avatar, setAvatar] = useState(false);

  const [userFormProfile, setUserFormProfile] = useState({
    name: "",
    about: "",
    gender: "",
    user: user._id,
  });
  const [gender, setGender] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    // console.log("value", value)
    // console.log("value2", event.target)
    setUserFormProfile({ ...userFormProfile, [event.target.name]: value });
  };

  // useEffect(()=>{
  //   getProfile();
  //   }, [])

  useEffect(() => {
    setUserFormProfile({ ...userFormProfile, gender: gender });
  }, [gender]);

  useEffect(async () => {
    console.log("userProfile", Object.keys(userProfile).length);
    console.log("user", user);
    console.log("userProfile", userProfile);
    if (user && Object.keys(userProfile).length === 0) {
      console.log("make a profile!!!!");
      setInitProfile(true);
    } else {
      setInitProfile(false);
    }
  }, [userProfile]);

  useEffect(() => {
    setUserFormProfile({
      user: user._id,
      name: userProfile.name,
      about: userProfile.about,
      gender: userProfile.gender,
    });
    setGender(userProfile.gender);
  }, [userProfile]);

  useEffect(() => {
    setGender(userFormProfile.gender);
  }, [userFormProfile]); //due to mantne select limiation where it does not have

  const handleProfileSubmit = (e) => {
    console.log("submit");
    e.preventDefault();

    const variable = userFormProfile;
    console.log("variable", variable);
    axios
      .post(baseUrl+"/api/profile/saveProfile", variable)
      .then((response) => {
        if (response.data.success) {
          console.log("profile success");
        } else {
          console.log(response.data);
        }
      });
    getProfile();
    setInitProfile(false);
  };

  const handleProfileEdit = (e) => {
    console.log("edit");
    e.preventDefault();

    const variable = userFormProfile;
    console.log("variable", variable);
    axios
      .post(baseUrl+"/api/profile/updateProfile", variable)
      .then((response) => {
        if (response.data.success) {
          console.log("profile update success");
        } else {
          console.log(response.data);
        }
      });
    setEditProfile(false);
  };

  //load profile details

  // useEffect(()=>{
  // profileCheck()
  // }, [userProfile])

  //   const profileCheck=()=>{
  //     console.log("1", user)
  //       console.log("2", userProfile)
  //     if(userProfile.name){

  //       setInitProfile(false)
  //     }

  //     if(!userProfile.name){
  //       setInitProfile(true)
  //     }
  //   }

  //load profile of user
  // const getProfile = () => {
  //   const variables = {
  //     id: user._id,
  //   };
  //   return axios
  //     .post("http://localhost:5000/api/profile/getProfile", variables)
  //     .then((response) => {
  //       if (response.data.success) {
  //         console.log("heehaw", response.data.result);
  //         // setProfile({
  //         //   ...response.data.result[0],
  //         //   followers: response.data.result[0].followers,
  //         // });
  //         if(response.data.result.length>0){
  //         let newProfile = response.data.result[0];
  //         setUserProfile({ ...newProfile });
  //         console.log("doneeeeee")

  //         }
  //       } else {
  //         alert("failed to get comments");
  //         console.log("failed");
  //       }
  //     })

  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      user: user._id,
    };
    const formData = new FormData();
    formData.append("avatar", selectedFile); //this shit
    formData.append("user", user._id); //append it so that it appears in req.body.user in backend
    try {
      const response = await axios({
        method: "post",
        url: baseUrl+"/api/profile/upload",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    getUserComments();
    getAllActions();
  }, []);

  const getUserComments = () => {
    const variable = {
      user: user._id,
    };

    axios
      .post(baseUrl+"/api/activity/getAllUserComments", variable)
      .then((response) => {
        console.log(response.data);
        setActivityComments(response.data.result);
      });
  };

  const getAllActions = () => {
    const variable = {
      user: user._id,
    };

    axios
      .post(baseUrl+"/api/activity/getAllActions", variable)
      .then((response) => {
        console.log(response.data);
        setAllActions(response.data.result);
      });
  };
  const actionDesc = (data) => {
    //   console.log('tdata', data)
    // return (data);
    if (data == "upvote") {
      return "upvoted a review of the movie";
    } else if (data == "downvote") {
      return "downvoted a review of the movie";
    } else if (data == "saveComment") {
      return "created a review of the movie";
    } else if (data == "deleteComment") {
      return "deleted a review of the movie";
    }
  };

  const actionTag = (data) => {
    //   console.log('tdata', data)
    // return (data);
    if (data == "upvote") {
      return (
        <Badge color="green" variant="filled">
          UPVOTE
        </Badge>
      );
    } else if (data == "downvote") {
      return (
        <Badge color="red" variant="filled">
          DOWNVOTE
        </Badge>
      );
    } else if (data == "saveComment") {
      return (
        <Badge color="yellow" variant="filled">
          CREATE REVIEW
        </Badge>
      );
    } else if (data == "deleteComment") {
      return (
        <Badge color="grape" variant="filled">
          DELETE REVIEW
        </Badge>
      );
    }
  };

  const rows = allActions
    .slice(0)
    .reverse()
    .map((action, index) => (
      <tr key={action._id}>
        <td className={Styles.tableView}>{index + 1}</td>
        <td>
          {moment(action.updatedAt).format("MMMM DD, YYYY  [ •]  h:mm a")}
        </td>
        <td className={Styles.tableView}>{action.user.name}</td>
        <td>{actionDesc(action.userAction)}</td>
        <td>
          {
            <Link
              to={{
                pathname: `/movie/${action.movieId}`,
                state: { unit: "engineer" },
              }}
            >
              {action.movieTitle}
            </Link>
          }
        </td>
        <td>{actionTag(action.userAction)}</td>
      </tr>
    ));

  return (
    <section className={Styles.contents}>
      {/* <Card>
          {activityComments.map((comment)=>(<Group><Text>"{comment.writer.name}"" reviewed the movie "{comment.movieTitle}" with a {comment.rating} star rating</Text><Text size="xs" color="dimmed">at {comment.createdAt}</Text>
          <HashLink to={`/movie/${comment.postId}#${comment._id}`}>ffrrrrrrrrrrrrrrrrrrrr</HashLink></Group>))}
        </Card> */}

      <Card my="md" className={Styles.cardMain}>
        
          <div className={Styles.avatarGroup}>
            <div className={Styles.avatar}>
              
                  <Avatar size={150} radius={100} >
                    <Image height={150} src={userProfile.avatar} />
                  </Avatar>
                
              <button
                className={Styles.addAvatar}
                onClick={() => setAvatar(true)}
              >
                <BsPlusLg size={15} />
              </button>
            </div>

            {userProfile.name ? (
              <Button
                fullWidth
                onClick={() => setEditProfile(true)}
                className={Styles.profileButton}
              >
                Edit Profile
              </Button>
            ) : (
              <Button
                fullWidth
                onClick={() => setInitProfile(true)}
                className={Styles.profileButton}
              >
                Set Profile
              </Button>
            )}
          </div>

          <Modal
            opened={avatar}
            onClose={() => setAvatar(false)}
            title="Upload your avatar"
          >
            <form onSubmit={handleSubmit}>
              <label className={Styles.file}>
                <input type="file" name="avatar" onChange={handleFileSelect} />
                Select Image
              </label>
              <label className={Styles.file}>
                <input type="submit" value="Upload File" />
                Submit
              </label>
            </form>
          </Modal>

          <div className={Styles.info}>
            <Text size="xl" weight={700}>
              {userProfile.name}
            </Text>
            <Text>{userProfile.about}</Text>
            <Text mt="md">Gender: {userProfile.gender}</Text>
            <Text>
              Joined:{" "}
              {userProfile.user
                ? moment(userProfile.user.createdAt).format("LL")
                : "NA"}
            </Text>
            {/* <Text>
          Followers:{" "}
          {profile.followers?.map((item) => (
            <li>{item.name}</li>
          ))}
        </Text> */}
            <Text>
              Followers:{" "}
              {userProfile.followers ? userProfile.followers.length : 0} person
            </Text>

            <Group spacing="xl" pt="md">
                <Menu
                  variant="unstyled"
                  trigger="hover"
                  control={
                    <div>
                      <Text size="sm">Followers:</Text>
                      <Text weight={500} size="lg" style={{lineHeight: 1}}>
                        {" "}
                        {userProfile.followers ? userProfile.followers.length : 0}{" "}
                        person
                      </Text>
                    </div>
                  }
                >
                  {userProfile.followers
                    ? userProfile.followers.map((item) => (
                        <Link
                          
                          to={`/profile/${item._id}`}
                        >
                          <Menu.Item
                            className={Styles.followers}
                            variant="unstyled"
                            p={5}
                          >
                            <Group>
                              <Avatar size={30} radius={100} color="indigo">
                                <Image height={30} src={item.userProfile.avatar} />
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
                      <Text size="sm">Following:</Text>
                      <Text weight={500} size="lg" style={{lineHeight: 1}}>
                        {userProfile.following ? userProfile.following.length : 0}{" "}
                        person
                      </Text>
                    </div>
                  }
                >
                  {userProfile.following
                    ? userProfile.following.map((item) => (
                        <Link
                          
                          to={`/profile/${item._id}`}
                        >
                          <Menu.Item
                            className={Styles.followers}
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
        
       
      </Card>

      <Modal
        opened={initProfile}
        onClose={() => setInitProfile(false)}
        title="To get started, please set your profile."
      >
        <form onSubmit={handleProfileSubmit}>
          <div>
            <TextInput
              my="md"
              value={userFormProfile.name}
              placeholder="Your Name"
              name="name"
              onChange={handleChange}
            />

            <TextInput
              my="md"
              value={userFormProfile.about}
              placeholder="About Yourself"
              name="about"
              onChange={handleChange}
            />

            {/* <TextInput my="md"
              value={userProfile.gender}
              placeholder="Gender"
              name="gender"
              onChange={handleChange}
            /> */}

            <Select
              my="md"
              value={gender}
              onChange={setGender}
              placeholder="Pick one"
              data={[
                { value: "male", label: "male" },
                { value: "female", label: "female" },
              ]}
            />
          </div>
          <div>
            <Button type="submit">submit</Button>
          </div>
        </form>
      </Modal>

      <Modal
        opened={editProfile}
        onClose={() => setEditProfile(false)}
        title="Update your profile"
      >
        <form onSubmit={handleProfileEdit}>
          <div>
            <TextInput my="md"
              value={userFormProfile.name}
              placeholder="Your Name"
              name="name"
              label="name"
              onChange={handleChange}
            />

            <TextInput my="md"
              value={userFormProfile.about}
              placeholder="About Yourself"
              name="about"
              label="about"
              onChange={handleChange}
            />

            {/* <TextInput
              value={userProfile.gender}
              placeholder="Gender"
              name="gender"
              onChange={handleChange}
            /> */}
            <Select
              my="md"
              value={gender}
              onChange={setGender}
              placeholder="gender"
              label="gender"
              data={[
                { value: "male", label: "male" },
                { value: "female", label: "female" },
              ]}
            />
          </div>
          <div>
            <Button type="submit" className={Styles.profileButton}>Update</Button>
          </div>
        </form>
      </Modal>

      {/* <Card>
        {allActions.map((action) => {
          switch (action.userAction) {
            case "upvote":
              return (
                <>
                  <Group>
                    <Text className={Styles.link}>
                      {action.user.name} upvoted a review from the movie{" "}
                      <Link
                        to={{
                          pathname: `/movie/${action.movieId}/#${action._id}`,
                          state: { unit: "engineer" },
                        }}
                      >
                        {action.movieTitle}
                      </Link>
                    </Text>
                    <Text size="xs" color="dimmed">
                      {" "}
                      {moment(action.updatedAt).format('MMMM DD, YYYY  [ • ]  h:mm a')}

                    </Text>
                  </Group>
                  <Divider my="sm" />
                </>
              );
            case "saveComment":
              return (
                <>
                  <Group>
                    <Text className={Styles.link}>
                      {action.user.name} reviewed the movie{" "}
                      <Link
                        to={{
                          pathname: `/movie/${action.movieId}/#${action.componentId._id}`,
                          state: { unit: "engineer" },
                        }}
                      >
                        {action.movieTitle}
                      </Link>
                    </Text>
                    <Text size="xs" color="dimmed">
                      {" "}
                      {moment(action.updatedAt).format('MMMM DD, YYYY  [ •]  h:mm a')}
                     
                    </Text>
                  </Group>
                  <Divider my="sm" />
                </>
              );
            case "deleteComment":
              return (
                <>
                  <Group>
                    <Text className={Styles.link}>
                      {action.user.name} deleted a review of the movie
                      <Link
                        to={{
                          pathname: `/movie/${action.movieId}`,
                          state: { unit: "engineer" },
                        }}
                      >
                        {action.movieTitle}
                      </Link>
                    </Text>
                    <Text size="xs" color="dimmed">
                      {" "}
                      {moment(action.updatedAt).format('MMMM DD, YYYY  [ • ]  h:mm a')}

                    </Text>
                  </Group>
                  <Divider my="sm" />
                </>
              );
            case "downvote":
              return (
                <>
                  <Group>
                    <Text className={Styles.link}>
                      {action.user.name} downvoted a review from the movie
                      <Link
                        to={{
                          pathname: `/movie/${action.movieId}`,
                          state: { unit: "engineer" },
                        }}
                      >
                        {action.movieTitle}
                      </Link>
                    </Text>
                    <Text size="xs" color="dimmed">
                      {" "}
                      {moment(action.updatedAt).format('MMMM DD, YYYY  [ • ]  h:mm a')}

                    </Text>
                  </Group>
                  <Divider my="sm" />
                </>
              );
            default:
              return null;
          }
        })}
      </Card> */}

      <Card my="md" px="xl">
        <Table highlightOnHover verticalSpacing="xs" horizontalSpacing="sm">
          <ScrollArea sx={{ height: 450 }}>
            <thead>
              <tr>
                <th className={Styles.tableView}>Number</th>
                <th>Time</th>
                <th className={Styles.tableView}>User</th>
                <th>Description</th>
                <th>Movie</th>
                <th>Type</th>
              </tr>
            </thead>

            <tbody>{rows}</tbody>
          </ScrollArea>
        </Table>
      </Card>
    </section>
  );
};

export default About;
