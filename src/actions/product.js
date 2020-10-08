import axios from 'axios'
import {RedirectIfUnauthenticated} from './redirect'

export const Actions = {
    GET_CATEGORY: 'PRODUCT_GET_CATEGORIES',
    GET_PRODUCTS: 'PRODUCT_GET_PRODUCTS',
    GET_PAGINATEDATA: 'GET_PAGINATEDATA',
    GET_BYCATEGORY: 'GET_BYCATEGORY',
}

export const getBySearch = (search) => async (dispatch,getState) =>{
    try {
        console.log(getState())
        let data = await axios.post(`API_REQUEST`,{type: 'GET' ,url: `getBySearch/${search}`, data: null})
        dispatch({
            type: Actions.GET_PRODUCTS,
            payload: data.data
        })
    }catch(e){
        console.log(e)
        RedirectIfUnauthenticated(e)
    }  
}


export const getCategories = () => async (dispatch,getState) =>{
    try {
        let data = await axios.post(`API_REQUEST`,{type: 'GET' ,url: `getCategories`, data: null})
        console.log(data)
        dispatch({
            type: Actions.GET_CATEGORY,
            payload: data.data.categories.data
        })
    }catch(e){
        console.log(e)
        RedirectIfUnauthenticated(e)
    }
}

export const getByCategory = (categoryId) => async (dispatch,getState) =>{
    try {
        let data = await axios.post(`API_REQUEST`,{type: 'GET' ,url: `getByCategory/${categoryId}`, data: null})
        dispatch({
            type: Actions.GET_PRODUCTS,
            payload: data.data
        })
    }catch(e){
        console.log(e)
        RedirectIfUnauthenticated(e)
    }  
}

export const getPaginatedData = (url) => async (dispatch,getState) => {
    try {
        let data = await axios.post(`API_REQUEST`,{type: 'GET' ,url: url, data: null, completeurl: true})
        dispatch({
            type: Actions.GET_PRODUCTS,
            payload: data.data
        })
    }catch(e){
        console.log(e)
        RedirectIfUnauthenticated(e)
    }
}

export const getProducts = () => async (dispatch,getState) =>{
    try {
        let data = await axios.post(`API_REQUEST`,{type: 'GET' ,url: `getProducts`, data: null})
        dispatch({
            type: Actions.GET_PRODUCTS,
            payload: data.data
        })
    }catch(e){
        console.log(e)      
        RedirectIfUnauthenticated(e) 
    }
}
