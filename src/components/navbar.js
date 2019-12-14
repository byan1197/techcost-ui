import React from 'react';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuthState } from '../state/auth-state'
import { toast } from 'react-toastify'

function Navbar() {

    const [authState, changeAuthState] = useAuthState();

    const logout = () => {
        changeAuthState({ type: 'CHANGE_AUTH_STATE', isAuth: false })
        localStorage.clear();
        toast.info('Logged out')
    }

    const authNavItems = [
        <Link style={{ marginLeft: '10px' }} to='/dashboard'>Dashboard</Link>,
        <Link style={{ marginLeft: '10px' }} to='/' onClick={logout}>Logout</Link>
    ]

    const unAuthNavItems = [
        <Link style={{ marginLeft: '10px' }} to='/login'>Login</Link>,
        <Link style={{ marginLeft: '10px' }} to='/signup'>Signup</Link>
    ]

    return (
        <BootstrapNavbar sticky='top' style={{ position: 'absolute', top: '0', width: '100vw', overflow: 'hidden !important' }} expand="lg">
            <BootstrapNavbar.Brand href="/"><b>TechCost</b></BootstrapNavbar.Brand>
            <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
            <BootstrapNavbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {authState.isAuth ?
                        authNavItems :
                        unAuthNavItems
                    }
                </Nav>
            </BootstrapNavbar.Collapse>
        </BootstrapNavbar>

    )

}

export default Navbar;