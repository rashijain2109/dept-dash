import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
  Form,
  Button,
} from "react-bootstrap";


import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';



import { Card } from "../components/Card/Card.jsx";
import { FormInputs } from "../components/FormInputs/FormInputs.jsx";
import { UserCard } from "../components/UserCard/UserCard.jsx";
// import Button from "../components/CustomButton/CustomButton.jsx";


import {axiosGET, axiosPOST, axiosDELETE, axiosPUT } from "../utils/axiosClient.js"

import avatar from "../assets/img/faces/face-3.jpg";

class AddPublication extends Component {
    constructor(props){
        super(props);
        this.state = {
          faculties_list: [],
          filtered_list: [],
          query: "",
          filtered_scholars: [],
          scholars_list: [],
          scholarQuery: "",
          faculty_authors: [],
          scholar_authors: [],
          student_authors: [],
          publicationData: JSON.parse('{ "faculty_authors": [], "scholar_authors": [], "student_authors": [], "details": "", "status": "COM", "pub_type": "JRN", "doi_number": null, "page_number": null, "pub_date": null , "title" : "" }'),
          isSubmitClicked: false,
          message: "" 
        }
      }
    componentDidMount(){
      var faculties_list = [];
      var scholars_list = [];
      var filtered_list = [];
      var filtered_scholars = [];
      var faculty_authors = [];
      var student_authors = [];
      var scholar_authors = [];
      //this.setState({ date: new Date().toISOString() });
      if(this.props.type == "Edit Publication"){
        var publicationData = JSON.parse('{ "faculty_authors": [], "scholar_authors": [], "student_authors": [], "details": "", "status": "COM", "pub_type": "JRN", "doi_number": null, "page_number": null, "pub_date": null, "title" : "" }');
        var str = "http://localhost:8000/api/publications/"+this.props.data["id"]+"/";
        axiosGET(str)
          .then(res => {
              publicationData = res.data;
              
              for(var i in publicationData["faculty_authors"]){
                faculty_authors.push(String(publicationData["faculty_authors"][i]["psrn"]));
              }
              publicationData["faculty_authors"]=faculty_authors;
              for(var i in publicationData["student_authors"]){
                student_authors.push(String(publicationData["student_authors"][i]["id_num"]));
              }
              publicationData["student_authors"]=student_authors;
              for(var i in publicationData["scholar_authors"]){
                scholar_authors.push(String(publicationData["scholar_authors"][i]["id_num"]));
              }
              publicationData["scholar_authors"]=scholar_authors;
              this.setState({ publicationData: publicationData, faculty_authors, student_authors, scholar_authors });
              });
              
      }

      axiosGET('http://localhost:8000/api/faculties/')
      .then(res => {
        faculties_list = res.data;
        filtered_list = faculties_list.map(obj => String(obj["psrn"]));
        this.setState({ filtered_list, faculties_list });
      });
      axiosGET('http://localhost:8000/api/scholars/')
      .then(res => {
        scholars_list = res.data;
        filtered_scholars = scholars_list.map(obj => String(obj["id_num"]));
        this.setState({ filtered_scholars, scholars_list });
      });  
  }

    resetState = (success) => {
      var message = "";
      if(success == 1){
        message = "Publication added Successfully";
      }
      else{
        message = "Failed add publication, error occured";
      }
      var filtered_list = this.state.faculties_list.map(obj => String(obj["psrn"]));
      var filtered_scholars = this.state.scholars_list.map(obj => String(obj["id_num"]));
      this.setState({ filtered_list: filtered_list, filtered_scholars: filtered_scholars,
      query: "", scholarQuery: "", faculty_authors: [], student_authors: [], scholar_authors: [], message, 
    isSubmitClicked: true });
    }
    handleInputChange = (event) => {
      const query = event.target.value;
      this.setState(prevState => {
      const filtered_list_whole = prevState.faculties_list.filter(element => {
        return element["name"].toLowerCase().includes(query.toLowerCase());
      });

      var filtered_list = filtered_list_whole.map(obj => String(obj["psrn"]));
      return {
        query,
        filtered_list
      };
    });
    }
  
    handleInputChangeScholar = (event) => {
      const scholarQuery = event.target.value;
      this.setState(prevState => {
      const filtered_scholars_whole = prevState.scholars_list.filter(element => {
        return element["name"].toLowerCase().includes(scholarQuery.toLowerCase());
      });
      var filtered_scholars = filtered_scholars_whole.map(obj => String(obj["id_num"]));
      return {
        scholarQuery,
        filtered_scholars
      };
    });
    }

    
    facultySelectClick = (psrn) => {
      var faculty_authors = this.state.faculty_authors;
      faculty_authors.push(psrn);
      var filtered_list = this.state.filtered_list.filter(i => { if(!(i==psrn)) return i});
      this.setState({ faculty_authors, filtered_list });
    }

    scholarSelectClick = (id_num) => {
      var scholar_authors = this.state.scholar_authors;
      scholar_authors.push(id_num);
      var filtered_scholars = this.state.filtered_scholars.filter(i => { if(!(i==id_num)) return i});
      this.setState({ scholar_authors, filtered_scholars });
    }

    facultyRemoveClick = (psrn) => {
      var filtered_list = this.state.filtered_list;
      filtered_list.push(psrn);
      var faculty_authors = this.state.faculty_authors.filter(i => { if(i!=psrn) return i });
      this.setState({ filtered_list, faculty_authors });
    }

    scholarRemoveClick = (id_num) => {
      var filtered_scholars = this.state.filtered_scholars;
      filtered_scholars.push(id_num);
      var scholar_authors = this.state.scholar_authors.filter(i => { if(i!=id_num) return i });
      this.setState({ filtered_scholars, scholar_authors });
    }

  render() {
    
    const schema = yup.object({
      title: yup.string().required("Required"),
      status: yup.string().required("Required"),
      pub_type: yup.string().required("Required"),
      details: yup.string(),
      pub_date: yup.string().nullable(),
      page_number: yup.number().nullable(),
      doi_number: yup.string().nullable(),
    });
    return (
      <div className="content">

        <Container fluid>
          <Row>
            <Col md={12}>
              <Card 
                content={
                  <div>
                  {!this.state.isSubmitClicked && 
                  (((this.props.type == "Edit Publication") && (this.state.publicationData["title"] != "")) ||
                (this.props.type == "Add Publication")) &&
                 
                  <div>
                  <Row>
                  <Col sm={11}>
                    <h4 className="title">{this.props.type}</h4>
                  </Col>
                  <Col sm={1}>
                  <button type="button" onClick={this.props.handleClose} 
                                                  class="btn btn-warning">Close</button>
                  </Col>
                </Row>
                  <Formik 
                  validationSchema={schema}
                  onSubmit={(values, actions ) => {
                    setTimeout(() => {
                      var data = values;
                      var response = {};
                      data["faculty_authors"] = this.state.faculty_authors;
                      data["scholar_authors"] = this.state.scholar_authors;
                      data["student_authors"] = this.state.student_authors;
                      if(data.pub_date == "")
                      {
                        delete data.pub_date;
                      }
                      if(data.doi_number == "")
                      {
                        delete data.doi_number;
                      }
                      if(data.page_number == "")
                      {
                        delete data.page_number;
                      }
                      if(data.faculty_authors.length == 0 && 
                      data.scholar_authors.length == 0 &&
                      data.student_authors.length == 0){
                        alert("You should select atleast one author");
                      }
                      else{
                        if(data.faculty_authors.includes(String(this.props.user["user"]["psrn"])))
                        {
                          alert(JSON.stringify(data));
                        
                          if(this.props.type=="Add Publication"){
                            axiosPOST('http://localhost:8000/api/publications/', data)
                              .then(res => {
                                var message="";
                                if (res.status == "201") {
                                  actions.resetForm(this.state.publicationData);
                                  this.resetState(1);
                                }
                                else{
                                  actions.resetForm(this.state.publicationData);
                                  this.resetState(0);
                                }
                                console.log(res.data);
                              });
                          }
                          else{
                            var id = data.id;
                            delete data.id;
                            axiosPUT('http://localhost:8000/api/publications/'+id+'/', data)
                              .then(res => {
                                response = res;
                                if (res.status == "200") {
                                
                                  this.setState( {message: 'Changes Saved Successfully', isSubmitClicked:true} );
                                  
                                }
                                else{
                                  this.setState( {message: 'Failed to save Changes', isSubmitClicked: true });
                                }
                                console.log(res.data);
                              });
                          }
                        }
                        else{
                          alert("You can only add your own publications");
                        }
                      }
                        actions.setSubmitting(false);
                    }, 400);
                  }}
                  initialValues= { this.state.publicationData }
                  >
                  {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  isValid,
                  isSubmitting,
                  formProps,
                  status,
                  setFieldValue,
                  errors,
                }) => (
                    <Form onSubmit={handleSubmit}>
                    <Row>
                      <div className="col-md-4" key={1}>
                        <FormGroup>
                          <input
                          placeholder="Search for faculty..."
                          value={this.state.query}
                          onChange={this.handleInputChange}
                          />
                  
                        <div data-spy="scroll">
                          <ul class="list-group list">
                        {this.state.faculties_list.map((obj) => {
                          if(!this.state.filtered_list.includes(String(obj["psrn"])) || this.state.faculty_authors.includes(String(obj["psrn"]))) 
                              return null;

                          return <li key={String(obj["psrn"])}  class="list-group-item list-group-item-action item"
                          onClick={() => {
                            this.facultySelectClick(String(obj["psrn"])); }}>
                                    {obj["name"]}
                                </li>
                        })}
                        </ul>
                        </div>
                       

                        </FormGroup>
                        </div>
                          
                          <div className="col-md-4" key={2}>
                            <FormGroup>
                          <input
                          placeholder="Search for scholar..."
                          value={this.state.scholarQuery}
                          onChange={this.handleInputChangeScholar}
                          />
                          <br />
                        
                        <ul class="list-group list">
                        {this.state.scholars_list.map((obj) => {
                          if(!this.state.filtered_scholars.includes(String(obj["id_num"])) ||
                          this.state.scholar_authors.includes(String(obj["id_num"]))) 
                              return null;

                          return <li key={String(obj["id_num"])} class="list-group-item list-group-item-action item"
                          onClick={() => {    
                            this.scholarSelectClick(String(obj["id_num"]));
                       
                          }}>
                                    {obj["name"]}
                                </li>
                        })}
                        </ul>
                        </FormGroup>
                        </div>
                          <div className="col-md-4" key={3}>
                          <FormGroup>
                          <FormLabel>Selected authors</FormLabel>
                          <ul class="list-group list">
                          {this.state.faculties_list.map((obj) => {
                          if(!this.state.faculty_authors.includes(String(obj["psrn"]))) 
                              return null;

                          return <li class="list-group-item list-group-item-action item"
                          onClick={() => { 
                            this.facultyRemoveClick(String(obj["psrn"]));
                            }} key={obj["psrn"]}>
                                    {obj["name"]}
                                </li>
                        })}

                        {this.state.scholars_list.map((obj) => {
                          if(!this.state.scholar_authors.includes(String(obj["id_num"]))) 
                              return null;

                          return <li class="list-group-item list-group-item-action item"
                          onClick={() => {
                            this.scholarRemoveClick(String(obj["id_num"]));}} key={obj["id_num"]}>
                                    {obj["name"]}
                                </li>
                        })}
                        </ul>
                        </FormGroup>
                      </div>
                    </Row>

                    <Row>
                      <div className="col-md-12" key={1}>
                        <FormGroup>
                        <FormLabel>Title</FormLabel>
                          <FormControl type="text" value={values.title} 
                          onChange={handleChange}
                          onBlur={handleBlur} 
                          name="title"
                          id="title"
                          isValid={touched.title && !errors.title} 
                         style={{ border: errors.title ? '1px solid red' : '1px solid black' }} 
                          />
                <ErrorMessage name="title" render={msg => <span style={{ color: 'red' }}>{msg}</span>}/>
                        </FormGroup>
                      </div>
                    </Row>

                    <Row>
                      <div className="col-md-6" key={2}>
                        <FormGroup id="status">
                          <FormLabel>Status</FormLabel>
                          <FormControl as="select" value={values.status} 
                          onChange={handleChange} id="status" name="status"
                          isValid={touched.status && !errors.status}
                          onBlur={handleBlur}
                          style={{ border: errors.status ? '1px solid red' : '1px solid black' }} 
                          >
                            <option value="COM" key="COM">Communicated</option>
                            <option value="REJ" key="REJ">Rejected</option>
                            <option value="ACT" key="ACT">Accepted</option>
                          </FormControl>
                          <ErrorMessage name="status" render={msg => <span style={{ color: 'red' }}>{msg}</span>}/>
                        </FormGroup>
                      </div> 

                      <div className="col-md-6" key={3}>
                        <FormGroup>
                          <FormLabel>Publication Type</FormLabel>
                          <FormControl as="select" value={values.pub_type} 
                          onChange={handleChange} id="pub_type" name="pub_type"
                          isValid={touched.pub_type && !errors.pub_type} onBlur={handleBlur}
                          style={{ border: errors.pub_type ? '1px solid red' : '1px solid black' }} >
                          <option value="JRN" key="JRN">Journal</option>
                            <option value="CNF" key="CNF">Conference</option>
                            
                          </FormControl>
                          <ErrorMessage name="pub_type" 
                          render={msg => <span style={{ color: 'red' }}>{msg}</span>}/>
                        </FormGroup>
                      </div>
                    </Row>

                    <Row>
                      <div className="col-md-12">
                        <FormGroup>
                          <FormLabel>Details</FormLabel>
                          <FormControl as="textarea" rows={3} value={values.details} 
                          onChange={handleChange} id="details" name="details"
                          isValid={touched.details && !errors.details} onBlur={handleBlur}
                          style={{ border: errors.details ? '1px solid red' : '1px solid black' }} />
                          <ErrorMessage name="details" 
                          render={msg => <span style={{ color: 'red' }}>{msg}</span>}/>
                        </FormGroup>
                      </div>
                    </Row>

                  <Row>
                  <div className="col-md-4">
                        <FormGroup>
                          <FormLabel>Publication Date</FormLabel>
                          
                          <br />
                        <input type="date" id="pub_date"
                        onChange={handleChange} value={values.pub_date} 
                        name="pub_date" isValid={touched.pub_date && !errors.pub_date} onBlur={handleBlur}
                        style={{ border: errors.pub_date ? '1px solid red' : '1px solid black' , width: 'full', height:'40px'}} ></input>
                        <ErrorMessage name="pub_date" 
                        render={msg => <span style={{ color: 'red' }}>{msg}</span>}/>
                        </FormGroup>
                      </div>
                      <div className="col-md-4">
                        <FormGroup>
                          <FormLabel>Digital Object Identifier Number</FormLabel>
                          <FormControl type="text" value={values.doi_number} 
                          onChange={handleChange} id="doi_number"
                          isValid={touched.doi_number && !errors.doi_number} name="doi_number" 
                          onBlur={handleBlur} style={{ border: errors.doi_number ? '1px solid red' : '1px solid black' }} />
                          <ErrorMessage name="doi_number" 
                          render={msg => <span style={{ color: 'red' }}>{msg}</span>}/>
                        </FormGroup>
                      </div>
                      <div className="col-md-4">
                        <FormGroup>
                          <FormLabel>Page Number</FormLabel>
                          <FormControl type="text" value={values.page_number} 
                          onChange={handleChange} id="page_number"
                          isValid={touched.page_number && !errors.page_number} name="page_number" onBlur={handleBlur}
                          style={{ border: errors.page_number ? '1px solid red' : '1px solid black' }} />
                          <ErrorMessage name="page_number" 
                          render={msg => <span style={{ color: 'red' }}>{msg}</span>}/>
                        </FormGroup>
                      </div>
                    </Row>        

                    <div className="clearfix" />
                    <Button type="submit" disabled={isSubmitting}>Submit</Button>
                    {/* <div>Success message here: {status ? status.success : ''}</div> */}
                  </Form>
                   )}
                   </Formik>
                   </div>
                }
                {this.state.isSubmitClicked &&
                <div>
                  <button type="button" class="close" aria-label="Close" onClick={this.props.handleClose}>
                <span aria-hidden="true">&times;</span>
                </button>
                <div>{this.state.message}</div>
                {
                this.props.type == "Add Publication" && 
                <button type="button" onClick={() => this.setState({
                  isSubmitClicked:false, message: ""
                })}>Add another Publication</button>
              }
                
                </div>
                }
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

export default AddPublication;



