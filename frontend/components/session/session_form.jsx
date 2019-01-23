import React from 'react';
import { Link } from 'react-router-dom';

export default class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    switch (this.props.type) {
      case 'Log In':
        this.props.login({
          email: this.state.email,
          password: this.state.password,
        });
        break;
      case 'Sign up':
        this.props.signup({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        });
        break;
      default:
        // TODO: How to implement a default
        console.log('ERROR: Default case encountered. Neither login or signup reached');
        break;
    }
  }

  handleChange(field) {
    return (e) => this.setState({[field]: e.currentTarget.value});
  }

  render() {
    return (
      <div className="session">
        <form className="session-form" onSubmit={this.handleSubmit}>
          <label>Display Name</label>
          <input
            className="name"
            type="text"
            placeholder="J. Doe"
            value={this.state.email}
            onChange={this.handleChange}
          />

          <label>Email (required, but never shown)</label>
          <input
            className="text"
            type="text"
            placeholder="you@example.org"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label>Password</label>
          <input
            className="password"
            type="password"
            placeholder="********"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <input
            type="submit"
            value={this.props.type}
          />
        </form>
      </div>      
    );
  }
}