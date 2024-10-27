import React, { useState } from "react";
import "./Subscription.css";
import { Link } from "react-router-dom";
import CreditCard from "../../Global/PaymentGate/CreditCard";

const Subscription = () => {
  const paymentList = [
    { id: "credit_card", title: "Credit Card" },
    { id: "paypal", title: "Paypal" },
    { id: "google_pay", title: "Google Pay" },
    { id: "momo", title: "Momo" },
  ];
  const [isActive, setIsActive] = useState("credit_card");
  return (
    <main className="page-main">
      <div className="page-container">
        <h1 className="main-title mb-2">Upgrade</h1>
        <div className="subscription-step my-auto">Step 2/2</div>
        <h2 className="sub-title my-auto">Choose a payment gate</h2>

        <div className="payment-wrapper">
          <ul className="payment-list">
            {paymentList.map((item) => (
              <li
                key={item.id}
                onClick={() => setIsActive(item.id)}
                className={`payment-item${
                  isActive === item.id ? " active" : ""
                } `}
              >
                {item.title}
              </li>
            ))}
          </ul>
          <div className="payment-container">
            <div className="payment-details">
              {isActive === "credit_card" && <CreditCard />}
            </div>
            <div className="payment-policy">
              <p className="guideline-title">
                Important points to note when purchasing
              </p>
              <div className="guideline-content">
                <p>
                  ・Your viewing plan will be automatically renewed unless you
                  cancel it. If you wish to cancel, please cancel it from the
                  "Viewing Plan" screen by the cancellation deadline. Please
                  note that even after the cancellation procedure, you can still
                  use the canceled viewing plan until its expiration date.
                </p>
                <p>
                  ・Please note that even if you cancel during the usage period,
                  refunds or deductions cannot be made on a pro rata basis.
                </p>
              </div>
              <ul>
                <li>
                  <Link className="__text-active">Terms of Use</Link>
                </li>
                <li>
                  <Link className="__text-active">Privacy Policy</Link>
                </li>
                <li>
                  <Link className="__text-active">
                    Subscription Service Guidelines
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Subscription;
