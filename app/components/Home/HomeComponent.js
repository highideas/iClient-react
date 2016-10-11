import React from 'react';

class HomeComponent extends React.Component{

    render() {
        if (!localStorage.token) {
            window.location.href = "/";
        }
        return (
            <h3>Welcome!</h3>
        );
    }
}

export default HomeComponent;


