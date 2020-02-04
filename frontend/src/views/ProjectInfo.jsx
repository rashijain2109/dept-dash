import React, { Component } from "react";
import ReactDOM from 'react-dom';
import AddProject from "./AddProject";
import BootstrapTable from "react-bootstrap-table-next";
import { Container, Row, Col, Table } from "react-bootstrap";


import {axiosGET, axiosPOST, axiosDELETE} from "../utils/axiosClient.js"

import Card from "../components/Card/Card.jsx";

class ProjectInfo extends Component {

  constructor(props){
    super(props);
    this.state = {
      isEditClicked: false,
    };
    this.divEdit = React.createRef();
    this.divMain = React.createRef();
  };
  closeEdit = () => {
    this.setState({ isEditClicked: false});
  }
  handleEdit = () => {
     this.setState({ isEditClicked: true});
  }
  componentDidUpdate(prevProps) {
      if(prevProps.data != this.props.data && this.state.isEditClicked)
        this.setState({ isEditClicked: false});
      if(this.state.isEditClicked){
        this.divEdit.current.scrollIntoView({ 
          behavior: "smooth", 
          block: "nearest"   
      });
      }
      else{
          this.divMain.current.scrollIntoView({ 
            behavior: "smooth", 
            block: "nearest"   
        });
      }
  }
  render() {
    return (
        <div className="content">
          <div ref={this.divMain}>
             <Col md={12}>
              <Card
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div className="content">
                  <Row>
                    <Col sm={10}>
                      <h4 className="title">Details</h4>
                    </Col>
                    <Col sm={1}>
                      <button style={{float: "right"}} type="button" class="btn btn-info" onClick={this.handleEdit}>Edit</button>
                    </Col>
                    <Col sm={1}>
                      <button style={{float: "left"}} type="button" class="btn btn-warning" onClick={this.props.handleClose}>Close</button>
                    </Col>
                  </Row>
                  <br />
                  <Table hover>
                    <tbody>
                      <tr>
                          <td>ID</td>
                          <td>{this.props.data["id"]}</td>
                      </tr>
                      <tr>
                          <td>Title</td>
                          <td>{this.props.data["title"]}</td>
                      </tr>
                      <tr>
                          <td>Status</td>
                          <td>{this.props.data["status"]}</td>
                      </tr>
                      <tr>
                          <td>Authors</td>
                          <td>{this.props.data["authors"]}</td>
                      </tr>
                      <tr>
                          <td>Details</td>
                          <td>{this.props.data["details"]}</td>
                      </tr>
                      <tr>
                          <td>Agency</td>
                          <td>{this.props.data["agency"]}</td>
                      </tr>
                      <tr>
                          <td>Scheme</td>
                          <td>{this.props.data["scheme"]}</td>
                      </tr>
                    </tbody>
                  </Table>
                  </div>
                }
              />
            </Col>
        </div>
        <div id="Edit" ref={this.divEdit}>
          {this.state.isEditClicked &&
            <AddProject data={this.props.data} type="Edit Project" handleClose={this.closeEdit}/>
          }
        </div>
        </div>
    );
}
}

export default ProjectInfo;
