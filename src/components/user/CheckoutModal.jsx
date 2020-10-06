import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React , {useState,useRef,useEffect} from 'react'
import { Modal,Button,Form,Table} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {codPayment} from '../../actions/cart'
import PaypalBtn from './paypal'


const CheckoutModal = ({show,closemodal,userinfo,totalamount,deliverycharge})=>{

    userinfo.computeTotal = totalamount
    userinfo.deliverycharge = deliverycharge

    const handleClose = ()=>{
        closemodal(false)
    }
    
    const dispatch = useDispatch()

    const cod = ()=>{
        if(window.confirm("Proceed to Cash On Delivery?")){
           dispatch(codPayment(userinfo))
            .then((res)=>{
                handleClose()
            })
            .catch(err=>console.log(err))
        }
    }
 

    useEffect(()=>{
    
    },[])


    return (
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title><FontAwesomeIcon icon={faDollarSign}></FontAwesomeIcon> Checkout</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{padding: '20px'}}>

                    <Table>
                        <tbody>
                            <tr>
                                <td>Fullname</td>
                                <td>{userinfo.name}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{userinfo.email}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>{userinfo.address}</td>
                            </tr>
                            <tr>
                                <td>Contact</td>
                                <td>{userinfo.contact}</td>
                            </tr>
                        </tbody>
                    </Table>

                    <br/>
                    <div style={{marginBottom: '50px'}}>
                        <span className="cartdetails">AMOUNT : P {totalamount}<br/>DELIVERY CHARGE : P {deliverycharge}</span>
                        <br/>
                        <span className="cartdetails">TOTAL: P {totalamount+deliverycharge}</span>
                        <hr/>
                    </div>
                

                </Modal.Body>
                <Modal.Footer style={{position:'relative'}}>
                <div className="mr-auto">
                    <PaypalBtn userinfo={userinfo} closemodal={handleClose}/>
                </div>
                <Button onClick={()=>cod()} style={{position: 'absolute', top: '10px',borderRadius: '50px', padding: '5px 80px'}} variant="outline-dark">
                    Cash On Delivery
                </Button>
                </Modal.Footer>
            </Modal>
    )
}

export default CheckoutModal