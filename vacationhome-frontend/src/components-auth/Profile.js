import React, {useContext, useState, Component} from 'react'
import { RoomContext } from '../context'
import AuthService from '../services/auth.service';
import axios from "axios";
import Title from "../components/Title";

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
            let apartments = res.data;
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
                <div className="reservation-add">
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




                        <button className="btn btn-primary" type="submit" onSubmit="submit">Reserve</button>
                    </div>


                </form>
                </div>

            </div>

        </>
    );
};



export default Profile;