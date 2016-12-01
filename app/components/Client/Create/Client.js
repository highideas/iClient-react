import React from 'react';
import { Link, Router } from 'react-router'

import Error from 'components/Error/Error'
import AreaService from 'services/Area'
import ClientService from 'services/Client'
import styles from 'components/Client/Create/styles.css'

class Client extends React.Component
{
    constructor(props, context) {
        super(props, context);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            error : '',
            areas : null,
            client: {}
        };
    }

    componentWillMount() {

        AreaService.getAll().then((response) => {
            this.setState({areas: response.data.areas});
        }).catch((error) => {
            this.setState({error: 'Error Found: Trying get areas'});
            if (typeof error.response.data.error !== 'undefined') {
                this.setState({error: error.response.data.error});
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        let client = {}
        for (let i in this.refs) {
            client[i] = this.refs[i].value;
        }

        this.setState({client: client});

        ClientService.save(client).then((response) => {
            this.context.router.push("/clients");
        }).catch((error) => {

            this.setState({error: 'Error trying create client'});

            let responseValid = typeof error.response.data !== 'undefined';

            if (responseValid && typeof error.response.data.error !== 'undefined') {
                this.setState({error: error.response.data.error});
            }
        });
    }

    render() {
        if (this.state.error) {
            return (<Error error={this.state.error} />);
        }
        if (!this.state.areas) {
            return <div>Loading...</div>;
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
                                        required='required'
                                        ref='name'
                                        className="input marco"
                                        type="text"
                                        placeholder="John Smith"
                                    />
                                    <i className="fa fa-id-card-o" aria-hidden="true" />
                                </p>
                                <label className="label">Phone</label>
                                <p className="control has-icon">
                                    <input
                                        required='required'
                                        pattern="[\(]\d{2}[\)]\d{4,5}[\-]\d{4}"
                                        ref='phone'
                                        className="input"
                                        type="text"
                                        placeholder="(21)99999-00000"
                                    />
                                    <i className="fa fa-phone" aria-hidden="true" />
                                </p>
                                <label className="label">Address</label>
                                <p className="control has-icon">
                                    <input
                                        required='required'
                                        ref='address'
                                        className="input"
                                        type="text"
                                        placeholder="Street 32 - Nº 23"
                                    />
                                    <i className="fa fa-address-card" aria-hidden="true" />
                                </p>
                                <label className="label">City</label>
                                <p className="control has-icon">
                                    <input
                                        required='required'
                                        ref='city'
                                        className="input"
                                        type="text"
                                        placeholder="London"
                                    />
                                    <i className="fa fa-address-book" aria-hidden="true" />
                                </p>
                                <label className="label">Area</label>
                                <p className="control has-icon">
                                    <span className="select">
                                        <select ref='area' >
                                            {
                                                this.state.areas.map((area, key) => (
                                                    <option value={ area._id } key={ key }>{ area._id}</option>
                                                ))
                                            }
                                        </select>
                                    </span>
                                    <i className="fa fa-map-marker" aria-hidden="true" />
                                </p>
                                <label className="label">Frequency</label>
                                <p className="control has-icon">
                                    <input
                                        required='required'
                                        ref='frequency'
                                        className="input"
                                        type="number"
                                        placeholder="10"
                                    />
                                    <i className="fa fa-refresh" aria-hidden="true" />
                                </p>
                                <label className="label">Ability</label>
                                <p className="control has-icon">
                                    <input
                                        required='required'
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

Client.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Client;

