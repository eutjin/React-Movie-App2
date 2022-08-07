import React from 'react'
import {Link} from 'react-router-dom'
import Modal from 'react-modal';
import { useState, useEffect } from "react";


const Browse=()=>{
   
    return(
        <section>
            <div>
                <h1>BROWSE</h1>
           </div>
           <div>
               <Link to='/'>BACK HOME</Link>
           </div>
           

        </section>
    )

}

export default Browse