import React from 'react'

import { Container, Row, Col , Form ,InputGroup, FormControl} from 'react-bootstrap'
import './headernav.css'
import logo from '../logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  * as FA from '@fortawesome/free-solid-svg-icons'
import {withRouter} from 'react-router-dom'


const HeaderNav = (props)=>{
    console.log(props)
    const imgstyle = {
        height: '50px',
        width: '50px',
        padding: 0,
    }
    return(
        <div>
           <div style={
               {
                   width: '100%',
                   background: 'white',
                   borderBottom: '0.5px solid silver',
                   padding: '20px 50px'
               }
           }>
              
                   <Row>
                       <Col md={6}>
  
                            <span style={{fontSize: '22pt',fontFamily: `'Lobster', cursive`}}><img src={logo} style={imgstyle}></img>Simple  <span style={{color: '#097EEB'}}>Online Shop</span></span>
                                   
                       </Col>
                       <Col md={6}>
                           <ul class="float-right">
                                <li>
                                <span class="float-right text-primary linknav"><FontAwesomeIcon icon={FA.faCartPlus} /></span>
                                </li>
                                <li>
                                <span class="float-right text-primary linknav"><FontAwesomeIcon icon={FA.faUser} /></span>
                                </li>
                                <li>
                                   
                                        <span>Welcome!</span><br/>
                                        <small style={{fontSize: '10pt',padding: 0,margin: 0}}><a href="javascript:void(0)">Sign in</a> | <a href="javascript:void(0)">Register</a></small>
                                   
                                </li>
                           </ul>
                       
                     
                       </Col>
                   </Row>
             

           </div>

    
        </div>
    )
}

export default withRouter(HeaderNav)