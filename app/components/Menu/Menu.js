import React from 'react';

import Nav from 'components/Nav/Nav'
import LinksApp from 'components/LinksApp/LinksApp'


class Menu extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.handleView = this.handleView.bind(this);
    }

    handleView() {
        return (
            <Nav>
                <LinksApp />
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

export default Menu;

