import React from "react";
import Breadcumb from "../../../Global/Breadcrumb/Breadcumb";
import "./Status.css";

const Subscription = () => {
  return (
    <main className="page-main">
      <div className="page-container">
        <div className="__half-container">
          <Breadcumb />
          <h1 className="main-title">Purchase Plan</h1>
          <div className="sub-title mt-2 mb-2">Current Plan</div>
          <div className="plan-box">Free</div>

          <h2 className="sub-title mt-2 mb-2">Recommended Plans</h2>
          <ul className="plan-list">
            <li className="plan-item">
              <div className="plan-box">
                <div className="plan-box-content">
                  <div className="plan-box-left">
                    <div className="plan-title">
                      <div className="plan-text">
                        YureiTV<span className="__text-active">Premium</span>
                      </div>
                      <div className="plan-price">from $4.99/month</div>
                    </div>
                    <div className="plan-description">
                      Unlimited viewing of missed programs and popular shows
                    </div>
                  </div>
                  <div className="plan-box-right">
                    <button className="btn btn-active">More Details</button>
                  </div>
                </div>
              </div>
            </li>
            <li className="plan-item">
              <div className="plan-box">
                <div className="plan-box-content">
                  <div className="plan-box-left">
                    <div className="plan-title">
                      <div className="plan-text">
                        <span className="__text-active">Full Access</span>
                      </div>
                      <div className="plan-price">$100/year</div>
                    </div>
                    <div className="plan-description">
                      Unlimited viewing of missed programs and popular shows
                    </div>
                  </div>
                  <div className="plan-box-right">
                    <button className="btn btn-active">More Details</button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Subscription;
