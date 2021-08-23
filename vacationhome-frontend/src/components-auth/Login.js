import React, {useState, useRef} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import InputField from "../components/InputField";
import AuthService from "../services/auth.service";
import Button from "../components/Button/Button";
import { useHistory } from "react-router-dom";

//verify username and password as a required field
const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required
            </div>

        );

    }
};


const Login = (props) => {
    const history = useHistory();
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        // If the verification is successful -> call AuthService.login() method -> direct user to profile picture or error page
        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(username, password).then(
                () => {
                    /*
                    props.history.push("/profile");
                    window.location.reload();*/

                    history.push("/profile");
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }
    };

    return (
        <div className="logIn">
            <div className="logIn__card--container">


                <Form onSubmit={handleLogin} ref={form}>
                    <div className="logIn__form--group" >
                        <label className="logIn__formLabel" htmlFor="username">Username</label>
                        <InputField
                            type="text"
                            className="form-control"
                            name="username"
                            id="username"
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required]}

                        />
                    </div>

                    <div className="logIn__form--group">
                        <label className="logIn__formLabel" htmlFor="password">Password</label>
                        <InputField
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            value={password}
                            onChange={onChangePassword}

                        />
                    </div>

                    <div className="logIn__form--group">
                        <Button className="btn btn--registration" disabled={loading}>
                            {loading && (
                                <span></span>
                            )}
                            <span>Login</span>
                        </Button>
                    </div>

                    {message && (
                        <div className="logIn__form--group">
                            <div data-testid="form-message" className="alert alert--danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{display: "none"}} ref={checkBtn}/>
                </Form>
            </div>
        </div>
    );


};

export default Login;


