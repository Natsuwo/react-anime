import React from "react";
import UseIconList from "../../Global/SvgList/UseIconList";
import "./EditAccountModal.css";

const EditAccountModal = ({ visible, setVisible }) => {
  const handleSumbit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={handleSumbit} className="modal-form">
        <fieldset>
          <legend>
            <h1 className="modal-item-title">Profile</h1>
          </legend>
          <div className="upload-avatar">
            <button className="modal-upload-btn">
              <span className="avatar-img">
                <img
                  src="https://image.p-c2-x.abema-tv.com/image/user/profile/thumb/default/human2.jpg"
                  alt=""
                />
              </span>
              <span className="upload-icon">
                <UseIconList icon="camera" />
              </span>
            </button>
          </div>
          <div className="modal-description">
            利用規約に反する内容を設定しないでください。運営によりアカウントを削除、または停止する場合があります。
          </div>
          <input type="text" placeholder="Enter your nickname" />
          <div className="modal-actions">
            <button onClick={() => setVisible(false)} className="btn">
              Cancel
            </button>
            <button className="btn btn-active">Confirm</button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default EditAccountModal;
