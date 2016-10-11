import React from 'react';

import LoginComponent from './../Login/LoginComponent';

class iClientComponent extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        let view = <h1>Teste</h1>;

        if (!localStorage.token) {
            view = <LoginComponent />;
        }
        return (
            view
        );
    }
}

export default iClientComponent;

