import React from 'react';
import { Col, FormGroup, ControlLabel } from 'react-bootstrap';

const HorizontalField = ({ controlId, input, label, type, meta: { touched, error, warning } }) => (
  <FormGroup controlId={controlId} validationState={touched ? (error ? 'error' : (warning ? 'warning' : 'success')) : null}>
    <Col componentClass={ControlLabel} sm={2}>
      {label}
    </Col>
    <Col sm={10}>
      <input {...input} className="form-control" placeholder={label} type={type}/>
      {touched && ((error && <span className="help-block">{error}</span>) || (warning && <span className="help-block">{warning}</span>))}
    </Col>
  </FormGroup>
);

export default HorizontalField;
