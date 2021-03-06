import React, {Component} from "react";
import axios from "axios";
import UserService from "../services/user.service";
import Title from "../components/Title";


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
        //only accessible for the admin
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

        //get all reservations
        axios.get(`/reservation`)
            .then(res => {

                const reservations = res.data;
                this.setState({reservations});
            })
            .catch(err => {
                console.log(err);
            })

    }

    // delete specific reservations
    deleteReservation(id, e) {
        axios.delete(`/reservation/${id}`)
            .then(res => {


                const reservations = this.state.reservations.filter(item => item.id !== id);
                this.setState({reservations});
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const {reservations} = this.state;
        return (
            <div className="reservationinformation">
                <Title title="Reservation information"/>
                <div className="container-reservationinformation">

                </div>

                <table striped bordered hover>
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
                                <td>{reservation.email}</td>
                                <td>{reservation.checkInDate}</td>
                                <td>{reservation.checkOutDate}</td>
                                <td>{reservation.price}</td>
                                <td>
                                    <button className="btn btn-primary"
                                            onClick={(e) => this.deleteReservation(reservation.id, e)}>Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}

                    </tbody>
                </table>

            </div>
        );
    }
}
