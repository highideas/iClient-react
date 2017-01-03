import React from 'react';

class Offline extends React.Component
{
    constructor(props, context) {
        super(props, context);
        this.updateNetworkStatus = this.updateNetworkStatus.bind(this);
        this.state = {
            networkStatus: {
                display: 'none'
            }
        };
    }

    componentWillMount() {
        this.updateNetworkStatus();
        window.addEventListener('online', this.updateNetworkStatus, false);
        window.addEventListener('offline', this.updateNetworkStatus, false);
    }

    updateNetworkStatus() {
        if (window.navigator.onLine) {
            this.setState({networkStatus: {display : 'none'}});
        } else {
            this.setState({networkStatus: {display : ''}});
        }
    }

    render() {
        return (
            <a className="button is-danger is-disabled" style={this.state.networkStatus}>
                <span className="icon">
                    <i className="fa fa-spinner"></i>
                </span>
                <span>Off Line</span>
            </a>
        );
    }
}

export default Offline;

