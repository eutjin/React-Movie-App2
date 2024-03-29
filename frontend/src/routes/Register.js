import React from "react";
import { Link, Redirect, Route, useHistory } from "react-router-dom";

import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import axios from "axios";
import { useGlobalContext } from "../context";
import { Anchor, PasswordInput, Title, Container, createStyles, Text, Avatar, Group, TypographyStylesProvider, Paper, Textarea, TextInput,Button, Select, Modal, Card, Alert} from '@mantine/core';
import baseUrl from "../BaseUrl";


const Register = () => {
  const { user, setUser, setFavourites } = useGlobalContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;
  const history= useHistory()
  const [passwordError, setPasswordError]=useState(false)
  const [regError, setRegError]=useState(false)
  const [regErrorMsg, setRegErrorMsg]=useState("")

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(()=>{
setPasswordError(false)
setRegError(false)
setRegErrorMsg("")
  }, [formData])

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submit");

    if (password == password2) {
      const userData = {
        name,
        email,
        password,
      };
      console.log(userData);
      register(userData);
    } else {
      console.log("password does not match"); 
      setPasswordError(true)
  
    }

    // if (password != password2) {
       
    //   console.log("password fucked");
    // } else {
    //   const userData = {
    //     name,
    //     email,
    //     password,
    //   };
    //   console.log(userData);
    //   register(userData);
    // }
  };

  //register new user
  const register = async (userData) => {
    const response = await axios
      .post(baseUrl+"/api/users/", userData)
      .then(function (response) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);
        history.push("/about")
        return response.data;
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setRegError(true)
        setRegErrorMsg(error.response.data.message)
      });
  };

  return (
    <>
     
     <Container size={400} my={20} style={{marginTop: "65px"}}>
     <Card>
      
        <Title align="center" order={2}>Welcome!</Title>
        <Text align="center">Sign-up to get started</Text>
      
        <form onSubmit={onSubmit}>
          
            <TextInput my={10}
              type="text"
              label= "Name"
              id="name"
              name="name"
              placeholder="enter your name"
              value={name}
              onChange={onChange}
            />
         
            <TextInput my={10}
              type="email"
              label= "E-mail"
              id="email"
              name="email"
              placeholder="enter your email"
              value={email}
              onChange={onChange}
            />
          
            <PasswordInput my={10}
              
              label= "Password"
              id="password"
              name="password"
              placeholder="enter your password"
              value={password}
              onChange={onChange}
            />
         
            <PasswordInput my={10}
              
              label="Reenter Password"
              id="password2"
              name="password2"
              placeholder="confirm password"
              value={password2}
              onChange={onChange}
            />
          
            <Button type="submit" fullWidth mt="xl" size="md" >
              Submit
            </Button>

            <Text color="dimmed" size="sm" align="center" mt={5}>Already have an account? <Anchor size="sm" ml={6} component={Link} to="/login">
      Login
    </Anchor></Text>
          
        </form>
       
        {passwordError &&  <Alert title="Error!" color="red">
      Passwords do not match!
    </Alert>}
    {regError &&  <Alert title="Error!" color="red">
      {regErrorMsg}
    </Alert>}
</Card>
</Container>
      {/* <section className="heading">
        <h1>Register</h1>
        <p>Please create account</p>
      </section>
        
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="enter your name"
              value={name}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="enter your email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="enter your password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password2"
              className="form-control"
              id="password2"
              name="password2"
              placeholder="confirm password"
              value={password2}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
       
      </section> */}
      
    </>
  );
};

export default Register;
