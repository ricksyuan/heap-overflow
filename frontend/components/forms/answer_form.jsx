import React from 'react';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
}; 

class AnswerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({body: value});
  }

  render() {
    return (
      <div>
        <ReactQuill 
          value={this.state.body}
          onChange={this.handleChange}/>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerForm);