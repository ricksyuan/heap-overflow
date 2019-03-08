import React from 'react';
import md5 from 'md5';

// Size must have corresponding css
// TODO: Change to inline style?
const Gravatar = ({size, email, float}) => {
  const trimmedEmail = email.trim().toLowerCase();
  const md5_hash = md5(trimmedEmail);
  return (
    <img className={`gravatar-${size} ${float ? 'gravatar-float' : ''}`} src={`https://www.gravatar.com/avatar/${md5_hash}?s=${size}&r=pg&d=identicon`}/>
  );
};

export default Gravatar;