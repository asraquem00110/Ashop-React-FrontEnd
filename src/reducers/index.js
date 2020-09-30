import productReducer from './product'
import userReducer from './user'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    product: productReducer,
    user: userReducer,
})

export default allReducers