import React , { useEffect ,useState}  from 'react'
import './index.css'
import UserNav from './nav'
import {setnav} from './setnav.js'
import {Row,Col,Card,Table,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { imgUrl } from '../../config'
import {updateqty,paypalCreatePayment,removeItemCart} from '../../actions/cart'
import {getInfo as getUserInfo} from '../../actions/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  * as FA from '@fortawesome/free-solid-svg-icons'
import CheckoutModal from './CheckoutModal'


const CartComponent = (props) =>{

    const dispatch = useDispatch()
    const items = useSelector(state=>state.cart.items)
    const userinfo = useSelector(state=>state.user.userinfo)
    const [deliverycharge,setDeliverycharge] = useState(50)
    const [totalamount,setTotalamount] = useState(0)
    const [showcheckout,setShowcheckout] = useState(false)

    const removeItem = (index)=>{
        if(window.confirm("Remove this item?")){
            dispatch(removeItemCart(index))
        }
    }

    useEffect(()=>{
        calculateAmount()
    },[items])

    const calculateAmount = ()=>{
        let total = 0
        items.forEach((item)=>{
            total += (item.quantity * item.product.price)
        })
        setTotalamount(total)
    }

    useEffect(()=>{
        setnav(2)
        dispatch(getUserInfo())
    },[])

    return (
        <div id="MainBody">
            <UserNav />
            <br/>
            <h1>My Cart</h1>
            <Card>
                  {/* <Card.Header>&nbsp;</Card.Header> */}
                  <Card.Body>
                  <Table responsive variant="light">
                        <thead>
                            <tr style={{background: '#343A40',color: 'white'}}>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Amount</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                           {
                               items.map((item,index)=>{
                                   return <>
                                    <tr>
                                        <td><img src={`${imgUrl}${item.product.img}`} style={{height: '80px', width: '100px'}}/></td>
                                        <td>{item.product.product}<hr/><small>{item.product.description}</small></td>
                                        <td><input onChange={(e)=>dispatch(updateqty({index: index,pcs: e.target.value}))} type="number" value={item.quantity}/></td>
                                        <td>P { item.product.price }</td>
                                        <td>P { (item.quantity * item.product.price) }</td>
                                        <td><Button onClick={()=>removeItem(index)} variant="danger"><FontAwesomeIcon icon={FA.faTimes}></FontAwesomeIcon></Button></td>
                                    </tr>
                                    </>
                               })
                           }
                        </tbody>
                        </Table>
                  </Card.Body>
            </Card>

            <br/>
            <div style={{marginBottom: '100px'}}>
                <span className="cartdetails">AMOUNT : P {totalamount}<br/>DELIVERY CHARGE : P {deliverycharge}</span>
                <br/>
                <span className="cartdetails">TOTAL: P {totalamount+deliverycharge}</span>
                <hr/>
                {
                    items.length > 0 ?  <Button onClick={()=>setShowcheckout(true)} variant="outline-secondary" className="float-right" style={{fontWeight: 'bold'}}>CHECKOUT</Button> : ''
                }
               
            </div>

            <CheckoutModal userinfo={userinfo} totalamount={totalamount} deliverycharge={deliverycharge} show={showcheckout} closemodal={(status)=>setShowcheckout(status)}/>

          
        </div>
    )
}

export default CartComponent