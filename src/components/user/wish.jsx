import React from 'react'
import { useEffect } from 'react'
import UserNav from './nav'
import {setnav} from './setnav.js'
import {Row,Col,Card,Table,Button} from 'react-bootstrap'

const WishlistComponent = ()=>{

    useEffect(()=>{
        setnav(3)
    },[])

    return (
        <div id="MainBody">
            <UserNav />
            <br/>
            <Card>
                  {/* <Card.Header>&nbsp;</Card.Header> */}
                  <Card.Body>
                  <Table responsive variant="light">
                        <thead>
                            <tr style={{background: '#343A40',color: 'white'}}>
                            <th>Image</th>
                            <th>Product Info</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>

                         </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    )
}

export default WishlistComponent