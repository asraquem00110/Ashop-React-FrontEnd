import React from 'react'
import logo from '../../logo.svg';

const bannerstyle = {
    width: '100%',
    height: '300px',
    // borderRadius: '10px',
    background: "linear-gradient(90deg, rgba(142,140,190,1) 0%, rgba(67,67,144,1) 18%, rgba(20,108,160,1) 56%, rgba(0,212,255,1) 87%, rgba(195,232,238,1) 96%",
    position: 'relative',
}

const bannermsg = {
    position: 'absolute',
    color: 'white',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
}

const Banner = ({title})=>{
    return (
        <div style={bannerstyle}>
            <div style={bannermsg}>
                    <h3>{title} <img style={{height:'50px',width: '50px'}} src={logo}/></h3>
                    <span style={{fontWeight: 'normal'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</span>
            </div>
        </div>
    )
}

export default Banner