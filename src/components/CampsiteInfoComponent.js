import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, ModalHeader, ModalBody, Modal, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
//import Row from 'reactstrap/lib/Row';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {
   constructor(props) {
      super(props);

      this.state = {
         isModalOpen: false
      };
      this.toggleModal = this.toggleModal.bind(this);

   }
   toggleModal() {
      this.setState({
         isModalOpen: !this.state.isModalOpen
      });
   }
   handleSubmit(values) {
      console.log("Current state is: " + JSON.stringify(values));
      alert("Current state is: " + JSON.stringify(values));
   }

   render() {


      return (
         <div>
            <Button outline onClick={this.toggleModal}> <i className="fa fa-pencil fa-lg" /> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
               <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
               <ModalBody>

                  <LocalForm onSubmit={values => this.handleSubmit(values)}>
                     <Row className="form-group">
                        <Label htmlFor="rating" md={12}>Rating</Label>
                        <Col md={12}>
                           <Control.select model=".rating" name="rating" id="rating"
                              className="form-control">
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                           </Control.select>
                        </Col>
                     </Row>

                     <Row className="form-group">
                        <Label htmlFor="author" md={12}>Your Name</Label>
                        <Col md={12}>
                           <Control.text model=".author" name="author" id="author"
                              placeholder='Your Name'
                              className="form-control"
                              validators={{
                                 required,
                                 minLength: minLength(2),
                                 maxLength: maxLength(15)
                              }}
                           />
                           <Errors
                              className="text-danger"
                              model=".author"
                              show="touched"
                              component="div"
                              messages={{
                                 required: 'Required',
                                 minLength: 'Must be at least 2 characters',
                                 maxLength: 'Must be 15 characters or less'
                              }}
                           />
                        </Col>
                     </Row>
                     <Row className="form-group">
                        <Label htmlFor="text" md={12}>Comments</Label>
                        <Col md={12}>
                           <Control.textarea model=".text" name="text" id="text" rows="6" className="form-control" />
                        </Col>
                     </Row>
                     <Button type="submit" color="primary">Submit</Button>
                  </LocalForm>
               </ModalBody>
            </Modal>
         </div >
      );
   }
}


function RenderCampsite({ campsite }) {
   return (
      <div className="col-md-5 m-1">
         <Card>
            <CardImg top src={campsite.image} alt={campsite.name} />
            <CardBody>
               <CardText>{campsite.description}</CardText>
            </CardBody>
         </Card>
      </div>
   );
}

function RenderComments({ comments }) {
   if (comments) {
      return (
         <div className="col-md-5 m-1">
            <h4>Comments</h4>
            {
               comments.map(comment => {
                  return (
                     <div key={comment.id}>
                        <p>
                           {comment.text}<br />
                           -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
                        </p>
                     </div>
                  );
               })
            }
            <CommentForm />
         </div>
      );
   }
   return <div />;
}

function CampsiteInfo(props) {
   if (props.campsite) {
      return (
         <div className="container">
            <div className="row">
               <div className="col">
                  <Breadcrumb>
                     <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                     <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                  </Breadcrumb>
                  <h2>{props.campsite.name}</h2>
                  <hr />
               </div>
            </div>
            <div className="row">
               <RenderCampsite campsite={props.campsite} />
               <RenderComments comments={props.comments} />
            </div>
         </div>
      );
   }
   return <div />;
}



export default CampsiteInfo;