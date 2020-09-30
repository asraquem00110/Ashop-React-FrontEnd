import axios from 'axios'
import * as config from '../config'

export const Actions = {
    GET_CATEGORY: 'PRODUCT_GET_CATEGORIES',
    GET_PRODUCTS: 'PRODUCT_GET_PRODUCTS',
    GET_PAGINATEDATA: 'GET_PAGINATEDATA',
    GET_BYCATEGORY: 'GET_BYCATEGORY',
}

export const getBySearch = (search) => async dispatch =>{
    try {
        let data = await axios.get(`${config.backendapi}getBySearch/${search}`)
        dispatch({
            type: Actions.GET_PRODUCTS,
            payload: data.data
        })
    }catch(e){
        console.log(e)
    }  
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

export const getByCategory = (categoryId) => async dispatch =>{
    try {
        let data = await axios.get(`${config.backendapi}getByCategory/${categoryId}`)
        dispatch({
            type: Actions.GET_PRODUCTS,
            payload: data.data
        })
    }catch(e){
        console.log(e)
    }  
}

export const getPaginatedData = (url) => async dispatch => {
    try {
        let data = await axios.get(url)
        dispatch({
            type: Actions.GET_PRODUCTS,
            payload: data.data
        })
    }catch(e){
        console.log(e)
    }
}

export const getProducts = () => async dispatch =>{
    try {
        let data = await axios.get(`${config.backendapi}getProducts`)
        dispatch({
            type: Actions.GET_PRODUCTS,
            payload: data.data
        })
    }catch(e){
        console.log(e)
    }
}
