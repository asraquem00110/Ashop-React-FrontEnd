import axios from 'axios'
import * as config from '../config'

export const Actions = {
    CART_ADDTOWISH: 'CART_ADDTOWISH',
    CART_ADDTOCART: 'CART_ADDTOCART',
    CART_CREATEPAYMENT: 'CART_CREATEPAYMENT',
    CART_EXECUTEPAYMENT: 'CART_EXECUTEPAYMENT',
    CART_GETITEMS: 'CART_GETITEMS',
    CART_UPDATEQTY: 'CART_UPDATEQTY',
    CART_REMOVEITEM: 'CART_REMOVEITEM',
    CART_CODPAYMENT: 'CART_CODPAYMENT'
}

export const removeItemCart = (index) => async (dispatch,getState) => {
    let items = getState().cart.items
    let id = items[index].id
    try {
        let res = await axios.delete(`${config.backendapi}removeCart/${id}`)
        dispatch({
            type: Actions.CART_REMOVEITEM,
            payload: index
        })
    }catch(e){
        console.log(e)
    }
}

export const updateqty = ({index,pcs}) => async (dispatch, getState) =>{
    try {
        let state = getState()
        let product = state.cart.items[index]
        let res = await axios.patch(`${config.backendapi}updateCart`,{product: product, quantity: pcs})
        dispatch({
            type: Actions.CART_UPDATEQTY,
            payload: {
                index: index,
                data: res.data.cart
            }
        })
    }catch(e){
        console.log(e)
    }
}

export const cartItems = () => async (dispatch, getState) =>{
    try {
        let data = await axios.post(`${config.backendapi}getCart`)
        let items = data.data.cart
        dispatch({
            type: Actions.CART_GETITEMS,
            payload: items
        })
    }catch(e){
        console.log(e)
    }
}

export const paypalCreatePayment = (data,actions,userinfo) => async (dispatch,getState) =>{
        return actions.request.post(`${config.backendapi}create-payment`, userinfo)
            .then(function(res) {
                return res.id;
            });
}

export const codPayment = (userinfo) => async (dispatch,getState) =>{
    const items = getState().cart.items
    userinfo.items = items
    return new Promise(async (resolve,reject)=>{

        try{
            let res = await axios.post(`${config.backendapi}createOrderCOD`,userinfo)
            dispatch({
                type: Actions.CART_EXECUTEPAYMENT
            })
            window.$toastr.success('Order Created!', 'Cash On Delivery')
            resolve({msg: 'Order Created'})
        }catch(e){
            reject(e)
        }
    })
}

export const paypalExecutePayment = (data,actions,userinfo) => async (dispatch,getState)=>{
    return new Promise((resolve,reject)=>{
        const items = getState().cart.items
        return actions.request.post(`${config.backendapi}execute-payment`, {
            paymentID: data.paymentID,
            payerID:   data.payerID
        })
        .then(async (paypalres)=>{
            userinfo.paypalData = paypalres
            userinfo.items = items
    
            let result = await axios.post(`${config.backendapi}createOrderPay`,userinfo)
            return result
        })
        .then(response=>{
            dispatch({
                type: Actions.CART_EXECUTEPAYMENT
            })
            window.$toastr.success('Order Created!', 'Paypal Payment')
            resolve({msg: 'Order Created'})
        })
        .catch(err=>reject(err))
    
    
    })
}

export const addToWish = (product)=> async (dispatch,getState) =>{
    try {
        // axios.post(`API_REQUEST`,{type: 'POST' ,url: 'addtowishlist', data: null})
        axios.post(`${config.backendapi}addtowishlist`,product)
            .then((res)=>{
                // console.log(res.response)
                window.$toastr.success('Successfully added to wishlist!', 'Simple Online Shop')
            })
            .catch((err)=>{
                if(err.response.status === 401) window.$toastr.error('You must login first!', 'Simple Online Shop')
            })
    }catch(e){
        console.log(e)
    }
}

export const addToCart = (product)=> (dispatch,getState) => {
        
    // axios.post(`API_REQUEST`,{type: 'POST' ,url: 'addtocart', data: product})
    axios.post(`${config.backendapi}addtocart`,product)
        .then((res)=>{
            // console.log(res.response)
            window.$toastr.success('Successfully added to cart!', 'Simple Online Shop')
            dispatch({
                type: Actions.CART_ADDTOCART,
                payload: res.data.cartdetails
            })
        })
        .catch((err)=>{
            if(err.response.status === 401) window.$toastr.error('You must login first!', 'Simple Online Shop')
        })
    
}