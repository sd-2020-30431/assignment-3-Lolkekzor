import React from 'react';
import Reflux from 'reflux';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

import LoggedUserStore from '../reflux/stores/LoggedUser';

class HomePage extends Reflux.Component{
    constructor(props) {
        super(props);

        this.store = LoggedUserStore;
    }

    render(){
        console.log(this.state);

        return(
            <Card className="text-center">
                <Card.Header><h1>Home Page</h1></Card.Header>
                <Card.Body>
                    <Card.Title>Welcome, {this.state.username || "Guest"}!</Card.Title> 
                    <Card.Text>
                        {this.state.username ? 
                        "Click below to get started with editing your grocery lists." :
                        "Please log in to get started."}
                    </Card.Text>
                    {this.state.username && <Link to={"lists/"}> <Button variant="primary"> My lists </Button> </Link>}
                </Card.Body>
            </Card>
        )
    }

}

export default HomePage;
