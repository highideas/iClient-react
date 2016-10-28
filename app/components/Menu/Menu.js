import React from 'react';
import { Router, Link } from 'react-router'

import Nav from 'components/Nav/Nav'

class Menu extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleView = this.handleView.bind(this);
    }

    handleLogout() {
        delete localStorage.token;
        this.context.router.push("/");
    }

    handleView() {
        return (
            <Nav>
                <span className="nav-item">
                    <a className="button" onClick={this.handleLogout}>Logout</a>
                </span>
            </Nav>
        );
    }

    render() {
        let view = this.handleView();

        if (!localStorage.token) {
            view = <span></span>;
        }
        return (
            view
        );
    }
}

Menu.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Menu;

