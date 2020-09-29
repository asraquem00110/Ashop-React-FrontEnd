import axios from 'axios'
import * as config from '../config'

export const Actions = {
    GET_CATEGORY: 'PRODUCT_GET_CATEGORIES',
    GET_PRODUCTS: 'PRODUCT_GET_PRODUCTS'
}


export const getCategories = () => async dispatch =>{
    try {
        let data = await axios.get(`${config.backendapi}getCategories`)
        dispatch({
            type: Actions.GET_CATEGORY,
            payload: data.data.categories.data
        })
    }catch(e){
        console.log(e)
    }
}

export const getProducts = () => async dispatch =>{
    try {
        let data = await axios.get(`${config.backendapi}getProducts`)
        console.log(data)
        dispatch({
            type: Actions.GET_PRODUCTS,
            payload: data.data
        })
    }catch(e){
        console.log(e)
    }
}
