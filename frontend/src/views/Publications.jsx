import React, { Component } from "react";
import ReactDOM from 'react-dom';
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter, dateFilter } from 'react-bootstrap-table2-filter';

import { Container, Row, Col, Table } from "react-bootstrap";

import Card from "../components/Card/Card.jsx";

import {axiosGET, axiosPOST, axiosDELETE} from "../utils/axiosClient.js"

import AddPublication from "./AddPublication";
import PublicationInfo from "./PublicationInfo";

class Publications extends Component {

  constructor(props){
    super(props);
    this.state = {
      publicationsData: [],
      HODasFacultyData: [],
      isAddClicked: false,
      isInfoClicked: false,
      rowClicked: [],
      isFaculty: true,
      HODasFaculty: false,
      role: "faculty",
      canEdit: true
    }
    this.divAdd = React.createRef();
    this.divInfo = React.createRef();
    this.divMain = React.createRef();
  };

  updateJSON = (products) => {

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
        
      if(products[i]["pub_type"] == "JRN"){
        products[i]["pub_type"] = "Journal";
      }
      else if(products[i]["pub_type"] == "CNF"){
        products[i]["pub_type"] = "Conference";
      }    
    }
    
    return products;
  }

  componentWillMount() {
    axiosGET('http://localhost:8000/api/publications/')
      .then(res => {
        const publicationsData = this.updateJSON(res.data);
        this.setState({ publicationsData });
        console.log(this.state.publicationsData);
        var user = this.props.user;
        this.setState({ role: user["role"] });
        if(this.state.role == "hod"){
          this.setState({ canEdit: false });
          console.log("here");
          var str = "http://localhost:8000/api/faculties/"+this.props.user["user"]["psrn"]+"/publications/";
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
    this.setState({ isFaculty: true, HODasFaculty: false, isAddClicked: false,
      isInfoClicked: false, canEdit: false });
  }
  facultyClick = () => {
    this.setState({ isFaculty: false, HODasFaculty: true, isAddClicked: false,
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
    if(this.state.isFaculty){
      products = this.state.publicationsData;
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
      headerStyle: (colum, colIndex) => {
        return { width: '35%', textAlign: 'left' };
        },
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
    }, 
    {
      dataField: 'pub_type',
      text: 'Publication Type',
      headerAlign: 'center',
      headerStyle: (colum, colIndex) => {
        return { width: '10%', textAlign: 'left' };
        },
      filter: textFilter(),
      sort: true
    }, {
        dataField: 'pub_date',
        text: 'Publication Date',
        headerAlign: 'center',
        filter: dateFilter({
            defaultValue: { date: new Date(2018, 0, 1) }
        }),
        headerStyle: (colum, colIndex) => {
          return { width: '15%', textAlign: 'left' };
          },
        sort: true
    }, {
        dataField: 'authors',
        text: 'Authors',
        sort: true,
        filter: textFilter(),
        headerStyle: (colum, colIndex) => {
          return { width: '25%', textAlign: 'left' };
          },
        headerAlign: 'center',
        headerTitle: true
    }];
    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            // if(this.state.role == "faculty" || (this.state.role == "hod" && this.state.HODasFaculty)){
            //   this.setState({ canEdit: true });
            // }
            console.log(row);
            this.setState({ isInfoClicked: true, isAddClicked: false, rowClicked: row});
        }
    };
    return (
      <div className="content">
        {this.state.role == "hod" && 
        <div>
        {/* <button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off" onClick={this.HODClick}>HOD</button> */}
        <button type="button" class="btn btn-info" onClick={this.HODClick}>HOD</button>
        <button type="button" class="btn btn-info" onClick={this.facultyClick}>Faculty</button>
        </div>
        }
        {this.state && this.state.publicationsData &&
        <div ref={this.divMain}>
          <Container fluid>
            <Row>
            <Col md={12}>
              <div>
                <Row>
                  <Col sm={10} />
                  <Col sm={2}>
                    { (this.state.role=="faculty" || (this.state.role == "hod" && this.state.HODasFaculty)) &&  
                    <button type="button" class="btn btn-info" onClick={this.handleAdd}>Add a new Publication</button>
                    }
                  </Col>
                </Row>
                <br />
                <BootstrapTable keyField='id' data={ products } columns={ columns } rowEvents={ rowEvents } bordered={true}
                                 hover={true} condensed={true} striped={true}
                                filter={ filterFactory() } 
                                rowStyle={{backgroundColor: "white"}} />
              </div>
            </Col>
            </Row>
            <div id = "Info" ref={this.divInfo}>
              {this.state.isInfoClicked &&
                <PublicationInfo data={this.state.rowClicked} handleClose={this.closeInfo} canEdit={this.state.canEdit} user={this.props.user}/>                 
              }
            </div>
            <div id = "Add" ref={this.divAdd}>
              {this.state.isAddClicked &&
                <AddPublication type="Add Publication" handleClose={this.closeAdd} user={this.props.user}/> 
              }
            </div>
          </Container>
        </div>
        }
      </div>
    );
}
}

export default Publications;
