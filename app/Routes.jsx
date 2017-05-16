import React    from 'react';
import { Route, IndexRoute } from 'react-router';
import Index    from './components/Index.jsx';
import Home     from './components/Home.jsx';
import Test     from './components/Test.jsx';

export default (
    <Route path="/" component={Index}>
        <IndexRoute component={Home} />
        <Route path="/:slug" component={Test} />
    </Route>
);
