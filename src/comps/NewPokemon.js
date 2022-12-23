import { useState } from "react"
import { json } from "react-router"
import { useNavigate, useOutletContext } from "react-router"


const NewMon = () => {
    const [PKName, setPKName] = useState()
    const [type, setType] = useState()
    const [photo, setPhoto] = useState()
    const [ShinyPhoto, setShinyPhoto] = useState()
    const [DexId, setDexId] = useState()
    const navigate = useNavigate()
    const {setNewPokemon} = useOutletContext()
    async function newPoke(event){
        event.preventDefault()
        const pokeFet = await fetch(`https://pkdex.onrender.com/api/pokemon/newmon`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({PKName, type, photo, ShinyPhoto, DexId})
        })
        const result = await pokeFet.json()
        console.log(result)
        if(result.newPoke.DexId){
            async function getMonsAgain(){
                const fetchPoke = await fetch('https://pkdex.onrender.com/api/pokemon')
                const jsonData = await fetchPoke.json()
                console.log('this is jsonData', jsonData)
                setNewPokemon(jsonData.pokemon)
            }
            getMonsAgain()
            alert('Created Pokemon')
            navigate('/pokemon')
        }
    }
    return(
        <div>
            <form onSubmit={newPoke}>
                <label>PokeName:</label>
                <input type='text' value={PKName} onChange={(event) => {setPKName(event.target.value)}}></input>
                <br></br>
                <label>Type:</label>
                <input type={'text'} value={type} onChange={(event) => {setType(event.target.value)}}></input>
                <br></br>
                <label>Photo:</label>
                <input type={'text'} value={photo} onChange={(event) => {setPhoto(event.target.value)}}></input>
                <br></br>
                <label>ShinyPhoto:</label>
                <input type={'text'} value={ShinyPhoto} onChange={(event) => {setShinyPhoto(event.target.value)}}></input>
                <br></br>
                <label>DexId:</label>
                <input type='text' value={DexId} onChange={(event) => {setDexId(event.target.value)}}></input>
                <input type={'submit'}></input>
            </form>
        </div>
    )
}

export default NewMon