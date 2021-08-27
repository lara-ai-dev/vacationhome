import React, {Component} from "react";
import axios from "axios";
import UserService from "../../services/user.service";
import Title from "../../components/Title/Title";


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


            <div className="reservationInformation">
                <Title className="reservationInformation__title" title="Overview reservations"/>
                <div className="reservationsInformation__container">


                <table striped bordered hover className = "reservationInformation__table">
                    <thead className="reservationInformation__tableHead">
                    <tr className="reservationInformation__tableRow">
                        <th className="reservationInformation__tableHeader">ID</th>
                        <th className="reservationInformation__tableHeader">Email</th>
                        <th className="reservationInformation__tableHeader">Check In</th>
                        <th className="reservationInformation__tableHeader">Check Out</th>
                        <th className="reservationInformation__tableHeader">Price</th>
                    </tr>
                    </thead>

                    <tbody className="reservationInformation__tableBody">
                    {reservations.map((reservation) => {
                        return (
                            <tr key={reservation.id} className="reservationInformation_tableRow">
                                <td className="reservationInformation__tableData">{reservation.id}</td>
                                <td className="reservationInformation__tableData">{reservation.email}</td>
                                <td className="reservationInformation__tableData">{reservation.checkInDate}</td>
                                <td className="reservationInformation__tableData">{reservation.checkOutDate}</td>
                                <td className="reservationInformation__tableData">{reservation.price}</td>
                                <td className="reservationInformation__tableData">
                                    <button className="btn btn--primary"
                                            onClick={(e) => this.deleteReservation(reservation.id, e)}>Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}

                    </tbody>
                </table>

                </div>
            </div>
        );
    }
}