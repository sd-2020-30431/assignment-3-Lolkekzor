import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Table, Form, Col, Row, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

import { Link } from 'react-router-dom';
import Alerts from '../reflux/actions/GlobalAlert';

const schema = yup.object({
    itemTitle: yup.string().required(),
    itemQuantity: yup.number().required().positive(),
    itemCalories: yup.number().required().positive(),
    itemDate: yup.date().required().min(moment().subtract(10, 'years').calendar()).max(moment().add(10, 'years').calendar()),
    itemExpiration: yup.date().required().min(moment().subtract(10, 'years').calendar()).max(moment().add(10, 'years').calendar()),
    itemConsumption: yup.date().required().min(moment().subtract(10, 'years').calendar()).max(moment().add(10, 'years').calendar())
})

class ListAddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listId: props.match.params.id,
            name: "",
            items: []
        }
    }

    componentDidMount() {
        this.fetchItems();
    }

    fetchItems = () => {
        axios.get(`http://localhost:8000/list/${this.state.listId}/`, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        }).then(res => {
            console.log(res);
            res = res.data;
            this.setState((prevState) => (
                {
                    ...prevState,
                    name: res[0].name,
                    items: res[1]
                }
            ))
        }).catch(err => {
           Alerts.add("Something went wrong fetching the data.", "danger");
        })
    }

    handleCompletion = (data) => {
        axios.post(`http://localhost:8000/list/${this.state.listId}/`, JSON.stringify({
            name: data.itemTitle,
            quantity: data.itemQuantity,
            calories: data.itemCalories,
            purchase_date: moment(data.itemDate, "YYYY-MM-DD").format("YYYY-MM-DD hh:mm:ss"),
            expiration_date: moment(data.itemExpiration, "YYYY-MM-DD").format("YYYY-MM-DD hh:mm:ss"),
            consumption_date: moment(data.itemConsumption, "YYYY-MM-DD").format("YYYY-MM-DD hh:mm:ss")
        }), {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        }).then(res => {
            this.fetchItems();
        }).catch(err => {
            Alerts.add("Sorry, something went wrong.", "danger");
        })
    }

    render() {
        return (
            <div>
                <h1> Your list: {this.state.name} </h1>
                <Link to={`/list/${this.state.listId}/report`}>
                    <Button> Get report </Button>
                </Link>
                <hr/>
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Calories</th>
                            <th>Purchased</th>
                            <th>Expires</th>
                            <th>Consumption</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.items.map((item, idx) => {
                            let purchase_date = moment(item.purchase_date).format('MMMM Do YYYY, hh:mm:ss');
                            let expiration_date = moment(item.expiration_date).format('MMMM Do YYYY, hh:mm:ss');
                            let consumption_date = moment(item.consumption_date).format('MMMM Do YYYY, hh:mm:ss')

                            let donation_moment = moment(item.expiration_date).subtract(1, 'days');
                            if (moment().isAfter(donation_moment)) {
                                Alerts.add("You have items that are expiring or expired. Please consider donating them :)", "warning");
                            }
                            return(
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.calories}</td>
                                    <td>{purchase_date}</td>
                                    <td>{expiration_date}</td>
                                    <td>{consumption_date}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <hr/>
                <h2> Add a new item </h2>
                <Formik
                    validationSchema={schema}
                    onSubmit={this.handleCompletion}
                    initialValues={{
                        itemTitle: "",
                        itemQuantity: 0,
                        itemCalories: 0,
                        itemDate: "",
                        itemExpiration: "",
                        itemConsumption: "" 
                    }}
                >
                    {({
                        handleSubmit,
                            handleChange,
                            handleBlur,
                            values,
                            touched,
                            isValid,
                            errors
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} md="2" controlId="itemTitle">
                                    <Form.Label> Item </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="itemTitle"
                                        value={values.itemTitle}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.itemTitle && !errors.itemTitle}
                                        isInvalid={touched.itemTitle && !!errors.itemTitle}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.itemTitle}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="2" controlId="itemQuantity">
                                    <Form.Label> Quantity </Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="itemQuantity"
                                        value={values.itemQuantity}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.itemQuantity && !errors.itemQuantity}
                                        isInvalid={touched.itemQuantity && !!errors.itemQuantity}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.itemQuantity}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="2" controlId="itemCalories">
                                    <Form.Label> Calories </Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="itemCalories"
                                        value={values.itemCalories}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.itemCalories && !errors.itemCalories}
                                        isInvalid={touched.itemCalories && !!errors.itemCalories}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.itemCalories}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="2" controlId="itemDate">
                                    <Form.Label> Date of purchase </Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="itemDate"
                                        value={values.itemDate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.itemDate && !errors.itemDate}
                                        isInvalid={touched.itemDate && !!errors.itemDate}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.itemDate}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="2" controlId="itemExpiration">
                                    <Form.Label> Date of expiration </Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="itemExpiration"
                                        value={values.itemExpiration}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.itemExpiration && !errors.itemExpiration}
                                        isInvalid={touched.itemExpiration && !!errors.itemExpiration}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.itemExpiration}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="2" controlId="itemConsumption">
                                    <Form.Label> Date of consumption </Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="itemConsumption"
                                        value={values.itemConsumption}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.itemConsumption && !errors.itemConsumption}
                                        isInvalid={touched.itemConsumption && !!errors.itemConsumption}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.itemConsumption}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <hr/>
                            <Button type="submit" className="btn btn-primary btn-block">Submit</Button>
                        </Form>

                    )}

                </Formik>
            </div>
        )
    }
}

export default ListAddForm;
