import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import compose from 'compose-function';
import { getAuthError } from '../reducers/auth';
import { Form, Grid, Row, Col, Button, FormGroup, Well } from 'react-bootstrap';

import HorizontalField from './HorizontalField';

const mapStateToProps = (state) => ({
  authError: getAuthError(state),
});

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

export const renderLoginForm = ({
  authError,
  handleSubmit,
}) => (
  <Grid>
    <Row>
      <Col lg={6} lgOffset={3}>
        <Well>
          <Form horizontal onSubmit={handleSubmit}>
            {authError ? (
              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <p className="u-spacing10px u-colorDanger">{authError.message}</p>
                </Col>
              </FormGroup>
            ) : null}

            <Field controlId="formHorizontalEmail"
                   className="form-control"
                   name="email"
                   type="email"
                   label="Email"
                   component={HorizontalField} />
            <Field controlId="formHorizontalPassword"
                   className="form-control"
                   name="password"
                   type="password"
                   label="Password"
                   component={HorizontalField} />

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button type="submit" bsStyle="primary">
                  Login
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Well>
      </Col>
    </Row>
  </Grid>
);

renderLoginForm.propTypes = {
  handleSubmit: T.func.isRequired,
};

const LoginScreen = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'login',
    validate,
  })
)(renderLoginForm);

export default LoginScreen;
