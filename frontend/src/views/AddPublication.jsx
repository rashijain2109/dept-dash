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


import {axiosGET, axiosPOST, axiosDELETE} from "../utils/axiosClient.js"

import avatar from "../assets/img/faces/face-3.jpg";

class AddPublication extends Component {
    constructor(props){
        super(props);
        this.state = {
          faculties_list: [],
          // selectValue: [],
          // query: "",
          // filtered_list: []
        }
      }
    componentDidMount(){
      axiosGET('http://localhost:8000/api/faculties/')
      .then(res => {
        const faculties_list = res.data;
        this.setState({ faculties_list });
        // this.setState({ filtered_list: faculties_list });
        console.log(this.state.faculties_list);
      });
    }

    // handleChange = (e) => {
    //   var newEmail = e.target.value;
    //   var newValue = "";
    //   for(var i in this.state.faculties_list){
    //     if(this.state.faculties_list[i]["email"] == newEmail){
    //       newValue = this.state.faculties_list[i];
    //       break;
    //     }
    //   }
    //   var selectValue = this.state.selectValue;
    //   selectValue.push(newValue);
    //   this.setState({ selectValue: selectValue });
    //   console.log("selectValue:",selectValue);
    // }
    // handleInputChange = (event) => {
    //   const query = event.target.value;
    //   this.setState(prevState => {
    //   const filtered_list = prevState.faculties_list.filter(element => {
    //     return element["name"].toLowerCase().includes(query.toLowerCase());
    //   });

    //   return {
    //     query,
    //     filtered_list
    //   };
    // });
    // }


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
    var display = "";
    for(var i in this.state.selectValue){
      display = display + "  " + this.state.selectValue[i]["name"];
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
                  <Col sm={10}>
                    <h4 className="title">{this.props.type}</h4>
                  </Col>
                  <Col sm={2}>
                  <button type="button" onClick={this.props.handleClose} 
                                                  class="btn btn-warning">Close</button>
                  </Col>
                </Row>
                  <form>
                    <Row>
                      <div className="col-md-6" key={1}>
                        <FormGroup>
                          {/* <div id="Selected Fcaulties">
                            {display}
                          </div>
                          <input
                          placeholder="Search for..."
                          value={this.state.query}
                          onChange={this.handleInputChange}
                          />

                        <FormLabel>Select new faculty</FormLabel>
                        <FormControl as="select" multiple onChange={this.handleChange}>
                        { this.state.filtered_list.map((obj) => {
                            return <option value={obj["email"]}>
                              {obj["name"]}</option>
                          })
                        }
                        </FormControl>

                        <FormLabel>Remove a faculty</FormLabel>
                        <FormControl as="select" multiple onChange={this.handleChange}>
                        { this.state.selectValue.map((obj) => {
                            return <option value={obj["email"]}>
                              {obj["name"]}</option>
                          })
                        }
                        </FormControl> */}
                        <FormLabel>Authors</FormLabel>
                        <FormControl as="select" multiple>
                        { this.state.faculties_list.map((obj) => {
                            return <option value={obj["email"]}>
                              {obj["name"]}</option>
                          })
                        }
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

export default AddPublication;



