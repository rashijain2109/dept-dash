import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  ListGroup,
  ListGroupItem,
  Spinner,
  Accordion,
} from "react-bootstrap";

import {axiosGET} from "../utils/axiosClient.js";

import avatar from "../assets/img/profile-avatar.png";
import profile1 from "../assets/img/profile-1.jpg";
import profile2 from "../assets/img/profile-2.jpg";
import profile3 from "../assets/img/profile-3.jpg";
import profile4 from "../assets/img/profile-4.jpg";
import profile5 from "../assets/img/profile-5.jpg";

var profiles = [profile1, profile2, profile3, profile4, profile5]

class UserProfile extends Component {

  constructor(props){
    super(props);
    this.state = {
      faculties_list: [],
      scholars_list: [],
      selection: "Faculty",
      showProfile: false,
    };
  };

  componentWillMount(){
    axiosGET('http://localhost:8000/api/faculties/')
      .then(res => {
        const faculties_list = res.data;
        this.setState({faculties_list});
        console.log(this.state.faculties_list);
      });

    axiosGET('http://localhost:8000/api/scholars/')
      .then(res => {
        const scholars_list = res.data;
        this.setState({scholars_list});
        console.log(this.state.scholars_list);
      });

      if(this.props.location.state){
        if(this.props.location.state.type == "Faculty"){
          this.setState({selection: "Faculty"});
        }
        if(this.props.location.state.type == "Scholar"){
          this.setState({selection: "Scholar"});
        }
      }
  };

  randomize = (profiles) => {
    return profiles[Math.floor(Math.random()*profiles.length)];
  }

  renderCard = (data) => {
    let card = []
    for(var i in data){
      card.push(
        <Row>
          <Col md={12}>
            <Card>
              <Row>
                <Col md={4}>
                  <Card.Img src={avatar} variant="top" style={{maxWidth:"200px", maxHeight:"200px"}}/>
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Row>
                      <Col md={8}>
                        <Card.Text>
                          <h3>{data[i]['name']}</h3>
                          <h4>{data[i]['email']}</h4>
                        </Card.Text>
                      </Col>
                      <Col md={4}>
                        <br />
                        <Row>
                          <Button variant="primary">Projects</Button>
                        </Row>
                        <br />
                        <Row>
                          <Button variant="primary">Publications</Button>
                        </Row>
                        <br />
                        <Row>
                          <Button variant="primary" id={i} onClick={this.handleClick}>Profile</Button>
                        </Row>
                        <br />
                      </Col>
                    </Row>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      )
    }
    return card;
  }

  handleSelect = (event) => {
    this.setState({selection: event.target.value})
  };

  renderSelectField = () => {
    return (
      <Form>
        <Form.Group>
          <Form.Control as="select" onChange={this.handleSelect} defaultValue={this.state.selection} key={this.state.selection}>
            <option>Faculty</option>
            <option>Scholar</option>
          </Form.Control>
        </Form.Group>
      </Form>
    )
  }

  async fetchFacultyData() {
    try {
      const data = await Promise.all([
        axiosGET('http://localhost:8000/api/faculties/' + String(Number(this.state.showProfile)+1) + '/projects'),
        axiosGET('http://localhost:8000/api/faculties/' + String(Number(this.state.showProfile)+1) + '/publications'),
      ]).then((values) => {
        console.log(values);
        this.setState({'FacultyProjects': values[0], 'FacultyPublications': values[1], 'spinner': false})
      })
    } catch(err) {
      console.log('Error fetching data');
      console.log(err);
    }
  }

  handleClick = (event) => {
    if(event.target.id == "renderprofile"){
      this.setState({showProfile: false});
    }
    else {
      this.setState({showProfile: event.target.id, 'spinner': true});
    }
  }

  getFacultyProjects = () => {
    let projects = []
    for(let i=0; i<this.state['FacultyProjects']['data'].length; i++){
      let projectDetails = []
      let iterData = this.state['FacultyProjects']['data'][i];
      
      projectDetails.push(<div><b>Project {i+1}:</b></div>);
      projectDetails.push(<div>Title: {iterData['title']} </div>);
      projectDetails.push(<div>Details: {iterData['details']}</div>);
      projectDetails.push(<div>Status: {iterData['status']}</div>);
      projectDetails.push(<div>Agency: {iterData['agency']}<br /><br /></div>);
      
      let facultyAuthors = []
      
      for(let i=0; i<iterData['faculty_authors'].length; i++){
        let details = []
        
        details.push(<div>Name: {iterData['faculty_authors'][i]['name']}</div>);
        details.push(<div>Email: {iterData['faculty_authors'][i]['email']}</div>);
      
        facultyAuthors.push(details);
      }

      let studentAuthors = []

      for(let i=0; i<iterData['student_authors'].length; i++){
        let details = []

        details.push(<div>Name: {iterData['student_authors'][i]['name']}</div>);
        details.push(<div>Email: {iterData['student_authors'][i]['email']}</div>);

        studentAuthors.push(details);
      }

      let scholarAuthors = []

      for(let i=0; i<iterData['scholar_authors'].length; i++){
        let details = []

        details.push(<div>Name: {iterData['scholar_authors'][i]['name']}</div>);
        details.push(<div>Email: {iterData['scholar_authors'][i]['email']}</div>);

        scholarAuthors.push(details);
      }
      
      projectDetails.push(<div>Faculty Authors: {facultyAuthors}<br /><br /></div>);
      projectDetails.push(<div>Student Authors: {studentAuthors}<br /><br /></div>);
      projectDetails.push(<div>Scholar Authors: {scholarAuthors}<br /><br /></div>);

      projectDetails.push(<div><br /><br /></div>);
      projects.push(
        <div>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="primary" eventKey={i}>
                  {iterData['title']}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={i}>
                <Card.Body>
                  <div>{projectDetails}</div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
        </div>
      );
    }
    return (
      <div>
        <Accordion>
          {projects}
        </Accordion>
      </div>
    );
  }

  getFacultyPublications = () => {
    let publications = []
    for(let i=0; i<this.state['FacultyPublications']['data'].length; i++){
      let publicationDetails = []
      let iterData = this.state['FacultyPublications']['data'][i];
      
      publicationDetails.push(<div><b>Publication {i+1}:</b></div>);
      publicationDetails.push(<div>Title: {iterData['title']} </div>);
      publicationDetails.push(<div>Details: {iterData['details']}</div>);
      publicationDetails.push(<div>Status: {iterData['status']}</div>);
      publicationDetails.push(<div>Type: {iterData['pub_type']}<br /><br /></div>);
      
      let facultyAuthors = []
      
      for(let i=0; i<iterData['faculty_authors'].length; i++){
        let details = []
        
        details.push(<div>Name: {iterData['faculty_authors'][i]['name']}</div>);
        details.push(<div>Email: {iterData['faculty_authors'][i]['email']}</div>);
      
        facultyAuthors.push(details);
      }

      let studentAuthors = []

      for(let i=0; i<iterData['student_authors'].length; i++){
        let details = []

        details.push(<div>Name: {iterData['student_authors'][i]['name']}</div>);
        details.push(<div>Email: {iterData['student_authors'][i]['email']}</div>);

        studentAuthors.push(details);
      }

      let scholarAuthors = []

      for(let i=0; i<iterData['scholar_authors'].length; i++){
        let details = []

        details.push(<div>Name: {iterData['scholar_authors'][i]['name']}</div>);
        details.push(<div>Email: {iterData['scholar_authors'][i]['email']}</div>);

        scholarAuthors.push(details);
      }
      
      publicationDetails.push(<div>Faculty Authors: {facultyAuthors}<br /><br /></div>);
      publicationDetails.push(<div>Student Authors: {studentAuthors}<br /><br /></div>);
      publicationDetails.push(<div>Scholar Authors: {scholarAuthors}<br /><br /></div>);

      publicationDetails.push(<div><br /><br /></div>);
      publications.push(
        <div>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="primary" eventKey={i}>
                  {iterData['title']}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={i}>
                <Card.Body>
                  <div>{publicationDetails}</div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
        </div>
      );
    }
    return (
      <div>
        <Accordion>
          {publications}
        </Accordion>
      </div>
    );
  }

  renderScholarProfile = (data) => {
    return (
      <div>
        <Row>
          <Col md={12}>
            <Button variant="primary" id="renderprofile" onClick={this.handleClick}>Back</Button>
            <br />
            <br />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Card style={{width: "50rem"}}>
              <Card.Img variant="top" src={this.randomize(profiles)} />
              <Card.Body>
                <Card.Title style={{fontSize: "30px"}}>{data[this.state.showProfile]['name']}</Card.Title>
                <Card.Text style={{fontSize: "20px"}}>
                  Email: {data[this.state.showProfile]['email']}<br />
                  Department: {data[this.state.showProfile]['dept']['name']}<br />
                  ID: {data[this.state.showProfile]['id_num']}<br />
                  Supervisor: {data[this.state.showProfile]['supervisor']['name']}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>        
    )
  }

  renderFacultyCard = (data) => {
    return (
      <div>
        <Row>
          <Col md={12}>
            <Button variant="primary" id="renderprofile" onClick={this.handleClick}>Back</Button>
            <br />
            <br />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Card style={{width: "50rem"}}>
              <Card.Img variant="top" src={this.randomize(profiles)} />
              <Card.Body>
                <Card.Title style={{fontSize: "30px"}}>{data[this.state.showProfile]['name']}</Card.Title>
                <Card.Text style={{fontSize: "20px"}}>
                  Email: {data[this.state.showProfile]['email']}<br />
                  Department: {data[this.state.showProfile]['dept']['name']}<br />
                  Contact: {data[this.state.showProfile]['contact_num']}<br />
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush" style={{fontSize: "20px"}}>
                <ListGroupItem>
                  <b><i>Projects</i></b><br /><br />
                  {this.getFacultyProjects()}
                </ListGroupItem>
                <ListGroupItem>
                  <b><i>Publications</i></b><br /><br />
                  {this.getFacultyPublications()}
                </ListGroupItem>
                <ListGroupItem>
                  <b><i>Scholars</i></b><br /><br />
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>  
    )
  }

  renderSpinner = () => {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  }

  renderFacultyProfile = (data) => {
    if(this.state.selection == 'Faculty' && this.state.showProfile && this.state['spinner']){
      this.fetchFacultyData();    
      return this.renderSpinner();
    }
    else{
      return this.renderFacultyCard(data)
    }
  }

  render() {
    return (
      <div className="content">
        <Container>
          {this.state.showProfile && this.state.selection=="Faculty" && this.renderFacultyProfile(this.state.faculties_list)}
          {this.state.showProfile && this.state.selection=="Scholar" && this.renderScholarProfile(this.state.scholars_list)}
          {!this.state.showProfile && this.renderSelectField()}
          {this.state.faculties_list && this.state.selection=="Faculty" && !this.state.showProfile && this.renderCard(this.state.faculties_list)}
          {this.state.scholars_list && this.state.selection=="Scholar" && !this.state.showProfile && this.renderCard(this.state.scholars_list)}      
        </Container>
      </div>
    );
  }
}

export default UserProfile;