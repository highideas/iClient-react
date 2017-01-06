import React from 'react';
import { Link } from 'react-router'

import AreaService from 'services/Area'

import Error from 'components/Error/Error'

class Area extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            areas : null,
            error : ''
        };
        this.getAreas();
    }

    getAreas() {
        AreaService.getAll().then((response) => {
            this.setState({areas: response.data.areas});
        }).catch((error) => {
            this.setState({error: 'Error Found: Trying get area'});
            if (typeof error.response.data.error !== 'undefined') {
                this.setState({error: error.response.data.error});
            }
        });
    }

    render() {
        if (this.state.error) {
            return (<Error error={this.state.error} />);
        }
        if (!this.state.areas) {
            return <div>Loading...</div>;
        }
        const areaList = this.state.areas.map((area, key) => {
            let line = ((key % 2) ? 'is-success' : 'is-info');
            return (
                <tr key={key}>
                    <td>
                        { area._id }
                    </td>
                </tr>
            );
        });

        return (
            <section className="">
                <div className="container hello">
                    <div className="level header">
                        <div className="level-left">
                            <h2 className="title is-2">Areas</h2>
                        </div>
                        <div className="level-right">
                            <Link to='/area' className="button is-info is-medium">
                                <span className="icon">
                                    <i className="fa fa-plus"></i>
                                </span>
                                <span>New Area</span>
                            </Link>
                        </div>
                    </div>
                    <table className="table">
                        <tbody>
                            { areaList }
                        </tbody>
                    </table>
                </div>
            </section>
        );
    }
}

export default Area;
