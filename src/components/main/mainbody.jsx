import React , {useEffect} from 'react'
import Banner from './banner'
import Product from './product'
import Category from './category'
import {useDispatch} from 'react-redux'
import {getCsrfToken} from '../../actions/csrf'
import {getCategories,getProducts} from '../../actions/product'

const MainBody = (props)=>{
    const dispatch = useDispatch()

    // // if csrf / XSRF-TOKEN cookie is not set in backend server used this to fetch csrf token from backend and attach to default header of axios
    // dispatch(getCsrfToken()).then(()=>{
    //     dispatch(getCategories())
    //     dispatch(getProducts())
    // })

    // initialize categories and products in store
    dispatch(getCategories())
    dispatch(getProducts())
    
    return (
        <div>
            <Category/>
            <div id="MainBody">
                <Banner title={props.name}/>
                <Product/>
            </div>
        </div>
    )
}

export default MainBody