import React from "react";
import UseIconList from "../SvgList/UseIconList";

const modalRoot = document.getElementById("modal-root");
const ModalAlert = ({ visible, setVisible, children }) => {
  return createPortal(
    <div
      class={`modal-alert${
        visible ? " modal-alert--appear-active" : " modal-alert--exit-active"
      }`}
    >
      <div class="modal-toast">
        <p class="modal-toast__message">{children}</p>
        <button
          onClick={() => setVisible(false)}
          type="button"
          class="modal-toast__close-button"
        >
          <span class="modal-toast__close">
            <UseIconList icon="close"></UseIconList>
          </span>
        </button>
      </div>
    </div>,
    modalRoot
  );
};

export default ModalAlert;
