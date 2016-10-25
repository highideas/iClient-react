import React from 'react';
import { Router, Link } from 'react-router'

class Menu extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleView = this.handleView.bind(this);
        this.toggleNav = this.toggleNav.bind(this);
        this.handleLink = this.handleLink.bind(this);
        this.state = {
            toggleNav: ''
        };
    }

    handleLogout() {
        delete localStorage.token;
        this.context.router.push("/");
    }

    toggleNav() {
        if (this.state.toggleNav) {
            this.setState({toggleNav: ''});
        } else {
            this.setState({toggleNav: 'is-active'});
        }
    }

    handleLink(e) {
        this.setState({toggleNav: ''});
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
                        <Link to="/" 
                            className="nav-item is-tab"
                            onlyActiveOnIndex={true}
                            activeClassName="is-active"
                            onClick={this.handleLink}>Home
                        </Link>
                        <Link to="/client"
                            className="nav-item is-tab"
                            activeClassName="is-active"
                            onClick={this.handleLink}>Client
                        </Link>
                        <Link to="/area"
                            className="nav-item is-tab"
                            activeClassName="is-active"
                            onClick={this.handleLink}>Area
                        </Link>
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

