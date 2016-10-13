import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import iClientComponent from 'components/iClient/iClientComponent';
import HomeComponent from 'components/Home/HomeComponent';
import ClientComponent from 'components/Client/ClientComponent';

ReactDOM.render(
    <Router history={hashHistory} >
        <Route path="/" component={iClientComponent} >
            <IndexRoute component={HomeComponent} />
            <Route path="client" component={ClientComponent} />
        </Route>
    </Router>,
    document.getElementById('app')
);
