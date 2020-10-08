import axios from 'axios'
import {RedirectIfUnauthenticated} from './redirect'

export const Actions = {
    ORDER_GETLIST: 'ORDER_GETLIST'
}

export const getPaginatedData = (url) => async (dispatch,getState)=>{
    try {
        let data = await axios.post(`API_REQUEST`,{type: 'GET' ,url: url, data: null, completeurl: true})
        dispatch({
            type: Actions.ORDER_GETLIST,
            payload: data.data
        })
    }catch(e){
        console.log(e)
        RedirectIfUnauthenticated(e)
    }
}

export const getBySearch = (search) => async (dispatch,getState) =>{
    try {
        let res = await axios.post(`API_REQUEST`,{type: 'GET' ,url: `orderSearch/${search}`, data: null})
        dispatch({
            type: Actions.ORDER_GETLIST,
            payload: res.data
        })
    }catch(e){
        console.log(e)
        RedirectIfUnauthenticated(e)
    }
}

export const getOrders = () => async (dispatch,getState)=>{
    try {
        let res = await axios.post(`API_REQUEST`,{type: 'GET' ,url: `getUserOrders`, data: null})
        dispatch({
            type: Actions.ORDER_GETLIST,
            payload: res.data
        })
    }catch(e){
        console.log(e)
        RedirectIfUnauthenticated(e)
    }
}