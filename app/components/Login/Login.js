import React from 'react';
import { Router } from 'react-router'

import User from 'services/User';
import ErrorComponent from 'components/Error/Error';

class Login extends React.Component
{
    constructor(props, context) {
        super(props, context);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                window.localStorage.setItem('token', response.data.token);
                this.context.router.push("/");
            }
        }).catch((error) => {
            this.setState({error: 'Authentication failed'});
            if (error.response.data) {
                this.setState({error: error.response.data.error});
            }
        });
    }

    render() {
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
                                         <ErrorComponent error={this.state.error} />
                                        <label className="label">Username</label>
                                        <p className="control has-icon">
                                            <input
                                                ref='username'
                                                className="input"
                                                type="text"
                                                placeholder="Ex: jsmith" 
                                            />
                                            <i className="fa fa-user" />
                                        </p>
                                        <label className="label">Password</label>
                                        <p className="control has-icon">
                                            <input
                                                ref='password'
                                                className="input"
                                                type="password"
                                                placeholder="●●●●●●●"
                                            />
                                            <i className="fa fa-lock" />
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

Login.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Login;

