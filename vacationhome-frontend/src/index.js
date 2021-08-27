import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import {RoomProvider} from './context';
import { ApartmentProvider } from './context/apartments'
import { AuthProvider } from './context/auth'

ReactDOM.render(
    <AuthProvider>
      <ApartmentProvider>
  <Router>
    <App />
  </Router>
      </ApartmentProvider>
    </AuthProvider>
  ,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
