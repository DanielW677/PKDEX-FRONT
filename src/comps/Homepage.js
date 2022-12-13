import React from "react"
import { useOutletContext } from "react-router"

const Homepage = () => {
    const {user} = useOutletContext()
    console.log(user)
    return(
        <div>
            <h1>Welcome to Shiny Pokedex TrackR</h1>
            <div className="pCont">
                <p>Here you can Track all the many shiny pokemon you find on your adventures throughout Paldea, Galar, Unova and many more</p>
            </div>
        </div>
    )
}

export default Homepage