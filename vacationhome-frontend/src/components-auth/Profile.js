import React from "react";
import AuthService from '../services/auth.service';
import Title from "../components/Title";

// gets User from local storage with token (user details)
const Profile = () => {
    const currentUser = AuthService.getCurrentUser();

    return (
        <div>
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
        </div>
    );
};

export default Profile;