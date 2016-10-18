import React from 'react';
import { Router, Link } from 'react-router'

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
            <nav className="nav has-shadow" id="top">
                <div className="container">
                    <div className="nav-left">
                        <a className="nav-item" href="../index.html">IClient</a>
                    </div>
                    <span className="nav-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                    <div className="nav-right nav-menu">
                        <Link to="/" className="nav-item is-tab is-active">Home</Link>
                        <Link to="/client" className="nav-item is-tab">Client</Link>
                        <Link to="/area" className="nav-item is-tab">Area</Link>
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

