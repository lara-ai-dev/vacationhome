import React, { Component } from "react";
import axios from "axios";
import UserService from "../services/user.service";

export default class BoardAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };

        this.state = {
            reservations: []
        }
    }

    componentDidMount() {

        UserService.getAdminBoard().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );

        axios.get(`/reservation`)
            .then(res => {
                const reservations = res.data;
                this.setState({reservations});
                console.log(reservations);
            })




    }

    render() {
        return (
            <div className="reservationinformation">
            <div className="container-reservationinformation">
                <header className="jumbotron">
                    <h3>{this.state.content}</h3>
                </header>
                <ul>
                    {this.state.reservations.map(reservation => {
                        <li>{reservation}</li>
                    })}
                </ul>
            </div>
            </div>
        );
    }
}
