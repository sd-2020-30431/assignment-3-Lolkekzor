import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Row, Button } from 'react-bootstrap';
import axios from 'axios';

import './SignupForm.css';

import LoggedUserActions from '../reflux/actions/LoggedUser';

const schema = yup.object({
    username: yup.string().required("Please enter an username").min(3, "Username must be at least 3 characters long"),
    password: yup.string().required("Please enter a password").min(8, "Password is too short, must be at least 8 characters"),
    passwordConfirmation: yup.string().required("Please confirm your password").oneOf([yup.ref('password'), null], 'Passwords must match')
});

class SignupForm extends React.Component{
    register = (data) => {
        LoggedUserActions.signup(data)
    }

    render() {
        return (
            <div>
                <h1>Sign up</h1>
                <hr/>
                <Formik
                    validationSchema={schema}
                    onSubmit={this.register}
                    initialValues={{
                        username: '',
                        password: '',
                        passwordConfirmation: ''
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
                            <Form.Group className="form-group" as={Row} controlId="passwordConfirmation">
                                <Form.Label> Confirm Password </Form.Label>
                                <Form.Control
                                    className="form-control"
                                    type="password"
                                    name="passwordConfirmation"
                                    value={values.passwordConfirmation}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.passwordConfirmation && !errors.passwordConfirmation}
                                    isInvalid={touched.passwordConfirmation && !!errors.passwordConfirmation}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.passwordConfirmation}
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

export default SignupForm;
