import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeField: 'HOME'
    };
  }

  componentDidMount() {
    window.addEventListener("hashchange", () => {
      this.setState({
        activeField: window.location.hash,
      });
    });
  }

  render () {
    return (
      <div className="left-nav-bar">
        <ul>
          <li>
            <Link
              className={`nav-bar-link home ${this.state.activeField === '#/' && 'you-are-here'}`}
              to="/">Home
            </Link>
            </li>
          <li className="public">Public</li>
          <li>
            
            <Link
              className={`nav-bar-link all ${this.state.activeField === '#/all' && 'you-are-here'}`}
              to="/"
            >
              <svg aria-hidden="true" className="svg-icon globe-icon" width="18" height="18" viewBox="0 0 18 18">
                <path d="M9 1a8 8 0 1 0 0 16A8 8 0 0 0 9 1zM8 15.32a6.4 6.4 0 0 1-5.23-7.75L7 11.68v.8c0 .88.12 1.32 1 1.32v1.52zm5.72-2c-.2-.66-1-1.32-1.72-1.32h-1v-2c0-.44-.56-1-1-1H6V7h1c.44 0 1-.56 1-1V5h2c.88 0 1.4-.72 1.4-1.6v-.33a6.4 6.4 0 0 1 2.32 10.24z"></path>
              </svg>
              <span>Stack Overflow</span>
            </Link>
          </li>
          <li>
            <Link
              className={`nav-bar-link tags ${this.state.activeField === '#/tags' && 'you-are-here'}`}
              to="/tags">Tags
            </Link>
          </li>
          <li>
            <Link
              className={`nav-bar-link users ${this.state.activeField === '#/users' && 'you-are-here'}`}
              to="/users">Users
            </Link>
          </li>
          <br/>
          <li className="teams-box">          
            <div className="teams-box-outline">
              <span className="teams">Repository</span>
              <span className="for-work">on Github</span>
              <div className="locked-speech-bubble-svg"><svg width="53" height="49" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M49 11l.2 31H18.9L9 49v-7H4V8h31" fill="#CCEAFF"></path><path d="M44.5 19v-.3l-.2-.1-18-13-.1-.1H.5v33h4V46l.8-.6 9.9-6.9h29.3V19z" stroke="#1060E1" strokeMiterlimit="10"></path><path d="M31 2l6-1.5 7 2V38H14.9L5 45v-7H1V6h25l5-4z" fill="#fff"></path><path d="M7 16.5h13m-13 6h14m-14 6h18" stroke="#1060E1" strokeMiterlimit="10"></path><path d="M39 30a14 14 0 1 0 0-28 14 14 0 0 0 0 28z" fill="#FFB935"></path><path d="M50.5 14a13.5 13.5 0 1 1-27 0 13.5 13.5 0 0 1 27 0z" stroke="#F48024" strokeMiterlimit="10"></path><path d="M32.5 21.5v-8h9v8h-9zm2-9.5V9.3A2.5 2.5 0 0 1 37 6.8a2.5 2.5 0 0 1 2.5 2.5V12h-5zm2 3v2m1-2v2" stroke="#fff" strokeMiterlimit="10"></path></svg></div>
              <a className="nav-bar-link learn-more" href="https://github.com/ricksyuan/heap-overflow">View source</a>
              
            </div>
          </li>

        </ul>
      </div>
    );
  }
}

export default Nav;