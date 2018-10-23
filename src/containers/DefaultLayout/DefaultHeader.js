import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'
import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLogout : false
    }
  }

  doLogout = () => {
    console.log(localStorage.getItem('access-token'));
    this.setState({isLogout: true});
    localStorage.removeItem('access-token');
    console.log(localStorage.getItem('access-token'));
  }


  render() {
    const { children, ...attributes } = this.props;
    if(this.state.isLogout){
        return(
            <Redirect to="/login" />
        )
    } else {
      return (
        <React.Fragment>
          <AppSidebarToggler className="d-lg-none" display="md" mobile />
          <AppSidebarToggler className="d-md-down-none" display="lg" />
          <Nav className="ml-auto" navbar>
            <AppHeaderDropdown direction="down">
              <DropdownToggle nav>
                <img src={'assets/img/avatars/user.png'} className="img-avatar" />
              </DropdownToggle>
              <DropdownMenu right style={{ right: 'auto' }}>
                <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
                <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              </DropdownMenu>
            </AppHeaderDropdown>
          </Nav>
          <Nav className="d-md-down-none">
              <NavLink onClick={this.doLogout}><i className="fa fa-lock"></i> Logout</NavLink>
          </Nav>
        </React.Fragment>
      );
    }
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
