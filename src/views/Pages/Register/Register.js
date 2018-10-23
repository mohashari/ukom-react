import React, { Component } from 'react';
import { Alert, Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import RegisterService from './Service/RegisterService';
import { Redirect } from 'react-router-dom'

const registerService = new RegisterService();

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email : "", full_name : "", nick_name : "", role : "",
      birthdate : 15012000000, gender : "L", address : "", telepon_number : "",
      identity_number : "", password : "", confirm_password : "",
      visibleAlert: false, messageAlert: "", colorAlert: "", link: ""
    }
    this.onDismiss = this.onDismiss.bind(this);
  }

  email = (e) => {this.setState({email:e.target.value})}
  full_name = (e) => {this.setState({full_name:e.target.value})}
  nick_name = (e) => {this.setState({nick_name:e.target.value})}
  role = (e) => {this.setState({role:e.target.value})}
  address = (e) => {this.setState({address:e.target.value})}
  telepon_number = (e) => {this.setState({telepon_number:e.target.value})}
  identity_number = (e) => {this.setState({identity_number:e.target.value})}
  password = (e) => {this.setState({password:e.target.value})}
  confirm_password = (e) => {this.setState({confirm_password:e.target.value})}

  onDismiss() {
    this.setState({ visibleAlert: false });
  }

  doSubmit = () => {
    if (this.state.password == this.state.confirm_password){
      const dataToSubmit = {
        ...this.state
      }
      console.log(dataToSubmit);
      registerService.register(dataToSubmit).then(response =>{
        const data = response.data;
        if(data.message == "OK"){
          this.setState({
            visibleAlert: true,
            messageAlert: "Register Success. ",
            colorAlert: "info",
            link:"Login now !"
          });
          console.log(response);
        } else {
          this.setState({
            visibleAlert: true,
            messageAlert: data.result,
            colorAlert: "danger"
          });
          console.log(response);
        }
      });
    } else {
      this.setState({
        visibleAlert: true,
        messageAlert: "Password tidak sesuai",
        colorAlert: "danger"
      });
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <div>
                      <Alert color={this.state.colorAlert} isOpen={this.state.visibleAlert} toggle={this.onDismiss}>
                        {this.state.messageAlert} <a href="/login">{this.state.link}</a>
                      </Alert>
                      <h1>Register</h1>
                    </div>
                    <p className="text-muted">Buat Akun Mu</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input onChange={this.email} type="text" placeholder="Email" autoComplete="email" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input onChange={this.full_name} type="text" placeholder="Nama Panjang" autoComplete="fullname" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input onChange={this.nick_name} type="text" placeholder="Nama Panggilan" autoComplete="nickname" />
                    </InputGroup>
                    {/* <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input onChange={this.role} type="text" placeholder="Role" autoComplete="role" />
                    </InputGroup> */}
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="date" id="date-input" name="date-input" placeholder="date" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="select" name="selectSm" id="SelectLm" bsSize="md" >
                        <option value="L">Laki - Laki</option>
                        <option value="P">Perempuan</option>
                      </Input>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input onChange={this.address} type="text" placeholder="Alamat" autoComplete="address" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input onChange={this.telepon_number} type="text" placeholder="Nomor Telepon" autoComplete="telephoneNumber" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input onChange={this.identity_number} type="text" placeholder="Nomor Identitas" autoComplete="identityNumber" />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input onChange={this.password} type="password" placeholder="Password" autoComplete="new-password" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input onChange={this.confirm_password} type="password" placeholder="Ulang password" autoComplete="new-password" />
                    </InputGroup>
                    <Button onClick={this.doSubmit} color="success" block>Buat Account</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
