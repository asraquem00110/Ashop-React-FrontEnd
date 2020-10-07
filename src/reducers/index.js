import productReducer from './product'
import userReducer from './user'
import cartReducer from './cart'
import orderReducer from './order'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    product: productReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
})

export default allReducers