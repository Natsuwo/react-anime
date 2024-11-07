import React, { useEffect, useState } from "react";
import { ReactComponent as VnPay } from "../../../assets/images/png/vnpay.svg";
import { useLocation } from "react-router-dom";

const Vnpay = ({ data }) => {
  const localtion = useLocation();
  const [urlPay, setUrlPay] = useState("");
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://vnpaytest.onrender.com/order/create_payment_url?amount=${data?.vnd_amount}&returnUrl=http://localhost:3000${localtion.pathname}`
      );
      const dataUrl = await res.json();

      setUrlPay(dataUrl.data);
    })();
  }, [data]);
  return (
    <>
      <table className="payment-detail-table">
        <tbody>
          <tr className="payment-detail-table-row">
            <th className="payment-detail-header">Product</th>
            <td className="payment-detail-data">
              YureiTV Premium Remove Ads (1 month)
            </td>
          </tr>
          <tr className="payment-detail-table-row">
            <th className="payment-detail-header">Price</th>
            <td className="payment-detail-data">${data?.amount}</td>
          </tr>
        </tbody>
      </table>
      <div className="payment-container search-empty-wrapper">
        <a href={urlPay}>
          <button className="btn btn-active">
            <VnPay width={150}></VnPay>
          </button>
        </a>
      </div>
    </>
  );
};

export default Vnpay;
