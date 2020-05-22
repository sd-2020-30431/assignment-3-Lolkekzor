import React from 'react';

import { Link } from 'react-router-dom';
import { ListGroup, Row, Button } from 'react-bootstrap';

import axios from 'axios';

class ListsView extends React.Component {
    constructor() {
        super();

        this.state = {
            lists: [],
            loaded: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/lists', {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        }).then(res => {
            console.log(res);
            res = res.data;
            this.setState({
                lists: res,
                loaded: true
            })
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return(
            <div>
                <Row className="justify-content-between">
                    <h2> My lists </h2>
                    <Link to={"/lists/create"}> 
                        <Button> Add a new list </Button>
                    </Link>
                </Row>
                <hr/>
                <ListGroup>
                    {
                        this.state.lists.map((list, idx) =>
                            <ListGroup.Item key={idx}>
                                <Link to={`/list/${list.id}`}> {list.name} </Link>
                            </ListGroup.Item>
                        )
                    }
                </ListGroup>
            </div>
        )
    }
}

export default ListsView;
