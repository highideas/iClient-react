import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import 'bulma/css/bulma.css'
import 'style-loader!css-loader!less-loader!font-awesome-webpack/font-awesome-styles.loader!font-awesome-webpack/font-awesome.config.js';

import iClientComponent from 'components/IClient/IClient'
import HomeComponent from 'components/Home/Home'
import AreaComponent from 'components/Area/List/Area'
import LastVisitsComponent from 'components/Area/Area'
import ListClientComponent from 'components/Client/List/Client'
import ProfileClientComponent from 'components/Client/Profile/Client'
import SaveClientComponent from 'components/Client/Save/Client'
import CreateVisitComponent from 'components/Visit/Create/Visit'
import CreateAreaComponent from 'components/Area/Create/Area'

ReactDOM.render(
    <Router history={hashHistory} >
        <Route path="/" component={iClientComponent} >
            <IndexRoute component={HomeComponent} />
            <Route path="clients" component={ListClientComponent} />
            <Route path="client" component={ SaveClientComponent } />
            <Route path="client/:id/update" component={ SaveClientComponent } />
            <Route path="client/:id" component={ProfileClientComponent} />
            <Route path="areas" component={AreaComponent} />
            <Route path="area" component={CreateAreaComponent} />
            <Route path="visit/:clientId/" component={CreateVisitComponent} />
            <Route path="visit/:id" component={AreaComponent} />
            <Route path="lastVisits" component={LastVisitsComponent} />
        </Route>
    </Router>,
    document.getElementById('app')
);

