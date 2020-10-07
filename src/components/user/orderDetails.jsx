import React , { useEffect ,useState}  from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  {faTimes}from '@fortawesome/free-solid-svg-icons'
import {Button,Table} from 'react-bootstrap'
import { imgUrl } from '../../config'

const OrderDetails = ({order,close,checkstatus})=>{
    const [deliverycharge,setDeliverycharge] = useState(50)
    const [totalamount,setTotalamount] = useState(0)

    const calculateAmount = ()=>{
        let total = 0
        order.product.forEach((item)=>{
            total += (item.pivot.quantity * item.price)
        })
        setTotalamount(total)
    }

    useEffect(()=>{
        calculateAmount()
    },[])

    return (
        <div>
           <Button onClick={()=>close()} variant="outline-secondary"><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon> Close</Button>
           <hr/>
           <Table striped responsive>
               <tbody>
                    <tr>
                        <td colSpan="4" style={{textAlign:'center !important',background:'dimgray'}}><span style={{color:'white',fontWeight:'bold',fontSize:'16pt'}}>ORDER ID: {order.id}</span></td>
                    </tr>

                    <tr>
                        <td>ORDER DATE:</td>
                        <td>{ window.$helper.formatBdayDate(order.created_at) }</td>
                        <td>PAYMENT TYPE:</td>
                        <td>{order.payment}</td>
                    </tr>
                    <tr>
                        <td>ORDER STATUS:</td>
                        <td>
                            {
                                order.status === 0 ? <span style={{color: 'maroon'}}>{checkstatus(order.status)}</span> : <span style={{color: 'green'}}>{checkstatus(order.status)}</span>
                            }
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>FULLNAME:</td>
                        <td>{order.name}</td>
                        <td>EMAIL ADD:</td>
                        <td>{order.email}</td>
                    </tr>
                    <tr>
                        <td>ADDRESS:</td>
                        <td>{order.address}</td>
                        <td>CONTACT:</td>
                        <td>{order.contact}</td>
                    </tr>
						
               </tbody>


           </Table>
           <Table responsive variant="light">
                        <thead>
                            <tr style={{background: '#343A40',color: 'white'}}>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                order.product.map((item,index)=>{
                                    return <>
                                     <tr key={index}>
                                        <td><img  alt="product" src={`${imgUrl}${item.img}`} style={{height: '80px', width: '100px'}}/></td>
                                        <td>{item.product}<hr/><small>{item.description}</small></td>
                                        <td>{item.pivot.quantity}</td>
                                        <td>P { item.price }</td>
                                        <td>P { (item.pivot.quantity * item.price) }</td>
                                    </tr>
                                    </>
                                })
                            }
                        </tbody>
            </Table>

            <hr/>
        
            <div style={{marginBottom: '100px'}}>
                <span className="cartdetails">AMOUNT : P {totalamount}<br/>DELIVERY CHARGE : P {deliverycharge}</span>
                <br/>
                <span className="cartdetails">TOTAL: P {totalamount+deliverycharge}</span>
                <hr/>
             
            </div>
        
        </div>
    )
}

export default OrderDetails