import React from 'react'
import { Modal,Button,Form} from 'react-bootstrap'

const RegisterModal = ({show,closemodal})=>{

    const handleClose = ()=>{
       closemodal(false)
    }

    return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Fullname" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type="email" placeholder="Email Address" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Address" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Contact No" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type="password" placeholder="Confirm Password" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
    )
}

export default RegisterModal