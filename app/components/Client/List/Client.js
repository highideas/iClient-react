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
                            <i className="fa fa-calendar-check-o"></i>
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
            <section className="">
                <div className="container hello">
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
                            { clientList }
                        </tbody>
                    </table>
                </div>
            </section>
        );
    }
}

export default Client;

