import React from 'react';
import { Col, FormGroup, ControlLabel } from 'react-bootstrap';
import Rating from 'react-rating';

const HorizontalField = ({
  controlId,
  leftSm = 2,
  rightSm = 10,
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <FormGroup  controlId={controlId} validationState={touched ? (error ? 'error' : (warning ? 'warning' : 'success')) : null}>
    <Col componentClass={ControlLabel} sm={leftSm}>
      {label}
    </Col>
    <Col sm={rightSm}style={{paddingTop: 12}}>
      <Rating initialRate={Number(input.value)}
              start={0}
              stop={100}
              step={20}
              empty="glyphicon glyphicon-star-empty"
              full="glyphicon glyphicon-star"
              onChange={input.onChange}
              onClick={(rate) => rate === input.value ? input.onChange(0) : null}
      />
      {touched && ((error && <span className="help-block">{error}</span>) || (warning && <span className="help-block">{warning}</span>))}
    </Col>
  </FormGroup>
);

export default HorizontalField;
