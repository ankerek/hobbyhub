import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import compose from 'compose-function';
import { getAuthError } from '../reducers/auth';
import { Form, Row, Col, Button, FormGroup } from 'react-bootstrap';

import HorizontalField from './HorizontalField';

const mapStateToProps = (state) => ({
  authError: getAuthError(state),
});

const validate = values => {
  const errors = {};

  if (!values.text) {
    errors.text = 'Required';
  }
  
  return errors;
};

export const renderCommentForm = ({
  handleSubmit,
}) => (
    <Form horizontal onSubmit={handleSubmit}>
      <Row>
        <Col md={8}>
          <Field name="text"
                 leftSm={0}
                 rightSm={12}
                 type="text"
                 component={HorizontalField} />
        </Col>
        <Col md={4}>
          <FormGroup>
            <Button type="submit" bsStyle="primary">
              Send
            </Button>
          </FormGroup>
        </Col>
      </Row>
    </Form>
);

renderCommentForm.propTypes = {
  handleSubmit: T.func.isRequired,
};

const CommentForm = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'commentForm',
    validate,
  })
)(renderCommentForm);

export default CommentForm;
