import React from 'react';
import { Router, Link } from 'react-router'

class LinksApp extends React.Component
{
    constructor(props, context) {
        super(props, context);
        this.generate = this.generate.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            links: [
                [ '/', 'Home'],
                ['/client', 'Client'],
                ['/area', 'Area']
            ]
        };
    }

    handleLogout() {
        delete localStorage.token;
        this.context.router.push("/");
    }

    handleClick(e) {
        if (this.context.onClick) {
            this.context.onClick();
        }
    }

    generate() {
        return this.state.links.map((link, index) => (
            <Link to={link[0]}
                key={index}
                className="nav-item is-tab"
                onlyActiveOnIndex={true}
                activeClassName="is-active"
                onClick={this.handleClick}
            >
                {link[1]}
            </Link>
        ));
    }

    render() {
        return (
            <span className="nav-right nav-menu is-active">
                {this.generate()}
                <span className="nav-item">
                    <a className="button" onClick={this.handleLogout}>Logout</a>
                </span>
            </span>
        );
    }
}

LinksApp.contextTypes = {
    router: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func
};

export default LinksApp;

