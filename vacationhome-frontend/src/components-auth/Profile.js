import React, {useContext, useState, Component} from 'react'
import { RoomContext } from '../context'
import AuthService from '../services/auth.service';
import axios from "axios";
import Title from "../components/Title";
import {Button} from "rsuite";

// gets User from local storage with token (user details)

const Profile = () => {

    const currentUser = AuthService.getCurrentUser();
    const context = useContext(RoomContext)
    const {}  = context;
    const [apartmentId, setApartmentId] = useState();
    const [email, setEmail] = useState();
    const [checkInDate, setCheckInDate] = useState();
    const [checkOutDate, setCheckOutDate] = useState();
    const [numberOfGuests, setNumberOfGuests] = useState();

    const apartments = useState;

    axios.get(`/apartment/`)
        .then(res =>{
            let apartments = res.data;
            console.log(apartments)
        })


    const handleSubmit = async (event) =>{
        event.preventDefault();
       // const { apartmentId,email, checkInDate, checkOutDate} = values;

        await axios.post ('/reservation', {
            
            email,
            checkInDate,
            checkOutDate,
            numberOfGuests})

            .then(response =>{
                console.log(response);
            })

        };



    return (
        <>
        <div className="personalinformation">
        <Title title="Personal information"/>
        <div className="container-personalinformation">
            <header className="header-personalinformation">
                <h3>
                    <strong>{currentUser.username}</strong> Profile
                </h3>
            </header>
            <p>
                <strong>Username:</strong> {currentUser.username}
            </p>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>
            <p><strong>Authorities:</strong></p>
            <ul>
                {currentUser.roles &&
                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>

        </div>
        </div>

            <div className="reservationinformation">
                <Title title="Make reservation"/>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label htmlFor="emailAdress">Email address</label>
                        <input type="email" className="form-control" id="email"
                               placeholder={currentUser.email} value={email}/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="apartmentSelect">Select Apartment</label>
                        <select className="form-control" id="apartmentId" value={apartmentId} >
                            <option>{apartments[0]}1</option>
                            <option>{apartments[1]}2</option>
                            <option>{apartments[2]}3</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <p>Checkin date</p>
                        <input className="form-control" type="date" id="example-date-input" value={checkInDate}/>
                        <p>Checkout date</p>
                        <input className="form-control" type="date"  id="example-date-input" value={checkOutDate}/>
                    </div>

                    <div className="form-control">
                        <p>Number of Guests</p>
                        <input type="number" id="noGuests" name="numberOfGuests"  min="1" max="5" value={numberOfGuests}/>
                    </div>


                    <div className="form-control">
                        <Button className="form-control" type="submit" onSubmit="submit">Reserve</Button>
                    </div>
                </form>


            </div>

        </>
    );
};



export default Profile;