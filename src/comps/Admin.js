import { Link } from "react-router-dom"

const AdminPage = () => {
    return(
        <div className="navBar blue">
            <Link className="link" to={'/newpokemon'}>New pokemon</Link>
            <Link className="link" to={'/updatepokemon'}> Update Pokemon</Link>
            <Link className="link" to={'/deletepokemon'}> Delete Pokemon</Link>
        </div>
    )
}

export default AdminPage