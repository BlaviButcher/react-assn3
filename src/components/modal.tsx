import { Component } from "react";
import "../css/modal.css";

class Modal extends Component<{
  open: boolean;
  onClose: Function;
  title: string;
  children: any;
}> {
  render() {
    if (this.props.open) {
      return (
        <div>
          <div id="modal" className="modal-wrap">
            <div className="modal">
              <h2>{this.props.title}</h2>
              <div className="modal-content">{this.props.children}</div>
              <button
                id="close"
                className="toggle-button"
                onClick={() => {
                  this.props.onClose();
                }}
              >
                Close
              </button>
            </div>
          </div>
          <div className="modal-overlay" id="modal-overlay"></div>
        </div>
      );
    }
  }
}

export default Modal;
