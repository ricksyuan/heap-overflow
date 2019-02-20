import React from 'react';
import { connect } from 'react-redux';
import Tag from './tag';

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};


class TagInfoBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {tag} = this.props;
    return (
      <>
        <li className="tag-page-li">
          <Tag tag={tag}/>
        </li>
      </>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(TagInfoBox);