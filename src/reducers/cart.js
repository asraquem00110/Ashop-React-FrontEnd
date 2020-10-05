import {Actions} from '../actions/cart'

const initialState = {
    items: []
}

const cartReducer = (state = initialState , action )=>{
    switch(action.type){
        case Actions.CART_GETITEMS:
            state.items = action.payload
            return state
        case Actions.CART_ADDTOWISH:
            return state
        case Actions.CART_UPDATEQTY:
            state.items[action.payload.index] = action.payload.data[0]
            return {items: [...state.items]}
        case Actions.CART_ADDTOCART:
            if(state.items.length > 0){
                let res = 0
                for(let item of state.items){
                    if(item.product.id === action.payload[0].product_id && item.user_id === action.payload[0].user_id){
                        item.quantity = item.quantity + 1
                        res = 1
                        break
                    }
                    res = 0
                }

                if(!res) state.items.push(action.payload[0])
            }else{
                state.items.push(action.payload[0])
            }

            return {...state,items: [...state.items]}
        default: 
            return state
    }
}

export default cartReducer