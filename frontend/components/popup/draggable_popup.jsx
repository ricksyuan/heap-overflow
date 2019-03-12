import React from 'react';
import { Link } from 'react-router-dom';

class DraggablePopup extends React.Component {

  constructor(props) {
    super(props);
    
    this.dragStart = this.dragStart.bind(this);
    this.drag = this.drag.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
  }

  dragStart(e) {
    e.stopPropagation();
    document.onmouseup = this.dragEnd;
    document.onmousemove = this.drag;

    this.initialX = e.clientX;
    this.initialY = e.clientY;
  }

  drag(e) {
    e.stopPropagation();
    const draggableElement = document.querySelector(".popup-container");
    const dx = e.clientX - this.initialX;
    const dy = e.clientY - this.initialY;
    draggableElement.style.top = draggableElement.offsetTop + dy + "px";
    draggableElement.style.left = draggableElement.offsetLeft + dx + "px";
    this.initialX = e.clientX;
    this.initialY = e.clientY;
  }

  dragEnd(e) {
    document.onmouseup = null;
    document.onmousemove = null;
  }
  
  render () {
    return (
      <>
        <h2 className="popup-title-container" onMouseDown={this.dragStart}>
          <span className="popup-title">{this.props.title}</span>
        </h2>
        
        <p>{this.props.message1}</p>

        <p>{this.props.message2}</p>

        {this.props.accountLinks &&
          <span className="popup-link-container">
            <Link className="popup-signup-link" to="/signup">Sign up</Link> or <Link className="popup-login-link" to="/login">log in</Link>
          </span>
        }
      </>
    );
  }
}

export default DraggablePopup;