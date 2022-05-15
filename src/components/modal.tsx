import { Component } from "react";

class Modal extends Component<{
  open: boolean;
  onClose: Function;
  children: any;
}> {
  render() {
    if (this.props.open) {
      return (
        <div>
          <div>{this.props.children}</div>
          <button
            onClick={() => {
              this.props.onClose();
            }}
          >
            Close
          </button>
        </div>
      );
    }
  }
}

export default Modal;
