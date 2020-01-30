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


    constructor(props){
        super(props);
        this.state = {
        }
      }
  render() {
    var status = "";
    var type = "";
    var title ="";
    var details="";
    var doi_number="";
    var page_number="";
    var id="";
    if(this.props.type == "Add Publication"){

    }
    else {
        if(this.props.data["status"] == "REJ"){
            status="Rejected";
        }
        else if(this.props.data["status"] == "ACT"){
            status="Accepted";
        }
        else if(this.props.data["status"] == "COM"){
            status="Communication";
        }
        
        if(this.props.data["pub_type"] == "CNF"){
            type="Conference";
        }
        else if(this.props.data["pub_type"] == "JRN"){
            type="Journal";
        }

        details = this.props.data["details"];
        title = this.props.data["title"];
        doi_number = this.props.data["doi_number"];
        page_number = this.props.data["page_number"];
        id=this.props.data["id"];
    }
    return (

      <div className="content">

        <Container fluid>
          <Row>
            <Col md={12}>
              <Card 
                title={this.props.type}
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
                    </Row>

                    <Row>
                      <div className="col-md-12" key={1}>
                        <FormGroup>
                          <FormLabel>Title</FormLabel>
                          <FormControl type="text" defaultValue={title} key={id} />
                        </FormGroup>
                      </div>
                    </Row>

                    <Row>
                      <div className="col-md-6" key={2}>
                        <FormGroup>
                          <FormLabel>Status</FormLabel>
                          <FormControl as="select" defaultValue={status} key={id} >
                            <option>Communicated</option>
                            <option>Rejected</option>
                            <option>Accepted</option>
                          </FormControl>
                        </FormGroup>
                      </div>

                      <div className="col-md-6" key={3}>
                        <FormGroup>
                          <FormLabel>Publication Type</FormLabel>
                          <FormControl as="select" defaultValue={type} key={id} >
                            <option>Conference</option>
                            <option>Journal</option>
                          </FormControl>
                        </FormGroup>
                      </div>
                    </Row>

                    <Row>
                      <div className="col-md-12">
                        <FormGroup>
                          <FormLabel>Details</FormLabel>
                          <FormControl as="textarea" rows={3} defaultValue={details} key={id} />
                        </FormGroup>
                      </div>
                    </Row>

                    <Row>
                      <div className="col-md-6">
                        <FormGroup>
                          <FormLabel>Digital Object Identifier Number</FormLabel>
                          <FormControl type="text" defaultValue={doi_number} key={id} />
                        </FormGroup>
                      </div>
                      <div className="col-md-6">
                        <FormGroup>
                          <FormLabel>Page Number</FormLabel>
                          <FormControl type="text" defaultValue={page_number} key={id}/>
                        </FormGroup>
                      </div>
                    </Row>

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



