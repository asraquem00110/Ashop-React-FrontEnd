import {Actions} from '../actions/cart'

const initialState = {

}

const cartReducer = (state = initialState , action )=>{
    switch(action.type){
        case Actions.CART_ADDTOWISH:
            return state
        default: 
            return state
    }
}

export default cartReducer