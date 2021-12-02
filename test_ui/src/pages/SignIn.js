import React, { useState } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    FormGroup,
    Label,
    Input,
    Form,
} from "reactstrap";

function SignIn() {
    const [userName, setUserName] = useState('');
    const [passWord, setUserPass] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();
        console.log("login clicked")
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
                        <FormGroup className="my-4">
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
                        <div className="text-center">
                            <Button className="text-uppercase btn-block" onClick={loginUser}>
                                Login
                            </Button>
                        </div>
                        </Form>
                    </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SignIn;