import React from 'react';
import { Link } from 'react-router';

import { Grid, Row, Col } from 'react-bootstrap';

export const AppLayoutView = ({
  children,
}) => (
  <div className="container">
    <Grid>
      <Row>
        <Col lg={6}>
          <h1>
            <Link to="/">Logo</Link>
            - Hobby Hub
          </h1>
        </Col>
        <Col lg={6}>
          Navigation here
        </Col>
      </Row>
    </Grid>

    {children}

    footer - everyone loves some footer
  </div>
);

const AppLayout = (AppLayoutView);

export default AppLayout;
