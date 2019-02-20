import React from 'react';
import { Link } from 'react-router-dom';
import ErrorList from '../errors/error_list';

// For guest log in
const DEMO_EMAIL = "demo@example.com";
const DEMO_PASSWORD = "password";

export default class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {displayName: '', email: '', password: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    switch (this.props.buttonText) {
      case 'Log in':
        this.props.login({
          email: this.state.email,
          password: this.state.password,
        });
        break;
      case 'Sign up':
        this.props.signup({
          display_name: this.state.displayName,
          email: this.state.email,
          password: this.state.password,
        });
        break;
    }
  }

  handleChange(field) {
    return (e) => this.setState({[field]: e.currentTarget.value});
  }

  render() {
    return (
      <>
        <form className="session-form" onSubmit={this.handleSubmit}>
          {
            this.props.buttonText === 'Sign up' &&
              <>
                <label>Display Name</label>
                <input
                  className="session-form-input"
                  type="text"
                  placeholder="J. Doe"
                  value={this.state.displayName}
                  onChange={this.handleChange('displayName')}/>
              </>
          }
          <label>Email{this.props.buttonText === 'Sign up' && " (required, but never shown)"}</label>
          <input
            className="session-form-input"
            type="email"
            placeholder="you@example.org"
            value={this.state.email}
            onChange={this.handleChange('email')}
          />
          <label>Password</label>
          <input
            className="session-form-input"
            type="password"
            placeholder="********"
            value={this.state.password}
            onChange={this.handleChange('password')}
          />
          <ErrorList errors={this.props.errors}/>
          <input
            className="session-form-submit-btn primary-btn"
            type="submit"
            value={this.props.buttonText}
          />
        </form>

        <div className="session-form-alternates">
          <p>
            {
              this.props.buttonText === "Sign up" ? (
                <>
                  Already have an account? <Link className="session-alt-link" to="/login">Log in</Link>
                </>
              ) : (
                <>
                  Don't have an account? <Link className="session-alt-link" to="/signup">Sign up</Link>
                </>
              )
            }
          </p>
          <br />
          <p>Just trying it out? <button
            className="session-alt-link"
            onClick={() => this.props.login({
              email: DEMO_EMAIL,
              password: DEMO_PASSWORD,
            })}>Log in as guest</button>
          </p>
          
        </div>
      </>      
    );
  }
}