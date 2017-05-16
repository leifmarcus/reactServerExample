
import React from 'react';
import Post  from './Post.jsx';

class Posts extends React.Component
{
    render()
    {
        return (
            <div className="Posts">
                {
                    this.props.posts.map( ( post ) =>
                    {
                        const key = `post-${post.ID}`;

                        return <Post post={post} key={key} />;
                    } )
                }
            </div>
        );
    }
}

Posts.propTypes = {
    posts : React.PropTypes.array
};

export default Posts;
