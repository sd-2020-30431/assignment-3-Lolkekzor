import React from 'react';

import './LoginForm.css';

import LoggedUserActions from '../reflux/actions/LoggedUser';

class LogoutPage extends React.Component{
    constructor(props) {
        super(props);

        LoggedUserActions.logout();
    }

    render() {
        return (
            <div> Successfully logged out. </div>
        )
    }
}

export default LogoutPage;
