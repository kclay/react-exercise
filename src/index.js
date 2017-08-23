import React from 'react';
import ReactDOM from 'react-dom';


/**
 * Both configureStore and Root are required conditionally.
 * See configureStore.js and Root.js for more details.
 */
import {configureStore} from './store/configureStore';
import {Root} from './containers/Root';


/**
 * Import the stylesheet you want used! Here we just reference
 * the main SCSS file we have in the styles directory.
 */



const store = configureStore();


ReactDOM.render(
    <Root store={store}/>,
    document.getElementById('root')
);
