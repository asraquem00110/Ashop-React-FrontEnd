import {Actions} from '../actions/order'
const initialState = {
    orders: {
       data: []
    }
}

const orderReducer = (state = initialState , action )=>{
    switch(action.type){
        case Actions.ORDER_GETLIST: 
            return action.payload
        default: 
            return state
    }

}

export default orderReducer