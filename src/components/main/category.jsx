import React , {useEffect,useState} from 'react'
import { Container, Row, Col , Form ,InputGroup, FormControl} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  * as FA from '@fortawesome/free-solid-svg-icons'
import {useSelector,useDispatch} from 'react-redux'
import {getCategories} from '../../actions/product'

import {withRouter} from 'react-router-dom'


const Category = (props)=>{

    const dispatch = useDispatch()
    const categories = useSelector(state => state.product.categories)


    const [search ,setSearch ] = useState("")

    useEffect(()=>{
        dispatch(getCategories())
    },[])
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
                    <li><span class="categorylink">All Categories</span></li>
                     {categories.map((category)=><li><span class="categorylink">{category.category}</span></li>)}
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