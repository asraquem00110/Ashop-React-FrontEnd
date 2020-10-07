import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  {faTimes}from '@fortawesome/free-solid-svg-icons'
import {Button} from 'react-bootstrap'
const orderDetails = ({order,close})=>{
    return (
        <div>

           <Button onClick={()=>close()} variant="outline-secondary"><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon> Close</Button>
            <pre>
                {
                    JSON.stringify(order)
                }
            </pre>
        </div>
    )
}

export default orderDetails