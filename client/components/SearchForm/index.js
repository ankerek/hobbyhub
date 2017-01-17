import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import compose from 'compose-function';
import { bm, be } from '../../utils/bem';
import { Form, Button, FormGroup } from 'react-bootstrap';

import HorizontalField from '../HorizontalField';
import RatingField from '../RatingField';

const mapStateToProps = null;

const validate = values => {
  const errors = {};

  if (values.startBefore) {
    if(!moment(values.startBefore, 'L LT', true).isValid()) errors.startBefore = 'Not valid';
  }
  if (values.startAfter) {
    if(!moment(values.startAfter, 'L LT', true).isValid()) errors.startAfter = 'Not valid';
  }


  return errors;
};

export const renderSearchForm = ({
  handleSubmit,
  resetForm,
}) => (
  <Form horizontal onSubmit={handleSubmit}>
    <div className={`${bm('Grid', 'multiCol justifyCenter wrap fit gutterA10px')}`}>
      <div className={be('Grid', 'cell')}>
        <Field name="startBefore"
               leftSm={4}
               rightSm={8}
               label="Start before"
               type="datetime"
               component={HorizontalField} />
        <Field name="startAfter"
               leftSm={4}
               rightSm={8}
               label="Start after"
               type="datetime"
               component={HorizontalField} />
        <Field name="nameContains"
               leftSm={4}
               rightSm={8}
               label="Event name"
               type="text"
               component={HorizontalField} />
      </div>

      <div className={be('Grid', 'cell')}>
        <Field name="ratingAbove"
               leftSm={6}
               rightSm={6}
               label="Average rating above"
               component={RatingField} />
        <Field controlId="formHorizontalSpotsRemaining"
               className="form-control"
               name="spotsRemaining"
               type="number"
               label="Spots remaining"
               leftSm={6}
               rightSm={6}
               component={HorizontalField} />
        <div className={`${bm('Grid', 'justifyCenter wrap fit gutterA20px')}`}>
          <div className={be('Grid', 'cell')}>
            <label>Don't show</label>
          </div>
          <div className={be('Grid', 'cell')}>
            <label htmlFor="empty">Empty</label>
            <Field name="empty" id="empty" component="input" type="checkbox"/>
          </div>
          <div className={be('Grid', 'cell')}>
            <label htmlFor="full">Full</label>
            <Field name="full" id="full" component="input" type="checkbox"/>
          </div>
        </div>

      </div>

    </div>
    <FormGroup>
      <div className={`${bm('Grid', 'multiCol justifyCenter wrap fit gutterA10px')}`}>
        <div className={`${be('Grid', 'cell')}`}>
          <Button bsStyle="primary" onClick={resetForm}>
            Clear filters
          </Button>
        </div>
        <div className={`${be('Grid', 'cell')}`}>
          <Button type="submit" bsStyle="primary">
            Search
          </Button>
        </div>
      </div>
    </FormGroup>
  </Form>
);

renderSearchForm.propTypes = {
  handleSubmit: T.func.isRequired,
};

const SearchForm = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'searchEvents',
    validate,
  })
)(renderSearchForm);

export default SearchForm;
