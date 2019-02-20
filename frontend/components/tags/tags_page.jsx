import React from 'react';
import { connect } from 'react-redux';
import { fetchTags } from '../../actions/tag_actions';
import TagsIndex from '../tags/tags_index';

const mapStateToProps = (state) => {
  const tags = Object.values(state.entities.tags);
  return {
    tags: tags,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTags: () => dispatch(fetchTags()),
  };
};


class TagsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchTags();
  }

  render() {
    const {tags} = this.props;
    return (
      <div className="tag-page">
        <div className="content-header">
          <h1 className="content-headline">
            Tags
          </h1>
        </div>
        <p>A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</p>
        <TagsIndex tags={tags} />  
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(TagsPage);