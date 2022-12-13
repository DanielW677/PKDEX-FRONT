import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"

const Profile = () => {
    const {user} = useOutletContext()
    const [mons, setMons] = useState()
    // console.log(user)
    useEffect(() => {
        async function checkMons(){
            const monFet = await fetch(`https://pkdex.onrender.com/api/pokedex/viewmons`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            // console.log(monFet)
            const myMons = await monFet.json()
            // console.log(myMons)
            setMons(myMons.mons)
        }
        checkMons()
    }, [])
   {
    return(
        user && user.username ? 
        <div>
            <h1>This is your Pokedex {user.username}</h1>
            {user.isAdmin ? <button>ADMIN PAGE</button>: "" }
            {mons && mons.length ? mons.map((pokemon, idx) => {
                return(
                <div key={idx} className='bigMonCont'>
                        <div className="singleMonCont">
                            <p> National Dex ID: {pokemon.DexId}</p>
                            <p>{pokemon.PKName} </p>
                        <div>
                            <img src={pokemon.ShinyPhoto}></img>
                            <p> Paldea Dex Num: {pokemon.pokemonId}</p>
                        </div>
                    </div>
                </div>
            )}): <p>Start getting mons now</p> }
        </div>:<p>Login to use this websites many great features</p>
    )
   }
}


export default Profile