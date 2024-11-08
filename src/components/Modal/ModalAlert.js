import { createPortal } from "react-dom";
import UseIconList from "../Global/SvgList/UseIconList";
import { useEffect, useState } from "react";

const modalRoot = document.getElementById("modal-root");
const ModalAlert = ({ visible, setVisible, children }) => {
  const [timer, setTimer] = useState(null);
  useEffect(() => {
    if (visible) {
      clearTimeout(timer);
      const time = setTimeout(() => {
        setVisible(false);
      }, 5000);
      setTimer(time);
    }
  }, [visible]);
  return createPortal(
    <div className={`toast-alert${visible ? " active" : " exit"}`}>
      <div className="modal-toast">
        <div className="modal-toast__message">{children}</div>
        <button
          onClick={() => setVisible(false)}
          type="button"
          className="modal-toast-button"
        >
          <span className="modal-toast__close">
            <UseIconList icon="close"></UseIconList>
          </span>
        </button>
      </div>
    </div>,
    modalRoot
  );
};

export default ModalAlert;
