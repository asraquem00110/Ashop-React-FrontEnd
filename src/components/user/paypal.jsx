import React, {useEffect,useState,useRef} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {paypalCreatePayment,paypalExecutePayment} from '../../actions/cart'

const PaypalButton = (props)=>{

    const paypalref = useRef()
    const [renderBtn , setRenderBtn] = useState(true)

    const dispatch = useDispatch()

    useEffect(()=>{

        if(Object.keys(props.userinfo).length > 0 && renderBtn){
            window.paypal.Button.render({
                env: 'sandbox', // Or 'production'
                style: {
                  size: 'medium',
                  color: 'white',
                  shape: 'pill',
                },
                onEnter: function(){
                    setRenderBtn(false)
                },
                onShippingChange: function(data, actions) {
                    // ...
                },
                payment: function(data, actions) {  
                    return dispatch(paypalCreatePayment(data,actions,props.userinfo))
                },
                onAuthorize: async function(data, actions) {
                    return dispatch(paypalExecutePayment(data,actions,props.userinfo))
                }
              }, paypalref.current);
        }

   
    },[props.totalamount,props.userinfo,props.deliverycharge])

    return(
        <div style={{display: 'inline-block',marginRight: '10px'}} ref={paypalref}></div>
    )
}

export default PaypalButton