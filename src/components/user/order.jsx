import React from 'react'
import { useEffect } from 'react'
import UserNav from './nav'
import {setnav} from './setnav.js'

const OrderRecordsComponent = ()=>{

    useEffect(()=>{
        setnav(1)
    },[])

    return (
        <div id="MainBody">
            <UserNav />
            <br/>
            <h1>My Records</h1>
        </div>
    )
}

export default OrderRecordsComponent