import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Navbar from './components/navbar';
import Dashboard from './layouts/dashboard';
import Home from './layouts/home';
import Login from './layouts/login';
import Settings from './layouts/settings';
import Signup from './layouts/signup';
import { AuthContextProvider } from './state/auth-state'


toast.configure({
    position: toast.POSITION.BOTTOM_LEFT,
    style: {
        bodyClassName: 'toast-border-rad',
    }
})

function App() {
    return (
        <AuthContextProvider>
            <div className="App">
                <Navbar></Navbar>
                <Switch>
                    <Route exact path='/'><Home /></Route>
                    <Route path='/login'><Login /></Route>
                    <Route path='/signup'><Signup /></Route>
                    <Route path='/dashboard'><Dashboard /></Route>
                    <Route path='/settings'><Settings /></Route>
                </Switch>
            </div>
        </AuthContextProvider>
    );
}

export default App;
