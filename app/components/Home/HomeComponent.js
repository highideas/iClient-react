import React from 'react';
import { Router } from 'react-router'

class HomeComponent extends React.Component{

    render() {
        if (!localStorage.token) {
            this.context.router.push("/");
        }
        return (
            <h3>Welcome!</h3>
        );
    }
}

HomeComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default HomeComponent;


