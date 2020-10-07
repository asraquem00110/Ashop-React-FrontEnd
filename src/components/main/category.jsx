import React , {useEffect,useState} from 'react'
import { Container, Row, Col , Form ,InputGroup, FormControl} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  * as FA from '@fortawesome/free-solid-svg-icons'
import {useSelector,useDispatch} from 'react-redux'
import {getCategories,getProducts,getByCategory,getBySearch} from '../../actions/product'

import {withRouter} from 'react-router-dom'


const Category = (props)=>{

    const dispatch = useDispatch()
    const categories = useSelector(state => state.product.categories)

    const [typingTimer,setTypingTimer] = useState(null)
    const [search ,setSearch ] = useState("")

    useEffect(()=>{
        dispatch(getCategories())
    },[])

    useEffect(()=>{
        clearTimeout(typingTimer)
        if(search.length > 0){
            setTypingTimer(setTimeout(()=>{
               dispatch(getBySearch(search))
            },100)
            )
        }else{
            dispatch(getProducts())
        }
    },[search])
    return (
        <div style={
            {
                width: '100%',
             //    height: '50px',
                background: 'white',
                borderBottom: '0.5px solid silver',
                padding: '20px 50px'
            }
        }>
         <Row>
         <Col md={9}>
            <ul>
                    <li onClick={()=>dispatch(getProducts())}><span className="categorylink">All Categories</span></li>
                     {categories.map((category,index)=><li key={index} onClick={()=>dispatch(getByCategory(category.id))}><span className="categorylink">{category.category}</span></li>)}
            </ul>
          </Col>
            <Col md={3}>
                    <InputGroup>   
                        <FormControl
                            type="text"
                            placeholder="Search"
                            aria-label="Search"
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                        
                        />
                            <InputGroup.Prepend>
                                <InputGroup.Text  onClick={()=> props.history.push('/')} style={{cursor: 'pointer', background: '#166BA0', color: 'white'}}><FontAwesomeIcon icon={FA.faSearch}></FontAwesomeIcon></InputGroup.Text>
                            </InputGroup.Prepend>
                        </InputGroup>
                </Col>
            </Row>


        </div>
    )
}

export default withRouter(Category)