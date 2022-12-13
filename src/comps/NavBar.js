
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const NavBar = () => {
    const navigate = useNavigate()

    async function logOut(){
        localStorage.removeItem('token')
        alert('You have logged out')
        navigate('/')
        location.reload()
    }
    return(
        <nav className='navBar'>
            <Link to={'/'} className='link'>Homepage</Link>
            <Link to={'/pokemon'} className='link'>Pokemon</Link>
            <Link to={'/profile'} className='link'>Profile</Link>
            <Link to={'/login'} className='link'>Login</Link>
            <Link className='link' onClick={() => {logOut()}}>Logout</Link>
        </nav>
    )
}

export default NavBar