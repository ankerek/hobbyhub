import React from 'react';
import { Col, FormGroup, ControlLabel } from 'react-bootstrap';

const HorizontalField = ({
  controlId,
  leftSm = 2,
  rightSm = 10,
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <FormGroup controlId={controlId} validationState={touched ? (error ? 'error' : (warning ? 'warning' : 'success')) : null}>
    <Col componentClass={ControlLabel} sm={leftSm}>
      {label}
    </Col>
    <Col sm={rightSm}>
      <input {...input} className="form-control" placeholder={label} type={type}/>
      {touched && ((error && <span className="help-block">{error}</span>) || (warning && <span className="help-block">{warning}</span>))}
    </Col>
  </FormGroup>
);

export default HorizontalField;
