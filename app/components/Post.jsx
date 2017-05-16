
import React from 'react';
import { Link } from 'react-router';

class Post extends React.Component
{
    render()
    {
        return (
            <div className="Post">
                <Link to={`/${this.props.post.slug}`}>
                    {this.props.post.title}
                </Link>
            </div>
        );
    }
}

Post.propTypes = {
    post : React.PropTypes.object,
};

export default Post;
