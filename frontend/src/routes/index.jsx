import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import { loadProgressBar } from "axios-progress-bar";
import "../assets/progress-bar.css";
import { BrowserRouter } from "react-router-dom";

import { Home, ErrorPage404, Login, Logout, Dashboard } from "./LazyLoadRoutes";
import AdminLayout from "../layouts/Admin.jsx";

import { checkToken } from "../utils/jwt";

loadProgressBar();

const AuthRoute = ({ component: Component, ...rest }) => {
 /* if(checkToken()){
    return (
      <Switch>
        <Route path="/admin/dashboard" component = {Component} />
      </Switch>
    )
  }
  else{
    return(
      <Redirect to="/login" />
    )
  }
}*/
  return (
      <Route
        {...rest}
        render={props =>
          checkToken() ? <Component {...props} /> : <Redirect to = "/login" />
        }
      />
  );
};

export default class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = { token: null };
  }
  setToken(token) {
    this.setState({ token });
  }
  render() {
    return (
      <main>
        <Switch className="main">
          <Route
            path="/login"
            render={props => (
              <Login {...props} setRouterToken={this.setToken.bind(this)} />
            )}
          />
          <Route
            path="/logout"
            render={props => (
              <Logout {...props} setRouterToken={this.setToken.bind(this)} />
            )}
          />
          <AuthRoute exact path="/" component = {AdminLayout} />
          <AuthRoute path="/admin" component = {AdminLayout} />
          <Route component={ErrorPage404} />
        </Switch>
      </main>
    )
  }
}
