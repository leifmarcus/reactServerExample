import React, { Component }  from 'react'; // eslint-disable-line no-unused-vars
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import path     from 'path';
import routes   from './app/Routes.jsx';
import express  from 'express';
import request  from 'request';
import fs       from 'fs';

const API_URL  = 'https://public-api.wordpress.com/rest/v1.1/sites/jonasniederstadt.wordpress.com';
const mainJSON =  path.resolve( __dirname, 'server/main.json' );
let   siteBody = JSON.parse( fs.readFileSync( mainJSON ) );

const app = express();

app.set( 'view engine', 'ejs' );
app.set( 'views', './server/views' );

app.use( '/js', express.static( path.resolve( __dirname, 'public/js' ) ) );
app.use( '/css', express.static( path.resolve( __dirname, 'public/css' ) ) );

/**
 * Data Provider class
 */
class DataProvider extends Component
{
    getChildContext()
    {
        return {
            data : this.props.data,
        };
    }
    render()
    {
        return <RouterContext { ...this.props } />;
    }
}

DataProvider.propTypes = {
    data : React.PropTypes.object,
};

DataProvider.childContextTypes = {
    data : React.PropTypes.object,
};

// getting the basic information about the site initially:
app.use( ( req, res, next ) =>
{
    let nextAfterLoading = true;

    if ( siteBody.name !== undefined )
    {
        nextAfterLoading = false;
        next();
    }

    request( API_URL, ( requestError, response, body ) =>
    {
        siteBody = JSON.parse( body );
        const bodyString = body;

        fs.writeFile( mainJSON, bodyString, ( err ) =>
        {
            if ( err ) throw err;

            console.log( 'new main.js is saved locally...' ); // eslint-disable-line
        } );

        if ( nextAfterLoading === true )
        {
            next();
        }
    } );
} );

app.get( '*', ( req, res ) =>
{
    match( {
        routes,
        location : req.url,
    }, ( error, redirectLocation, renderProps ) =>
    {
        if ( error )
        {
            res.status( 500 ).send( error.message );
        }
        else if ( redirectLocation )
        {
            res.redirect( 302, redirectLocation.pathname + redirectLocation.search );
        }
        else if ( renderProps )
        {
            let requestUrl = `${API_URL}/posts`;

            if ( renderProps.params && renderProps.params.slug )
            {
                requestUrl = `${requestUrl}/slug:${renderProps.params.slug}`;
            }

            // posts:
            request( requestUrl, ( requestError, response, body ) =>
            {
                if ( !requestError && response.statusCode == 200 )
                {
                    const bodyData = JSON.parse( body );

                    const data = bodyData.posts ? {
                        posts : bodyData.posts,
                    } : {
                        post : bodyData,
                    };

                    const app = renderToString( <DataProvider data={data} {...renderProps} /> );

                    res.status( 200 ).render( 'index', {
                        userData : JSON.stringify( siteBody ),
                        title    : `${siteBody.name} - ${siteBody.description}`,
                        // posts    : JSON.stringify( data.posts ),
                        app,
                    } );
                }
                if ( requestError )
                {
                    res.status( 500 ).send( 'Error: Data could not be loaded.' );
                }
            } );

        }
        else
        {
            res.status( 404 ).send( 'Not found' );
        }
    } );
} );

app.listen( 3000, () =>
{
  console.log('Example app listening on port 3000!'); // eslint-disable-line
} );
