import React from 'react';
import { Link, Router } from 'react-router'

import Error from 'components/Error/Error'
import AreaService from 'services/Area'
import ClientService from 'services/Client'
import styles from 'components/Client/Save/styles.css'

class Client extends React.Component
{
    constructor(props, context) {
        super(props, context);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formatFormData = this.formatFormData.bind(this);
        this.loadClient = this.loadClient.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            error : '',
            areas : null,
            client: {}
        };
    }

    loadClient(id) {
        ClientService.find(id).then((response) => {
            let client =  response.data.client.shift();
            client.createdAt = ''
            client.updatedAt = ''
            client.area = client.area._id
            this.setState({client: client})
        }).catch((error) => {
            let isValidResponse = typeof error.response.data !== 'undefined'
            if (typeof error.response.data.error !== 'undefined') {
                this.setState({error: error.response.data.error});
            }
        });
    }

    componentWillMount() {

        if (typeof this.props.params !== 'undefined' && typeof this.props.params.id !== 'undefined') {
            this.loadClient(this.props.params.id);
        }

        AreaService.getAll().then((response) => {
            this.setState({areas: response.data.areas});
        }).catch((error) => {
            this.setState({error: 'Error Found: Trying get areas'});
            if (typeof error.response.data.error !== 'undefined') {
                this.setState({error: error.response.data.error});
            }
        });
    }

    handleChange(event) {
        let client = this.state.client;
        client[event.target.name] = event.target.value;
        this.setState({client : client});
    }

    formatFormData() {
        let client = this.state.client;
        client.area = this.state.areas.filter( (area) => client.area == area._id ).shift();
        return client;
    }

    handleSubmit(event) {

        let client = this.formatFormData();

        ClientService.save(client).then((response) => {
            this.context.router.push("/clients");
        }).catch((error) => {

            this.setState({error: 'Error trying create client'});

            let responseValid = typeof error.response.data !== 'undefined';

            if (responseValid && typeof error.response.data.error !== 'undefined') {
                this.setState({error: error.response.data.error});
            }
        });
        event.preventDefault();
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
                                        className="input"
                                        type="text"
                                        placeholder="John Smith"
                                        name='name'
                                        value={ this.state.client.name }
                                        onChange={this.handleChange}
                                    />
                                    <i className="fa fa-id-card-o" aria-hidden="true" />
                                </p>
                                <label className="label">Phone</label>
                                <p className="control has-icon">
                                    <input
                                        pattern="[\(]\d{2}[\)]\d{4,5}[\-]\d{4}"
                                        className="input"
                                        type="text"
                                        placeholder="(21)99999-00000"
                                        name='phone'
                                        value={ this.state.client.phone }
                                        onChange={this.handleChange}
                                    />
                                    <i className="fa fa-phone" aria-hidden="true" />
                                </p>
                                <label className="label">Address</label>
                                <p className="control has-icon">
                                    <input
                                        required='required'
                                        className="input"
                                        type="text"
                                        placeholder="Street 32 - Nº 23"
                                        name='address'
                                        value={ this.state.client.address }
                                        onChange={this.handleChange}
                                    />
                                    <i className="fa fa-address-card" aria-hidden="true" />
                                </p>
                                <label className="label">City</label>
                                <p className="control has-icon">
                                    <input
                                        required='required'
                                        className="input"
                                        type="text"
                                        placeholder="London"
                                        name='city'
                                        value={ this.state.client.city }
                                        onChange={this.handleChange}
                                    />
                                    <i className="fa fa-address-book" aria-hidden="true" />
                                </p>
                                <label className="label">Area</label>
                                <p className="control has-icon">
                                    <span className="select">
                                        <select
                                            name='area'
                                            value={ this.state.client.area }
                                            onChange={this.handleChange}
                                        >
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
                                        className="input"
                                        type="number"
                                        placeholder="10"
                                        name='frequency'
                                        value={ this.state.client.frequency }
                                        onChange={this.handleChange}
                                    />
                                    <i className="fa fa-refresh" aria-hidden="true" />
                                </p>
                                <label className="label">Ability</label>
                                <p className="control has-icon">
                                    <input
                                        required='required'
                                        className="input"
                                        type="number"
                                        placeholder="200"
                                        name='ability'
                                        value={ this.state.client.ability }
                                        onChange={this.handleChange}
                                    />
                                    <i className="fa fa-shopping-basket" aria-hidden="true" />
                                </p>
                                <hr />
                                <p className="control">
                                    <button className="button is-primary">Save</button>
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

