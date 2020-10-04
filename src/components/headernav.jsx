import React, { useState } from 'react'
import { Container, Row, Col , Form ,InputGroup, FormControl} from 'react-bootstrap'
import './headernav.css'
import logo from '../logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  * as FA from '@fortawesome/free-solid-svg-icons'
import {Link, withRouter} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import SignInModal from './sigin'
import RegisterModal from './register'
import {sign_out} from '../actions/user'


const HeaderNav = (props)=>{
    console.log(props)

    const dispatch = useDispatch()

    const imgstyle = {
        height: '50px',
        width: '50px',
        padding: 0,
    }

    const user = useSelector(state=>state.user.loginfo)

    const [showSignin, setShowSignin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)

    const logout = ()=>{
        if(window.confirm("Are you sure you want to logout?")){
            dispatch(sign_out())
        }
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
  
                            <Link style={{textDecoration: 'none'}} to="/"><span style={{fontSize: '22pt',fontFamily: `'Lobster', cursive`, color: '#000000'}}><img src={logo} style={imgstyle}></img>Simple  <span style={{color: '#097EEB'}}>Online Shop</span></span></Link>
                                   
                       </Col>
                       <Col md={6}>
                           <ul className="float-right">
                                <li>
                                <span className="float-right text-primary linknav"><FontAwesomeIcon icon={FA.faCartPlus} /></span>
                                </li>
                                <li>
                                <span className="float-right text-primary linknav"><FontAwesomeIcon icon={FA.faUser} /></span>
                                </li>
                                <li>
                                   
                                        <span>Welcome!</span><br/>
                                        {
                                            user === "guest" ? <small style={{fontSize: '10pt',padding: 0,margin: 0}}><a href="javascript:void(0)" onClick={()=>setShowSignin(true)}>Sign in</a> | <a href="javascript:void(0)" onClick={()=>setShowRegister(true)}>Register</a></small> : <small>{user} | <a href="javascript:void(0)" onClick={()=>logout()}>Logout</a></small>
                                        }
                                        
                                   
                                </li>
                           </ul>
                       
                     
                       </Col>
                   </Row>
             

           </div>

           <SignInModal show={showSignin} closemodal={(status)=>setShowSignin(status)}/>
           <RegisterModal show={showRegister} closemodal={(status)=>setShowRegister(status)}/>

    
        </div>
    )
}

export default withRouter(HeaderNav)