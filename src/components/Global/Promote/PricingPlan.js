import React from "react";
import UseIconList from "../SvgList/UseIconList";
import YureiLoading from "../YureiLoading/YureiLoading";

const PricingPlan = ({
  isClicked,
  onClick,
  recommend = false,
  period,
  amount,
  vnd_amount,
  level,
}) => {
  return (
    <div
      className="plan-price-box"
      onClick={async () => await onClick(amount, vnd_amount, period, level)}
    >
      <div className={`recommend-tag${recommend ? " show" : ""}`}>
        Recommend
      </div>
      <div className={`plan-loading${isClicked ? " active" : ""}`}>
        <div className="plan-loading-overlay"></div>
        <div className="plan-loading-content">
          <YureiLoading width={50} height={50} />
        </div>
      </div>
      <div className="plan-price-box-content">
        <div className="plan-price-left">
          <div className="plan-text-month">{period} Month</div>
        </div>
        <div className="plan-price-right">
          <div className="plan-text-price">
            <div className="plan-text-content">
              <span className="price">${amount}</span>
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
