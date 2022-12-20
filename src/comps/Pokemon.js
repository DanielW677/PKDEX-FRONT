import { useOutletContext, useNavigate } from "react-router-dom"
import {useState } from 'react'
const Pokemon = () => {
    const {newPokemon} = useOutletContext()
    const [pokemonId, setPokemonId] = useState()
    const navigate = useNavigate()
    async function addMon(event){
        event.preventDefault();
        const getMon = await fetch(`https://pkdex.onrender.com/api/pokedex/add/${pokemonId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(getMon)
        // if(getMon){
        //     alert("Congragulations on the new shiny pokemon!")
        //     navigate('/profile')
        // }
    }

    console.log(newPokemon)
    return(
        <div className="bigMonCont">{
            newPokemon && newPokemon.length ? newPokemon.map((indivMon,idx) => {
                return(
                    <div className="singleMonCont" key={idx}>
                        <div>
                            <p>{indivMon.DexId}</p>
                            <p>{indivMon.PKName}</p>
                        </div>
                        <div>
                            <img src={indivMon.photo}></img>
                            <p>{indivMon.type}</p>
                        </div>
                        <form onSubmit={addMon}>
                            <div className="buttonCont">
                                <button className="button" type="submit" onClick={() => {setPokemonId(indivMon.id), console.log(pokemonId)}}>
                                    <img className="pokeballPic" src="https://cdn.pixabay.com/photo/2016/07/23/13/18/pokemon-1536849__340.png" alt='caught?' border='0'></img>
                                </button>
                            </div>
                        </form>
                    </div>
                )
            }):<div>Loading Mon Data</div>
            
            
        }</div>
    )
}

export default Pokemon