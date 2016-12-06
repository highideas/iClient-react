import React from 'react';

import Error from 'components/Error/Error'
import AreaService from 'services/Area'
import styles from 'components/Area/Select/styles.css'

class Area extends React.Component
{
    constructor(props, context) {
        super(props, context);
        this.state = {
            error : '',
            areas : null,
        };
    }

    componentWillMount() {

        AreaService.getAll().then((response) => {
            this.setState({areas: response.data.areas});
        }).catch((error) => {
            this.setState({error: 'Error Found: Trying get areas'});
            let isValidResponse = typeof error.response.data !== 'undefined';
            if (isValidResponse && typeof error.response.data.error !== 'undefined') {
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

        const select = Object.assign({}, this.props.select);

        return (
            <p className="control has-icon">
                <span className="select">
                    <select {...select} >
                        {
                            this.state.areas.map((area, key) => (
                                <option value={ area._id } key={ key }>{ area._id}</option>
                            ))
                        }
                    </select>
                </span>
                <i className="fa fa-map-marker" aria-hidden="true" />
            </p>
        );
    }
}

export default Area;

