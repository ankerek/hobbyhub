import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
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

  return errors;
};

const renderEditableRating = ({
  input
} = {}) => (
  <Rating start={0}
          stop={100}
          step={20}
          onChange={input.onChange}
          initialRate={input.value}
          empty="glyphicon glyphicon-star-empty"
          full="glyphicon glyphicon-star" />
);

const EditableRating = (renderEditableRating);

export const renderRateForm = ({
  handleSubmit,
  hasRating,
  onDeleteRating,
}) => (
    <Form horizontal onSubmit={handleSubmit}>
      <Field name="percent"
             component={EditableRating} />
      <Field name="additionalText"
             type="text"
             leftSm={0}
             rightSm={12}
             component={HorizontalField} />
      <p>
        <Button type="submit" bsStyle="primary">
          Save Rating
        </Button>
        {hasRating ? (
          <Button className="u-indent5px" bsStyle="warning" onClick={onDeleteRating}>
            Remove Rating
          </Button>
        ) : null}
      </p>
    </Form>
);

renderRateForm.propTypes = {
  handleSubmit: T.func.isRequired,
};

const RateForm = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'rateForm',
    validate,
  })
)(renderRateForm);

export default RateForm;
