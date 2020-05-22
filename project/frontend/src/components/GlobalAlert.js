import React from 'react';
import Reflux from 'reflux';
import { Alert } from 'react-bootstrap';

import GlobalAlertStore from '../reflux/stores/GlobalAlert';
import GlobalAlertActions from '../reflux/actions/GlobalAlert';

import './GlobalAlert.css';

class GlobalAlert extends Reflux.Component{

    constructor(props){
        super(props);
        this.store = GlobalAlertStore;
    }

    dismissAlert(index){
        GlobalAlertActions.remove(index);
    }

    render(){
        return(
            <div className='global-alert-wrapper'>
                {this.state.alerts.map( (message, index) =>
                <Alert variant={message.type} key={index} onClose={()=>{this.dismissAlert(index)}} dismissible>
                    {message.message}
                </Alert>
                )}
            </div>
        )
    }
}

export default GlobalAlert;
