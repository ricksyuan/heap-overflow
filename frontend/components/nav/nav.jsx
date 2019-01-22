import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
  return (
    <div className='nav-container'>
      <Link to='/' className='logo'>
        {/*TODO: DOES NOT WORK. WHY? <img className='logo-img' src='/app/assets/images/logo.png'/>   */}
        <h1>Heap Overflow</h1>
      </Link>
      
      {
        props.currentUser ? (
          <div>
            {/* or class? */}
            <button className='logout' onClick={props.logout}>Log Out</button>          
          </div>
        ) : (
          <div>
            <Link className='login' to='/login'>Log In</Link>
            <Link className='signup' to='/signup'>Sign Up</Link>
          </div>
        )
      }

    </div>
  );
};

export default Nav;

