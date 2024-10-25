import React from "react";
import "./Coupon.css";
import InputForm from "../../../Global/FormInput/FormInput";

const Coupon = () => {
  return (
    <>
      <h2 className="manager-title">Usage Coupon</h2>
      <div className="manager-sub-text">
        Coupon codes for pay-per-view, YUREITV Premium, shareholder benefits,
        etc. can be used.
      </div>
      <form className="mt-2">
        <InputForm
          widthForm="350px"
          idFor="coupon"
          label="Coupon"
          subtitle="Please enter capital letters and 16 numbers."
          placeholder="XXXX-XXXX-XXXX-XXXX"
          type="text"
          buttonText="Accept"
        />
      </form>
    </>
  );
};

export default Coupon;
