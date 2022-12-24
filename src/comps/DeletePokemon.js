import { useOutletContext } from "react-router"
import { useState } from "react"
import { useNavigate } from "react-router"
const DeleteMon = () => {
    const {setNewPokemon, newPokemon} = useOutletContext()
    const [pokemonId, setPokemonId] = useState()
    // console.log('new', newPokemon)
    const navigate = useNavigate()
    async function delMon(event){
        event.preventDefault()
       const delFet = await fetch(`https://pkdex.onrender.com/api/pokemon/deletemon/${pokemonId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
       })
       console.log(delFet)
       if(delFet){
        async function getMons(){
            const monFet = await fetch(`https://pkdex.onrender.com/api/pokemon`)
            setNewPokemon(monFet)
        }
        getMons()
        alert("Pokemon Deleted")
        navigate('/pokemon')
       }
    }
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
                        <form onSubmit={delMon}>
                            <button onClick={() => {setPokemonId(indivMon.DexId)}}>Delete</button>
                        </form>
                    </div>
                )
            }):<div>Loading Mon Data</div>
            
            
        }</div>
    )
}

export default DeleteMon