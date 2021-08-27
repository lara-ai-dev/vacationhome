import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import InputField from 'components/InputField/InputField'
import FieldMessage from 'components/FieldMessage/FieldMessage'
import Button from 'components/Button/Button'
import { useAuth } from 'context/auth'

// schema for form fields validation
const schema = yup.object().shape({
    username: yup.string().required().min(5).max(25),
    password: yup.string().required().min(6).max(40),
    email: yup.string().required().email(),
})

export default function Register() {
    const { user, signup } = useAuth()

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [successful, setSuccessful] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) })

    const handleRegister = ({ username, email, password }) => {
        setLoading(true)
        setMessage('')

        signup(username, email, password)
            .then(({ message }) => {
                setSuccessful(true)
                setMessage(message)
            })
            .catch((error) => {
                setSuccessful(false)
                setMessage(error)
            })
            .finally(() => setLoading(false))
    }

    if (user) return <Redirect to="/profile" />

    return (
        <div className="register">
            <div className="register__card--container">
                <form onSubmit={handleSubmit(handleRegister)}>
                    {!successful && (
                        <div className="register__form--group">
                            <InputField label="Username" {...register('username')} />
                            <FieldMessage name="username" errors={errors} />

                            <InputField label="Email" type="email" {...register('email')} />
                            <FieldMessage name="email" errors={errors} />

                            <InputField
                                label="Password"
                                type="password"
                                {...register('password')}
                            />
                            <FieldMessage name="password" errors={errors} />

                            <div className="register__form--group">
                                <Button  className="btn btn--registration" disabled={loading}>
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    Sign Up
                                </Button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                            <div
                                className={
                                    successful ? 'alert alert-success' : 'alert alert-danger'
                                }
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}




/*import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import InputField from "../../components/InputField/InputField";

import AuthService from "../../services/auth.service";
import Button from "../../components/Button/Button";


//alert for this field is empty
const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

// checks the value of the email - usage of isEmail from validator to verify email
const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

// function for username which needs to be longer than 5 characters but not longer than 25
const vusername = value => {
    if (value.length < 5 || value.length > 25) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 5 and 25 characters.
            </div>
        );
    }
};

// function for password which needs to be longer than 6 characters but not longer than 40
const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            email: "",
            password: "",
            successful: false,
            message: ""
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        //validateAll() method to check validation functions in validations
        this.form.validateAll();

        //checkbutton aids to verify the form
        if (this.checkBtn.context._errors.length === 0) {
            AuthService.register(
                this.state.username,
                this.state.email,
                this.state.password
            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            );
        }
    }

    render() {
        return (
            <div className="register">
                <div className="register__card--container">

                    <Form
                        onSubmit={this.handleRegister}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && (
                            <div>
                                <div className="register__form--group">
                                    <label className="register__formLabel" htmlFor="username">Username</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChangeUsername}
                                        validations={[required, vusername]}
                                    />
                                </div>

                                <div className="register__form--group">
                                    <label className="register__formLabel" htmlFor="email">Email</label>
                                    <InputField
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                        validations={[required, email]}
                                    />
                                </div>

                                <div className="register__form--group">
                                    <label className="register__formLabel" htmlFor="password">Password</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        validations={[required, vpassword]}
                                    />
                                </div>

                                <div className="register__form--group">
                                    <Button className="btn btn--registration">Sign Up</Button>
                                </div>
                            </div>
                        )}

                        {this.state.message && (
                            <div className="form-group">
                                <div
                                    className={
                                        this.state.successful
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
            </div>
        );
    }
}
*/