import {Actions} from '../actions/csrf'

const csrfReducer = (state = "" , action ) => {
    switch(action.type){
        case Actions.GET_TOKEN:
            console.log(`token is ${action.payload}`)
            return action.payload
        default: 
            return state
    }
}

export default csrfReducer