import Axios from 'axios'
import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useAuthState } from '../state/auth-state'
import { Redirect } from 'react-router-dom'


const Login = () => {

    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let [isLoading, setIsLoading] = useState(false)
    let [willExitPage, setWillExitPage] = useState(false)
    const [authState, changeAuthState] = useAuthState();

    const handleUsernameChange = e => {
        setUsername(e.target.value)
    }
    const handlePasswordChange = e => {
        setPassword(e.target.value)
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        let loginResult = await Axios.post('/user/login', {
            username: username,
            password: password,
        }).then(res => {
            setIsLoading(false);
            console.log('res.', res.data)
            if (res.status !== 201)
                return false
            return res.data
        })
            .catch(e => {
                console.error(e)
                return false
            })

        if (!loginResult) {
            toast.error('Could not login.')
            return
        }
        if (!loginResult.token) {
            toast.error('Could not login.')
            return
        }

        localStorage.setItem('token', loginResult.token)
        changeAuthState({ type: 'CHANGE_AUTH_STATE', isAuth: true })
        toast.success('Successfully logged in')
        setWillExitPage(true)

    }

    return willExitPage ? <Redirect to='/' /> : (
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
                <Col md={3} sm={12} style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Card>
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control disabled={isLoading} value={username} onChange={handleUsernameChange} placeholder="Username" />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control disabled={isLoading} value={password} onChange={handlePasswordChange} type="password" placeholder="Password" />
                                </Form.Group>
                                <Button disabled={isLoading} onClick={handleSubmit} block variant="primary" type="submit">
                                    Log me in!
                                </Button>
                                <Button disabled={isLoading} block variant="secondary" type="submit">
                                    Sign Up Now
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </div >
    )
}

export default Login