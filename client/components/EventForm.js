import React, { PropTypes as T } from 'react';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import compose from 'compose-function';
import { Form, Col, Button, FormGroup, Well } from 'react-bootstrap';

import { bm, be } from '../utils/bem';
import HorizontalField from './HorizontalField';

const validate = values => {
  const errors = {};
  let start;

  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length < 3) {
    errors.name = 'Must be 3 characters or more';
  }
  if (!values.description) {
    errors.description = 'Required';
  }
  if (!values.address) {
    errors.address = 'Required';
  }
  if (!values.categories) {
    errors.categories = 'Required';
  }
  if (!values.minPeople) {
    errors.minPeople = 'Required';
  } else if (Number(values.minPeople) < 2) errors.minPeople = 'Min 2 people';
  if (!values.maxPeople) {
    errors.maxPeople = 'Required';
  } else if (Number(values.maxPeople) < 2) errors.maxPeople = 'Min 2 people';
  else if (Number(values.maxPeople) < Number(values.minPeople)) errors.maxPeople = 'Must be bigger than min people';

  if (!values.start) {
    errors.start = 'Required';
  } else {
    if(!moment(values.start, 'L LT', true).isValid()) errors.start = 'Not valid';

    const today = moment();
    start = moment(values.start);
    if(start.diff(today) < 0) errors.start = 'Start date must be in future';
  }
  if (!values.end) {
    errors.end = 'Required';
  } else {
    if(!moment(values.end, 'L LT', true).isValid()) errors.end = 'Not valid';
    
    const end = moment(values.end);
    if(end.diff(start) <= 0) errors.end = 'End date must be after start date';
  }

  return errors;
};

export const renderEventForm = ({
  handleSubmit,
  categories,
}) => (
  <div className={bm('Grid', 'multiCol justifyCenter')}>
    <div className={`${be('Grid', 'cell')} u-maxWidth640px`}>
      <Well>
        <Form horizontal onSubmit={handleSubmit}>
          <Field name="name"
                 leftSm={4}
                 rightSm={8}
                 label="Name"
                 type="text"
                 component={HorizontalField} />
          <Field name="description"
                 leftSm={4}
                 rightSm={8}
                 label="Description"
                 type="text"
                 component={HorizontalField} />
          <Field name="address"
                 leftSm={4}
                 rightSm={8}
                 label="Address"
                 type="text"
                 component={HorizontalField} />
          <Field name="start"
                 leftSm={4}
                 rightSm={8}
                 label="Start"
                 type="datetime"
                 component={HorizontalField} />
          <Field name="end"
                 leftSm={4}
                 rightSm={8}
                 label="End"
                 type="datetime"
                 component={HorizontalField} />
          <Field name="minPeople"
                 leftSm={4}
                 rightSm={8}
                 label="Min people"
                 type="number"
                 component={HorizontalField} />
          <Field name="maxPeople"
                 leftSm={4}
                 rightSm={8}
                 label="Max people"
                 type="number"
                 component={HorizontalField} />
          <Field name="category"
                 leftSm={4}
                 rightSm={8}
                 label="Category"
                 type="select"
                 component={HorizontalField}>
            {categories.map((category, i) => (<option value={category} key={i}>{category}</option>))}
          </Field>

          <FormGroup>
            <Col smOffset={4} sm={8}>
              <Button bsStyle="primary" type="submit">Submit</Button>
            </Col>
          </FormGroup>
        </Form>
      </Well>
    </div>
  </div>
);

renderEventForm.propTypes = {
  handleSubmit: T.func.isRequired,
};

const EventForm = compose(
  reduxForm({
    form: 'event',
    validate,
  })
)(renderEventForm);

export default EventForm;
