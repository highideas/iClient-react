import React from 'react';
import { Router } from 'react-router'

import NavMenu from 'components/NavMenu/NavMenu'
import LinksApp from 'components/LinksApp/LinksApp'


class Menu extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleView = this.handleView.bind(this);
        this.state = {
            links: [
                [ '/', 'Home'],
                ['/clients', 'Clients'],
                ['/areas', 'Areas']
            ]
        };
    }

    handleLogout() {
        window.localStorage.removeItem('token');
        this.context.router.push("/");
    }

    handleView() {
        return (
            <NavMenu>
                <LinksApp
                    links={this.state.links}
                />
                <span className="nav-item">
                    <a className="button" onClick={this.handleLogout}>Logout</a>
                </span>
            </NavMenu>
        );
    }

    render() {
        let view = this.handleView();

        if (!window.localStorage.getItem('token')) {
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

