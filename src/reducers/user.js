
import {Actions} from '../actions/user'
const initialState = {
    loginfo: localStorage.getItem("loguser") || 'guest',
    token: localStorage.getItem('token') || '',
}
const userReducer = (state = initialState , action)=>{
    switch(action.type){
        case Actions.SIGNIN_USER:
            return {
                loginfo: localStorage.getItem("loguser"),
                token: localStorage.getItem("token")
            }
        case Actions.SIGNOUT_USER: 
            return {
                loginfo: 'guest',
                token: ''
            }
        default: 
            return state    
    }
}

export default userReducer