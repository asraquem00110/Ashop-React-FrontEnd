
import {Actions} from '../actions/user'
const initialState = {
    loginfo: localStorage.getItem("loguser") || 'guest',
    userinfo: {}
}
const userReducer = (state = initialState , action)=>{
    switch(action.type){
        case Actions.SIGNIN_USER:
            return {
                loginfo: localStorage.getItem("loguser"),
                userinfo: state.userinfo
            }
        case Actions.SIGNOUT_USER: 
            return {
                loginfo: 'guest',
                userinfo: state.userinfo
            }
        case Actions.SET_USERINFO:
            state.userinfo = action.payload
            return {...state}
        default: 
            return state    
    }
}

export default userReducer