import React , {useState} from 'react'
import { Modal,Button,Form} from 'react-bootstrap'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useDispatch} from 'react-redux'
import {register,sign_in} from '../actions/user'

const RegisterModal = ({show,closemodal})=>{

    const dispatch = useDispatch()

    const handleClose = ()=>{
       closemodal(false)
       setUser(initialState)
       setNameerror("")
       setEmailerror("")
       setAddresserror("")
       setContacterror("")
       setPassworderror("")
    }

    const errorstyle = {
        color: 'maroon'
    }

    const initialState = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        address: '',
        contact: '',
    }

    const [user, setUser] = useState(initialState)
    const [nameerror,setNameerror] = useState("")
    const [emailerror,setEmailerror] = useState("")
    const [addresserror,setAddresserror] = useState("")
    const [contacterror,setContacterror] = useState("")
    const [passworderror,setPassworderror] = useState("")

    const handleChange = (attr,value)=>{
        user[attr] = value
        setUser({...user})
    }

    const registeruser = ()=>{
        dispatch(register(user))
            .then((res)=>{
                if(res.data.errors){
                    setNameerror(res.data.errors.name ? res.data.errors.name : '')
                    setPassworderror(res.data.errors.password ? res.data.errors.password : '')
                    setEmailerror(res.data.errors.email ? res.data.errors.email : '')
                    setAddresserror(res.data.errors.address ? res.data.errors.address : '')
                    setContacterror(res.data.errors.contact ? res.data.errors.contact : '')
                }else{
                    dispatch(sign_in(user)).then(()=>window.location.href = "/")
                    
                }
            })
            .catch(err=>console.log(err))
    }

    return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title><FontAwesomeIcon icon={faUser}></FontAwesomeIcon></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control value={user.name} onChange={(e)=> handleChange("name",e.target.value)} type="text" placeholder="Fullname" />
                            <span style={errorstyle}>{nameerror}</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control value={user.email} onChange={(e)=> handleChange("email",e.target.value)} type="email" placeholder="Email Address" />
                            <span style={errorstyle}>{emailerror}</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control value={user.address} onChange={(e)=> handleChange("address",e.target.value)} type="text" placeholder="Address" />
                            <span style={errorstyle}>{addresserror}</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control value={user.contact} onChange={(e)=> handleChange("contact",e.target.value)} type="text" placeholder="Contact No" />
                            <span style={errorstyle}>{contacterror}</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control value={user.password} onChange={(e)=> handleChange("password",e.target.value)} type="password" placeholder="Password" />
                            <span style={errorstyle}>{passworderror}</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control value={user.password_confirmation} onChange={(e)=> handleChange("password_confirmation",e.target.value)} type="password" placeholder="Confirm Password" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={()=>registeruser()}>
                  Register
                </Button>
                </Modal.Footer>
            </Modal>
    )
}

export default RegisterModal