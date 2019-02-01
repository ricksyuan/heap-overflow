import React from 'react';
import { Link } from 'react-router-dom';

class Tag extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Link className="question-tag" to={`questions/tagged/${this.props.tag.name}`}>
          {this.props.tag.name}
        </Link>
      </>
    );
  }

  
}

export default Tag
