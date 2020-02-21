import React, { Component } from "react";
import { Redirect } from "react-router";
import { GoogleLogin } from "react-google-login";
import { getToken, checkToken } from "../utils/jwt";

import LazyHero from "react-lazy-hero"
import background from "../assets/img/background.jpeg"

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: checkToken(),
      failed: false
    };
  }
  render() {
    let googleSucess = data => {
      getToken(data.tokenObj.access_token, (err, token) => {
        if (err) {
          return this.setState({
            failed: true
          });
        }
        this.props.setRouterToken(token);
        this.setState({ authenticated: true });
      });
    };
    let googleFailure = data => {
      this.setState({
        failed: true
      });
    };
    if (this.state.authenticated)
      return <Redirect to="/" />;
    return <div style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
      <LazyHero 
        color="#000000"
        opacity={0.4}
        imageSrc={background}
        minHeight="100vh"
        parallaxOffset={100}
      >
        <div
          className="home"
          style = {{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translate(-50%, 50%)",
            textAlign: "center",
            color: "white"
          }}
        >
          <h1>CSIS Dashboard</h1>
          <br />
          <p>
            <GoogleLogin
              clientId="102664725186-6k754cqieqagh8ia3sfi8b2666uifrl7.apps.googleusercontent.com"
              onSuccess={googleSucess}
              onFailure={googleFailure}
              theme="dark"
              icon={false}
              buttonText="Login with BITSMail"
            />
          </p>
          <font color="red">
            {this.state.failed
              ? "Account not found. Make sure you are using your BITS mail to login"
              : ""}
          </font>
        </div>
      </LazyHero>
    </div>
  }
}
