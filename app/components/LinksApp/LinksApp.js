import React from 'react';
import { Router, Link } from 'react-router'

class LinksApp extends React.Component
{
    constructor(props, context) {
        super(props, context);
        this.generate = this.generate.bind(this);
        this.state = {
            links: [
                [ '/', 'Home'],
                ['/client', 'Client'],
                ['/area', 'Area']
            ]
        };
    }

    generate() {
        return this.state.links.map((link, index) => (
            <Link to={link[0]}
                key={index}
                className="nav-item is-tab"
                onlyActiveOnIndex={true}
                activeClassName="is-active"
                onClick={this.props.hide}>{link[1]}
            </Link>
        ));
    }

    render() {
        return (
            <span className="nav-right nav-menu is-active">
                {this.generate()}
            </span>
        );
    }
}

LinksApp.propTypes = {
    hide: React.PropTypes.func.isRequired,
};

export default LinksApp;

