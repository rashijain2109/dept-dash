import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
  Form,
  Button
} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

import { Card } from "../components/Card/Card.jsx";
// import Button from "../components/CustomButton/CustomButton.jsx";
import {axiosGET, axiosPOST, axiosDELETE, axiosPUT } from "../utils/axiosClient.js"



class AddProject extends Component {

  constructor(props){
    super(props);
    this.state = {
        faculties: [],
        filtered_faculty_authors: [],
        facultyAuthorQuery: "",
        filtered_scholar_authors: [],
        scholars: [],
        scholarAuthorQuery: "",
        faculty_authors: [],
        scholar_authors: [],
        student_authors: [],
        filtered_proposed_by: [],
        proposedByQuery: "",
        proposed_by: [],
        projectData: JSON.parse('{ "faculty_authors": [], "scholar_authors": [], "student_authors": [], "details": "",  "status": "COM", "agency": "", "scheme": "", "pi_copi": "", "send_date": null , "start_date": null, "end_date": null, "title" : "", "proposed_by": [] }'),
        isSubmitClicked: false,
        message: "" 
    }
  }

  componentDidMount(){
    if(this.props.type == "Edit Project"){
      var projectData = JSON.parse('{ "faculty_authors": [], "scholar_authors": [], "student_authors": [], "details": "",  "status": "COM", "agency": "", "scheme": "", "pi_copi": "", "send_date": null , "start_date": null, "end_date": null, "title" : "", "proposed_by": [] }');
      var str = "http://localhost:8000/api/projects/"+this.props.data["id"]+"/";
      axiosGET(str)
        .then(res => {
            projectData = res.data;
            var faculty_authors = [];
            var student_authors = [];
            var scholar_authors = [];
            var proposed_by = [];
            for(var i in projectData["faculty_authors"]){
              faculty_authors.push(String(projectData["faculty_authors"][i]["psrn"]));
            }
            projectData["faculty_authors"]=faculty_authors;
            for(var i in projectData["student_authors"]){
              student_authors.push(String(projectData["student_authors"][i]["id_num"]));
            }
            projectData["student_authors"]=student_authors;
            for(var i in projectData["scholar_authors"]){
              scholar_authors.push(String(projectData["scholar_authors"][i]["id_num"]));
            }
            projectData["scholar_authors"]=scholar_authors;
            for(var i in projectData["proposed_by"]){
              proposed_by.push(String(projectData["proposed_by"][i]["psrn"]));
            }
            projectData["proposed_by"]=proposed_by;
            this.setState({ projectData: projectData, faculty_authors, student_authors, scholar_authors, proposed_by });
            });
            
    }
    axiosGET('http://localhost:8000/api/faculties/')
    .then(res => {
      var faculties = res.data;
      var filtered_faculty_authors = faculties.map(obj => String(obj["psrn"]));
      var filtered_proposed_by = filtered_faculty_authors;
      this.setState({ filtered_faculty_authors, faculties, filtered_proposed_by });
    });
    axiosGET('http://localhost:8000/api/scholars/')
    .then(res => {
      var scholars = res.data;
      var filtered_scholar_authors = scholars.map(obj => String(obj["id_num"]));
      this.setState({ filtered_scholar_authors, scholars });
    });  
}

  resetState = (success) => {
    var message = "";
    if(success == 1){
      message = "project added Successfully";
    }
    else{
      message = "Failed add project, error occured";
    }
    var filtered_faculty_authors = this.state.faculties.map(obj => String(obj["psrn"]));
    var filtered_proposed_by = filtered_faculty_authors;
    var filtered_scholar_authors = this.state.scholars.map(obj => String(obj["id_num"]));
    this.setState({ filtered_faculty_authors, filtered_scholar_authors,
    facultyAuthorQuery: "", scholarAuthorQuery: "", faculty_authors: [], student_authors: [], scholar_authors: [], message, 
  isSubmitClicked: true,  filtered_proposed_by, proposedByQuery: "", proposed_by: []});
  }

  handleInputChange = (event) => {
    const facultyAuthorQuery = event.target.value;
    this.setState(prevState => {
    const filtered_faculty_authors_whole = prevState.faculties.filter(element => {
      return element["name"].toLowerCase().includes(facultyAuthorQuery.toLowerCase());
    });

    var filtered_faculty_authors = filtered_faculty_authors_whole.map(obj => String(obj["psrn"]));
    return {
      facultyAuthorQuery,
      filtered_faculty_authors
    };
  });
  }

  handleInputChangeScholar = (event) => {
    const scholarAuthorQuery = event.target.value;
    this.setState(prevState => {
    const filtered_scholar_authors_whole = prevState.scholars.filter(element => {
      return element["name"].toLowerCase().includes(scholarAuthorQuery.toLowerCase());
    });
    var filtered_scholar_authors = filtered_scholar_authors_whole.map(obj => String(obj["id_num"]));
    return {
      scholarAuthorQuery,
      filtered_scholar_authors
    };
  });
  }
  
  handleProposedByQuery = (event) => {
    const proposedByQuery = event.target.value;
    this.setState(prevState => {
    const filtered_proposed_by_whole = prevState.faculties.filter(element => {
      return element["name"].toLowerCase().includes(proposedByQuery.toLowerCase());
    });

    var filtered_proposed_by = filtered_proposed_by_whole.map(obj => String(obj["psrn"]));
    return {
      proposedByQuery,
      filtered_proposed_by
    };
  });
  }

  proposedBySelectClick = (psrn) => {
    var proposed_by = this.state.proposed_by;
    proposed_by.push(psrn);
    var filtered_proposed_by =  this.state.filtered_proposed_by.filter(i => {
      if(!(i==psrn)) return i
    });
    this.setState({ proposed_by, filtered_proposed_by });
  }

 
  facultySelectClick = (psrn) => {
    var faculty_authors = this.state.faculty_authors;
    faculty_authors.push(psrn);
    var filtered_faculty_authors = this.state.filtered_faculty_authors.filter(i => { if(!(i==psrn)) return i});
    this.setState({ faculty_authors, filtered_faculty_authors });
  }

  scholarSelectClick = (id_num) => {
    var scholar_authors = this.state.scholar_authors;
    scholar_authors.push(id_num);
    var filtered_scholar_authors = this.state.filtered_scholar_authors.filter(i => { if(!(i==id_num)) return i});
    this.setState({ scholar_authors, filtered_scholar_authors });
  }

  proposedByRemoveClick = (psrn) => {
    var filtered_proposed_by = this.state.filtered_proposed_by;
    filtered_proposed_by.push(psrn);
    var proposed_by = this.state.proposed_by.filter(i => {
      if(i!=psrn) return i
    });
    this.setState({ filtered_proposed_by, proposed_by });
  }

  facultyRemoveClick = (psrn) => {
    var filtered_faculty_authors = this.state.filtered_faculty_authors;
    filtered_faculty_authors.push(psrn);
    var faculty_authors = this.state.faculty_authors.filter(i => { if(i!=psrn) return i });
    this.setState({ filtered_faculty_authors, faculty_authors });
  }

  scholarRemoveClick = (id_num) => {
    var filtered_scholar_authors = this.state.filtered_scholar_authors;
    filtered_scholar_authors.push(id_num);
    var scholar_authors = this.state.scholar_authors.filter(i => { if(i!=id_num) return i });
    this.setState({ filtered_scholar_authors, scholar_authors });
  }

  render() {
  
    const schema = yup.object({
      title: yup.string().required("Required"),
      status: yup.string().required("Required"),
      details: yup.string(),
      agency: yup.string().required("Required"),
      scheme: yup.string().required("Required"),
      pi_copi: yup.string().required("Required"),
      send_date: yup.string().nullable(),
      start_date: yup.string().nullable(),
      end_date: yup.string().nullable()
    });
    return (
      // <h1>hello</h1>
      <div className="content">

        <Container fluid>
          <Row>
            <Col md={12}>
              <Card 
                content={
                  <div>
                  {!this.state.isSubmitClicked && 
                  (((this.props.type == "Edit Project") && (this.state.projectData["title"] != "")) ||
                (this.props.type == "Add Project")) &&
                 
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
                      if(data.send_date == "")
                      {
                        delete data.send_date;
                      }
                      if(data.start_date == "")
                      {
                        delete data.start_date;
                      }
                      if(data.end_date == "")
                      {
                        delete data.end_date;
                      }
                      if(data.proposed_by.length == 0)
                      {
                        alert("Proposed by field should not be empty");
                      }
                      else {
                        if(data.faculty_authors.length == 0 && 
                        data.scholar_authors.length == 0 &&
                        data.student_authors.length == 0){
                          alert("You should select atleast one author");
                        }
                        else{
                          if(data.faculty_authors.includes(String(this.props.user["user"]["psrn"])))
                          {
                            alert(JSON.stringify(data));
                          
                            if(this.props.type=="Add Project"){
                              axiosPOST('http://localhost:8000/api/projects/', data)
                                .then(res => {
                                  var message="";
                                  if (res.status == "201") {
                                    actions.resetForm(this.state.projectData);
                                    this.resetState(1);
                                  }
                                  else{
                                    actions.resetForm(this.state.projectData);
                                    this.resetState(0);
                                  }
                                  console.log(res.data);
                                });
                            }
                            else{
                              var id = data.id;
                              delete data.id;
                              axiosPUT('http://localhost:8000/api/projects/'+id+'/', data)
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
                            alert("You can only add your own projects");
                          }
                        }
                    }
                        actions.setSubmitting(false);
                    }, 400);
                  }}
                  initialValues= { this.state.projectData }
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
                          value={this.state.facultyAuthorQuery}
                          onChange={this.handleInputChange}
                          />
      
                        <div data-spy="scroll">
                            <ul class="list-group list">
                        {this.state.faculties.map((obj) => {
                          if(!this.state.filtered_faculty_authors.includes(String(obj["psrn"])) || this.state.faculty_authors.includes(String(obj["psrn"]))) 
                              return null;

                          return <li key={String(obj["psrn"])} class="list-group-item list-group-item-action item"
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
                          value={this.state.scholarAuthorQuery}
                          onChange={this.handleInputChangeScholar}
                          />
                          <br />
                        <ul class="list-group list">
                        {this.state.scholars.map((obj) => {
                          if(!this.state.filtered_scholar_authors.includes(String(obj["id_num"])) ||
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
                          {this.state.faculties.map((obj) => {
                          if(!this.state.faculty_authors.includes(String(obj["psrn"]))) 
                              return null;

                          return <li class="list-group-item list-group-item-action item"
                          onClick={() => { 
                            this.facultyRemoveClick(String(obj["psrn"]));
                            }} key={obj["psrn"]}>
                                    {obj["name"]}
                                </li>
                        })}

                        {this.state.scholars.map((obj) => {
                          if(!this.state.scholar_authors.includes(String(obj["id_num"]))) 
                              return null;

                          return <li class="click" class="list-group-item list-group-item-action item"
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
                    <div className="col-md-6" key={4}>
                        <FormGroup>
                          <input
                          placeholder="Search for faculty..."
                          value={this.state.proposedByQuery}
                          onChange={this.handleProposedByQuery}
                          />
                        <div data-spy="scroll">
                          <ul class="list-group list">
                        {this.state.faculties.map((obj) => {
                          if(!this.state.filtered_proposed_by.includes(String(obj["psrn"])) || this.state.proposed_by.includes(String(obj["psrn"]))) 
                              return null;

                          return <li key={String(obj["psrn"])} class="list-group-item list-group-item-action item"
                          onClick={() => {
                            this.proposedBySelectClick(String(obj["psrn"])); }}>
                                    {obj["name"]}
                                </li>
                        })}
                        </ul>
                        </div>
                        </FormGroup>
                        </div>
                    

                        <div className="col-md-6" key={5}>
                          <FormGroup>
                          <FormLabel>Proposed By </FormLabel>
                          <ul class="list-group list">
                          {this.state.faculties.map((obj) => {
                          if(!this.state.proposed_by.includes(String(obj["psrn"]))) 
                              return null;

                          return <li class="list-group-item list-group-item-action item"
                          onClick={() => { 
                            this.proposedByRemoveClick(String(obj["psrn"]));
                            }} key={obj["psrn"]}>
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
                          <FormLabel>Principal Investigator/Co-Principal Investigator</FormLabel>
                          <FormControl type="text" value={values.pi_copi} 
                          onChange={handleChange}
                          onBlur={handleBlur} 
                          name="pi_copi"
                          id="pi_copi"
                          isValid={touched.pi_copi && !errors.pi_copi} 
                         style={{ border: errors.pi_copi ? '1px solid red' : '1px solid black' }} 
                          />
                          <ErrorMessage name="pi_copi" 
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
                          <FormLabel>Send Date</FormLabel>
                          <br />
                        <input type="date" id="send_date"
                        onChange={handleChange} value={values.send_date} 
                        name="send_date" isValid={touched.send_date && !errors.send_date} onBlur={handleBlur}
                        style={{ border: errors.send_date ? '1px solid red' : '1px solid black' , width: 'full', height:'40px'}} ></input>
                        <ErrorMessage name="send_date" 
                        render={msg => <span style={{ color: 'red' }}>{msg}</span>}/>
                        </FormGroup>
                      </div>
                  <div className="col-md-4">
                        <FormGroup>
                          <FormLabel>Start Date</FormLabel>
                          <br />
                        <input type="date" id="start_date"
                        onChange={handleChange} value={values.start_date} 
                        name="start_date" isValid={touched.start_date && !errors.start_date} onBlur={handleBlur}
                        style={{ border: errors.start_date ? '1px solid red' : '1px solid black' , width: 'full', height:'40px'}} ></input>
                        <ErrorMessage name="start_date" 
                        render={msg => <span style={{ color: 'red' }}>{msg}</span>}/>
                        </FormGroup>
                      </div>
                     
                      <div className="col-md-4">
                        <FormGroup>
                          <FormLabel>End Date</FormLabel>
                          <br />
                        <input type="date" id="end_date"
                        onChange={handleChange} value={values.end_date} 
                        name="end_date" isValid={touched.end_date && !errors.end_date} onBlur={handleBlur}
                        style={{ border: errors.end_date ? '1px solid red' : '1px solid black' , width: 'full', height:'40px'}} ></input>
                        <ErrorMessage name="end_date" 
                        render={msg => <span style={{ color: 'red' }}>{msg}</span>}/>
                        </FormGroup>
                      </div>
                      </Row>

                      <Row>
                      <div className="col-md-6">
                        <FormGroup>
                          <FormLabel>Agency</FormLabel>
                          <FormControl type="text" value={values.agency} 
                          onChange={handleChange} id="agency"
                          isValid={touched.agency && !errors.agency} name="agency" 
                          onBlur={handleBlur} style={{ border: errors.agency ? '1px solid red' : '1px solid black' }} />
                          <ErrorMessage name="agency" 
                          render={msg => <span style={{ color: 'red' }}>{msg}</span>}/>
                        </FormGroup>
                      </div>
                      <div className="col-md-6">
                        <FormGroup>
                          <FormLabel>Scheme</FormLabel>
                          <FormControl type="text" value={values.scheme} 
                          onChange={handleChange} id="scheme"
                          isValid={touched.scheme && !errors.scheme} name="scheme" onBlur={handleBlur}
                          style={{ border: errors.scheme ? '1px solid red' : '1px solid black' }} />
                          <ErrorMessage name="scheme" 
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
                this.props.type == "Add Project" && 
                <button type="button" onClick={() => this.setState({
                  isSubmitClicked:false, message: ""
                })}>Add another Project</button>
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

export default AddProject;



