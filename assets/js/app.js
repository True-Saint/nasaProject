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
import Home from './components/Home';
import Login from './Auth/Login';
import Dash from "./Dash/Dash";
import { createRoot } from 'react-dom/client';
import ElevateAppBar from "./Dash/AppBar";
import Pages from "./Dash/pages";

const container1 = document.getElementById('root');
const container = document.getElementById('Dash');
const root = createRoot(container1); // createRoot(container!) if you use TypeScript
//const dash = createRoot(container);
root.render( <React.StrictMode><ElevateAppBar tab="home" /></React.StrictMode>);
//dash.render(<Dash tab="dash" />);
/*
ReactDOM.render(
    <Router><Home /></Router>, document.getElementById('root')
);
ReactDOM.render(
    <Router><Dash /></Router>, document.getElementById('Dash')
);
*/
