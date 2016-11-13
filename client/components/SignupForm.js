import React, { PropTypes as T } from 'react';
import { Field, reduxForm } from 'redux-form';
import compose from 'compose-function';
import { Form, Grid, Row, Col, Button, FormGroup, Well } from 'react-bootstrap';

import HorizontalField from './HorizontalField';

const validate = values => {
  const errors = {};

  if (!values.fullName) {
    errors.fullName = 'Required';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Required';
  }

  if (!values.passwordRetype) {
    errors.passwordRetype = 'Required';
  }

  if (values.password !== values.passwordRetype) {
    errors.passwordRetype = 'Must match password';
  }

  return errors;
};

export const renderSignupForm = ({
  handleSubmit,
}) => (
  <Grid>
    <Row>
      <Col lg={6} lgOffset={3}>
        <Well>
          <Form horizontal onSubmit={handleSubmit}>
            <Field controlId="formHorizontalFullName"
                   leftSm={3}
                   rightSm={9}
                   className="form-control"
                   name="fullName"
                   type="text"
                   label="Full Name"
                   component={HorizontalField} />

            <Field controlId="formHorizontalEmail"
                   leftSm={3}
                   rightSm={9}
                   className="form-control"
                   name="email"
                   type="email"
                   label="Email"
                   component={HorizontalField} />

            <Field controlId="formHorizontalPassword"
                   leftSm={3}
                   rightSm={9}
                   className="form-control"
                   name="password"
                   type="password"
                   label="Password"
                   component={HorizontalField} />

            <Field controlId="formHorizontalPasswordRetype"
                   leftSm={3}
                   rightSm={9}
                   className="form-control"
                   name="passwordRetype"
                   type="password"
                   label="Password Retype"
                   component={HorizontalField} />

            <FormGroup>
              <Col smOffset={3} sm={9}>
                <Button type="submit" bsStyle="primary">
                  Signup
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Well>
      </Col>
    </Row>
  </Grid>
);

renderSignupForm.propTypes = {
  handleSubmit: T.func.isRequired,
};

const SignupScreen = compose(
  reduxForm({
    form: 'signup',
    validate,
  })
)(renderSignupForm);

export default SignupScreen;