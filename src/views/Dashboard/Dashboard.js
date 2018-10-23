import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';

class Dashboard extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    if(localStorage.getItem('access-token') != null){
      return (
        <div></div>
      );
    } else {
      return(
          <Redirect to="/login" />
      )
    }
  }
}

export default Dashboard;
