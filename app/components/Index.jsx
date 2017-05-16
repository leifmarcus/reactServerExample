// import './404.scss';
import React from 'react';
import 'whatwg-fetch'; // fetch polyfill

const API_URL = 'https://public-api.wordpress.com/rest/v1.1/sites/18060805/posts';

class Index extends React.Component
{
    constructor()
    {
        super( ...arguments );

        this.state = this.context.data || {
            posts : [],
            post  : {},
        };
    }
    componentDidMount()
    {
        this.fetchPosts( this.props.params.slug );
    }
    componentWillReceiveProps( nextProps )
    {
        if ( window && this.props.params.slug !== nextProps.params.slug )
        {
            this.fetchPosts( nextProps.params.slug );
        }
    }
    /**
     *  fetch posts
     *
     *  fetches data from the api and sets the state
     *
     *  @param {String} slug - the slug of the post
     *
     */
    fetchPosts( slug )
    {
        var url = slug ? `${API_URL}/slug:${slug}` : API_URL;
        window.fetch( url )
            .then( ( res ) =>
            {
                return res.json();
            } )
            .then( ( data ) =>
            {
                if ( Array.isArray( data.posts ) )
                {
                    this.setState( {
                        posts : data.posts,
                        post  : {},
                    } );
                }
                else
                {
                    this.setState( {
                        posts : [],
                        post  : data,
                    } );
                }
            } )
            .catch( ( err ) =>
            {
                console.error( err );
            } );
    }
    render()
    {
        return (
            <div className="Index">
                {
                    React.Children.map( this.props.children, child =>
                    {
                        return React.cloneElement( child, this.state );
                    } )
                }
            </div>
        );
    }
}

Index.propTypes = {
    children : React.PropTypes.object,
    params   : React.PropTypes.object,
};
Index.contextTypes = {
    data : React.PropTypes.object,
};

export default Index;
