import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import {Outlet} from 'react-router'
import {useState, useEffect} from 'react'
import {Homepage, ErrorPage, NavBar, Pokemon, Profile, Login, Register} from './comps/index'
import "./style.css"
const App = () => {
    const [newPokemon, setNewPokemon] = useState()
    const [user, setUser] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        async function getMons(){
            const poke = await fetch(`https://pkdex.onrender.com/api/pokemon`)
            const mons = await poke.json()
            // console.log('mons', mons)
            setNewPokemon(mons.pokemon)
        }
        getMons()
    }, [])

        async function userTest(){
            const userFetch = await fetch(`https://pkdex.onrender.com/api/users/me`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            const userGet = await userFetch.json()
            // console.log(userGet)
            setUser(userGet)
        }

        useEffect(() => {
            userTest()
        }, [])
    return(
        <div>
            <NavBar/>
            <Outlet context={{newPokemon, setNewPokemon, user, userTest}} />
        </div>
    )
}

const route = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage/>,

        children: [
            {
                index: true,
                element: <Homepage/>
            },
            {
                path: '/pokemon',
                element: <Pokemon />
            },
            {
                path: '/profile',
                element: <Profile/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    }
])


const appElem = document.getElementById('app')
const root = createRoot(appElem)
root.render(<RouterProvider router={route} />, )