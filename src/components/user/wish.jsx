import React from 'react'
import { useEffect } from 'react'
import UserNav from './nav'
import {setnav} from './setnav.js'
import {Row,Col,Card,Table,Button} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import {getWish,removeWish} from '../../actions/cart'
import { imgUrl } from '../../config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  * as FA from '@fortawesome/free-solid-svg-icons'

const WishlistComponent = ()=>{

    const dispatch = useDispatch()
    const items = useSelector(state=>state.cart.wishs)

    const removeItem = (index)=>{
        if(window.confirm("Remove this item?")){
            dispatch(removeWish(index,items[index].id))
        }
    }

    useEffect(()=>{
        setnav(3)
        dispatch(getWish())
    },[])

    return (
        <div id="MainBody">
            <UserNav />
            <br/>
            <h1>My Wishlist</h1>
            <Card>
                  {/* <Card.Header>&nbsp;</Card.Header> */}
                  <Card.Body>
                  <Table striped responsive variant="light">
                        <thead>
                            <tr style={{background: '#343A40',color: 'white'}}>
                            <th style={{width: '10%'}}>Image</th>
                            <th>Product Info</th>
                            <th style={{width: '10%'}}></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                items.map((item,index)=>{
                                    return <>
                                        <tr key={index}>
                                            <td><img src={`${imgUrl}${item.product.img}`} style={{height: '80px', width: '100px'}}/></td>
                                            <td>{item.product.product} Price: <span style={{color: '#3D4792'}}>P {window.$helper.roundToDecimal(item.product.price,2)}</span><hr/><small>{item.product.description}</small></td>
                                            <td><Button onClick={()=>removeItem(index)} variant="danger"><FontAwesomeIcon icon={FA.faTimes}></FontAwesomeIcon></Button></td>
                                        </tr>
                                    </>
                                })
                            }

                         </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    )
}

export default WishlistComponent