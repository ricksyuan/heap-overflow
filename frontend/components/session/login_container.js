import SessionForm from './session_form';
import { connect } from 'react-redux';
import { login, loginDemo, clearErrors } from '../../actions/session_actions';

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    buttonText: 'Log in',
  };
};

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user)),
  loginDemo: () => dispatch(loginDemo()),
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);