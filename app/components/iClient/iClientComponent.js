import React from 'react';
import { Router, Route, IndexRoute, IndexLink, Link } from 'react-router'

import LoginComponent from 'components/Login/LoginComponent';
import MenuComponent from 'components/Menu/Menu';

class iClientComponent extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        let view = <MenuComponent children={this.props.children} />;

        if (!localStorage.token) {
            view = <LoginComponent />;
        }
        return (
            view
        );
    }
}

export default iClientComponent;

