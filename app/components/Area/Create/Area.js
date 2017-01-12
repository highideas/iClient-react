import React from 'react';
import { Link, Router } from 'react-router'

import Error from 'components/Error/Error'
import AreaSelect from 'components/Area/Select/Area'
import ClientService from 'services/Client'
import AreaService from 'services/Area'

class Area extends React.Component
{
    constructor(props, context) {
        super(props, context);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            error : '',
            area : {}
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        let form = e.target;
        let parent = '';
        if (form.querySelector('[name="parent"]')) {
            parent = form.querySelector('[name="parent"]').value;
        }
        let formData = {
            _id : this.refs.area.value,
            parent: parent
        };

        this.setState({area: formData});

        AreaService.save(formData).then((response) => {
            this.context.router.push("/clients");
        }).catch((error) => {

            this.setState({error: 'Error trying create area'});

            let responseValid = typeof error.response.data !== 'undefined';

            if (responseValid && typeof error.response.data.error !== 'undefined') {
                this.setState({error: error.response.data.error});
            }
        });
    }

    render() {
        if (this.state.error) {
            return (<Error error={this.state.error} />);
        }

        return (
            <div className="container">
                <div className="columns is-vcentered">
                    <div className="column is-4 is-offset-4">
                        <h1 className="title">
                            Create Area
                        </h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="box">
                                <label className="label">Area</label>
                                <p className="control has-icon">
                                    <input
                                        ref='area'
                                        className="input"
                                        type="text"
                                        placeholder="Center"
                                        required="required"
                                    />
                                    <i className="fa fa-map-marker" />
                                </p>
                                <label className="label">Parent</label>
                                <AreaSelect
                                    select={ { name : 'parent' } }
                                />
                                <hr />
                                <p className="control">
                                    <button className="button is-primary">Save</button>
                                    <Link to='/clients' className="button">
                                        <span>Cancel</span>
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Area.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Area;

