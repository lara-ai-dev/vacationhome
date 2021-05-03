import React, {useContext, useState} from 'react'
import { RoomContext } from '../context'
import AuthService from '../services/auth.service';
import axios from "axios";
import Title from "../components/Title";
import {Button} from "rsuite";

// gets User from local storage with token (user details)

const Profile = () => {

    const currentUser = AuthService.getCurrentUser();
    const context = useContext(RoomContext)
    const {

    }  = context;


    const apartments = useState;

    axios.get(`/apartment/`)
        .then(res =>{
            let apartments = res.data;
            console.log(apartments)
        })

    /*

    const handleSubmit = () => {
        const onSubmit = useCallback(formData =>{
            console.log(formData);
            axios.post(`/reservation`){
                apartmentId: this.state.apartmentNumber,

            })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                })
        }
    }*/



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
            <form>
                <div className="form-control">
                    <label htmlFor="emailAdress">Email address</label>
                    <input type="email" className="form-control" id="emailAdress"
                           placeholder={currentUser.email}/>
                </div>
                <div className="form-control">
                    <label htmlFor="apartmentSelect">Select Apartment</label>
                    <select className="form-control" id="apartmentSelect" value={this.state.apartmentId}>
                        <option>{apartments[0]}1</option>
                        <option>{apartments[1]}2</option>
                        <option>{apartments[2]}3</option>
                    </select>
                </div>
                <div className="form-control">
                    <p>Checkin date</p>
                    <input className="form-control" type="date" value="DD-MM-YY" id="example-date-input" {this.state.startDate}/>
                    <p>Checkout date</p>
                    <input className="form-control" type="date" value="DD-MM-YY" id="example-date-input" {this.state.startDate}/>
                </div>
                <div className="form-control">
                <Button className="form-control" type="submit"  onPress ={handleSubmit(onSubmit)}value="Reserve"/>
                </div>
            </form>


        </div>
        </>
    );
};

export default Profile;