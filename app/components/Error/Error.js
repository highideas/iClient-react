import React from 'react';

const Error = ({error}) => (
    error ?
    <div className="notification is-danger">
        {error}
    </div> : null
);
export default Error;
