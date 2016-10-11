import React from 'react';
import { Router, Route, IndexRoute, IndexLink, Link } from 'react-router'

import LoginComponent from 'components/Login/LoginComponent';

class iClientComponent extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        let view = <div>
                       <h1>Simple SPA</h1>
                       <ul className="header">
                          <li><Link to="/">Home</Link></li>
                          <li><Link to="/client">Clients</Link></li>
                       </ul>
                       <div className="content">
                           {this.props.children}
                        </div>
                    </div>;

        if (!localStorage.token) {
            view = <LoginComponent />;
        }
        return (
            view
        );
    }
}

export default iClientComponent;

