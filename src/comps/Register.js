import {useState} from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
const Register = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const {userTest} = useOutletContext()
    async function registerForm(event){
        event.preventDefault()
        try {
            const regFet = await fetch(`https://pkdex.onrender.com/api/users/register`, {
                method: "POST",
                headers: {
                    'Content-Type': `application/json`,
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })
            const res = await regFet.json()
            if(res.token){
                localStorage.setItem('token', res.token)
                userTest()
                navigate('/')
                alert('Welcome!')
            }else{
                alert(res.message)
            }
        } catch (error) {
            console.log(error)  
        }
    }
    return(
        <div>
            <h1>Create a new Account Here!</h1>
            <form onSubmit={registerForm} className='mb-3'>
                <div>
                    <label className='form-label'>Username:</label>
                    <input type='text' className='form-control' value={username} onChange={(event) => {setUsername(event.target.value)}}></input>
                </div>
                <div>
                    <label className='form-label'>Password:</label>
                    <input type='password' className='form-control' value={password} onChange={(event) => {setPassword(event.target.value)}} ></input>
                </div>
                <div className='d-grid gap-2 col-6 mx-auto'>
                    <button type='submit' className='btn btn-primary'>Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register