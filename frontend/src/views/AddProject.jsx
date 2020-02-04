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
import Button from "../components/CustomButton/CustomButton.jsx";


class AddProject extends Component {

  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {

    var title = "";
    var status = "";
    var description = "";
    var agency = "";
    var scheme = "";
    var pi_copi = "";
    var id = "";
    if(this.props.type == "Add Project"){

    }
    else{
      if(this.props.data["status"] == "REJ"){
        status="Rejected";
      }
      else if(this.props.data["status"] == "ACT"){
          status="Accepted";
      }
      else if(this.props.data["status"] == "COM"){
          status="Communication";
      }

      title = this.props.data["title"];
      description = this.props.data["details"];
      agency = this.props.data["agency"];
      scheme = this.props.data["scheme"];
      pi_copi = this.props.data["pi_copi"];
      id = this.props.data["id"];
    }
    return (

      <div className="content">
        <Container fluid>
          <Row>
            <Col md={12}>
              <Card
                content={
                  <div>
                  <Row>
                    <Col sm={11}>
                      <h4 className="title">{this.props.type}</h4>
                    </Col>
                    <Col sm={1}>
                    <button type="button" onClick={this.props.handleClose} 
                                                    class="btn btn-warning">Close</button>
                    </Col>
                  </Row>
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
                        <FormControl type="text" defaultValue={title} key={id} />
                      </FormGroup>
                      </div>

                      <div className="col-md-4" key={2}>
                      <FormGroup>
                        <FormLabel>Status</FormLabel>
                        <FormControl as="select" defaultValue={status} key={id}>
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
                        <FormControl as="textarea" rows={3} defaultValue={description} key={id}/>
                      </FormGroup>
                      </div>
                    </Row>

                    <Row>
                      <div className="col-md-6" key={1}>
                      <FormGroup>
                      <FormLabel>Agency</FormLabel>
                      <FormControl type="text" defaultValue={agency} key={id}/>
                      </FormGroup>
                      </div>

                      <div className="col-md-6" key={2}>
                      <FormGroup>
                        <FormLabel>Scheme</FormLabel>
                        <FormControl type="text" defaultValue={scheme} key={id} />
                      </FormGroup>
                      </div>
                    </Row>

                    <Row>
                      <div className="col-md-12" key={1}>
                      <FormGroup>
                        <FormLabel>Principal Investigator / Co-Investigator</FormLabel>
                        <FormControl type="text" defaultValue={pi_copi} key={id}/>
                      </FormGroup>
                      </div>
                    </Row>

                    <Button bsStyle="info" pullRight fill type="submit">
                      Submit
                    </Button>
                    <div className="clearfix" />

                  </form>
                </div>
                }
              />
            </Col>
          </Row>
        </Container>
      </div>

    );

  }

}

export default AddProject;



