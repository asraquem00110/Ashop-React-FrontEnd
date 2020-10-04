import axios from 'axios'
import * as config from '../config'

export const Actions = {
    CART_ADDTOWISH: 'CART_ADDTOWISH',
    CART_ADDTOCART: 'CART_ADDTOCART',
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
        
    axios.post(`API_REQUEST`,{type: 'POST' ,url: 'addtocart', data: product})
        .then((res)=>{
            // console.log(res.response)
        })
        .catch((err)=>{
            if(err.response.status === 401) alert("You must Login First")
        })
    
}