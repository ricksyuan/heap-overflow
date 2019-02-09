import React from 'react';
import { closePopup } from '../../actions/popup_actions';
import { connect } from 'react-redux';
import CommentPopup from './comment_popup';

const mapStateToProps = (state) => {
  return {    
    popup: state.ui.popup
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closePopup: () => dispatch(closePopup())
  };
};

class Popup extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { popup, closePopup } = this.props;
    
    if (!popup) {
      return null;
    }

    let component;
    switch (popup.name) {
      case 'question_error':
        component = <p>question error</p>;
        break;
      case 'answer_error':
        component = (
          <>
            <div className="close-x" onClick={this.props.closePopup}>x</div>
            <p>answer error</p>
          </>
        );
        break;
      case 'comment_error':
        component = <CommentPopup />;
        break;
      case 'vote_error':
        component = <p>vote error</p>;
        break;
      default:
        return null;
    }

    const positionStyle = {
      top: popup.clickCoordinate.y + 'px',
      left: popup.clickCoordinate.x + 200 + 'px',
    }

    return (
      <>
        <div className="popup-background-transparent" onClick={closePopup}>
        </div>
        <div className="popup-container" onClick={e => e.stopPropagation()}>
          <div className="close-x-container">
            <button className="close-x-btn" title="close this popup (or hit Esc)" onClick={closePopup}>×</button>
          </div>
          {component}
        </div>        
      </>
    );
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
