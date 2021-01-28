import React, { Component } from 'react'
import logo from '../images/logo.svg';
import {FaAlignRight} from 'react-icons/fa';
import {Link} from 'react-router-dom';

import AuthService from "../services/auth.service";

export default class Navbar extends Component {

    constructor(props){
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showAdminBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user  = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }
    }

    logOut(){
        AuthService.logout();
    }

    state ={
        isOpen: false
    }

    //toggling in between the false 
    handleToggle = () => {
        this.setState({isOpen:!this.state.isOpen})
    }

    render() {
        const {currentUser, showAdminBoard} = this.state;

        return (
            <nav className="navbar">
            <div className="nav-center">
            <div className="nav-header">
            <Link to="/">
                <img src={logo} alt="vacationhome"/>
            </Link>
            <button type="button" className="nav-btn" onClick={this.handleToggle}>
                <FaAlignRight className="nav-icon"/>

            </button>
            </div>
            
            <ul className={this.state.isOpen?"nav-links show-nav" : "nav-links"}>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/rooms">Rooms</Link>
                </li>


                {showAdminBoard && (
                    <li>
                        <Link to={"/admin"}>
                            Admin Board
                        </Link>
                    </li>
                )}

                {currentUser && (
                    <li>
                        <Link to={"/user"}>
                            User
                        </Link>
                    </li>
                )}


                {currentUser ? (
                    <>
                        <li>
                            <Link to={"/profile"} >
                                {currentUser.username}
                            </Link>
                        </li>
                        <li>
                            <a href="/login"  onClick={this.logOut}>
                                LogOut
                            </a>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to={"/login"}>
                                Login
                            </Link>
                        </li>

                        <li>
                            <Link to={"/register"}>
                                Sign Up
                            </Link>
                        </li>
                    </>
                )}


            </ul>
            </div>
            </nav>

        )
    }
}
