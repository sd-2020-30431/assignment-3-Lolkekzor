import React from 'react';
import Reflux from 'reflux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Row, Button } from 'react-bootstrap';

import './LoginForm.css';

import LoggedUserStore from '../reflux/stores/LoggedUser';
import LoggedUserActions from '../reflux/actions/LoggedUser';

const schema = yup.object({
    username: yup.string().required("Please enter an username").min(3, "Username must be at least 3 characters long"),
    password: yup.string().required("Please enter a password").min(8, "Password is too short, must be at least 8 characters"),
});

class LoginForm extends Reflux.Component{
    constructor(props) {
        super(props);

        this.store = LoggedUserStore;
    }

    handleCompletion = (user) => {
        LoggedUserActions.login(user);
    }

    render() {
        return (
            <div>
                <h1>Log In</h1>
                <hr/>
                <Formik
                    validationSchema={schema}
                    onSubmit={this.handleCompletion}
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                >
                    {({
                        handleSubmit,
                            handleChange,
                            handleBlur,
                            values,
                            touched,
                            isValid,
                            errors,
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group className="form-group" as={Row} controlId="username">
                                <Form.Label> Username </Form.Label>
                                <Form.Control
                                    className="form-control"
                                    type="text"
                                    name="username"
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.username && !errors.username}
                                    isInvalid={touched.username && !!errors.username}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.username}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="form-group" as={Row} controlId="password">
                                <Form.Label> Password </Form.Label>
                                <Form.Control
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.password && !errors.password}
                                    isInvalid={touched.password && !!errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <hr/>
                            <Button type="submit" className="btn btn-primary btn-block">Submit</Button>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
}

export default LoginForm;
