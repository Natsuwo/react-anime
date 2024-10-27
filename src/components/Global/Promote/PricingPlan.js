import React from "react";
import UseIconList from "../SvgList/UseIconList";

const PricingPlan = ({ recommend = false, month, price }) => {
  return (
    <div className="plan-price-box">
      <div className={`recommend-tag${recommend ? " show" : ""}`}>
        Recommend
      </div>
      <div className="plan-price-box-content">
        <div className="plan-price-left">
          <div className="plan-text-month">{month} Month</div>
        </div>
        <div className="plan-price-right">
          <div className="plan-text-price">
            <div className="plan-text-content">
              <span className="price">${price}</span>
              <span className="tax">(Tax inc)</span>
            </div>
          </div>
          <div className="promote-plan-icon">
            <UseIconList icon="chevron-right" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlan;
