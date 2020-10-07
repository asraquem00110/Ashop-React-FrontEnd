import axios from 'axios'
import * as config from '../config'

export const Actions = {
    ORDER_GETLIST: 'ORDER_GETLIST'
}

export const getPaginatedData = (url) => async (dispatch,getState)=>{
    try {
        let data = await axios.get(url)
        dispatch({
            type: Actions.ORDER_GETLIST,
            payload: data.data
        })
    }catch(e){
        console.log(e)
    }
}

export const getBySearch = (search) => async (dispatch,getState) =>{
    try {
        let res = await axios.get(`${config.backendapi}orderSearch/${search}`)
        dispatch({
            type: Actions.ORDER_GETLIST,
            payload: res.data
        })
    }catch(e){
        console.log(e)
    }
}

export const getOrders = () => async (dispatch,getState)=>{
    try {
        let res = await axios.get(`${config.backendapi}getUserOrders`)
        dispatch({
            type: Actions.ORDER_GETLIST,
            payload: res.data
        })
    }catch(e){
        console.log(e)
    }
}