import { useContext } from 'react'
import { RoomContext } from '../context'
import AuthService from '../services/auth.service';
import Title from "../components/Title";

// gets User from local storage with token (user details)
const Profile = () => {

    const currentUser = AuthService.getCurrentUser();
    const context = useContext(RoomContext)
    const {
        handleChange,
        capacity,
    }  = context;


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
                <div className="form-group">
                    <label htmlFor="emailAdress">Email address</label>
                    <input type="email" className="form-control" id="emailAdress"
                           placeholder="Enter email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="apartmentSelect">Select Apartment</label>
                    <select className="form-control" id="apartmentSelect">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                </div>
                <div className="form-group row">
                    <label htmlFor="example-date-input" className="col-2 col-form-label">Date</label>
                    <input className="form-control" type="date" value="2011-08-19" id="example-date-input"/>
                </div>

            </form>


        </div>
        </>
    );
};

export default Profile;