import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import compose from 'compose-function';
import { Button, Navbar, Nav, NavDropdown, NavItem, MenuItem, Glyphicon} from 'react-bootstrap';

// import logo from '../stylesheets/img/logo.png';

import { getUser } from '../reducers';
import { logout } from '../actions/auth';
import { navigate } from '../actions/router';

const mapStateToProps = (state) => ({
  user: getUser(state),
});

const mapDispatchToProps = {
  navigate,
  handleLogout: logout,
};

const renderAnonymous = ({ navigate }) => (
  <Nav pullRight>
    <NavItem onClick={() => navigate({ pathname: '/login'})}>Login</NavItem>
    <NavItem onClick={() => navigate({ pathname: '/sign-up'})}>Sign Up</NavItem>
  </Nav>
);

const renderLoggedIn = ({
  user,
  navigate,
  handleLogout,
} = {}) => (
  <div>
    <Nav pullRight>
      <NavItem onClick={() => navigate({ pathname: `/profile/${user._id}`})}>{user.fullName}</NavItem>
      <NavDropdown eventKey={3} title="My Account" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>Settings</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.2} onClick={handleLogout}>Logout</MenuItem>
      </NavDropdown>
    </Nav>
    <Navbar.Form pullRight>
      <NavItem onClick={() => navigate({ pathname: '/add-event'})}>
        <Button bsStyle="success">
          <Glyphicon glyph="plus" /> New Event
        </Button>
      </NavItem>
    </Navbar.Form>
  </div>
);

export const renderNavigation = ({
  user,
  navigate,
  handleLogout,
} = {}) => (
<Navbar collapseOnSelect>
  <Navbar.Header>
    <Navbar.Brand>
      <Link to="/">HobbyHub</Link>
    </Navbar.Brand>
  </Navbar.Header>
  <Navbar.Collapse>
    {user.anonymous ? (
      renderAnonymous({ navigate })
    ) : (
      renderLoggedIn({ user, navigate, handleLogout })
    )}
  </Navbar.Collapse>
</Navbar>
);

const Navigation = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(renderNavigation);

export default Navigation;
