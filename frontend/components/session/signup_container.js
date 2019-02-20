import SessionForm from './session_form';
import { connect } from 'react-redux';
import { signup, login, loginDemo, clearErrors } from '../../actions/session_actions';

const mapStateToProps = ({ errors }) => {
  return {
  errors: errors.session,
  buttonText: 'Sign up',
  };
};

const mapDispatchToProps = (dispatch) => ({
  signup: (user) => dispatch(signup(user)),
  login: (user) => dispatch(login(user)),
  loginDemo: () => dispatch(loginDemo()),
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);