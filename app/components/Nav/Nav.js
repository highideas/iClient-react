import React from 'react';

import LinksApp from 'components/LinksApp/LinksApp'

class Nav extends React.Component
{
    constructor(props, context) {
        super(props, context);
        this.toggleNav = this.toggleNav.bind(this);
        this.hide = this.hide.bind(this);
        this.state = {
            toggleNav: ''
        };
    }

    hide(e) {
        this.setState({toggleNav: ''});
    }

    toggleNav() {
        let isActive = this.state.toggleNav ? '' : 'is-active';
        this.setState({toggleNav: isActive});
    }

    render() {
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
                        <LinksApp hide={this.hide} />
                        {this.props.children}
                    </div>
                </div>
            </nav>
        );
    }
}

export default Nav;

