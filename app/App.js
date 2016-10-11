import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router'

import iClientComponent from './components/iClient/iClientComponent';
import HomeComponent from './components/Home/HomeComponent';
import ClientComponent from './components/Client/ClientComponent';

ReactDOM.render(
    <section className="hero is-fullheight is-primary">
        <Router>
            <Route path="/" component={iClientComponent} >
                <IndexRoute component={HomeComponent} />
                <Route path="client" component={ClientComponent} />
            </Route>
        </Router>
    </section>,
    document.getElementById('app')
);
