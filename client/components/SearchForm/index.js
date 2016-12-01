import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import compose from 'compose-function';
import { bm, be } from '../../utils/bem';
import { Form, Grid, Row, Col, Button, FormGroup, Well } from 'react-bootstrap';
import CategoryFilter from '../CategoryFilter';

import HorizontalField from '../HorizontalField';

const mapStateToProps = null;

const validate = values => {
  const errors = {};

  return errors;
};

export const renderSearchForm = ({
  handleSubmit,
  reset,
  searchEvents,
}) => (
  <Form horizontal onSubmit={handleSubmit}>
    <div className={`${bm('Grid', 'multiCol justifyCenter wrap fit gutterA10px')}`}>
      <div className={be('Grid', 'cell')}>
        <Field name="startBefore"
               leftSm={4}
               rightSm={8}
               label="Start before"
               type="datetime-local"
               component={HorizontalField} />
        <Field name="startAfter"
               leftSm={4}
               rightSm={8}
               label="Start after"
               type="datetime-local"
               component={HorizontalField} />
      </div>
      <div className={be('Grid', 'cell')}>
        
      </div>
      <div className={be('Grid', 'cell')}>
        <Field controlId="formHorizontalSpotsRemaining"
               className="form-control"
               name="spotsRemaining"
               type="number"
               label="Spots remaining"
               leftSm={6}
               rightSm={6}
               component={HorizontalField} />
        <FormGroup style={{marginLeft: 55}}>
          <label><Field name="emptyfull" component="input" type="radio" value="empty"/> Empty</label>
          <label><Field name="emptyfull" component="input" type="radio" value="full"/> Full</label>
          <label><Field name="emptyfull" component="input" type="radio" value=""/> Doesn't matter</label>
        </FormGroup>
      </div>
      
    </div>
    <FormGroup>
      <div className={`${bm('Grid', 'multiCol justifyCenter wrap fit gutterA10px')}`}>
        <div className={`${be('Grid', 'cell')}`}>
          <Button type="submit" bsStyle="primary" onClick={reset}>
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
    form: 'login',
    validate,
  })
)(renderSearchForm);

export default SearchForm;
