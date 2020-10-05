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

}

export const paypalExecutePayment = (data,actions,userinfo) => async (dispatch,getState)=>{

}

export const addToWish = (product)=> async (dispatch,getState) =>{
    try {
        // axios.post(`API_REQUEST`,{type: 'POST' ,url: 'addtowishlist', data: null})
        axios.post(`${config.backendapi}addtowishlist`,product)
            .then((res)=>{
                // console.log(res.response)
            })
            .catch((err)=>{
                if(err.response.status === 401) alert("You must Login First")
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
            dispatch({
                type: Actions.CART_ADDTOCART,
                payload: res.data.cartdetails
            })
        })
        .catch((err)=>{
            if(err.response.status === 401) alert("You must Login First")
        })
    
}