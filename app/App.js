import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router'

import iClientComponent from './components/iClient/iClientComponent';

ReactDOM.render(
    <Router>
        <Route path="/" component={iClientComponent} />
    </Router>,
    document.getElementById('app')
);
