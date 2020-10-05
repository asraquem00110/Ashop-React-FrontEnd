import React, {useEffect,useState,useRef} from 'react'
import {useSelector} from 'react-redux'

const PaypalButton = (props)=>{

    const paypalref = useRef()
    const [renderBtn , setRenderBtn] = useState(true)

    useEffect(()=>{

        if(Object.keys(props.userinfo).length > 0 && renderBtn){
            window.paypal.Button.render({
                env: 'sandbox', // Or 'production'
                style: {
                  size: 'small',
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
                    let paymentData = props.userinfo
                    paymentData.computeTotal = props.totalamount
                    paymentData.deliverycharge = props.deliverycharge

                    console.log(paymentData)
                
                //   return actions.request.post('/api/create-payment', {})
                //     .then(function(res) {
                //         return res.id;
                //     });
                return
                },
                onAuthorize: async function(data, actions) {
                  return actions.request.post('/api/execute-payment', {
                    paymentID: data.paymentID,
                    payerID:   data.payerID
                  })
                    .then(function(paypalres) {
    
               
                    });
                }
              }, paypalref.current);
        }

   
    },[props.totalamount,props.userinfo,props.deliverycharge])

    return(
        <div style={{display: 'inline-block',marginRight: '10px'}} ref={paypalref}></div>
    )
}

export default PaypalButton