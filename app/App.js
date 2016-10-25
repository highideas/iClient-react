import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import 'bulma/css/bulma.css'
import 'font-awesome-webpack'

import iClientComponent from 'components/iClient/iClientComponent';
import HomeComponent from 'components/Home/HomeComponent';
import ClientComponent from 'components/Client/ClientComponent';
import AreaComponent from 'components/Area/Area';

ReactDOM.render(
    <Router history={hashHistory} >
        <Route path="/" component={iClientComponent} >
            <IndexRoute component={HomeComponent} />
            <Route path="client" component={ClientComponent} />
            <Route path="area" component={AreaComponent} />
            <Route path="visit/:id" component={AreaComponent} />
        </Route>
    </Router>,
    document.getElementById('app')
);
