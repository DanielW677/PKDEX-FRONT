import { useEffect, useState } from "react"
import { useOutletContext, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
const Profile = () => {
    const {user} = useOutletContext()
    const [mons, setMons] = useState()
    const photo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6eFtu__i6LBRXCwM-qwR19S4ePhicmljLDg&usqp=CAU'
    // console.log(user)
    const [natPokeId, setNatPokeId] = useState()
    const navigate = useNavigate()
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

    async function deleteMon(event){
        event.preventDefault()
        try {
        const delFet = await fetch(`https://pkdex.onrender.com/api/pokedex/delete/${natPokeId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'applicaion/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(delFet)
        if(delFet.status === 200){
            alert('Pokemon Removed')
            navigate('/')
        }else{
            alert('Failed to remove pokemon')
            navigate('/')
        }
        } catch (error) {
            console.log(error)
        }
    }
   {
    return(
        user && user.username ? 
        <div>
            <h1>This is your Pokedex {user.username}</h1>
            {user.isAdmin ? <button className="adminButton">
                    <Link className="link" to={'/admin'}>Admin Page</Link>
                </button>: "" }
            {mons && mons.length ? mons.map((pokemon, idx) => {
                return(
                <div key={idx} className='bigMonCont'>
                        <div className="singleMonCont">
                            <p> National Dex ID: {pokemon.DexId}</p>
                            <p>{pokemon.PKName} </p>
                        <div>
                            <img src={pokemon.ShinyPhoto}></img>
                            <p> Paldea Dex Num: {pokemon.pokemonId}</p>
                        <form onSubmit={deleteMon}>
                            <div className="buttonCont">
                                <button className="button" type="submit" onClick={() => {setNatPokeId(pokemon.natId)}}>
                                    <img className="pokeballPic" src={photo} alt="Remove"></img>
                                </button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            )}): <p>Start getting mons now</p> }
        </div>:<p>Login to use this websites many great features</p>
    )
   }
}


export default Profile