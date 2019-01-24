import React from 'react';

export default class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    switch (this.props.type) {
      case 'Log in':
        this.props.login({
          email: this.state.email,
          password: this.state.password,
        });
        break;
      case 'Sign up':
        this.props.signup({
          name: this.state.displayName,
          email: this.state.email,
          password: this.state.password,
        });
        break;
      default:
        // TODO: How to implement a default
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
            this.props.type === 'Sign Up' &&
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
          <label>Email{this.props.type === 'Sign Up' && " (required, but never shown)"}</label>
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
          <input
            className="primary-btn session-form-submit-btn"
            type="submit"
            value={this.props.type}
          />
        </form>
      </>      
    );
  }
}