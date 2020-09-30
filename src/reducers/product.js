
import {Actions} from '../actions/product'

const initialState = {
    products: {
        products: {
            data: [],
        }
    },
    categories: [],
}

const productReducer = (state = initialState, action) => {
    switch(action.type){

        case Actions.GET_CATEGORY:
            return {
                categories: action.payload,
                products: state.products
            }
        case Actions.GET_PRODUCTS:
            return {
                categories: state.categories,
                products: action.payload
            }
        default: 
            return state
    }
}

export default productReducer