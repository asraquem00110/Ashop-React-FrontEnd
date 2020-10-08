import axios from 'axios'

export const Actions = {
    GET_TOKEN: 'GET_TOKEN',
}

export const getCsrfToken = () => async (dispatch,getState)=>{
    return new Promise((resolve,reject)=>{
        axios.get('API_GETCSRFTOKEN').then((response)=>{
            let csrf = response.data.csrfToken
            axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf
            // dispatch({
            //     type: Actions.GET_TOKEN,
            //     payload: csrf
            // })
            resolve(csrf)
        }).catch(err=>reject(err))
    })
  
}