import React, {useState, useEffect} from "react";
import './App.css';

import Home from './pages/Home';
import Rooms from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';
import Error from './pages/Error';
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "./services/auth.service";

import Login from "./components-auth/Login";
import Register from "./components-auth/Register";
import Profile from "./components-auth/Profile";
import BoardAdmin from "./components-auth/BoardAdmin";
import BoardUser from "./components-auth/BoardUser";
import { Route, Switch, Link } from "react-router-dom";

import Navbar from './components/Navbar';

function App() {



  return (

    <>
    <Navbar/>
    <div>

    <Switch>

    <Route exact path ={["/","home"]} component={Home}/>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/profile" component={Profile} />
    <Route path="/user" component={BoardUser} />
    <Route path="/admin" component={BoardAdmin} />
    <Route exact path ="/rooms/" component={Rooms}/>
    <Route exact path ="/rooms/:slug" component={SingleRoom}/>
    <Route component={Error}/>

    </Switch>
    </div>
    </>


  );
}

export default App;
