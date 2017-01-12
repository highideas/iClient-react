import React from 'react';
import { Link } from 'react-router'

import ClientService from 'services/Client'
import Error from 'components/Error/Error'

class Client extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            clients : null,
            error : ''
        };
        this.showError = this.showError.bind(this);
        this.listClients = this.listClients.bind(this);
        this.getClients();
    }

    getClients() {
        ClientService.getClients().then((response) => {
            this.setState({clients: response.data.clients});
        }).catch((error) => {
            this.setState({error: 'Error Found: Trying get client'});
            if (typeof error.response.data.error !== 'undefined') {
                this.setState({error: error.response.data.error});
            }
        });
    }

    showError() {
        if (this.state.error) {
            return (<Error error={this.state.error} />);
        }
        return '';
    }

    listClients() {
        if (this.state.error) {
            return '';
        }
        return this.state.clients.map((client, key) => {
            let line = ((key % 2) ? 'is-success' : 'is-info');
            return (
                <tr key={key}>
                    <td>
                        { client.name }
                    </td>
                    <td>
                        { client.address } - { client.city }
                    </td>
                    <td className="is-icon">
                        <Link to={ `/client/${client._id}` } >
                            <i className="fa fa-address-card"></i>
                        </Link>
                    </td>

                    <td className="is-icon">
                        <Link to={ `/visit/${client._id}/` } >
                            <i className="fa fa-calendar-check-o"></i>
                        </Link>
                    </td>

                </tr>
            );
        });
    }

    render() {
        if (!this.state.clients && !this.state.error) {
            return <div>Loading...</div>;
        }

        return (
            <section className="">
                <div className="container hello">
                    { this.showError() }
                    <div className="level header">
                        <div className="level-left">
                            <h2 className="title is-2">iClient</h2>
                        </div>
                        <div className="level-right">
                            <Link to='/client' className="button is-info is-medium">
                                <span className="icon">
                                    <i className="fa fa-plus"></i>
                                </span>
                                <span>New Client</span>
                            </Link>
                        </div>
                    </div>
                    <table className="table">
                        <tbody>
                            { this.listClients() }
                        </tbody>
                    </table>
                </div>
            </section>
        );
    }
}

export default Client;

