import React, { Component } from 'react';
import { Alert, Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import AuthService from './Service/AuthService';
import { Redirect } from 'react-router-dom';

const authService = new AuthService();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email : "", password : "", isLogin : false,
      visibleAlert: false, messageAlert: "", colorAlert: ""
    }

    this.onDismiss = this.onDismiss.bind(this);
  }

  password = (e) => {this.setState({password:e.target.value})}
  email = (e) => {this.setState({email:e.target.value})}

  onDismiss() {
    this.setState({ visibleAlert: false });
  }

  doLogin = () => {

    const dataToLogin = {
      ...this.state
    }
    console.log(dataToLogin);
    authService.login(dataToLogin).then(response =>{
      const data = response.data;
      if(data.message == "OK"){
        localStorage.setItem('access-token',data.result);
        console.log(localStorage.getItem('access-token'));
        this.setState({isLogin: true});
      } else {
        this.setState({
          visibleAlert: true,
          messageAlert: data.result,
          colorAlert: "danger"
        });
        console.log(response);
      }
    });
  }

  render() {
    if(this.state.isLogin){
        return(
            <Redirect to="/dashboard" />
        )
    } else {
      return (
        <div className="app flex-row align-items-center">
          <Container>
           <center> <h1>Planet Ban</h1> </center>
            <Row className="justify-content-center">
              <Col md="8">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <Form >
                        <h1>Login</h1>
                        <p className="text-muted">Masuk Ke Akun</p>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input onChange={this.email} type="text" placeholder="Email" autoComplete="email" />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input onChange={this.password} type="password" placeholder="Password" autoComplete="current-password" />
                        </InputGroup>
                        <Row>
                          <Col xs="6">
                            <Button onClick={this.doLogin} color="primary" className="px-4">Login</Button>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                  <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                    <CardBody className="text-center">
                      <div>
                        <h2>Sign up</h2>
                        <p>Anda tidak memiliki akun?</p>
                        <a class="btn btn-primary" href="/register" role="light">Daftar Sekarang</a>
                      </div>
                    </CardBody>
                  </Card>
                </CardGroup>
                <Alert color={this.state.colorAlert} isOpen={this.state.visibleAlert} toggle={this.onDismiss}>
                  {this.state.messageAlert}
                </Alert>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
}

export default Login;
