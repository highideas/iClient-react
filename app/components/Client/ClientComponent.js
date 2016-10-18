import React from 'react';

import Client from 'services/Client';

class ClientComponent extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            clients : []
        };
        this.getClients();
    }

    getClients() {
        Client.getClients().then((response) => {
            this.setState({clients: response.data.clients});
        });
    }

    render() {
        const clientList = this.state.clients.map((client, key) => {
            return (
                <tr key={key} >
                    <td>{ client.name }</td>
                    <td>{ client.address }</td>
                    <td>{ client.city }</td>
                    <td className="is-icon"> <a href="#"> <i className="fa fa-calendar"></i> </a> </td>
                    <td className="is-icon"> <a href="#"> <i className="fa fa-search"></i>   </a> </td>
                </tr>
            );
        });

        return (
            <div className="container hello">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>City</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { clientList }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ClientComponent;

