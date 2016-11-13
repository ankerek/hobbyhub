import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import compose from 'compose-function';
import { login } from '../actions/auth';
import LoginForm from '../components/LoginForm';

const mapStateToProps = null;

const mapDispatchToProps = {
  handleLogin: login,
};

export const renderLoginScreen = ({
  handleLogin,
}) => (
  <LoginForm onSubmit={({ email, password }) => handleLogin({ email, password })} />
);

renderLoginScreen.propTypes = {
  handleLogin: T.func.isRequired,
};

const LoginScreen = compose(
  connect(mapStateToProps, mapDispatchToProps),
)(renderLoginScreen);

export default LoginScreen;
