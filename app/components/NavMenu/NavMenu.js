import React from 'react';

import Offline from 'components/Offline/Offline'

class NavMenu extends React.Component
{
    constructor(props, context) {
        super(props, context);
        this.toggleNavStatus = this.toggleNavStatus.bind(this);
        this.isMobile = this.isMobile.bind(this);
        this.isNotMobile = this.isNotMobile.bind(this);
        this.hide = this.hide.bind(this);
        this.state = {
            toggleNavStatus: ''
        };
    }

    getChildContext() {
        return {
            onClick: this.toggleNavStatus
        }
    }

    hide(e) {
        this.setState({toggleNavStatus: ''});
    }

    toggleNavStatus() {
        let isActive = this.state.toggleNavStatus ? '' : 'is-active';
        this.setState({toggleNavStatus: isActive});
    }

    isMobile() {
        if (window.screen.width < 768) {
            return this.showOfflineInfo();
        }
        return '';
    }

    isNotMobile() {
        if (window.screen.width > 768) {
            return this.showOfflineInfo();
        }
        return '';
    }

    showOfflineInfo() {
        return (
            <span className="nav-center nav-item">
                <Offline />
            </span>
        );
    }

    render() {
        return (
            <nav className="nav has-shadow" id="top">
                <div className="container">
                    <div className="nav-left">
                        <a className="nav-item" href="../index.html">IClient</a>
                        {this.isMobile()}
                    </div>
                    <span className="nav-center nav-menu is-active">
                        {this.isNotMobile()}
                    </span>
                    <span className={ `nav-toggle ${this.state.toggleNavStatus}` } onClick={this.toggleNavStatus}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                    <div className={ `nav-right nav-menu ${this.state.toggleNavStatus}` }>
                        {this.props.children}
                    </div>
                </div>
            </nav>
        );
    }
}

NavMenu.childContextTypes = {
    onClick: React.PropTypes.func
};

export default NavMenu;

