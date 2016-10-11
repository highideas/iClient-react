import React from 'react';

class ClientComponent extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container hello">
                <h1>{{ msg }}</h1>
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
                        <tr v-for="client in clients">
                            <td>{{ client.name }}</td>
                            <td>{{ client.address }}</td>
                            <td>{{ client.city }}</td>
                            <td className="is-icon"> <a href="#"> <i className="fa fa-calendar"></i> </a>
                            </td>
                            <td className="is-icon"> <a href="#"> <i className="fa fa-search"></i>   </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ClientComponent;

