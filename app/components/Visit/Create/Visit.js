import React from 'react';
import { Link, Router } from 'react-router'

import Error from 'components/Error/Error'
import VisitService from 'services/Visit'
import ClientService from 'services/Client'

class Visit extends React.Component
{
    constructor(props, context) {
        super(props, context);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            error : '',
            client : null,
            visit_date: new Date(),
            visit : {}
        };
    }

    componentWillMount() {
        ClientService.find(this.props.params.clientId).then((response) => {
            this.setState({client: response.data.client.shift()});
        }).catch((error) => {
            this.setState({error: 'Error Found: Trying get client'});
            let validResponse = typeof error.response.data !== 'undefined';
            if (validResponse && typeof error.response.data.error !== 'undefined') {
                this.setState({error: error.response.data.error});
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        let visit = {
            client : this.state.client,
            visit_date: this.state.visit_date,
        };

        for (let i in this.refs) {
            visit[i] = this.refs[i].value;
        }

        this.setState({visit: visit});

        VisitService.save(visit).then((response) => {
            this.context.router.push("/clients");
        }).catch((error) => {

            this.setState({error: 'Error trying create visit'});

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

        if (!this.state.client) {
            return <div>Loading...</div>;
        }

        return (
            <div className="container">
                <div className="columns is-vcentered">
                    <div className="column is-4 is-offset-4">
                        <h1 className="title">
                            Create Visit
                        </h1>
                        <form onSubmit={this.handleSubmit}>
                            <center>
                                <div className="card has-text-left">
                                    <div className="card-content">
                                        <div className="content">
                                            <p className="is-5">Name: { this.state.client.name }< /p>
                                            <p className="is-6">Address: { this.state.client.address }</p>
                                            <p className="is-6">City: { this.state.client.city }</p>
                                            <hr />
                                            <label className="label">Value Received</label>
                                            <p className="control">
                                                <input
                                                    ref="value_received"
                                                    className="input"
                                                    type="text"
                                                    placeholder=""
                                                    required="required"
                                                />
                                            </p>
                                            <label className="label">Quantity</label>
                                            <p className="control">
                                                <input
                                                    ref="sales_quantity"
                                                    className="input"
                                                    type="text"
                                                    placeholder=""
                                                    required="required"
                                                />
                                            </p>
                                            <hr />
                                            <p className="control">
                                                <button className="button is-primary">Save</button>
                                                <Link to='/clients' className="button">
                                                    <span>Cancel</span>
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="card-image">
                                        <figure className="image is-4by3">
                                            <img src="http://placehold.it/300x225" alt="" />
                                        </figure>
                                    </div>
                                </div>
                            </center>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Visit.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Visit;

