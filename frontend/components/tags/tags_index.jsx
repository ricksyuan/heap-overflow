import React from 'react';
import { connect } from 'react-redux';
import TagInfoBox from './tag_info_box';

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};


class TagsIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tagInfoBoxes = this.props.tags.map(tag => (
      <TagInfoBox key={tag.id} tag={tag} />
    ));
    return (
      <>
        <div className="tag-grid">
          {tagInfoBoxes}
        </div>
      </>
      );
    }
  
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(TagsIndex);