import React from 'react';
import { Link } from 'react-router'

import VisitService from 'services/Visit'

import Visit from 'components/Visit/Visit'
import ErrorComponent from 'components/Error/Error'

class Area extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            areas : [],
            error : ''
        };
        this.generate = this.generate.bind(this);
        this.getVisitGroupByArea();
    }

    getVisitGroupByArea() {
        VisitService.getGroupByArea().then((response) => {
            this.setState({areas: response.data.visits});
            this.setState({error: ''});
        }).catch((error) => {
            if (error.response) {
                this.setState({error: error.response.data.error});
            }
        });
    }

    generate() {
        return this.state.areas.map((area, key) => {
            return (
                <div className="area" key={ key }>
                    <h3 className="title is-3">{area._id}</h3>
                    <Visit visits={area.visits} />
                </div>
            );
        });
    }

    render() {
        if (this.state.error) {
            return (
                <ErrorComponent error={this.state.error} />
            );
        }
        return (
            <div className="container hello">
                { this.generate() }
            </div>
        );
    }
}

export default Area;

