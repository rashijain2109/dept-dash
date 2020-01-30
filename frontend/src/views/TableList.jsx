import React, { Component } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";

import {axiosGET, axiosPOST, axiosDELETE} from "../utils/axiosClient.js"

import Card from "../components/Card/Card.jsx";

import { getPublicationHeader, getPublicationList, getPublicationDetail } from "../utils/stats/publication_stats.js";
import AddPublication from "./AddPublication";

class TableList extends Component {

  constructor(props){
    super(props);
    this.state = {
      publicationsData: [],
      isEditedClicked: false,
      isInfoClicked: false,
      key: 0, 
      isAddClicked: false,
    }
  }

  componentDidMount() {
    axiosGET('http://localhost:8000/api/publications/')
      .then(res => {
        const publicationsData = res.data;
        this.setState({ publicationsData });
        console.log(this.state.publicationsData);
      })
  }
  handleDetails = (key) => {
    console.log("Key : "+ key);
    if(this.state.key == key && this.state.isInfoClicked)
    {
      this.setState({ isInfoClicked: false });
    }
    else if(this.state.key != key)
    {
      this.setState({ key });
      this.setState({ isInfoClicked: true});
    }
    else
    {
      this.setState({ isInfoClicked: true});
    }
  }
  handleEdit = (key) => {
    console.log("key:"+key);
    if(this.state.key == key && this.state.isEditedClicked)
    {
        this.setState({ isEditedClicked: false });
    }
    else if(this.state.key != key)
    {
      this.setState({ key });
      this.setState({ isEditedClicked: true});
    }
    else
    {
      this.setState({ isEditedClicked: true});
    }
    
  }
  handleAdd = () => {
    this.setState({ isAddClicked: true});
  }
  render() {
    const thArray = getPublicationHeader(this.state.publicationsData);
    const tdArray = getPublicationList(this.state.publicationsData);
    var details = [];
    if(this.state.isInfoClicked){
      details = getPublicationDetail(this.state.publicationsData, this.state.key); 
    }
    return (
      <div className="content">
        { this.state && this.state.publicationsData &&
        <Container fluid>
          <Row>
            <Col md={12}>
              <Card
                plain
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                  <Row>
                  <Col md={10}>
                  <h4 className="title">Publications</h4>
                  </Col>
                  <Col md={2}>
                    <button class='btn btn-info' onClick={this.handleAdd}>ADD</button>
                  </Col>
                  </Row>
                   <Table bordered hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {tdArray.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>;
                            })}
                            <td><button type="button" onClick={() => this.handleDetails(key)} class="btn btn-info">Info</button></td>
                            <td><button type="button" onClick={() => this.handleEdit(key)} class="btn btn-info" >Edit</button></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                  </div> 
                }
              />
            </Col>

            { this.state.isInfoClicked &&
            <Col md={12}>
              <Card
                plain
                title="Details"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table hover>
                    <tbody>
                      { details.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>;
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>
            }
          </Row>
        </Container>
              
      }
       <div id="edit">
      { this.state.isEditedClicked &&
      <AddPublication data={this.state.publicationsData[this.state.key]} index={this.state.key} type="Edit Publication" /> 
      }
        </div>
      { this.state.isAddClicked &&
      <AddPublication type="Add Publication" />
      }
      </div>
    );
  
  }
}

export default TableList;
