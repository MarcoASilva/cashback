import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';

import Register from './Register/Register';
import Login from './Login/Login';
import Orders from './Orders/Orders';
import About from './About/About';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/orders" render={() => {
              let loggedUser
              let additionalOrders
              try {
                loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));
              } catch (error) {
                loggedUser = null;
              }
              try {
                additionalOrders = JSON.parse(localStorage.getItem('additionalOrders'));
                additionalOrders = Array.isArray(additionalOrders) && additionalOrders || [];
              } catch (error) {
                additionalOrders = [];
              }
              return loggedUser? <Orders additionalOrders={additionalOrders} /> : <Redirect to="/login"/>
            }}>
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
