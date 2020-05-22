import React from 'react';
import Reflux from 'reflux';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

import './BaseLayout.css';

import LoggedUserStore from '../reflux/stores/LoggedUser';

class BaseLayout extends Reflux.Component {
    constructor() {
        super();

        this.store = LoggedUserStore;
    }

    render_logged = () => (
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Navbar.Text>Logged in as: {this.state.username}</Navbar.Text>
            <Navbar.Text> <Link to={"/logout"} className="nav-link"> Logout </Link> </Navbar.Text>
        </Navbar.Collapse>
    )

    render_not_logged = () => (
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Navbar.Text> <Link to={"/login"} className="nav-link"> Login </Link> </Navbar.Text>
            <Navbar.Text> <Link to={"/signup"} className="nav-link"> Sign up </Link> </Navbar.Text>
        </Navbar.Collapse>
    )

    render() {
        return (
            <div className="App">
                <Navbar bg="light" expand="lg"> 
                    <Link to={"/"}> <Navbar.Brand>Wasteless</Navbar.Brand> </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    {this.state.logged ? this.render_logged() : this.render_not_logged()}
                </Navbar>

                <div className="wrapper">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default BaseLayout;
