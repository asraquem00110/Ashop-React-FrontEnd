import axios from 'axios'
export const Actions = {
    CART_ADDTOWISH: 'CART_ADDTOWISH',
    CART_ADDTOCART: 'CART_ADDTOCART',
}

export const addToWish = ()=> async (dispatch,getState) =>{
    try {
        axios.post(`API_REQUEST`,{type: 'POST' ,url: 'addtowishlist', data: null})
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

export const addToCart = ()=> (dispatch,getState) => {
        
    axios.post(`API_REQUEST`,{type: 'POST' ,url: 'addtocart', data: null})
        .then((res)=>{
            // console.log(res.response)
        })
        .catch((err)=>{
            if(err.response.status === 401) alert("You must Login First")
        })
    
}