import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
} from "react-bootstrap";

import {axiosGET} from "../utils/axiosClient.js";

import avatar from "../assets/img/profile-avatar.png";

class UserProfile extends Component {

  constructor(props){
    super(props);
    this.state = {
      faculties_list: [],
      scholars_list: [],
      selection: "Faculty",
    };
  };

  componentDidMount(){
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

  render() {
    return (
      <div className="content">
        <Container>
        <Form>
          <Form.Group>
            <Form.Control as="select" onChange={this.handleSelect} defaultValue={this.state.selection} key={this.state.selection}>
              <option>Faculty</option>
              <option>Scholar</option>
            </Form.Control>
          </Form.Group>
        </Form>

        {this.state.faculties_list && this.state.selection=="Faculty" && this.renderCard(this.state.faculties_list)}
        {this.state.scholars_list && this.state.selection=="Scholar" && this.renderCard(this.state.scholars_list)}      
        </Container>
      </div>
    );
  }
}

export default UserProfile;