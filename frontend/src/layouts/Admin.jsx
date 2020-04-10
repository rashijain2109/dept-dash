import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NotificationSystem from "react-notification-system";
import { Redirect } from "react-router";
import { Home, ErrorPage404, Login, Logout, Dashboard, Projects, FacultyProfile, Publications } from "../routes/LazyLoadRoutes";

import AdminNavbar from "../components/Navbars/AdminNavbar";
import Sidebar from "../components/Sidebar/Sidebar";


import { style } from "../variables/Variables.jsx";

import routes from "../routes.js";



class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixedClasses: "dropdown show-dropdown open"
    };
  }

  componentDidMount() {    
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
getBrandText = path => {
  for (let i = 0; i < routes.length; i++) {
    if (
      this.props.location.pathname.indexOf(
        routes[i].layout + routes[i].path
      ) !== -1
    ) {
      return routes[i].name;
    }
  }
  return "Brand";
};
  render() {
   var user = this.props.user;
   console.log("heree");
   console.log(user);
   return (
      <div className="wrapper">
      <NotificationSystem ref="notificationSystem" style={style} />
        <Sidebar {...this.props} routes={routes} image={this.state.image}
        color={this.state.color}
        hasImage={this.state.hasImage}/>
        <div id="main-panel" className="main-panel" ref="mainPanel">
        <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>
            <Route path = "/admin/dashboard" render={props => (<Dashboard {...props} handleClick={this.handleNotificationClick} user={user} /> )} />
            <Route path = "/admin/projects" render={props => (<Projects {...props} handleClick={this.handleNotificationClick} user={user} /> )} />
            <Route path = "/admin/faculty" render={props => (<FacultyProfile {...props} handleClick={this.handleNotificationClick} user={user} /> )} />
            <Route path = "/admin/publications" render={props => (<Publications {...props} handleClick={this.handleNotificationClick} user={user} /> )} />
            <Route component = {ErrorPage404} />
          </Switch>
        </div>
      </div>
      
    );
  }
}

export default Admin;
