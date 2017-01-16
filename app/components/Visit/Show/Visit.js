import React from 'react';
import { Link } from 'react-router'

import VisitService from 'services/Visit'
import Error from 'components/Error/Error'
import styles from 'components/Visit/Show/styles.css'
import DateHelper from 'helpers/Date'

class Visit extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            visit : null,
            error: ''
        };
        this.getVisit(this.props.params.id);
    }

    getVisit(id) {
        VisitService.find(id).then((response) => {
            this.setState({visit: response.data.visit.shift()});
        }).catch((error) => {
            this.setState({error: 'Error Found: Trying get visit'});
            let isValidResponse = typeof error.response.data !== 'undefined'
            if (typeof error.response.data.error !== 'undefined') {
                this.setState({error: error.response.data.error});
            }
        });
    }

    render() {
        if (this.state.error) {
            return (<Error error={this.state.error} />);
        }
        if (!this.state.visit) {
            return <div>Loading...</div>;
        }

        return (
            <div className="container column is-12">
                <div className="section profile-heading profile-heading-color profile-visit">
                    <div className="columns">
                        <div className="column is-4">
                            <div className="image is-2by1">
                                <img src="https://placehold.it/256x256" />
                            </div>
                        </div>
                        <div className="column is-4 name">
                                <h3 className="title is-3 color-black">
                                    <strong>{this.state.visit.client.name}</strong>
                                </h3>
                            <p className="tagline">
                                <strong>Visit Date: </strong>{DateHelper.format(this.state.visit.visit_date)}
                            </p>
                            <p className="tagline">
                                <strong>Address: </strong>{this.state.visit.client.address}
                            </p>
                            <p className="tagline">
                                <strong>Area: </strong>{this.state.visit.client.area._id}
                            </p>
                        </div>
                        <div className="column is-2 followers has-text-centered">
                            <p className="stat-val"><strong>R$ {this.state.visit.value_received}</strong></p>
                            <p className="stat-key">Value Received</p>
                        </div>
                        <div className="column is-2 likes has-text-centered">
                            <p className="stat-val"><strong>{this.state.visit.sales_quantity}</strong></p>
                            <p className="stat-key">Sales Quantity</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Visit;
