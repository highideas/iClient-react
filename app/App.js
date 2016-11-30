import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import 'bulma/css/bulma.css'
import 'font-awesome-webpack'

import iClientComponent from 'components/IClient/IClient'
import HomeComponent from 'components/Home/Home'
import AreaComponent from 'components/Area/Area'
import ListClientComponent from 'components/Client/List/Client'
import ProfileClientComponent from 'components/Client/Profile/Client'
import CreateClientComponent from 'components/Client/Create/Client'

ReactDOM.render(
    <Router history={hashHistory} >
        <Route path="/" component={iClientComponent} >
            <IndexRoute component={HomeComponent} />
            <Route path="clients" component={ListClientComponent} />
            <Route path="client" component={ CreateClientComponent } />
            <Route path="client/:id" component={ProfileClientComponent} />
            <Route path="area" component={AreaComponent} />
            <Route path="visit/:id" component={AreaComponent} />
        </Route>
    </Router>,
    document.getElementById('app')
);
