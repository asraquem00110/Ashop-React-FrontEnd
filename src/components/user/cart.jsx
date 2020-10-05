import React , { useEffect ,useState}  from 'react'
import './index.css'
import UserNav from './nav'
import {setnav} from './setnav.js'
import {Row,Col,Card,Table,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { imgUrl } from '../../config'
import {updateqty,paypalCreatePayment} from '../../actions/cart'
import {getInfo as getUserInfo} from '../../actions/user'
import PaypalButton  from "./paypal";


const CartComponent = (props) =>{

    const dispatch = useDispatch()
    const items = useSelector(state=>state.cart.items)
    const userinfo = useSelector(state=>state.user.userinfo)
    const [deliverycharge,setDeliverycharge] = useState(100)
    const [totalamount,setTotalamount] = useState(0)

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
                                        <td></td>
                                    </tr>
                                    </>
                               })
                           }
                        </tbody>
                        </Table>
                  </Card.Body>
            </Card>

            <br/>
            <div>
                <span className="cartdetails">AMOUNT : P {totalamount}<br/>DELIVERY CHARGE : P {deliverycharge}</span>
                <br/>
                <span className="cartdetails">TOTAL: P {totalamount+deliverycharge}</span>
                <hr/>
                <span className="cartdetails" style={{color: 'dimgray'}}>Proceed to Payment . . .</span>
                <hr/>
            </div>

            <div style={{position: 'relative',margin: '10px'}}>
                <PaypalButton userinfo={userinfo} totalamount={totalamount} deliverycharge={deliverycharge}/>
                <button className="btn btn-default" style={{border: '1px solid black',display: 'inline-block',position: 'absolute',borderRadius: '50px',fontSize: '10pt', padding: '2px 50px'}}>Cash On Delivery</button>
            </div>
        </div>
    )
}

export default CartComponent