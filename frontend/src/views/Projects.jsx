import React, { Component } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";

import {axiosGET, axiosPOST, axiosDELETE} from "../utils/axiosClient.js"

import Card from "../components/Card/Card.jsx";

import { getProjectHeader, getProjectList, getProjectDetail } from "../utils/stats/project_stats.js";
import UserProfile from "./UserProfile.jsx";

class Projects extends Component {

  constructor(props){
    super(props);
    this.state = {
      projectsData: [],
      isEditedClicked: false,
      isInfoClicked: false,
      key: 0, 
      isAddClicked: false,
      scrollEdit: false,
      scrollAdd: false,
      scrollInfo: false,
      scrollProj: false
    }
    this.divEdit = React.createRef();
    this.divAdd = React.createRef();
    this.divInfo = React.createRef();
    this.divProj = React.createRef();
  }

  componentDidMount() {
    
    axiosGET('http://localhost:8000/api/projects/')
      .then(res => {
        const projectsData = res.data;
        this.setState({ projectsData });
        console.log(projectsData);
      })
  }
  componentDidUpdate() {
      if(this.state.scrollEdit){
        this.state.scrollEdit = false;
        this.divEdit.current.scrollIntoView({ 
               behavior: "smooth", 
               block: "nearest"
              
            })
      }
      if(this.state.scrollAdd){
        this.state.scrollAdd = false;
        this.divAdd.current.scrollIntoView({ 
               behavior: "smooth", 
               block: "nearest"
              
            })
      }
      if(this.state.scrollInfo){
        this.state.scrollInfo = false;
        this.divInfo.current.scrollIntoView({ 
            behavior: "smooth", 
            block: "nearest"
        })
      }
      if(this.state.scrollProj){
          this.state.scrollProj = false;
          this.divProj.current.scrollIntoView({ 
            behavior: "smooth", 
            block: "nearest"
        })
       }
  }
  handleDetails = (key) => {
    console.log("Key : "+ key);
    this.setState({ isEditedClicked: false});
    this.setState({ isAddClicked: false});
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
    this.setState({ scrollInfo: true});
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
    this.setState({ scrollEdit: true});
    this.setState({ isAddClicked: false});
    
  }
  handleAdd = () => {
    this.setState({ isInfoClicked: false});
    this.setState({ isEditedClicked: false});
    if(this.state.isAddClicked){
        this.setState({ isAddClicked: false});
    }
    else{
        this.setState({ isAddClicked: true});
    }
    this.setState({ scrollAdd: true});
    this.setState({ isEditedClicked: false});
  }
  closeInfo = () => {
    this.setState({ isInfoClicked: false, scrollProj: true, isEditedClicked: false });
  }
  closeAdd = () => {
    this.setState({ isAddClicked: false, scrollProj: true });
  }
  closeEdit = () => {
    this.setState({ isEditedClicked: false, scrollProj: true });
  }
  render() {
    const thArray = getProjectHeader(this.state.projectsData);
    const tdArray = getProjectList(this.state.projectsData);
    var details = [];
    if(this.state.isInfoClicked){
      details = getProjectDetail(this.state.projectsData, this.state.key); 
    }
    return (
      <div className="content">
        { this.state && this.state.projectsData &&
        <Container fluid>
          <Row>
            <Col md={12}>
            <div ref={this.divProj}>
              <Card
                plain
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    <div className="col-md-12">
                    <Row>
                        <Col md={10}>
                        <h4 className="title">Projects</h4>
                        </Col>
                        <Col md={2}>
                            <button class='btn btn-info' onClick={this.handleAdd}>ADD</button>
                        </Col>
                    </Row>
                    </div>
                    <br />
                   <Table hover>
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
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                  </div> 
                }
              />
              </div>
            </Col>
            
            <div ref={this.divInfo}>
            { this.state.isInfoClicked &&
            
            <Col md={12}>
              <Card
                plain
                title="Details"
                ctTableFullWidth
                ctTableResponsive
                content={
                    <div>
                    <button type="button" onClick={() => this.handleEdit(this.state.key)} class="btn btn-info" >Edit</button>
                    <button type="button" onClick={() => this.setState({ isInfoClicked: false,
                                                                         scrollProj: true,
                                                                         isEditedClicked: false })}
                            class="btn btn-danger">Close</button>
                  <Table hover>
                    <tbody>
                      { details.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return (<td key={key}>{prop}</td>);
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                  </div>
                }
              />
            </Col>
            }
            </div>
          </Row>
        </Container>
              
      }
      
      <div ref={this.divEdit}>
      { this.state.isEditedClicked &&
      <UserProfile data={this.state.projectsData[this.state.key]} type="Edit Project" handleClose={this.closeEdit}/>
      }
        </div>
      <div ref={this.divAdd}>
      { this.state.isAddClicked &&
      <UserProfile type="Add Project" handleClose={this.closeAdd}/>
      }
      </div>
      </div>
    );
  
  }
}

export default Projects;
