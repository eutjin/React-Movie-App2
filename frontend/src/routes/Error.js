import React from 'react'
import {Link} from 'react-router-dom'

const Error=()=>{
    return(
        <section>
            <div>
                <h1>DEAD END</h1>
           </div>
           <div>
               <Link to='/'>BACK HOME</Link>
           </div>
        </section>
    )

}

export default Error