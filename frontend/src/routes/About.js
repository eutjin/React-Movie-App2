import React, {
  useImperativeHandle,
  useEffect,
  useRef,
  forwardRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import {
  Avatar, Select, Table, ScrollArea, Badge,
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
import { HashLink } from 'react-router-hash-link';

import moment from "moment";

import Styles from "./About.module.css";

const About = () => {
  const { user } = useGlobalContext();
  const [activityComments, setActivityComments] = useState([]);
  const [allActions, setAllActions] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [initProfile, setInitProfile] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [avatar, setAvatar]= useState(false)

  const [userProfile, setUserProfile] = useState({
    name: "",
    about: "",
    gender: "",
    user: user._id,
  });
  const [gender, setGender]= useState("")

  
  const handleChange = (event) => {
    const value = event.target.value;
    // console.log("value", value)
    // console.log("value2", event.target)
    setUserProfile({ ...userProfile, [event.target.name]: value });
  };

useEffect(()=>{
  setUserProfile({ ...userProfile, gender: gender });
}, [gender])

useEffect(()=>{
if(user && !userProfile.name){
  setInitProfile(true)
}
}, [])

useEffect(()=>{
  setGender(userProfile.gender)
}, [userProfile])//due to mantne select limiation where it does not have 

  const handleProfileSubmit = (e) => {
    console.log("submit");
    e.preventDefault();

    const variable = userProfile;
    console.log('variable', variable)
    axios
      .post("http://localhost:5000/api/profile/saveProfile", variable)
      .then((response) => {
        if (response.data.success) {
          console.log("profile success");
        } else {
          console.log(response.data);
        }
      });
    setInitProfile(false);
    // setUserProfile({
    //   name: "",
    //   about: "",
    //   gender: "",
    //   user: user._id,
    // });
  };

  const handleProfileEdit = (e) => {
    console.log("edit");
    e.preventDefault();

    const variable = userProfile;
    console.log('variable', variable)
    axios
      .post("http://localhost:5000/api/profile/updateProfile", variable)
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

  useEffect(() => {
    getProfile();
  }, []);

  //load profile of user
  const getProfile = () => {
    const variables = {
      id: user._id,
    };
    axios
      .post("http://localhost:5000/api/profile/getProfile", variables)
      .then((response) => {
        if (response.data.success) {
          console.log("heehaw", response.data.result);
          // setProfile({
          //   ...response.data.result[0],
          //   followers: response.data.result[0].followers,
          // });
          if(response.data.result.length>0){
          let newProfile = response.data.result[0];
          setUserProfile({ ...newProfile });
          }
        } else {
          alert("failed to get comments");
          console.log("failed");
        }
      });
  };

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
        url: "http://localhost:5000/api/profile/upload",
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
      .post("http://localhost:5000/api/activity/getAllUserComments", variable)
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
      .post("http://localhost:5000/api/activity/getAllActions", variable)
      .then((response) => {
        console.log(response.data);
        setAllActions(response.data.result);
      });
  };
  const actionDesc=(data)=>{
  //   console.log('tdata', data)
  // return (data);
  if (data=="upvote")
  {
    return "upvoted a review of the movie"
  }else if (data=="downvote")
  {
    return "downvoted a review of the movie"
  }
  else if (data=="saveComment")
  {
    return "created a review of the movie"
  }else if (data=="deleteComment")
  {
    return "deleted a review of the movie"
  }

  }

  const actionTag=(data)=>{
    //   console.log('tdata', data)
    // return (data);
    if (data=="upvote")
    {
      return <Badge color="green" variant="filled">UPVOTE</Badge>
    }else if (data=="downvote")
    {
      return <Badge color="red" variant="filled">DOWNVOTE</Badge>
    }
    else if (data=="saveComment")
    {
      return <Badge color="yellow" variant="filled">CREATE REVIEW</Badge>
    }else if (data=="deleteComment")
    {
      return <Badge color="grape" variant="filled">DELETE REVIEW</Badge>
    }
  
    }

const rows = allActions.slice(0).reverse().map((action, index) => (
  <tr key={action._id}>
    <td>{index + 1}</td>
    <td>{moment(action.updatedAt).format('MMMM DD, YYYY  [ •]  h:mm a')}</td>
    <td>{action.user.name}</td>
    <td>{actionDesc(action.userAction)}</td>
    <td>{<Link
                        to={{
                          pathname: `/movie/${action.movieId}`,
                          state: { unit: "engineer" },
                        }}
                      >
                        {action.movieTitle}
                      </Link>}</td>
    <td>{actionTag(action.userAction)}</td>
    
    
  </tr>
));





  return (
    <section className={Styles.contents}>
     

      {/* <Card>
          {activityComments.map((comment)=>(<Group><Text>"{comment.writer.name}"" reviewed the movie "{comment.movieTitle}" with a {comment.rating} star rating</Text><Text size="xs" color="dimmed">at {comment.createdAt}</Text>
          <HashLink to={`/movie/${comment.postId}#${comment._id}`}>ffrrrrrrrrrrrrrrrrrrrr</HashLink></Group>))}
        </Card> */}

      <Card my="md">
        <Group>
          <div className={Styles.avatar}>
            <Menu
              trigger="hover"
              control={
                <Avatar size={150} radius={100}>
                  <Image height={150} src={userProfile.avatar} />
                </Avatar>
              }
            >
              <Avatar size={150} radius={100}>
                <Image height={150} src={userProfile.avatar} />
              </Avatar>
              <Button>nice</Button>
            </Menu>
            {/* <Avatar  size={150} radius={100}><Image height={150} src={userProfile.avatar}/></Avatar> */}
            <Button onClick={()=>setAvatar(true)} >fff</Button>
          </div>

          <Modal opened={avatar}
        onClose={() => setAvatar(false)} title="Upload yoru avatar"><form onSubmit={handleSubmit}>
        <label className={Styles.file}>
        <input type="file" name="avatar" onChange={handleFileSelect} />
        Select Image
        </label>
        <label className={Styles.file}>
        <input type="submit" value="Upload File" />
        Submit
</label>
      </form></Modal>

          <div>
            <Text size="xl" weight={700}>
              {userProfile.name}
            </Text>
            <Text>{userProfile.about}</Text>
            <Text mt="md">Gender: {userProfile.gender}</Text>
            <Text>
              Joined: {userProfile.user ? moment(userProfile.user.createdAt).format("LL") : "NA"}
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
          </div>
        </Group>
        <Button
          onClick={() => setInitProfile(true)}
          mx={10}
          my={20}
          color="gray"
        >
          Set Profile
        </Button>
        <Button radius="xl" size="md">d</Button>
        <Button
          onClick={() => setEditProfile(true)}
          mx={10}
          my={20}
          color="gray"
        >
          Update Profile
        </Button>
      </Card>

      <Modal
        opened={initProfile}
        onClose={() => setInitProfile(false)}
        title="Set your profile"
      >
        <form onSubmit={handleProfileSubmit}>
          <div>
            <TextInput my="md"
              value={userProfile.name}
              placeholder="Your Name"
              name="name"
              onChange={handleChange}
            />

            <TextInput my="md"
              value={userProfile.about}
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

            <Select my="md"
            value={gender}
            onChange={setGender}
            placeholder="Pick one"
            data={[
              { value: 'male', label: 'male' },
              { value: 'female', label: 'female' },
             
            ]}/>
          </div>
          <div>
            <Button type="submit">submit</Button>
          </div>
        </form>
      </Modal>

      <Modal
        opened={editProfile}
        onClose={() => setEditProfile(false)}
        title="update your profile"
      >
        <form onSubmit={handleProfileEdit}>
          <div>
            <TextInput
              value={userProfile.name}
              placeholder="Your Name"
              name="name"
              onChange={handleChange}
            />

            <TextInput
              value={userProfile.about}
              placeholder="About Yourself"
              name="about"
              onChange={handleChange}
            />

            {/* <TextInput
              value={userProfile.gender}
              placeholder="Gender"
              name="gender"
              onChange={handleChange}
            /> */}
             <Select my="md"
            value={gender}
            onChange={setGender}
            placeholder="Pick one"
            data={[
              { value: 'male', label: 'male' },
              { value: 'female', label: 'female' },
             
            ]}/>
          </div>
          <div>
            <Button type="submit">submit</Button>
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
        <ScrollArea sx={{ height: 450 }} >
      <thead >
        <tr>
          <th>Number</th>
          <th>Time</th>
          <th>User</th>
          <th >Description</th>
          <th>Movie</th>
          <th >Type</th>
          
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
