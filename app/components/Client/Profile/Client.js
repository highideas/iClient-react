import React from 'react';
import { Link } from 'react-router'

import ClientService from 'services/Client'
import Error from 'components/Error/Error'
import styles from 'components/Client/Profile/styles.css'

class Client extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            client : null,
            error : ''
        };
        this.getClient(this.props.params.id);
    }

    getClient(id) {
        ClientService.find(id).then((response) => {
            this.setState({client: response.data.client.shift()});
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
        if (!this.state.client) {
            return <div>Loading...</div>;
        }

        return (
            <div className="container column is-12">
                <div className="section profile-heading profile-heading-color">
                    <div className="columns">
                        <div className="column is-2">
                            <div className="image is-128x128 avatar">
                                <img src="https://placehold.it/256x256" />
                            </div>
                        </div>
                        <div className="column is-4 name">
                            <p>
                                <span className="title is-bold color-black">
                                    <strong>{this.state.client.name}</strong>
                                </span>
                            </p>
                            <p className="tagline">
                                <strong>Address: </strong>{this.state.client.address} - {this.state.client.city}
                            </p>
                            <p>
                                <strong>Area: </strong>{this.state.client.area._id}
                            </p>
                        </div>
                        <div className="column is-3 followers has-text-centered">
                            <p className="stat-val"><strong>{this.state.client.frequency}</strong></p>
                            <p className="stat-key">Frequency</p>
                        </div>
                        <div className="column is-3 followers has-text-centered">
                            <p className="stat-val"><strong>{this.state.client.ability}</strong></p>
                            <p className="stat-key">Ability</p>
                        </div>
                    </div>
                </div>
                <div className="profile-options">
                    <nav className="nav">
                        <div className="nav-center nav-menu is-active">
                            <span className="nav-item">
                                <a className="button" >
                                    <span className="icon">
                                        <i className="fa fa-check"></i>
                                    </span>
                                    <span>Visited</span>
                                </a>
                                <a className="button" href="#">
                                    <span className="icon">
                                        <i className="fa fa-pencil"></i>
                                    </span>
                                    <span>Update</span>
                                </a>
                            </span>
                            <span className="nav-item">
                                <a className="button" >
                                    <span className="icon">
                                        <i className="fa fa-calendar"></i>
                                    </span>
                                    <span>Schedule</span>
                                </a>
                                <a className="button is-danger" href="#">
                                    <span className="icon">
                                        <i className="fa fa-close"></i>
                                    </span>
                                    <span>Delete</span>
                                </a>
                            </span>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}

export default Client;

