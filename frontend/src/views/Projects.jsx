import React, { Component } from "react";
import ReactDOM from 'react-dom';
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter, dateFilter } from 'react-bootstrap-table2-filter';

import { Container, Row, Col, Table } from "react-bootstrap";

import Card from "../components/Card/Card.jsx";

import {axiosGET, axiosPOST, axiosDELETE} from "../utils/axiosClient.js"

import ProjectInfo from "./ProjectInfo";
import AddProject from "./AddProject";

class Projects extends Component {

  constructor(props){
    super(props);
    this.state = {
      projectData: [],
      isAddClicked: false,
      isInfoClicked: false,
      rowClicked: [],
      HODasFacultyData: [],
      // isFaculty: true,
      HODasFaculty: false,
      role: "faculty",
      canEdit: true
    }
    this.divAdd = React.createRef();
    this.divInfo = React.createRef();
    this.divMain = React.createRef();
  };

  updateJSON = (products) => {

    // for(var i in products){
    //   var temp = products[i]["authors"];
    //   products[i]["authors"] = "";
    //   for(var j in temp){
    //     products[i]["authors"] = products[i]["authors"] + " " + temp[j]["name"] + ",";
    //   }

    for(var i in products){
      products[i]["authors"] = "";
      var temp = products[i]["faculty_authors"];
      for(var j in temp){
        products[i]["authors"] = products[i]["authors"] + " " + temp[j]["name"] + ",";
      }
      temp = products[i]["student_authors"];
      for(var j in temp){
        products[i]["authors"] = products[i]["authors"] + " " + temp[j]["name"] + ",";
      }
      temp = products[i]["scholar_authors"];
      for(var j in temp){
        products[i]["authors"] = products[i]["authors"] + " " + temp[j]["name"] + ",";
      }

      if(products[i]["status"] == "ACT"){
        products[i]["status"] = "Accepted";
      }
      else if(products[i]["status"] == "COM"){
        products[i]["status"] = "Communicated";
      }
      else if(products[i]["status"] == "REJ"){
        products[i]["status"] = "Rejected";
      }
         
    }
    
    return products;
  }

  componentWillMount() {
    axiosGET('http://localhost:8000/api/projects/')
      .then(res => {
        const projectData = this.updateJSON(res.data);
        this.setState({ projectData });
        console.log(this.state.projectData);
        var user = this.props.user;
        this.setState({ role: user["role"] });
        if(this.state.role == "hod"){
          console.log("here");
          this.setState({ canEdit: false });
          var str = "http://localhost:8000/api/faculties/"+this.props.user["user"]["psrn"]+"/projects/";
          console.log(str);
          axiosGET(str)
            .then(res => {
              const HODasFacultyData = this.updateJSON(res.data);
              this.setState({ HODasFacultyData });
            })
        }
      });
  }
  HODClick = () => {
    this.setState({ HODasFaculty: false, isAddClicked: false,
      isInfoClicked: false, canEdit: false });
  }
  facultyClick = () => {
    this.setState({ HODasFaculty: true, isAddClicked: false,
      isInfoClicked: false, canEdit: true });
  }
  componentDidUpdate() {
    if(this.state.isAddClicked){
      this.divAdd.current.scrollIntoView({ 
            behavior: "smooth", 
            block: "nearest"   
      });
    }
    else if(this.state.isInfoClicked) {
      this.divInfo.current.scrollIntoView({ 
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
  closeInfo = () => {
      this.setState({ isInfoClicked: false});
  }
  closeAdd = () => {
      this.setState({ isAddClicked: false});
  }
  handleAdd = () => {
      this.setState({ isAddClicked: true, isInfoClicked: false}); 
  }
  render() {

    var products = [];
    if(!(this.state.HODasFaculty)){
      products = this.state.projectData;
    }
    else if(this.state.HODasFaculty){
      products = this.state.HODasFacultyData;
    }
    
    const columns = [{
      dataField: 'id',
      text: 'ID',
      filter: textFilter(),
      headerStyle: (colum, colIndex) => {
        return { width: '5%', textAlign: 'left' };
        },
      headerAlign: 'center',
      sort: true
    }, {
      dataField: 'title',
      text: 'Ttile Name',
      headerAlign: 'center',
      filter: textFilter(),
      sort: true
    }, {
      dataField: 'status',
      text: 'Status',
      headerAlign: 'center',
      headerStyle: (colum, colIndex) => {
        return { width: '10%', textAlign: 'left' };
        },
      filter: textFilter(),
      sort: true
    }, {
        dataField: 'authors',
        text: 'Authors',
        sort: true,
        filter: textFilter(),
        headerStyle: (colum, colIndex) => {
          return { width: '20%', textAlign: 'left' };
          },
        headerAlign: 'center',
        headerTitle: true
    }];
    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            this.setState({ isInfoClicked: true, isAddClicked: false, rowClicked: row});
        }
    };
    return (
        <div className="content">
          {this.state.role == "hod" && 
        <div>
        <button type="button" class="btn btn-info" onClick={this.HODClick}>HOD</button>
        <button type="button" class="btn btn-info" onClick={this.facultyClick}>Faculty</button>
        </div>
        }
        {this.state && this.state.projectData &&
        <div ref={this.divMain}>
          <Container fluid>
            <Row>
            <Col md={12}>
              <div>
                <Row>
                  <Col sm={10} />
                  <Col sm={2}>
                  { (this.state.role=="faculty" || (this.state.role == "hod" && this.state.HODasFaculty)) &&  
                    <button type="button" class="btn btn-info" onClick={this.handleAdd}>Add a new Project</button>
                    }
                  </Col>
                </Row>
                <br />
                <BootstrapTable keyField='id' data={ products } columns={ columns } rowEvents={ rowEvents } bordered={false} 
                filter={ filterFactory() } hover="true" condensed="true" 
                rowStyle={{backgroundColor: "white"}}/>
                </div>
                </Col>
                </Row>
                </Container>
                <div id = "Info" ref={this.divInfo}>
                  {this.state.isInfoClicked &&
                    <ProjectInfo data={this.state.rowClicked} handleClose={this.closeInfo} canEdit={this.state.canEdit} user={this.props.user} />                 
                  }
                </div>
                <div id = "Add" ref={this.divAdd}>
                  {this.state.isAddClicked &&
                   <AddProject type="Add Project" handleClose={this.closeAdd} user={this.props.user}/> 
                  }
                </div>
              </div>
        }
        </div> 
       
    );
}
}

export default Projects;
