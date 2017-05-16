import './App.scss';
import React      from 'react';
import { render } from 'react-dom';
import Routes      from './Routes.jsx';
import { Router, browserHistory }  from 'react-router';

/**
 *  Create React Element
 *
 *  passes the app config to the components
 *
 *  @param {Function} Component React component class
 *  @param {Object} props properties of the component
 *
 *  @returns {JSX} react component
 */
const createElement = ( Component, props ) =>
{
    return <Component {...props} />;  // eslint-disable-line
};

render( <Router
            history={browserHistory}
            routes={Routes}
            createElement={ createElement }
        />, document.getElementById( 'app' ) );
