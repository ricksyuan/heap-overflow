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
      case 'COMMENT_ERROR':
        component = <DraggablePopup
          title="Your feedback is appreciated!"
          message1="Commenting requires being signed in."
          message2="Setting up an account is free and open to everyone.Set up your account today and earn extra privileges like posting, commenting and voting."
          accountLinks={true}
        />;
        break;
      case 'VOTE_ERROR':
        component = <DraggablePopup
          title="Thanks for the feedback!"
          message1="Voting requires being signed in."
          message2="Setting up an account is free and open to everyone.Set up your account today and earn extra privileges like posting, commenting and voting."
          accountLinks={true}
        />;
        break;
      case 'VOTE_AUTHOR_ERROR':
        component = <DraggablePopup
          title="Thanks for the feedback!"
          message1="You cannot vote on your own posts."
          message2="Questions, answers, and comments can only be voted on users besides the original author."
          accountLinks={false}
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
