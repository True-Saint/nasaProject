/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';


import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import '../css/app.css';
import '../css/app.scss';
import Login from './Auth/Login';
import Dash from "./Dash/Dash";
ReactDOM.render(
    <Router><Login /></Router>, document.getElementById('Login'),
);

ReactDOM.render(
    <Router><Dash /></Router>, document.getElementById('Dash')
);