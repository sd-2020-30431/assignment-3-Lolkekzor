import Reflux from 'reflux';
import axios from 'axios';

import LoggedUserActions from '../actions/LoggedUser';
import GlobalRedirectActions from '../actions/GlobalRedirect';

class LoggedUserStore extends Reflux.Store {
    constructor() {
        console.log("STORE");
        super();
        this.state = {
            token: localStorage.getItem('token') || '',
            logged: false,
            username: undefined
        }

        this.listenTo(LoggedUserActions.login, this.login);
        this.listenTo(LoggedUserActions.signup, this.signup);
        this.listenTo(LoggedUserActions.tokenAuthenticate, this.tokenAuthenticate);
        this.listenTo(LoggedUserActions.logout, this.logout);

        this.tokenAuthenticate();
    }

    tokenAuthenticate() {
        if (localStorage.getItem('token') !== undefined) {
            console.log("Authenticating...");
            axios.get('http://localhost:8000/core/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            }).then(res => {
                console.log(res);
                res = res.data;
                this.setState(prevState => {
                    return {
                        ...prevState,
                        logged: true,
                        username: res.username
                    }
                })
            })
        }
    }

    login(user) {
        axios.post('http://localhost:8000/token-auth/', JSON.stringify({
            username: user.username,
            password: user.password
        }), {
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            console.log(user.username);
            console.log(res);
            res = res.data;
            this.setState({
                logged: true,
                username: user.username,
                token: res.token
            })
            localStorage.setItem('token', res.token);
            GlobalRedirectActions.redirect('/');
        }).catch(err => {
            console.log(err);
        })
    }
    
    signup(user) {
        axios.post('http://localhost:8000/core/users/', JSON.stringify({
            username: user.username,
            password: user.password
        }), {
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            res = res.data;
            this.setState({
                logged: true,
                username: user.username,
                token: res.token
            })
            localStorage.setItem('token', res.token);
            GlobalRedirectActions.redirect('/');
        }).catch(err => {
            console.log(err);
        })
    }

    logout() {
        this.setState(prevState => {
            return {
                ...prevState,
                token: '',
                logged: false,
                username: undefined
            }
        });
        localStorage.removeItem('token');
    }
}

export default LoggedUserStore;
