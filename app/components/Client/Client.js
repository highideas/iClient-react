import React from 'react';
import { CardStack, Card } from 'react-cardstack';

import ClientService from 'services/Client';
import Error from 'components/Error/Error'

class Client extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            clients : null,
            error : ''
        };
        this.getClients();
    }

    getClients() {
        ClientService.getClients().then((response) => {
            this.setState({clients: response.data.clients});
        }).catch((error) => {
            this.setState({error: 'Error Found: Trying get client'});
            if (error.response) {
                this.setState({error: error.response.data.error});
            }
        });
    }

    render() {
        if (this.state.error) {
            return (<Error error={this.state.error} />);
        }
        if (!this.state.clients) {
            return <div>Loading...</div>;
        }
        const clientList = this.state.clients.map((client, key) => {
            return (
                <Card key={key}>
                    <article className={`message ${((key % 2) ? 'is-success' : 'is-info')}`}>
                        <div className="message-header">
                            <strong>{ client.name }</strong>
                        </div>
                        <div className="message-body">
                            <address>{ client.address }</address>
                            <city><small>{ client.city }</small></city>
                        </div>
                    </article>
                </Card>
            );
        });

        return (
            <div className="container hello">
                <CardStack
                    height={100}
                    width={1200}
                    background='#00d1b2'
                    hoverOffset={0}>

                    { clientList }

                </CardStack>
            </div>
        );
    }
}

export default Client;

