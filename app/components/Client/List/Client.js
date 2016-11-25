import React from 'react';
import { CardStack, Card } from 'react-cardstack';
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
                        <Link to={ `#` } >
                            <i className="fa fa-check"></i>
                        </Link>
                    </td>

                    <td className="is-icon">
                        <Link to={ `#` } >
                            <i className="fa fa-calendar"></i>
                        </Link>
                    </td>

                    <td className="is-icon">
                        <Link to={ `#` } >
                            <i className="fa fa-close"></i>
                        </Link>
                    </td>
                </tr>
            );
        });

        return (
                <table className="table">
                    <tbody>
                        { clientList }
                    </tbody>
                </table>
        );
    }
}

export default Client;

