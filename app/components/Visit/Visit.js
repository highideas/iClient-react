import React from 'react';
import { Link } from 'react-router'

class Visit extends React.Component
{
    constructor(props, context) {
        super(props, context);
        this.generate = this.generate.bind(this);
        this.state = {
            visits: this.props.visits || []
        };
    }

    generate() {
        return this.state.visits.map((areaVisit, key) => (
            <tr key={ key } >
                <td>{ areaVisit.visit.client.name }</td>
                <td>{ areaVisit.visit.visit_date }</td>
                <td className="is-icon">
                    <Link to={ `/visit/${areaVisit.visit._id}` } >
                        <i className="fa fa-info-circle" />
                    </Link>
                </td>
            </tr>
        ));
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last Visit</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {this.generate()}
                </tbody>
            </table>
        );
    }
}

Visit.propTypes = {
    visits: React.PropTypes.array.isRequired
};

export default Visit;

