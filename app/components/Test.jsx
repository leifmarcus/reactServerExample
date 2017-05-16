// import './404.scss';
import React from 'react';
import { Link } from 'react-router';

class Test extends React.Component
{
    getContent()
    {
        return {
            __html : this.props.post.content,
        };
    }
    render()
    {
        return (
            <div className="Test">
                <Link to="/">{this.props.post.title}</Link>

                <div className="Test-content" dangerouslySetInnerHTML={this.getContent()} />
            </div>
        );
    }
}

Test.propTypes =
{
    post : React.PropTypes.object,
};

export default Test;
