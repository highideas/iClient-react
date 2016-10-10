import React from 'react';

class HomeComponent extends React.Component{
    constructor(props) {
        super(props);
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
                                        <label className="label">Email</label>
                                        <p className="control">
                                            <input className="input" type="text" placeholder="jsmith@example.org" />
                                        </p>
                                        <label className="label">Password</label>
                                        <p className="control">
                                            <input className="input" type="password" placeholder="●●●●●●●" />
                                        </p>
                                        <hr />
                                        <p className="control">
                                            <button className="button is-primary">Login</button>
                                            <button className="button is-default">Cancel</button>
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
            </section>
        );
    }
}

export default HomeComponent;
