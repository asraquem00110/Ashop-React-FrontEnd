import React from 'react'
import {Row,Col,Card} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  * as FA from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const UserNav = ()=>{
    return (
        <Row>    
            <Col md={12}>
                <Card>
                    <Card.Body>
                            <Row>
                                <Col>
                                    <Link className="userpage" to={{pathname: '/profile',state: {sampleParams: 'alvin raquem'}}}><span><FontAwesomeIcon icon={FA.faUser}></FontAwesomeIcon> My Profile</span></Link>
                                </Col>
                                <Col>
                                    <Link className="userpage" to="/orders"><span><FontAwesomeIcon icon={FA.faFile}></FontAwesomeIcon> Orders</span></Link>
                                </Col>
                                <Col>
                                    <Link className="userpage" to="/mycart"><span><FontAwesomeIcon icon={FA.faCartPlus}></FontAwesomeIcon> My Cart</span></Link>
                                </Col>
                                <Col>
                                    <Link className="userpage" to="/wishlist"><span><FontAwesomeIcon icon={FA.faHeart}></FontAwesomeIcon> Wishlist</span></Link>
                                </Col>
                                <Col>
                                    <Link className="userpage" to="/"><span><FontAwesomeIcon icon={FA.faShoppingBag}></FontAwesomeIcon> Shop</span></Link>
                                </Col>
                            </Row>
                    </Card.Body>
                </Card>
            </Col>
    </Row>
    )
}

export default UserNav
