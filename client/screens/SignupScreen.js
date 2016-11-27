import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import compose from 'compose-function';
import { register } from '../actions/auth';
import SignupForm from '../components/SignupForm';

const mapStateToProps = null;

const mapDispatchToProps = {
  handleSignup: register,
};

export const renderSignupScreen = ({
  handleSignup,
}) => (
  <SignupForm onSubmit={({ fullName, email, password, passwordRetype }) => (
    handleSignup({ fullName, email, password, passwordRetype })
  )} />
);

renderSignupScreen.propTypes = {
  handleSignup: T.func.isRequired,
};

const SignupScreen = compose(
  connect(mapStateToProps, mapDispatchToProps),
)(renderSignupScreen);

export default SignupScreen;
