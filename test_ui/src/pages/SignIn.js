import React, { useState } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    FormGroup,
    Label,
    Input,
    Form,Modal, ModalHeader, ModalBody, Card, CardBody,
} from "reactstrap";

function SignIn(props) {
    //For Sign Up Modal
    const {
        buttonLabel,
        className
    } = props;

    let name, value;
    const [userName, setUserName] = useState('');
    const [passWord, setUserPass] = useState('');

    const [displayInfo, setInfoMsg] = useState(false); //Check if all field have values or not

    const [modal, setModal] = useState(false);
    const [userDetail, setUserDetail] = useState({
        user: "",
        email: "",
        password: "",
        confirmPass: "",
    }); // Set state for file Type
    const [matchPassword, setMatchPassword] = useState(false);

    const loginUser = async (e) => {
        e.preventDefault();
        console.log("login clicked")
    }

    const handleFormInput = (e) => {
        name = e.target.name;
        value = e.target.type === 'checkbox' ? (e.target.checked === true ? 1 : 0) : e.target.value;
        setUserDetail({...userDetail, [name]:value});
    }

    const toggle = () => {
        setUserDetail({});
        setInfoMsg(false);
        setModal(!modal);
    };

    const registerUserSubmit = async (e) => {//Register data POST call
        e.preventDefault();
        console.log("User Register");
        toggle()
    }

    return (
        <div className="sign_in_page">
            <Container>
                <Row> 
                    <Col lg="12">
                        <div className="loginForm">
                            <div className="login-card-title">
                                <h3 className="text-center w-50 mx-auto mb-1">Please login to add task</h3>
                            </div>
                            <Form className="d-block w-50 mx-auto">
                                <FormGroup className="my-4">
                                    <Input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="side_form_formContol"
                                    placeholder="Username"
                                    onChange = {e => setUserName(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup className="my-4 password_field">
                                    <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="side_form_formContol"
                                    placeholder="Password"
                                    autoComplete="off"
                                    onChange = {e => setUserPass(e.target.value)}
                                    />
                                </FormGroup>
                                <p className="sign_up_text">Do not have account? Please <span className="sign_up_btn" onClick={toggle} >Sign Up</span></p>
                                <div className="text-center">
                                    <Button className="text-uppercase btn-block" onClick={loginUser}>
                                        Login
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>
                            <Modal isOpen={modal} toggle={toggle} className={className}>
                                <ModalHeader toggle={toggle}>Sign Up</ModalHeader>
                                <ModalBody>
                                    <Card className="border-0">
                                        <CardBody className="w-100">
                                            <Form className="row">
                                                <FormGroup className="col-sm-12">
                                                    <Label for="userName">User Name</Label>
                                                    <Input type="text" name="user" id="userName" onChange={handleFormInput} placeholder="User Name" />
                                                </FormGroup>
                                                <FormGroup className="col-sm-12">
                                                    <Label for="userEmail">Email</Label>
                                                    <Input type="email" name="email" id="userEmail" onChange={handleFormInput} placeholder="Email Address" />
                                                </FormGroup>
                                                <FormGroup className="col-sm-12">
                                                    <Label for="userPassword">Password</Label>
                                                    <Input type="password" name="password" id="userPassword" autoComplete="off" onChange={handleFormInput} placeholder="Password" />
                                                </FormGroup>
                                                <FormGroup className="col-sm-12">
                                                    <Label for="confirmPassword">Confirm Password</Label>
                                                    <Input type="password" name="confirmPass" id="confirmPassword" autoComplete="off" onChange={handleFormInput} placeholder="Confirm Password" />
                                                </FormGroup>
                                                <>
                                                {matchPassword ? 
                                                    <div style={{ width: '100%', textAlign: 'left', color: '#f00' }}>
                                                        <p style={{ fontSize: '14px' }}>Password does not match.
                                                        </p>
                                                    </div> : ''
                                                }
                                                </>
                                                <>
                                                    { displayInfo ?
                                                    <div style={{ width: '100%', textAlign: 'left', color: '#f00', paddingTop: '10px' }}>
                                                        <p style={{ fontSize: '14px', paddingLeft: '20px' }}>Please fill in all the fields.
                                                        </p>
                                                    </div> : ''
                                                    }
                                                </>
                                                <div className="col-sm-12">
                                                    <Button className="float-right" onClick={registerUserSubmit}>Submit</Button>
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

export default SignIn;