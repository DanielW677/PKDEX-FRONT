import { useOutletContext } from "react-router"

const DeleteMon = () => {
    const {newPokemon} = useOutletContext()
    // console.log('new', newPokemon)
    async function delMon(){
        const fetch = await fetch('')
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
                        <form>
                            <button>Delete</button>
                        </form>
                    </div>
                )
            }):<div>Loading Mon Data</div>
            
            
        }</div>
    )
}

export default DeleteMon