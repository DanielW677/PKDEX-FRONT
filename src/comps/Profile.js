import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"

const Profile = () => {
    const {user} = useOutletContext()
    // console.log(user)

   {
    return(
        user && user.username ? 
        <div>
            <h1>Welcome to your profile {user.username}</h1>
            {user.isAdmin ? <button>ADMIN PAGE</button>: "" }
        </div>:<p>Login to use this websites many great features</p>
    )
   }
}


export default Profile