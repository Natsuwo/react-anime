import { createPortal } from "react-dom";
import "./Modal.css";

const modalRoot = document.getElementById("modal-root");
const Modal = ({ visible, setVisible, children, className = "" }) => {
  if (visible) {
    modalRoot.parentElement.classList.add("body--prevent-scroll");
  } else {
    modalRoot.parentElement.classList.remove("body--prevent-scroll");
  }
  return createPortal(
    <div className={`main-modal-wrapper ${className} ${visible ? "" : "hide"}`}>
      <div className="main-modal-bg" onClick={() => setVisible(false)}></div>
      <div className="main-modal-container">
        <div className="main-modal-content">{children}</div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
