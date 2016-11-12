import React, { PropTypes as T } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import moment from 'moment';
import CustomField from '../components/CustomField';


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
    const today = moment();
    start = moment(values.start);
    if(start.diff(today) < 0) errors.start = 'Start date must be in future';
  }
  if (!values.end) {
    errors.end = 'Required';
  } else {
    const end = moment(values.end);
    if(end.diff(start) <= 0) errors.end = 'End date must be after start date';
  }

  return errors;
}

const renderCategories = ({ fields, meta: { error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add category</button>
    </li>
    {fields.map((category, index) =>
      <li key={index}>
        <button
          type="button"
          onClick={() => fields.remove(index)}
        >
          Remove category
        </button>
        <Field
          name={category}
          type="text"
          component={CustomField}
          label={`Category #${index + 1}`}/>
      </li>
    )}
    {error && <li className="error">{error}</li>}
  </ul>
)

export const EventFormView = ({
  handleSubmit
}) => (
  <div>
    <form onSubmit={handleSubmit}>
      <Field name="name" label="Name" component="input" type="text" component={CustomField} />
      <Field name="description" label="Description" component="input" type="text" component={CustomField} />
      <Field name="address" label="Address" component="input" type="text" component={CustomField} />
      <Field name="start" label="Start" component="input" type="datetime-local" component={CustomField} />
      <Field name="end" label="End" component="input" type="datetime-local" component={CustomField} />
      <Field name="minPeople" label="Min people" component="input" type="number" component={CustomField} />
      <Field name="maxPeople" label="Max people" component="input" type="number" component={CustomField} />
      {/*<FieldArray name="categories" component={renderCategories}/>*/}

      <button type="submit">Submit</button>
    </form>
  </div>
);

EventFormView.propTypes = {
  handleSubmit: T.func.isRequired,
};

const EventForm = reduxForm({ 
  form: 'event',
  validate,
})(EventFormView);

export default EventForm;