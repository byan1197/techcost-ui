import React from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap'

const Signup = () => {

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            background: 'linear-gradient(35deg, rgba(0,255,214,1) 0%, rgba(255,0,0,1) 0%, rgba(0,198,238,1) 100%)'
        }}>

            <Row style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Col md={4} sm={12}>
                    <Card>
                        <Card.Title><h1>Sign up</h1></Card.Title>
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group controlId="formConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                <Button block variant="primary" type="submit">
                                   Register with the above details
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Signup