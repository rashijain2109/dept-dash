/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";

import { Card } from "../components/Card/Card.jsx";
import { FormInputs } from "../components/FormInputs/FormInputs.jsx";
import { UserCard } from "../components/UserCard/UserCard.jsx";
import Button from "../components/CustomButton/CustomButton.jsx";

import avatar from "../assets/img/faces/face-3.jpg";

class UserProfile extends Component {
  render() {
    return (
      <div className="content">
        <Container fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Add Project"
                content={
                  <form>
                    <Row>
                      <div className="col-md-6" key={1}>
                      <FormGroup>
                        <FormLabel>Select Authors</FormLabel>
                        <FormControl as="select" multiple>
                          <option>Daksh Yashlaha</option>
                          <option>Rashi Jain</option>
                          <option>Nihal Jain</option>
                          <option>Pranjal Gupta</option>
                          <option>Ujjwal Raizada</option>
                          <option>Krut Patel</option>
                        </FormControl>
                      </FormGroup>
                      </div>

                      <div className="col-md-6" key={2}>
                      <FormGroup>
                        <FormLabel>Proposed by</FormLabel>
                        <FormControl as="select" multiple>
                          <option>Daksh Yashlaha</option>
                          <option>Rashi Jain</option>
                        </FormControl>
                      </FormGroup>
                      </div>
                    </Row>

                    <Row>
                      <div className="col-md-8" key={1}>
                      <FormGroup>
                        <FormLabel>Title</FormLabel>
                        <FormControl type="text" />
                      </FormGroup>
                      </div>

                      <div className="col-md-4" key={2}>
                      <FormGroup>
                        <FormLabel>Status</FormLabel>
                        <FormControl as="select">
                          <option>Communicated</option>
                          <option>Rejected</option>
                          <option>Accepted</option>
                        </FormControl>
                      </FormGroup>
                      </div>
                    </Row>

                    <Row>
                      <div className="col-md-12" key={1}>
                      <FormGroup>
                        <FormLabel>Description</FormLabel>
                        <FormControl as="textarea" rows={3} />
                      </FormGroup>
                      </div>
                    </Row>

                    <Row>
                      <div className="col-md-6" key={1}>
                      <FormGroup>
                      <FormLabel>Agency</FormLabel>
                      <FormControl type="text" />
                      </FormGroup>
                      </div>

                      <div className="col-md-6" key={2}>
                      <FormGroup>
                        <FormLabel>Scheme</FormLabel>
                        <FormControl type="text" />
                      </FormGroup>
                      </div>
                    </Row>

                    <Row>
                      <div className="col-md-12" key={1}>
                      <FormGroup>
                        <FormLabel>Principal Investigator / Co-Investigator</FormLabel>
                        <FormControl type="text" />
                      </FormGroup>
                      </div>
                    </Row>

                    <Button bsStyle="info" pullRight fill type="submit">
                      Submit
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default UserProfile;
