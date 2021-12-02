import React, { useState } from "react";
import { Container, Col, Row,FormGroup, Label,
    Input, Table, Button, Form, Modal, ModalHeader, ModalBody, Card, CardBody, } from 'reactstrap';

function UserDashboard(props) {
    const [displayInfo, setInfoMsg] = useState(false); //Check if all field have values or not
    const [modal, setModal] = useState(false);
    const [userDetail, setUserDetail] = useState({
        user: "",
        email: "",
    }); // Set state for file Type

    //For Add task Modal
    const {
        buttonLabel,
        className
    } = props;

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 5
            }}
        />
    ); // For horizontal lines

    const handleFormInput = (e) => {
        let name = e.target.name;
        let value = e.target.type === 'checkbox' ? (e.target.checked === true ? 1 : 0) : e.target.value;
        setUserDetail({...userDetail, [name]:value});
    }

    const toggle = () => {
        setUserDetail({});
        setInfoMsg(false);
        setModal(!modal);
    };

    const submitTask = () => {
        console.log("Task submit");
    }

    return (
        <div className="user_dashboard">
            <Container>
                <Row> 
                    <Col lg="12">
                        <h2>User Dashboard</h2> 
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."</p>
                        <Button onClick={toggle}>Add Task</Button>
                    </Col>
                </Row>
                <ColoredLine color={"#0c0c0c"}/>
                <Row>
                    <Col lg="12">
                        <p>Filter tasks : Dropdown comes here</p>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12">
                        <h4>My Tasks</h4> 
                        <Table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>
                            <Modal isOpen={modal} toggle={toggle} className={className}>
                                <ModalHeader toggle={toggle}>Add Task</ModalHeader>
                                <ModalBody>
                                    <Card className="border-0">
                                        <CardBody className="w-100">
                                            <Form className="row">
                                                <FormGroup className="col-sm-12">
                                                    <Label for="userName">Task Name</Label>
                                                    <Input type="text" name="user" id="userName" onChange={handleFormInput} placeholder="Task Name" />
                                                </FormGroup>
                                                <FormGroup className="col-sm-12">
                                                    <Label for="userEmail">About task</Label>
                                                    <Input type="email" name="email" id="userEmail" onChange={handleFormInput} placeholder="About task" />
                                                </FormGroup>
                                                
                                                <>
                                                    { displayInfo ?
                                                    <div style={{ width: '100%', textAlign: 'left', color: '#f00', paddingTop: '10px' }}>
                                                        <p style={{ fontSize: '14px', paddingLeft: '20px' }}>Please fill in all the fields.
                                                        </p>
                                                    </div> : ''
                                                    }
                                                </>
                                                <div className="col-sm-12">
                                                    <Button className="float-right" onClick={submitTask}>Submit</Button>
                                                </div>
                                            </Form>
                                        </CardBody>
                                    </Card>
                                </ModalBody>
                            </Modal>
                        </div>
                    </Col>
                </Row>
            </Container>  
        </div>
    )
}

export default UserDashboard;