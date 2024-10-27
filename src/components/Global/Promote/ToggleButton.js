import React, { useState } from "react";
import UseIconList from "../SvgList/UseIconList";

const ToggleButton = ({ title, children }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="toggle-panel">
      <button
        onClick={() => setIsActive(!isActive)}
        className="btn-toggle-panel"
      >
        <span className="btn-toggle-text">
          {!title ? "Read carefully before the purchasing" : title}
        </span>
        <span className="btn-toggle-icon">
          <UseIconList icon="dropdown" />
        </span>
      </button>
      <div
        className={`toggle-panel-description${isActive ? " show" : " hide"}`}
      >
        {!children ? (
          <ul>
            <li>Charges will be applied immediately upon plan registration.</li>
            <li>
              Automatic renewal will occur via the registered payment method
              beginning 24 hours before the next renewal date, as shown on the
              "Subscription Plan" screen.
            </li>
            <li>
              To stop automatic renewal, please cancel your subscription
              yourself by the cancellation deadline displayed on the
              "Subscription Plan" screen.
            </li>
            <li>
              There is no difference in content available between YUREITV
              Premium with ads and YUREITV Premium without ads.
            </li>
            <li>
              By registering, you agree to the Subscription Service Guidelines
              and Privacy Policy.
            </li>
          </ul>
        ) : (
          <div className="faq-list-inner">
            <div className="faq-list-item">
              <p className="faq-list-item-description">{children}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToggleButton;
