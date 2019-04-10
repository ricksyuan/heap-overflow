import React from 'react';

// Size must have corresponding css
const Gravatar = ({size, hash, float}) => {
  return (
    <img className={`gravatar-${size} ${float ? 'gravatar-float' : ''}`} src={`https://www.gravatar.com/avatar/${hash}?s=${size}&r=pg&d=identicon`}/>
  );
};

export default Gravatar;