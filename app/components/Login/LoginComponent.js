import React from 'react';
import { Router } from 'react-router'

import User from 'services/User';

class LoginComponent extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDeleteMessage = this.handleDeleteMessage.bind(this);
        this.state = {
            error: ''
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        User.login(
            this.refs.username.value,
            this.refs.password.value
        ).then((response) => {
            if (response.data.success == 200) {
                localStorage.token = response.data.token;
                this.context.router.push("/");
            }
        }).catch((error) => {
            this.setState({error: 'Authentication failed'});
            if (error.response.data) {
                this.setState({error: error.response.data.error});
            }
        });
    }

    handleDeleteMessage() {
        this.setState({error: ''});
    }

    render() {
        let error = <span></span>;
        if (this.state.error) {
            error = <div className="notification is-danger">
                        <button className="delete" onClick={this.handleDeleteMessage}></button>
                        {this.state.error}
                    </div>;
        }
        return (
            <section className="hero is-fullheight is-primary">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-vcentered">
                            <div className="column is-4 is-offset-4">
                                <h1 className="title has-text-centered">
                                    IClient
                                </h1>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="box">
                                        {error}
                                        <label className="label">Username</label>
                                        <p className="control">
                                            <input
                                                ref='username'
                                                className="input"
                                                type="text"
                                                placeholder="Ex: jsmith" 
                                            />
                                        </p>
                                        <label className="label">Password</label>
                                        <p className="control">
                                            <input
                                                ref='password'
                                                className="input"
                                                type="password"
                                                placeholder="●●●●●●●"
                                            />
                                        </p>
                                        <hr />
                                        <p className="control">
                                            <button className="button is-primary">Login</button>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

LoginComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default LoginComponent;
