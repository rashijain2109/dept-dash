import React, { Component } from "react";
import ReactDOM from 'react-dom';
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter, dateFilter } from 'react-bootstrap-table2-filter';

import {axiosGET, axiosPOST, axiosDELETE} from "../utils/axiosClient.js"

import AddPublication from "./AddPublication";
import PublicationInfo from "./PublicationInfo";

class Publications extends Component {

  constructor(props){
    super(props);
    this.state = {
      publicationsData: [],
      isAddClicked: false,
      isInfoClicked: false,
      rowClicked: []
    }
    this.divAdd = React.createRef();
    this.divInfo = React.createRef();
    this.divMain = React.createRef();
  };

  componentDidMount() {
    axiosGET('http://localhost:8000/api/publications/')
      .then(res => {
        const publicationsData = res.data;
        this.setState({ publicationsData });
        console.log(this.state.publicationsData);
      })
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
    const products = this.state.publicationsData;
    const columns = [{
      dataField: 'id',
      text: 'Publication ID',
      filter: textFilter(),
      sort: true
    }, {
      dataField: 'title',
      text: 'Ttile Name',
      filter: textFilter(),
      sort: true
    }, {
      dataField: 'status',
      text: 'Status',
      filter: textFilter(),
      sort: true
    }, {
        dataField: 'pub_date',
        text: 'Publication Date',
        filter: dateFilter({
            defaultValue: { date: new Date(2018, 0, 1) }
        }),
        sort: true
    }];
    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            this.setState({ isInfoClicked: true, isAddClicked: false, rowClicked: row});
            
        }
    };
    return (
        <div ref={this.divMain}>
             <button type="button" class="btn btn-info" onClick={this.handleAdd}>Add a new Publication</button>
             <BootstrapTable keyField='id' data={ products } columns={ columns } rowEvents={ rowEvents } bordered={false} 
             filter={ filterFactory() } />
                <div id = "Info" ref={this.divInfo}>
                  {this.state.isInfoClicked &&
                    <PublicationInfo data={this.state.rowClicked} handleClose={this.closeInfo}/>                 
                  }
                </div>
                <div id = "Add" ref={this.divAdd}>
                  {this.state.isAddClicked &&
                   <AddPublication type="Add Publication" handleClose={this.closeAdd} /> 
                  }
                </div>
        </div>
    );
}
}

export default Publications;
