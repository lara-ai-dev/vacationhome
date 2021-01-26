import React, {useState, useEffect} from "react";
import './App.css';

import Home from './pages/Home';
import Rooms from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';
import Error from './pages/Error';

import AuthService from "./services/auth.service";

import Login from "./components-auth/Login";
import Register from "./components-auth/Register";
import Profile from "./components-auth/Profile";
import BoardAdmin from "./components-auth/BoardAdmin";
import BoardUser from "./components-auth/BoardUser";
import { Route, Switch, Link } from "react-router-dom";

import Navbar from './components/Navbar';

function App() {

  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (

    <>
    <Navbar/>
      <div>
        <nav>

          <div>

            {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
            )}

            {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
            )}
          </div>

          {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut}>
                    LogOut
                  </a>
                </li>
              </div>
          ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
          )}
        </nav>
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
