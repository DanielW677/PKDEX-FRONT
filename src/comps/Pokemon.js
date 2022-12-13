import { useOutletContext } from "react-router-dom"

const Pokemon = () => {
    const {newPokemon} = useOutletContext()

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
                        <div className="buttonCont">
                            <button className="button">
                                <img className="pokeballPic" src="https://cdn.pixabay.com/photo/2016/07/23/13/18/pokemon-1536849__340.png" alt='caught?' border='0'></img>
                            </button>
                        </div>
                    </div>
                )
            }):<div>Loading Mon Data</div>
            
            
        }</div>
    )
}

export default Pokemon