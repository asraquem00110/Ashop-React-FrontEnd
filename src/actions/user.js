import axios from 'axios'
import * as config from '../config'

export const Actions = {
    SIGNIN_USER: 'SIGNIN_USER',
    SIGNOUT_USER: 'SIGNOUT_USER',
}

export const sign_in = (user) => (dispatch,getState) => {
    return new Promise(async(resolve,reject)=>{
        try {
            let res = await axios.post(`${config.backendapi}login`,user)     
            if(!res.data.errors && !res.data.message){
                const token = res.data.access_token
                const userinfo = res.data.user
                
                localStorage.setItem("loguser",userinfo.name)
                localStorage.setItem("token",token)

                   dispatch({
                        type: Actions.SIGNIN_USER,
                        payload: {token: token, user: userinfo}
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
            let res = await axios.post(`${config.backendapi}register`,user)  
            resolve(res)
        }catch(e){
            console.log(e)
            reject(e)
        }
    })
}

export const sign_out = () => async (dispatch, getState) =>{
    localStorage.removeItem('token')
    localStorage.removeItem('loguser')

    try {
        await axios.post(`${config.backendapi}logout`)
        dispatch({
            type: Actions.SIGNOUT_USER,
            payload: {}
        })
    }catch(e){
        console.log(e)
    }

 
}