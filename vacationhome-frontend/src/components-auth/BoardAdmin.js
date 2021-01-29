import React, { Component } from "react";
import axios from "axios";
import UserService from "../services/user.service";
import Title from "../components/Title";
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';

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
        const {reservations} = this.state;
        return (
            <div className="reservationinformation">
                <Title title="Reservation information"/>
            <div className="container-reservationinformation">
                <header className="jumbotron">
                    <h3>{this.state.content}</h3>
                </header>
                <ul>
                    {this.state.reservations.map((reservation =>
                            <li>{reservation.price}</li>
                    ))}


                </ul>
            </div>

                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Check In</th>
                        <th>Check Out</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reservations.map((reservation) => {
                        return (
                            <tr key={reservation.id}>
                                <td>{reservation.id}</td>
                                <td>{reservation.price}</td>
                            </tr>
                        )
                    })}

                    </tbody>
                </Table>

            </div>
        );
    }
}
