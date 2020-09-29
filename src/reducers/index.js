import productReducer from './product'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    product: productReducer,
})

export default allReducers