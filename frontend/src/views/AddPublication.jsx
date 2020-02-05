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
          filtered_list: [],
          selected_list: [],
          query: "",
          filtered_scholars: [],
          scholars_list: [],
          scholarQuery: ""
        }
      }
    componentDidMount(){
      axiosGET('http://localhost:8000/api/faculties/')
      .then(res => {
        const faculties_list = res.data;
        this.setState({ faculties_list });
        var filtered_list = faculties_list.map(obj => obj["email"]);
        this.setState({ filtered_list });
      });

      axiosGET('http://localhost:8000/api/scholars/')
      .then(res => {
        const scholars_list = res.data;
        this.setState({ scholars_list });
        var filtered_scholars = scholars_list.map(obj => obj["email"]);
        this.setState({ filtered_scholars });
      });
    }

    handleInputChange = (event) => {
      const query = event.target.value;
      this.setState(prevState => {
      const filtered_list_whole = prevState.faculties_list.filter(element => {
        return element["name"].toLowerCase().includes(query.toLowerCase());
      });

      var filtered_list = filtered_list_whole.map(obj => obj["email"]);
      return {
        query,
        filtered_list
      };
    });
    }

    handleInputChangeScholar = (event) => {
      const scholarQuery = event.target.value;
      this.setState(prevState => {
      const filtered_scholars_whole = prevState.scholars_list.filter(element => {
        return element["name"].toLowerCase().includes(scholarQuery.toLowerCase());
      });
      var filtered_scholars = filtered_scholars_whole.map(obj => obj["email"]);
      return {
        scholarQuery,
        filtered_scholars
      };
    });
    }

    handleClick = (email) => {
      const isSelected = this.state.selected_list.includes(email);
      var filtered_list = this.state.filtered_list;
      var selected_list = this.state.selected_list;
      var filtered_scholars = this.state.filtered_scholars;
      if(isSelected){
        selected_list = selected_list.filter(i => { if(i!=email) return i});
        for(var i in this.state.faculties_list){
          if(this.state.faculties_list[i]["email"] == email){
            filtered_list = [ ...this.state.filtered_list, email];
            break;
          }
        }
        for(var i in this.state.scholars_list){
          if(this.state.scholars_list[i]["email"] == email){
            filtered_scholars = [ ...this.state.filtered_scholars, email];
            break;
          }
        }
      }
      else{
        filtered_list = filtered_list.filter(i => { if(i!=email) return i});
        filtered_scholars = filtered_scholars.filter(i => { if(i!=email) return i});
        selected_list = [ ...this.state.selected_list, email];
      }
      this.setState({ filtered_list, selected_list, filtered_scholars });
      
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

                          <input
                          placeholder="Search for..."
                          value={this.state.query}
                          onChange={this.handleInputChange}
                          />

                        <FormLabel>Select new faculty</FormLabel>
                
                        {this.state.faculties_list.map((obj) => {
                          if(!this.state.filtered_list.includes(obj["email"])) 
                              return null;

                          return <li key={obj["email"]}
                          onClick={() => this.handleClick(obj["email"])}>
                                    {obj["name"]}
                                </li>
                        })}

                          <br />

                          <input
                          placeholder="Search for..."
                          value={this.state.scholarQuery}
                          onChange={this.handleInputChangeScholar}
                          />
                          <br />

                        <FormLabel>Select new Scholar</FormLabel>
                        {this.state.scholars_list.map((obj) => {
                          if(!this.state.filtered_scholars.includes(obj["email"])) 
                              return null;

                          return <li key={obj["email"]}
                          onClick={() => this.handleClick(obj["email"])}>
                                    {obj["name"]}
                                </li>
                        })}
                        
                        <br />

                        <FormLabel>Remove an author</FormLabel>
                          {this.state.faculties_list.map((obj) => {
                          if(!this.state.selected_list.includes(obj["email"])) 
                              return null;

                          return <li
                          onClick={() => this.handleClick(obj["email"])} key={obj["email"]}>
                                    {obj["name"]}
                                </li>
                        })}

                        {this.state.scholars_list.map((obj) => {
                          if(!this.state.selected_list.includes(obj["email"])) 
                              return null;

                          return <li class="click" 
                          onClick={() => this.handleClick(obj["email"])} key={obj["email"]}>
                                    {obj["name"]}
                                </li>
                        })}

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



