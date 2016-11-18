import React from 'react';

import LoginComponent from 'components/Login/Login';
import MenuComponent from 'components/Menu/Menu';

class IClient extends React.Component
{
    constructor(props, context) {
        super(props, context);
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

        if (!window.localStorage.getItem('token')) {
            view = <LoginComponent />;
        }
        return (
            view
        );
    }
}

export default IClient;

