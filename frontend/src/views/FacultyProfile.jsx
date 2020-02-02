import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button
} from "react-bootstrap";

import {axiosGET} from "../utils/axiosClient.js";

import avatar from "../assets/img/profile-avatar.png";

class UserProfile extends Component {

  constructor(props){
    super(props);
    this.state = {
      faculties_list: []
    };
  };

  componentDidMount(){
    axiosGET('http://localhost:8000/api/faculties/')
      .then(res => {
        const faculties_list = res.data;
        this.setState({faculties_list});
        console.log(this.state.faculties_list);
      });
  };

  renderCard = () => {
    let card = []
    for(var i in this.state.faculties_list){
      card.push(
        <Row>
          <Col md={12}>
            <Card style={{width:"100%", height:"12vw", objectFit:"cover"}}>
              <Row>
                <Col md={4}>
                  <Card.Img style={{width:"12vw", height:"12vw"}} src={avatar} variant="top"/>
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Row>
                      <Col md={8}>
                        <Card.Text>
                          <h3>{this.state.faculties_list[i]['name']}</h3>
                          <h4>{this.state.faculties_list[i]['email']}</h4>
                          <h4>{this.state.faculties_list[i]['contact_num']}</h4>
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

  render() {
    return (
      <div className="content">
        <Container>
        {this.state.faculties_list && this.renderCard()}      
        </Container>
      </div>
    );
  }
}

export default UserProfile;