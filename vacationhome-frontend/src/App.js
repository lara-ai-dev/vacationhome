
import { Route, Switch } from 'react-router-dom'

import Home from 'pages/Home/Home'
import Apartments from 'pages/Apartments/Apartments'
import SingleApartment from 'pages/SingleApartment/SingleApartment'
import Error from 'pages/Error/Error'
import Login from 'components-auth/Login/Login'
import Register from 'components-auth/Register/Register'
import Profile from 'components-auth/Profile/Profile'
import BoardAdmin from 'components-auth/BoardAdmin/BoardAdmin'
import BoardUser from 'components-auth/BoardUser/BoardUser'
import Navbar from 'components/NavBar/Navbar'

import './App.scss'

function App() {
    return (
        <>
            <Navbar />
            <div>
                <Switch>
                    <Route path="/user" component={BoardUser} />
                    <Route path="/admin" component={BoardAdmin} />

                    <Route exact path={['/', 'home']} component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/profile" component={Profile} />

                    <Route exact path="/apartments" component={Apartments} />
                    <Route exact path="/apartments/:slug" component={SingleApartment} />
                    <Route component={Error} />
                </Switch>
            </div>
        </>
    )
}

export default App

/*import React, {useState, useEffect} from "react";
import './App.scss';

import Home from './pages/Home';
import Apartments from './pages/Apartments';
import SingleApartment from './pages/SingleApartment';
import Error from './pages/Error';


import Login from "./components-auth/Login/Login";
import Register from "./components-auth/Register/Register";
import Profile from "./components-auth/Profile";
import BoardAdmin from "./components-auth/BoardAdmin";
import BoardUser from "./components-auth/BoardUser";
import {Route, Switch, Link} from "react-router-dom";
import Navbar from './components/NavBar/Navbar';

function App() {


    return (
        <>
            <Navbar/>
            <div>

                <Switch>
                    <Route path="/user" component={BoardUser}/>
                    <Route path="/admin" component={BoardAdmin}/>

                    <Route exact path={["/", "home"]} component={Home}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/profile" component={Profile}/>

                    <Route exact path="/rooms/" component={Apartments}/>
                    <Route exact path="/rooms/:slug" component={SingleApartment}/>
                    <Route component={Error}/>
                </Switch>
            </div>
        </>


    );
}

export default App;*/
