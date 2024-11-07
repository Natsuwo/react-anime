import React, { useState } from "react";
import VisaPng from "../../../assets/images/png/visa@2x.webp";
import MasterCard from "../../../assets/images/png/master_card@2x.webp";
import AmericaExpress from "../../../assets/images/png/american_express@2x.webp";
import SecurityCode from "../../../assets/images/png/security_code@2x.webp";
import InputForm from "../FormInput/FormInput";
import Select from "../Select/Select";
import { Link } from "react-router-dom";

const CreditCard = ({ data }) => {
  const arrCard = [VisaPng, MasterCard, AmericaExpress];
  const monthSelect = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    value: i + 1,
  }));
  const currentYear = new Date().getFullYear() % 100;
  const yearSelect = Array.from({ length: 11 }, (_, i) => ({
    id: i,
    value: currentYear + i,
  }));

  const [values, setValues] = useState({ card_id: "", card_name: "", cvv: "" });

  const handleValidateCard = (event, type) => {
    const rawValue = event.target.value.replace(/\s/g, ""); // Xóa tất cả khoảng trống
    let formattedValue = rawValue;

    // Định dạng thêm khoảng trắng sau mỗi 4 ký tự
    if (type === "card_id") {
      formattedValue = rawValue.replace(/(.{4})/g, "$1 ").trim(); // Thêm khoảng trắng sau mỗi 4 ký tự
    }

    const logicRegex = (value) => {
      if (type === "card_name") {
        return /^[a-zA-Z]*$/.test(value); // Kiểm tra ký tự chữ
      } else if (type === "card_id") {
        return /^\d*$/.test(value); // Cho phép chỉ chứa số
      }
      return true;
    };

    switch (type) {
      case "card_id":
        if (logicRegex(rawValue) && rawValue.length <= 16) {
          // Giới hạn tối đa 16 số
          setValues({
            ...values,
            [type]: formattedValue,
          });
        }
        break;
      case "card_name":
        if (logicRegex(event.target.value)) {
          setValues({
            ...values,
            [type]: event.target.value.toUpperCase(),
          });
        }
        break;
      case "cvv":
        if (/^\d{0,3}$/.test(event.target.value)) {
          // Giới hạn 3 chữ số cho CVV
          setValues({
            ...values,
            [type]: event.target.value,
          });
        }
        break;
      default:
        break;
    }
  };
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
      <form className="main-form mt-2">
        <div className="form-title my-auto">Enter your payment infomation</div>
        <ul className="payment-accept-list my-auto">
          {arrCard.map((item, index) => (
            <li key={index} className="payment-accept-item">
              <img src={item} alt="" />
            </li>
          ))}
        </ul>
        <div className="credit-card-wrapper">
          <div className="credit-card-row">
            <div className="credit-card-left">
              <InputForm
                idFor={"card_id"}
                value={values["card_id"]}
                label={"Card ID"}
                onChange={(e) => handleValidateCard(e, "card_id")}
                placeholder={"1234 1234 1234 1234"}
                autocomplete={"cc-number"}
              />
            </div>
            <div className="credit-card-right">
              <div className="credit-card-title">Exp (mm/yy)</div>
              <div className="credit-card-select-row">
                <Select
                  autocomplete={"cc-exp-month"}
                  data={monthSelect}
                  id={"Card_Exp_Month"}
                />
                <div className="slash"></div>
                <Select
                  autocomplete={"cc-exp-year"}
                  data={yearSelect}
                  id={"Card_Exp_Year"}
                />
              </div>
            </div>
          </div>
          <div className="credit-card-row">
            <div className="credit-card-left">
              <InputForm
                autocomplete={"cc-name"}
                label={"Card Name"}
                placeholder={"Takeshi Honda"}
                value={values["card_name"]}
                idFor={"card_name"}
                onChange={(e) => handleValidateCard(e, "card_name")}
              />
            </div>
            <div className="credit-card-right">
              <div className="credit-cvv-content">
                <InputForm
                  value={values["cvv"]}
                  idFor={"cvv"}
                  onChange={(e) => handleValidateCard(e, "cvv")}
                  autocomplete={"cc-csc"}
                  widthForm={"80px"}
                  label={"CVV"}
                  placeholder={"123"}
                />
                <div className="cvv-code-img">
                  <img src={SecurityCode} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="subtitle-description">
          By registering, you agree to the{" "}
          <Link className="__text-active">Terms of Use</Link>,{" "}
          <Link className="__text-active">Privacy Policy</Link>, and{" "}
          <Link className="__text-active">Subscription Service Guidelines</Link>
          . Please be sure to read them in advance.
        </div>
        <div className="form-actions">
          <button className="btn btn-active">Purchase by Credit Card</button>
        </div>
      </form>
    </>
  );
};

export default CreditCard;
