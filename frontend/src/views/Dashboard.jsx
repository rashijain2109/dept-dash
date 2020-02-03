/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Container, Row, Col } from "react-bootstrap";

import {axiosGET, axiosPOST, axiosDELETE} from "../utils/axiosClient.js"
import {Link} from "react-router-dom";

import { Card } from "../components/Card/Card.jsx";
import { StatsCard } from "../components/StatsCard/StatsCard.jsx";
import { Tasks } from "../components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "../variables/Variables.jsx";

import { getScholarCount, getProjectsCount, getPublicationsCount, getFacultyCount } from "../utils/stats/dashboard_stats.js";

class Dashboard extends Component {

  constructor(props){
    super(props);

    this.state = {
      scholarsData: [],
      publicationsData: [],
      projectsData: [],
      facultyData: [],
    }
  }

  componentDidMount() {
    axiosGET('http://localhost:8000/api/scholars/')
      .then(res => {
        const scholarsData = res.data;
        this.setState({ scholarsData });
        console.log(scholarsData);
      })

    axiosGET('http://localhost:8000/api/publications/')
      .then(res => {
        const publicationsData = res.data;
        this.setState({ publicationsData });
        console.log(publicationsData);
      })

    axiosGET('http://localhost:8000/api/projects/')
      .then(res => {
        const projectsData = res.data;
        this.setState({ projectsData });
        console.log(projectsData);
      })

    axiosGET('http://localhost:8000/api/faculties/')
      .then(res => {
        const facultyData = res.data;
        this.setState({ facultyData });
        console.log(facultyData);
      })
  }

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  render() {
    return (
      <div className="content">
        <Container fluid>
          <Row>
            <Col lg={3} sm={6}>
              <a style={{ cursor: "pointer" }} onClick={() => {this.props.history.push({
                                                                pathname: "/admin/faculty",
                                                                state: {type: 'Scholar'}})
                                                              }}>
                <StatsCard
                  bigIcon={<i className="pe-7s-server text-warning" />}
                  statsText="Research Scholar"
                  statsValue={getScholarCount(this.state.scholarsData)}
                  statsIcon={<i className="fa fa-refresh" />}
                  statsIconText="Updated now"
                />
              </a>
            </Col>
            <Col lg={3} sm={6}>
              <a style={{ cursor: "pointer" }} onClick={() => {this.props.history.push({
                                                                pathname: "/admin/faculty",
                                                                state: {type: 'Faculty'}})
                                                              }}>
                <StatsCard
                  bigIcon={<i className="pe-7s-wallet text-success" />}
                  statsText="Faculty"
                  statsValue={getFacultyCount(this.state.facultyData)}
                  statsIcon={<i className="fa fa-calendar-o" />}
                  statsIconText="Last day"
                />
              </a>
            </Col>
            <Col lg={3} sm={6}>
              <a style={{ cursor: "pointer" }} onClick={() => {this.props.history.push('/admin/projects')}}>
                <StatsCard
                  bigIcon={<i className="pe-7s-graph1 text-danger" />}
                  statsText="Projects"
                  statsValue={getProjectsCount(this.state.projectsData)}
                  statsIcon={<i className="fa fa-clock-o" />}
                  statsIconText="In the last hour"
                />
              </a>
            </Col>
            <Col lg={3} sm={6}>
              <a style={{ cursor: "pointer" }} onClick={() => {this.props.history.push('/admin/publications')}}>
                <StatsCard
                  bigIcon={<i className="fa fa-twitter text-info" />}
                  statsText="Publications"
                  statsValue={getPublicationsCount(this.state.publicationsData)}
                  statsIcon={<i className="fa fa-refresh" />}
                  statsIconText="Updated now"
                />
              </a>
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Users Behavior"
                category="24 Hours performance"
                stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendSales)}</div>
                }
              />
            </Col>
            <Col md={4}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Email Statistics"
                category="Last Campaign Performance"
                stats="Campaign sent 2 days ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={dataPie} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendPie)}</div>
                }
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card
                id="chartActivity"
                title="2014 Sales"
                category="All products including Taxes"
                stats="Data information certified"
                statsIcon="fa fa-check"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataBar}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendBar)}</div>
                }
              />
            </Col>

            <Col md={6}>
              <Card
                title="Tasks"
                category="Backend development"
                stats="Updated 3 minutes ago"
                statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      <Tasks />
                    </table>
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

export default Dashboard;
