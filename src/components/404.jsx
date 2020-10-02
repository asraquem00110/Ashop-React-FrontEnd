import React from 'react'

const centerdiv = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: "translate(-50%, -50%)"
}

const NotFoundComponent = ()=>{
    return (
      
            <div style={centerdiv}>
                <h1 style={{color:'dimgray'}}>ERROR 404</h1>
                <span>PAGE NOT FOUND</span>
            </div>
       
    )
}

export default NotFoundComponent