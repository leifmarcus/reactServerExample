// import './404.scss';
import React from 'react';
// import { Link } from 'react-router';
import Posts from './Posts.jsx';

class Home extends React.Component
{
    render()
    {
        return (
            <div className="Home">
            {
                <Posts posts={this.props.posts} />
            }
            </div>
        );
    }
}

Home.propTypes = {
    posts : React.PropTypes.array,
    post  : React.PropTypes.object,
};

export default Home;
