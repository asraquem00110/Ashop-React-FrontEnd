import React , {useEffect} from 'react'
import {getProducts} from '../../actions/product'
import {useSelector,useDispatch} from 'react-redux'
const Product = ()=>{
    const dispatch = useDispatch()
    const product = useSelector(state=>state.product.products)

    useEffect(()=>{
        dispatch(getProducts())
    },[])

    return(
        <div>
            I am Product Page
            <div>
            <pre>{JSON.stringify(product)}</pre>
            </div>
        </div>
    )
}

export default Product