import React, { useEffect, useState } from "react";
import "./Subscription.css";
import { Link, useParams } from "react-router-dom";
import CreditCard from "../../Global/PaymentGate/CreditCard";
import Vnpay from "../../Global/PaymentGate/Vnpay";
import {
  FetchSingleDocumentByKey,
  UpdateDocument,
} from "../../../features/useFetch";
import { UseUserMetaContext } from "../../../context/UserMeta";
import { calculateExpirationDate } from "../../../features/helper";

const Subscription = () => {
  const paymentList = [
    { id: "credit_card", title: "Credit Card" },
    { id: "paypal", title: "Paypal" },
    { id: "google_pay", title: "Google Pay" },
    { id: "vnpay", title: "VNPay" },
  ];
  const [isActive, setIsActive] = useState("credit_card");
  const [isPaid, setPaid] = useState(false);
  const { handleUserMetaData, handleLevelLoading } = UseUserMetaContext();

  const [data, setData] = useState(null);
  const { params } = useParams();
  useEffect(() => {
    (async () => {
      const data = await FetchSingleDocumentByKey("Payment", "uid", params);
      if (data.success) {
        setData(data);
      }
    })();
  }, [params]);

  useEffect(() => {
    const query = window.location.search; // Lấy toàn bộ chuỗi query
    if (query) {
      (async () => {
        const res = await fetch(
          "https://vnpayapi.vercel.app/api/payment/resultPayment" + query
        );
        const result = await res.json();
        if (result.success && data?.status) {
          setPaid(true);
        }
        if (result.success && data?.status === false) {
          await UpdateDocument({ status: true }, "Payment", data.id);
          const subscription_expired = calculateExpirationDate(data.period);
          handleUserMetaData({
            subscription_level: data.level,
            subscription_expired: subscription_expired,
          });
          handleLevelLoading(true);
          setPaid(true);
        }
      })();
    }
  }, [data, handleUserMetaData, handleLevelLoading]);

  return (
    <main className="page-main">
      <div className="page-container">
        <h1 className="main-title mb-2">Upgrade</h1>
        <div className="subscription-step my-auto">Step 2/2</div>
        <h2 className="sub-title my-auto">Choose a payment gate</h2>
        {!isPaid && (
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
                {isActive === "credit_card" && <CreditCard data={data} />}
                {isActive === "vnpay" && <Vnpay data={data} />}
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
                    note that even after the cancellation procedure, you can
                    still use the canceled viewing plan until its expiration
                    date.
                  </p>
                  <p>
                    ・Please note that even if you cancel during the usage
                    period, refunds or deductions cannot be made on a pro rata
                    basis.
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
        )}
        {isPaid && (
          <div className="payment-wrapper">
            <div
              className="payment-container"
              style={{ gridTemplateColumns: "auto" }}
            >
              <div className="payment-details">
                <div
                  className="payment-content"
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "16px",
                  }}
                >
                  <p>All done, enjoy it!</p>
                  <Link to="/account">
                    <button className="btn btn-active">Back to home</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Subscription;
