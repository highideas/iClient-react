import React from 'react';
import { Router, Link } from 'react-router'

class Menu extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleView = this.handleView.bind(this);
        this.toggleNav = this.toggleNav.bind(this);
        this.handleLink = this.handleLink.bind(this);
        this.createLink = this.createLink.bind(this);
        this.state = {
            toggleNav: '',
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

    toggleNav() {
        let isActive = this.state.toggleNav ? '' : 'is-active';
        this.setState({toggleNav: isActive});
    }

    handleLink(e) {
        this.setState({toggleNav: ''});
    }

    createLink() {
        return this.state.links.map((link, index) => (
            <Link to={link[0]}
                key={index}
                className="nav-item is-tab"
                onlyActiveOnIndex={true}
                activeClassName="is-active"
                onClick={this.handleLink}>{link[1]}
            </Link>
        ));
    }

    handleView() {
        return (
            <nav className="nav has-shadow" id="top">
                <div className="container">
                    <div className="nav-left">
                        <a className="nav-item" href="../index.html">IClient</a>
                    </div>
                    <span className={ `nav-toggle ${this.state.toggleNav}` } onClick={this.toggleNav}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                    <div className={ `nav-right nav-menu ${this.state.toggleNav}` }>
                        {this.createLink()}
                        <span className="nav-item">
                            <a className="button" onClick={this.handleLogout}>Logout</a>
                        </span>
                    </div>
                </div>
            </nav>
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

