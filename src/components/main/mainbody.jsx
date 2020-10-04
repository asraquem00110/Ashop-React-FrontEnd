import React from 'react'
import Banner from './banner'
import Product from './product'
import Category from './category'

const MainBody = (props)=>{
    console.log(props)
    return (
        <div>
            <Category/>
            <div id="MainBody">
                <Banner title={props.name}/>
                <Product/>
            </div>
        </div>
    )
}

export default MainBody