import React from 'react';

import iClientUser from './../../services/iClientUser';

class LoginComponent extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        iClientUser.login(
            this.refs.username.value,
            this.refs.password.value
        ).then((response) => {
            if (response.data.success == 200) {
                localStorage.token = response.data.token;
                window.location.href = "/";
            }
        });
    }

    render() {
        return (
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-vcentered">
                        <div className="column is-4 is-offset-4">
                            <h1 className="title has-text-centered">
                                IClient
                            </h1>
                            <form onSubmit={this.handleSubmit}>
                                <div className="box">
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
                                    <p className="has-text-centered">
                                        <a href="register.html">Register an Account</a>
                                        |
                                        <a href="#">Forgot password</a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginComponent;
