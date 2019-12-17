import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import Axios from 'axios'
Axios.defaults.baseURL='https://h0m13d4o9f.execute-api.us-east-1.amazonaws.com/dev'

Axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers['Authorization'] =  token ? "Bearer " + token : null;
    return config;
});

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
