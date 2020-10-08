import axios from 'axios'
import {RedirectIfUnauthenticated} from './redirect'

export const Actions = {
    SIGNIN_USER: 'SIGNIN_USER',
    SIGNOUT_USER: 'SIGNOUT_USER',
    SET_USERINFO: 'SET_USERINFO'
}

export const getInfo = () => async (dispatch,getState) => {
     try {
        let res = await axios.post(`API_REQUEST`,{type: 'GET' ,url: `user`, data: null})
        let info = res.data
        dispatch({
            type: Actions.SET_USERINFO,
            payload: info
        })
     }catch(e){
         console.log(e)
         RedirectIfUnauthenticated(e)
     }
}

export const sign_in = (user) => (dispatch,getState) => {
    return new Promise(async(resolve,reject)=>{
        try {
            let res = await axios.post(`API_SIGN`,{type: 'POST' ,url: `login`, data: user})   
            if(!res.data.errors && !res.data.message){
                const userinfo = res.data.user
                localStorage.setItem("loguser",userinfo.name)
                   dispatch({
                        type: Actions.SIGNIN_USER,
                        payload: {user: userinfo}
                    })
                 }    
         
            resolve(res)
        }catch(e){
            console.log(e)
            reject(e)
        }  
    })

}

export const register = (user) => async (dispatch,getState)=>{

    return new Promise(async(resolve,reject)=>{
        try {
            let res = await axios.post(`API_REQUEST`,{type: 'POST' ,url: `register`, data: user})
            resolve(res)
        }catch(e){
            console.log(e)
            reject(e)
        }
    })
}

export const sign_out = () => async (dispatch, getState) =>{
   
    return new Promise(async (resolve,reject)=>{
        try {
            await axios.post(`API_LOGOUT`,{type: 'POST' ,url: `logout`, data: null})
            localStorage.removeItem('loguser')
            dispatch({
                type: Actions.SIGNOUT_USER,
                payload: {}
            })
            resolve()
            
        }catch(e){
            console.log(e)
            RedirectIfUnauthenticated(e)
            reject(e)
        }
    
    })

 
}