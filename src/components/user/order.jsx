import React , {useEffect} from 'react'
import UserNav from './nav'
import {setnav} from './setnav.js'
import {Row,Col, Form , Table , Button } from 'react-bootstrap'
import { useState } from 'react'
import {getOrders,getPaginatedData,getBySearch} from '../../actions/order'
import {useSelector,useDispatch} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  * as FA from '@fortawesome/free-solid-svg-icons'
import OrderDetails from './orderDetails'


const OrderRecordsComponent = ()=>{
    const dispatch = useDispatch()
    const order = useSelector(state=>state.order)

    const [showRecord,setShowRecord] = useState(false)
    const [activeRecord,setActiveRecord] = useState(null)
    const [search,setSearch] = useState("")
    const [typingTimer,setTypingTimer] = useState(null)

    useEffect(()=>{
        setnav(1)  
        dispatch(getOrders())
    },[])

    useEffect(()=>{
        clearTimeout(typingTimer)
        if(search.length > 0){
            setTypingTimer(setTimeout(()=>{
               dispatch(getBySearch(search))
            },100)
            )
        }else{
            dispatch(getOrders())
        }
    },[search])


    const viewRecord = (order) => {
        setShowRecord(true)
        setActiveRecord(order)
    }

    const checkstatus = (status) => {
        let statuscomment = ""
        if(status === 0){
            statuscomment = 'Pending'
        }else if(status === 1){
            statuscomment = 'For Delivery'
        }else{
            statuscomment = 'Delivered'
        }
        return statuscomment
    }

    return (
        <div id="MainBody">
            <UserNav />
            <br/>
           
            {
                !showRecord 
                ?  
                <div>
                     <h1>My Records</h1>
                        <Row>
                            <Col md={6}>
                                <Form.Control value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="Search Via Order Number ..."/>
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
                                                <td><button onClick={()=>viewRecord(o)} style={{color:'green',fontWeight:'bold'}} className="form-control">{ o.id}</button></td>
                                                <td>{window.$helper.formatBdayDate(o.created_at)}</td>
                                                <td>{o.payment}</td>
                                                <td>
                                                    {
                                                        o.status === 0 ? <span style={{color: 'maroon'}}>{checkstatus(o.status)}</span> : <span style={{color: 'green'}}>{checkstatus(o.status)}</span>
                                                    }
                                                </td>
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
                 : <OrderDetails order={activeRecord} close={()=>setShowRecord(false)} checkstatus={(status)=>checkstatus(status)}/>
            }

 
        </div>
    )
}

export default OrderRecordsComponent