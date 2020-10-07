import React , {useEffect} from 'react'
import UserNav from './nav'
import {setnav} from './setnav.js'
import {Row,Col, Form , Table , Button } from 'react-bootstrap'
import { useState } from 'react'
import {getOrders,getPaginatedData} from '../../actions/order'
import {useSelector,useDispatch} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  * as FA from '@fortawesome/free-solid-svg-icons'


const OrderRecordsComponent = ()=>{
    const dispatch = useDispatch()
    const order = useSelector(state=>state.order)

    const [showRecord,setShowRecord] = useState(false)

    useEffect(()=>{
        setnav(1)
        dispatch(getOrders())
    },[])

    return (
        <div id="MainBody">
            <UserNav />
            <br/>
            <h1>My Records</h1>
            {
                !showRecord 
                ?  <div>
                        <Row>
                            <Col md={6}>
                                <Form.Control type="text" placeholder="Search Via Order Number ..."/>
                            </Col>
                        </Row>
                        <Table responsive bordered style={{marginTop: '10px'}}>
                            <thead>
                                <tr style={{background: '#343A40',color: 'white'}}>
                                    <th><b>ORDER NO</b></th>
                                    <th><b>ORDER DATE</b></th>
                                    <th><b>PAYMENT TYPE</b></th>
                                    <th><b>ORDER STATUS</b></th>
                                </tr>
                            </thead>
                            <tbody>
                                    {order.orders.data.map((o,i)=>{
                                        return <>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </>
                                    })}
                            </tbody>
                        </Table>

                        <br/>
                    <span>Showing {order.orders.from} to {order.orders.to} of {order.orders.total} entries</span>
                    <Button onClick={()=>dispatch(getPaginatedData(order.orders.next_page_url))} disabled={!order.orders.next_page_url} className="float-right" style={{background: '#166BA0'}}>
                        <FontAwesomeIcon icon={FA.faArrowRight}></FontAwesomeIcon>
                    </Button>
                    <Button onClick={()=>dispatch(getPaginatedData(order.orders.prev_page_url))} disabled={!order.orders.prev_page_url} className="float-right" style={{marginRight: '10px',background: '#166BA0'}}>
                        <FontAwesomeIcon icon={FA.faArrowLeft}></FontAwesomeIcon>
                    </Button>

                    </div>
                 : ''
            }

 
        </div>
    )
}

export default OrderRecordsComponent