import productReducer from './product'
import userReducer from './user'
import cartReducer from './cart'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    product: productReducer,
    user: userReducer,
    cart: cartReducer,
})

export default allReducers