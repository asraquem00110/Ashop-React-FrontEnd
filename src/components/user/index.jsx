import React , { useEffect }  from 'react'
import './index.css'
import UserNav from './nav'
import {setnav} from './setnav.js'
const UserComponent = (props) =>{

    useEffect(()=>{
        setnav(0)
    },[])

    return (
        <div id="MainBody">
            <UserNav />
            <br/>
            <h1>My Profile</h1>
        </div>
    )
}

export default UserComponent