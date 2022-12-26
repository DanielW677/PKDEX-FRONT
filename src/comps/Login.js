import {useState} from 'react'
import { useOutletContext, useNavigate, Link} from 'react-router-dom'
const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // const {getUser} = useOutletContext()
    const {userTest} = useOutletContext()
    const navigate = useNavigate()
    async function logIn(event){
        event.preventDefault()
        try {
            const logFetch = await fetch(`https://pkdex.onrender.com/api/users/login`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })
            const results = await logFetch.json()
            if(results.token){
                localStorage.setItem('token', results.token)
                userTest()
                navigate('/')
                alert(results.message)
            }else{
                alert(results.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div>
            <h1>Welcome Back!</h1>
            <form onSubmit={logIn} className='mb-3'>
                <div>
                    <label className='form-label'>Username:</label>
                    <input type='text' className='form-control' value={username} onChange={(event) => {
                        console.log(event.target.value)
                        setUsername(event.target.value)
                    }}></input>
                </div>
                <div>
                    <label className='form-label'>Password:</label>
                    <input type='password' className='form-control' value={password} onChange={(event) => {
                        setPassword(event.target.value)
                    }}></input>
                </div>
                <div className='d-grid gap-2 col-6 mx-auto'>
                    <button className='btn btn-primary' type='submit'>Login</button>
                </div>
            </form>
            <div className='d-grid gap-2 col-6 mx-auto'>
                <button className='btn'>
                    <Link to={'/register'} className='link'>New account?</Link>
                </button>
            </div>
        </div>
    )
}

export default Login