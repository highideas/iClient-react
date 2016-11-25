import React from 'react';
import { CardStack, Card } from 'react-cardstack';
import { Link } from 'react-router'

import ClientService from 'services/Client'
import Error from 'components/Error/Error'

import btn from 'components/Client/styles.css'

class Client extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            clients : null,
            error : ''
        };
        this.getClients();
    }

    getClients() {
        ClientService.getClients().then((response) => {
            this.setState({clients: response.data.clients});
        }).catch((error) => {
            this.setState({error: 'Error Found: Trying get client'});
            if (error.response) {
                this.setState({error: error.response.data.error});
            }
        });
    }

    render() {
        if (this.state.error) {
            return (<Error error={this.state.error} />);
        }
        if (!this.state.clients) {
            return <div>Loading...</div>;
        }
        const clientList = this.state.clients.map((client, key) => {
            let line = ((key % 2) ? 'is-success' : 'is-info');
            return (
                <div className={`columns notification ${line}`} key={key}>
                        <div className="column">
                            { client.name }
                        </div>
                        <div className="column">
                            { client.address }
                        </div>
                        <div className="column">
                            { client.city }
                        </div>
                        <div className="column">
                            <Link to={ `#` }
                                className="button is-info is-button-block"
                            >
                                <span className="icon">
                                    <i className="fa fa-check"></i>
                                </span>
                                <span>Visited</span>
                            </Link>
                        </div>

                        <div className="column">
                            <Link to={ `#` }
                                className="button is-info is-button-block"
                            >
                                <span className="icon">
                                    <i className="fa fa-calendar"></i>
                                </span>
                                <span>Schedule</span>
                            </Link>
                        </div>

                        <div className="column">
                            <Link to={ `#` }
                                className="button is-info is-button-block"
                            >
                                <span className="icon">
                                    <i className="fa fa-pencil"></i>
                                </span>
                                <span>Update</span>
                            </Link>
                        </div>

                        <div className="column">
                            <Link to={ `#` }
                                className="button is-danger is-button-block"
                            >
                                <span className="icon">
                                    <i className="fa fa-close"></i>
                                </span>
                                <span>Delete</span>
                            </Link>
                        </div>
                </div>
            );
        });

        return (
                <div>
                    { clientList }
                </div>
        );
    }
}

export default Client;

