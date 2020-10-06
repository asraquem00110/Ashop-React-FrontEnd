import React , {useEffect} from 'react'
import {getProducts,getPaginatedData} from '../../actions/product'
import {addToWish,addToCart} from '../../actions/cart'
import {useSelector,useDispatch} from 'react-redux'
import { Col , Row , Button} from 'react-bootstrap'
import {imgUrl} from '../../config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  * as FA from '@fortawesome/free-solid-svg-icons'


const Product = ()=>{
    const dispatch = useDispatch()
    const product = useSelector(state=>state.product.products)

    const productdiv = {
        height: '100%',
        widht: '100%',
        padding: '10px',
        // border: '1px solid silver',
    }

    const productimg = {
        width: '70%',
        maxHeight: '150px',
        borderRadius: '10px',
        marginLeft: '15%',
        marginBottom: '20px'
    }

    useEffect(()=>{
       dispatch(getProducts())
    },[])

    return(
        <div style={{padding: '0px 5px'}}>

            <Row>
                {
                    product.products.data.map((product,index)=>{
                        return <>
                             <Col key={index} lg={3} md={4} sm={6} xs={12} style={productdiv}>
                                    <div style={{height: '100%',width: '100%', border: '0.5px solid silver',padding: '10px'}}>
                                            <img style={productimg} src={`${imgUrl}${product.img}`} alt="Product"/>
                                            
                                             <p style={{fontWeight: 'bold',color: 'dimgray', margin: '2px 0px'}}>{product.product}</p>
                                            <span style={{fontWeight: 'normal',fontSize: '10pt'}}>{product.description}</span>
                                            <p style={{color: '#3D4792'}}>P {window.$helper.roundToDecimal(product.price,2)}</p>
                                            
                                            <div style={{marginTop: '15px'}}>
                                                 <Button onClick={()=>dispatch(addToWish(product))} style={{marginRight: '10px', background: '#EFEFEF', color: '#000000', border: 'none'}}><FontAwesomeIcon icon={FA.faHeart}></FontAwesomeIcon></Button>
                                                 <Button onClick={()=>dispatch(addToCart(product))} style={{marginRight: '10px', background: '#EFEFEF', color: '#000000', border: 'none'}}><FontAwesomeIcon icon={FA.faCartPlus}></FontAwesomeIcon></Button>
                                            </div>
                                          
                                    </div>
                             </Col> 
                        </>
                    })
                }
               
        
            </Row>

            <br/>
            <span>Showing {product.products.from} to {product.products.to} of {product.products.total} entries</span>
            <Button onClick={()=>dispatch(getPaginatedData(product.products.next_page_url))} disabled={!product.products.next_page_url} className="float-right" style={{background: '#166BA0'}}>
                <FontAwesomeIcon icon={FA.faArrowRight}></FontAwesomeIcon>
            </Button>
            <Button onClick={()=>dispatch(getPaginatedData(product.products.prev_page_url))} disabled={!product.products.prev_page_url} className="float-right" style={{marginRight: '10px',background: '#166BA0'}}>
                <FontAwesomeIcon icon={FA.faArrowLeft}></FontAwesomeIcon>
            </Button>

        </div>
    )
}

export default Product