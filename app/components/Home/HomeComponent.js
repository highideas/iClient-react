import React from 'react';
import { Router } from 'react-router'

class HomeComponent extends React.Component{

    render() {
        if (!localStorage.token) {
            this.context.router.push("/");
        }
        return (
            <div className="hero-body">
                <div className="container">
                    <div className="is-half is-offset-one-quarter">
                        <h1 className="title has-text-centered is-1">Welcome to IClient</h1>
                    </div>
              </div>
            </div>
        );
    }
}

HomeComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default HomeComponent;


