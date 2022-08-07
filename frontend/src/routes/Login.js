import React from 'react'
import {Link, Redirect, Route, useHistory} from 'react-router-dom'

import { useState, useEffect } from "react";
import {FaSignInAlt} from 'react-icons/fa'
import axios from 'axios'
import { useGlobalContext } from '../context';
import styles from './Login.module.css';
import { Anchor, PasswordInput, Title, Container, createStyles, Text, Avatar, Group, TypographyStylesProvider, Paper, Textarea, TextInput,Button, Select, Modal, Card} from '@mantine/core';


const API_URL= '/api/users/' //with proxy in package.json


const Login=()=>{
    const{user, setUser, setFavourites}= useGlobalContext();
    const history = useHistory();
   
    const [formData, setFormData]= useState({

        email:'',
        password:'',
    })

    

    const {email, password} = formData

   const onChange=(e)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit=(e)=>{
        e.preventDefault()

        const userData={
            email, password
        }
       
        login(userData)
        
        console.log(userData)
    }

    useEffect(()=>{
      const token=user.token
      console.log(token)
      getFavs(token)
      if(token){
              console.log(user);
              history.push("/");//navigate
            }
    }, [user])

    // useEffect(()=>{
    //     console.log(user)
    //     if(user){
    //       console.log(user);
    //       history.push("/");//navigate
    //     }
    // }, [user])

    // //user login
    // const login= async (userData)=>{
    //     const response = await axios.post("http://localhost:5000/api/users/login", userData).then(function(response){
    //         localStorage.setItem('user', JSON.stringify(response.data))
    //     }).catch(function(error){ console.log(error)})
    
    //     console.log(response)
    //     // if (response.data){
    //     //     localStorage.setItem('user', JSON.stringify(response.data))
    //     // }//.data contains token
    
    //     // console.log(response.data)
    //     // return response.data

        //user login//must populate favourites in beginnig
        const login= async (userData)=>{
        const response = await axios.post("http://localhost:5000/api/users/login", userData).then(function(response){
          localStorage.setItem('user', JSON.stringify(response.data))
            setUser(response.data)
            return response.data
        }).catch(function(error){ console.log(error.response.data.message)})
    
        
        
    }

  //   //user login//must populate favourites in beginnig
  //   const login= async (userData)=>{
  //     const response = await axios.post("http://localhost:5000/api/users/login", userData)
  
  //     console.log(response)
  //     if (response.data){
  //         localStorage.setItem('user', JSON.stringify(response.data))
  //         setUser(response.data)
  //     }//.data contains token
  //     console.log(user)
  //     console.log(response.data)
  //     return response.data
  // }

    //get favs for first time
    const getFavs = async (token) => {
      console.log(token);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        "http://localhost:5000/api/goals",
        config
      );
      console.log(response);
      if (response.data) {
        localStorage.setItem("favourites", JSON.stringify(response.data));
        setFavourites(response.data);
        console.log(response.data);
      }
      return response.data;
    };

   

    

    return(
        <>
          <Container size={400} my={20}>
     <Card>
      
        <Title align="center" order={2}>Welcome Back!</Title>
        <Text align="center">Log-In to get started</Text>
          <form onSubmit={onSubmit}>
      
              <TextInput my={10}
                type="email"
                label= "Your Email"
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
           
           <Button type="submit" fullWidth mt="xl" size="md" >
              Submit
            </Button>

            <Text color="dimmed" size="sm" align="center" mt={5}>Don't have an account? <Anchor size="sm" ml={6} component={Link} to="/register">
      Register
    </Anchor></Text>
            
            
          </form>
          </Card></Container>
          

        {/* <div className={styles.main}>
        <section className={styles.heading}>
            <div>
                <h1>LOGIN</h1>
           </div>
           <h1>
            <FaSignInAlt />
            Log In
          </h1>
          <p>Login and start setting goals</p>
        </section>

        <section className={styles.form}>
          <form onSubmit={onSubmit}>
            
           
            <div className={styles.formgroup}>
              <input
                type="email"
                className={styles.formcontrol}
                id="email"
                name="email"
                placeholder="enter your email"
                value={email}
                onChange={onChange}
              />
            </div>
            <div className={styles.formgroup}>
              <input
                type="password"
                className={styles.formcontrol}
                id="password"
                name="password"
                placeholder="enter your password"
                value={password}
                onChange={onChange}
              />
            </div>
            
            <div className={styles.formgroup}>
                <button type='submit' className={styles.btn }>
                Submit    
                </button>    
            
            </div>
          </form>
          <div>
              {user? (<h2>welcome {user.name}</h2>):(null)}
          </div>
           

        </section>
        </div> */}
        </>
        
    )

}

export default Login