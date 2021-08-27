import { useState } from 'react'

import API from 'services/api'
import AuthService from 'services/auth.service'
import Title from 'components/Title/Title'

// gets User from local storage with token (user details)
const Profile = () => {
    const currentUser = AuthService.getUserFromLocalStorage()

    const [apartmentId, setApartmentId] = useState(0)
    const [email, setEmail] = useState(currentUser.email)
    const [checkInDate, setCheckInDate] = useState(new Date())
    const [checkOutDate, setCheckOutDate] = useState(new Date())
    const [noGuests, setNoGuests] = useState('')

    const apartments = useState

    API.get(`/apartment/`)
        .then((res) => {
            // const apartments = res.data;
        })
        .catch((err) => {
            console.log(err)
        })

    const handleSubmit = async (event) => {
        event.preventDefault()
        //const { apartmentId,email, checkInDate, checkOutDate} = values;

        API.post('/reservation', {
            email,
            apartmentId,
            checkInDate,
            checkOutDate,
            noGuests,
        })

            .then((response) => {
                setEmail(email)
                setCheckInDate(checkInDate)
                setCheckOutDate(checkOutDate)
                setNoGuests(noGuests)
            })
            .catch((err) => {
                console.log(err)
            })

        alert('Your reservation has been successfully placed!')
    }

    return (
        <>
            <div data-testid="personal-info" className="personalInformation">
                <Title className="personalInformation__title" title="Personal information" />
                <div className="personalInformation__container">
                    <header className="personalInformation__header">
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
                    <p>
                        <strong>Authorities:</strong>
                    </p>
                    <ul>
                        {currentUser.roles &&
                        currentUser.roles.map((role, index) => (
                            <li key={index}>{role}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="reservationInformation">
                <Title className="reservationInformation__title" title="Make reservation" />
                <div className="reservationInformation__container">
                    <form data-testid="reservation-form" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder={currentUser.email}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <label htmlFor="apartment">Select Apartment</label>
                            <select
                                className="form-control"
                                id="apartment"
                                value={apartmentId}
                                onChange={(e) => setApartmentId(Number(e.target.value))}
                            >
                                <option value={[0]}>{apartments[0]}1</option>
                                <option value={[1]}>{apartments[1]}2</option>
                                <option value={[2]}>{apartments[2]}3</option>
                            </select>

                            <label htmlFor="checkInDate">Checkin date</label>
                            <input
                                className="form-control"
                                type="date"
                                id="checkInDate"
                                value={checkInDate}
                                onChange={(e) => setCheckInDate(e.target.value)}
                            />

                            <label htmlFor="checkOutDate">Checkout date</label>
                            <input
                                className="form-control"
                                type="date"
                                id="checkOutDate"
                                value={checkOutDate}
                                onChange={(e) => setCheckOutDate(e.target.value)}
                            />

                            <label htmlFor="noGuests">Number of Guests</label>
                            <input
                                type="number"
                                id="noGuests"
                                name="numberOfGuests"
                                min="1"
                                max="5"
                                value={noGuests}
                                onChange={(e) => setNoGuests(Number(e.target.value))}
                            />

                            <button className="btn btn--primary" type="submit">
                                Reserve
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Profile



/*import React, {useContext, useState, Component} from 'react'
import { RoomContext } from '../../context'
import AuthService from '../../services/auth.service';
import axios from "axios";
import Title from "../../components/Title/Title";

// gets User from local storage with token (user details)
const Profile = () => {

    const currentUser = AuthService.getCurrentUser();
    const context = useContext(RoomContext)
    const {}  = context;

    const [apartmentId, setApartmentId] = useState(0);
    const [email, setEmail] = useState("");
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());
    const [noGuests, setNoGuests] = useState("");


    const apartments = useState;

    axios.get(`/apartment/`)
        .then(res =>{
            const apartments = res.data;
        })
        .catch(err => {
            console.log(err);
        })




        const handleSubmit = async (event) =>{
            event.preventDefault();
            //const { apartmentId,email, checkInDate, checkOutDate} = values;

             axios.post ('/reservation', {
                email,
                apartmentId,
                checkInDate,
                checkOutDate,
                noGuests

         })

            .then(response=>{
                setEmail(email);
                setCheckInDate(checkInDate);
                setCheckOutDate(checkOutDate);
                setNoGuests(noGuests);

                })
                 .catch(err => {
                     console.log(err);
                 })

            alert("Your reservation has been successfully placed!");

        };


    function handleChange(e){
        setApartmentId(e.target.value);
    };


    return (
        <>
        <div className="personalInformation">
        <Title className="personalInformation__title" title="Personal information"/>
        <div className="personalInformation__container">
            <header className="personalInformation__header">
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

            <div className="reservationInformation">
                <Title className="reservationInformation__title "title="Make reservation"/>
                <div className="reservationInformation__container">
                <form  onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label htmlFor="emailAdress">Email address</label>
                        <input type="email" className="form-control" id="email"
                               placeholder={currentUser.email} value={email} onChange={e => setEmail(e.target.value)}/>

                        <label htmlFor="apartmentSelect">Select Apartment</label>
                        <select className="form-control"  id="apartmentId" value={apartmentId} onChange={e => setApartmentId(Number(e.target.value))}>
                            <option value={[0]}>{apartments[0]}1</option>
                            <option value ={[1]}>{apartments[1]}2</option>
                            <option value = {[2]}>{apartments[2]}3</option>
                        </select>



                        <p>Checkin date</p>
                        <input className="form-control" type="date" id="checkInDate" value={checkInDate} onChange={e => setCheckInDate(e.target.value)}/>
                        <p>Checkout date</p>
                        <input className="form-control" type="date"  id="checkOutDate" value={checkOutDate} onChange={e => setCheckOutDate(e.target.value)}/>



                        <p>Number of Guests</p>
                        <input type="number" id="noGuests" name="numberOfGuests"  min="1" max="5" value={noGuests} onChange={e => setNoGuests(Number(e.target.value))}/>




                        <button className="btn btn--primary" type="submit" onSubmit="submit">Reserve</button>
                    </div>


                </form>
                </div>

            </div>

        </>
    );
};



export default Profile;*/