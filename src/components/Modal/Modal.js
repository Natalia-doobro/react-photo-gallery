import { Component } from "react";
import s from "./Modal.module.css";

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }
  componentDidUpdate() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    const { closeModal } = this.props;

    if (e.code === "Escape") {
      closeModal();
    }
  };

  onClickOverlay = (e) => {
    const { closeModal } = this.props;
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  render() {
    const { modalSrc } = this.props;
    return (
      <div className={s.Overlay} onClick={this.onClickOverlay}>
        <div className={s.Modal}>
          <img src={modalSrc.largeImageURL} alt={modalSrc.user} />
        </div>
      </div>
    );
  }
}

export default Modal;
