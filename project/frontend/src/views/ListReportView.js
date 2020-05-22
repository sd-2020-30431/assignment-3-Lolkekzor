import React from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import axios from 'axios';

import Alerts from '../reflux/actions/GlobalAlert';
import Factory from '../factory/Factory.js';

class ListReportView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            factory: new Factory(),
            listId: props.match.params.id,
            burndown: 0
        }
    }

    componentDidMount() { 
        axios.get(`http://localhost:8000/list/${this.state.listId}/report`, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        }).then(res => {
            console.log(res);
            res = res.data;
            this.setState((prevState) => (
                {
                    ...prevState,
                    burndown: res
                }
            ))
        }).catch(err => {
           Alerts.add("Something went wrong fetching the data.", "danger");
        })
    }

    render() {
        let Report = this.state.factory.getReport("BURNDOWN");
        return (
            <Report burndown={this.state.burndown}/>
        )
    }
}

export default ListReportView;
