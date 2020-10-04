import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React , {useState,useRef,useEffect} from 'react'
import { Modal,Button,Form} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {sign_in} from '../actions/user'

const SignInModal = ({show,closemodal})=>{

    const errorstyle = {
        color: 'maroon'
    }

    // const emailerror = useRef()
    // const passworderror = useRef()

    const [emailerror, setEmailerror] = useState("")
    const [passworderror,setPassworderror] = useState("")

    const handleClose = ()=>{
        setUser({
            email: '',
            password: ''
        })
        setPassworderror("")
        setEmailerror("")
        closemodal(false)
    }
    
    const dispatch = useDispatch()
    const initialstate = {
        email: '',
        password: '',
    }
    const [user,setUser] = useState(initialstate)

    const handleChange = (attr,value)=>{
        user[attr] = value
        setUser({...user})
    }

    useEffect(()=>{
    
    },[])


    const signin = ()=>{
        dispatch(sign_in(user))
            .then((res)=>{
                if(res.data.errors){
                    setEmailerror(res.data.errors.email ? res.data.errors.email : '')
                    setPassworderror(res.data.errors.password ? res.data.errors.password : '')
                }

                if(res.data.message){
                    setEmailerror(res.data.message ? res.data.message : '')
                    setPassworderror("")
                }

                if(res.data.access_token){
                    window.location.href = "/"
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
                            <Form.Control value={user.email} onChange={(e)=> handleChange("email",e.target.value)} type="email" placeholder="Email Address" />
                            <span style={errorstyle}>{emailerror}</span>
                        </Form.Group>
                     
                        <Form.Group>
                            <Form.Control value={user.password} onChange={(e)=> handleChange("password",e.target.value)} type="password" placeholder="Password" />
                            <span style={errorstyle}>{passworderror}</span>
                        </Form.Group>
                       
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={()=>signin()}>
                    Sign In
                </Button>
                </Modal.Footer>
            </Modal>
    )
}

export default SignInModal