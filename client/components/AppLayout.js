import React from 'react';
import { Link } from 'react-router';
import logo from '../theme/img/logo.png';

import { Grid, Row, Col, Image, Nav, NavDropdown, NavItem, MenuItem, Glyphicon} from 'react-bootstrap';

function handleSelect(eventKey) {
    event.preventDefault();
    alert(`selected ${eventKey}`);
}
export const AppLayoutView = ({
  children,
}) => (
  <div className="container">
    <div className="header">
      <Grid>
        <Row>
          <Col lg={6}>
            <h1>
              <Link to="/"><Image src={logo} className="App-logo" alt="logo" /></Link>
            </h1>
          </Col>
          <Col lg={6}>
              <Nav className='pull-right' onSelect={handleSelect}>
                <NavDropdown eventKey="4" title="User" id="nav-dropdown">
                  <MenuItem eventKey="1.1">My Account</MenuItem>
                </NavDropdown>
              </Nav>
          </Col>
        </Row>
      </Grid>
      <Link to="/create-event">Create new event</Link>
    </div>
    {children}
    </div>
);

const AppLayout = (AppLayoutView);

export default AppLayout;
