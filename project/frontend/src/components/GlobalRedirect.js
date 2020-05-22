import React from 'react';
import Reflux from 'reflux';
import GlobalRedirectStore from '../reflux/stores/GlobalRedirect';
import { Redirect } from 'react-router';

class GlobalRedirect extends Reflux.Component {
    constructor(props){
        super(props);
        this.state = {
        };
        this.store = GlobalRedirectStore;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.redirect === undefined) {
            return;
        } else {
            this.setState({
                redirect: undefined
            })
        }
    }

    render(){
        if( this.state.redirect !== undefined ){
            let redir = this.state.redirect;
            return <Redirect to={redir} />
        } else {
            return <span />
        }
    }
}

export default GlobalRedirect;
