import React from 'react';
import { Router, Link } from 'react-router'

import Visit from 'services/Visit';

class Area extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            areas : []
        };
        this.renderVisit = this.renderVisit.bind(this);
        this.renderArea = this.renderArea.bind(this);
        this.getVisitGroupByArea();
    }

    getVisitGroupByArea() {
        Visit.getGroupByArea().then((response) => {
            this.setState({areas: response.data.visits});
        });
    }

    renderVisit(visits) {
        return visits.map((areaVisit, key) => {
            return (
                <tr key={ key } >
                    <td>{ areaVisit.visit.client.name }</td>
                    <td>{ areaVisit.visit.visit_date }</td>
                    <td className="is-icon">
                        <Link to={ `/visit/${areaVisit.visit._id}` } >
                            <i className="fa fa-info-circle" />
                        </Link>
                    </td>
                </tr>
            );
        });
    }

    renderArea(areas) {
        return areas.map((area, key) => {
            return (
                <div className="area" key={ key }>
                    <h3 className="title is-3">{area._id}</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Last Visit</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderVisit(area.visits)}
                        </tbody>
                    </table>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="container hello">
                { this.renderArea(this.state.areas) }
            </div>
        );
    }
}

export default Area;

