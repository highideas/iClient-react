import React from 'react';
import { Link } from 'react-router'

import Error from 'components/Error/Error'
import styles from 'components/Client/Profile/styles.css'

class Client extends React.Component
{
    constructor(props, context) {
        super(props, context);
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            client : null,
            error : ''
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        for (let i in this.refs) {
            console.log(this.refs[i].value);
        }

    }

    render() {
        if (this.state.error) {
            return (<Error error={this.state.error} />);
        }

        return (
            <div className="container">
                <div className="columns is-vcentered">
                    <div className="column is-4 is-offset-4">
                        <h1 className="title">
                            Register a Client
                        </h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="box">
                                <label className="label">Name</label>
                                <p className="control has-icon">
                                    <input
                                        ref='name'
                                        className="input"
                                        type="text"
                                        placeholder="John Smith"
                                    />
                                    <i className="fa fa-id-card-o" aria-hidden="true" />
                                </p>
                                <label className="label">Phone</label>
                                <p className="control has-icon">
                                    <input
                                        ref='phone'
                                        className="input"
                                        type="text"
                                        placeholder="21 99999-00000"
                                    />
                                    <i className="fa fa-phone" aria-hidden="true" />
                                </p>
                                <label className="label">Address</label>
                                <p className="control has-icon">
                                    <input
                                        ref='address'
                                        className="input"
                                        type="text"
                                        placeholder="Street 32 - Nª 23"
                                    />
                                    <i className="fa fa-address-card" aria-hidden="true" />
                                </p>
                                <label className="label">City</label>
                                <p className="control has-icon">
                                    <input
                                        ref='city'
                                        className="input"
                                        type="text"
                                        placeholder="London"
                                    />
                                    <i className="fa fa-address-book" aria-hidden="true" />
                                </p>
                                <label className="label">Area</label>
                                <p className="control has-icon">
                                    <input
                                        ref='area'
                                        className="input"
                                        type="text"
                                        placeholder="Center"
                                    />
                                    <i className="fa fa-map-marker" aria-hidden="true" />
                                </p>
                                <label className="label">Frequency</label>
                                <p className="control has-icon">
                                    <input
                                        ref='frequency'
                                        className="input"
                                        type="number"
                                        placeholder="10"
                                    />
                                    <i className="fa fa-calendar-check-o" aria-hidden="true" />
                                </p>
                                <label className="label">Ability</label>
                                <p className="control has-icon">
                                    <input
                                        ref='ability'
                                        className="input"
                                        type="number"
                                        placeholder="200"
                                    />
                                    <i className="fa fa-shopping-basket" aria-hidden="true" />
                                </p>
                                <hr />
                                <p className="control">
                                    <button className="button is-primary">Register</button>
                                    <Link to='/clients' className="button">
                                        <span>Cancel</span>
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Client;


