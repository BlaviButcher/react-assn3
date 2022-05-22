import { Component } from "react";
import "../css/modal.css";

class Modal extends Component<{
  open: boolean;
  onClose: Function;
  title: string;
  children: any;
}> {
  constructor(props: any) {
    super(props);
    this.escFunction = this.escFunction.bind(this);
  }
  // esc key functionality
  escFunction(event: any) {
    if (event.key === "Escape") {
      this.props.onClose();
    }
  }
  // add and remove escape key functionality - model exists in background so must be off when not mounted
  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }
  render() {
    if (this.props.open) {
      return (
        <div>
          <div id="modal" className="modal-wrap">
            <div className="modal">
              <h2>{this.props.title}</h2>
              <div className="modal-content">{this.props.children}</div>
            </div>
          </div>
          <div
            className="modal-overlay"
            onClick={() => this.props.onClose()}
            id="modal-overlay"
          ></div>
        </div>
      );
    }
  }
}

export default Modal;
