import React from 'react';
import { Router, Route, IndexRoute, IndexLink, Link } from 'react-router'

import LoginComponent from 'components/Login/LoginComponent';
import MenuComponent from 'components/Menu/Menu';

class iClientComponent extends React.Component{
    constructor(props) {
        super(props);
        this.handleView = this.handleView.bind(this);
    }

    handleView() {
        return (
            <div>
                <MenuComponent />
                <section className="hero is-fullheight is-primary">
                    {this.props.children}
                </section>
            </div>
        );
    }
    render() {
        let view = this.handleView();

        if (!localStorage.token) {
            view = <LoginComponent />;
        }
        return (
            view
        );
    }
}

export default iClientComponent;

