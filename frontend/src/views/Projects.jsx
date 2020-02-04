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
      projectsData: [],
      isAddClicked: false,
      isInfoClicked: false,
      rowClicked: [],
    }
    this.divAdd = React.createRef();
    this.divInfo = React.createRef();
    this.divMain = React.createRef();
  };

  updateJSON = (products) => {

    for(var i in products){
      var temp = products[i]["authors"];
      products[i]["authors"] = "";
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

  componentDidMount() {
    axiosGET('http://localhost:8000/api/projects/')
      .then(res => {
        const projectsData = this.updateJSON(res.data);
        this.setState({ projectsData });
        console.log(this.state.projectssData);
      });
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

    var products = this.state.projectsData;
    
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
        {this.state && this.state.projectsData &&
        <div ref={this.divMain}>
          <Container fluid>
            <Row>
            <Col md={12}>
              <div>
                <Row>
                  <Col sm={10} />
                  <Col sm={2}>
                    <button type="button" class="btn btn-info" onClick={this.handleAdd}>Add a new Project</button>
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
                    <ProjectInfo data={this.state.rowClicked} handleClose={this.closeInfo}/>                 
                  }
                </div>
                <div id = "Add" ref={this.divAdd}>
                  {this.state.isAddClicked &&
                   <AddProject type="Add Project" handleClose={this.closeAdd} /> 
                  }
                </div>
              </div>
        }
        </div> 
       
    );
}
}

export default Projects;
