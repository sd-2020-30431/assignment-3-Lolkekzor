import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Col, Row, Button } from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';

import GlobalRedirectActions from '../reflux/actions/GlobalRedirect';
import Alerts from '../reflux/actions/GlobalAlert';

const schema = yup.object({
    listTitle: yup.string().required(),
})

class ListAddForm extends React.Component {
    handleCompletion = (data) => {
        axios.post('http://localhost:8000/lists/', JSON.stringify({
            name: data.listTitle,
        }), {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        }).then(res => {
            Alerts.add("List successfully added.", "success");
            GlobalRedirectActions.redirect('/lists');
        }).catch(err => {
            Alerts.add("Sorry, something went wrong. Please try again.", "danger");
        })
    }

    render() {
        return (
            <div>
                <h1> Enter your new grocery list details </h1>
                <hr/>
                <Formik
                    validationSchema={schema}
                    onSubmit={this.handleCompletion}
                    initialValues={{
                        listTitle: "",
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
                                <Form.Group className="form-group" as={Row} controlId="listTitle">
                                    <Form.Label> List title </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="listTitle"
                                        value={values.listTitle}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.listTitle && !errors.listTitle}
                                        isInvalid={touched.listTitle && !!errors.listTitle}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.listTitle}
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
