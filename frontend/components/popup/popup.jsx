import React from 'react';
import { closePopup } from '../../actions/popup_actions';
import { connect } from 'react-redux';
import DraggablePopup from './draggable_popup';

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
        component = <p>answer error</p>;
        break;
      case 'comment_error':
        component = <DraggablePopup
          title="Your feedback is appreciated!"
          message="Commenting requires being signed in."
        />;
        break;
      case 'vote_error':
        component = <DraggablePopup
          title="Thanks for the feedback!"
          message="Voting requires being signed in."
        />;
        break;
      default:
        return null;
    }

    const positionStyle = {
      top: popup.clickCoordinate.y - 50 + 'px',
      left: popup.clickCoordinate.x + 50 + 'px',
    }

    return (
      <>
        <div className="popup-background-transparent" onClick={closePopup}>
        </div>
        <div className="popup-container"
          style={positionStyle}
          onClick={e => e.stopPropagation()}>
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
