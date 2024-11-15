import React from "react";
import Breadcumb from "../../../Global/Breadcrumb/Breadcumb";
import "./Status.css";
import { Link, useNavigate } from "react-router-dom";
import { UseUserMetaContext } from "../../../../context/UserMeta";
import { convertToExpirationDate } from "../../../../features/helper";
import { isMobile } from "react-device-detect";

const Subscription = () => {
  const breadcrumb = [{ title: "Subscription" }];
  const { userMetaData, userLevel } = UseUserMetaContext();
  const planList = [
    {
      title: "Premium",
      sub_title: "YureiTV",
      price: "4.99",
      isMonth: true,
      description: "Watch anime, shows without Limited",
      level: 2,
    },
    {
      title: "Unlimited",
      price: "9.99",
      isMonth: true,
      description: "Unlimited viewing of missed programs and popular shows",
      level: 3,
    },
  ];

  const navigate = useNavigate();
  const handleNavigate = () => {
    if (!isMobile) return;
    navigate("/subscription/promote");
  };
  return (
    <main className="page-main">
      <div className="page-container">
        <div className="__half-container">
          <Breadcumb items={breadcrumb} />
          <h1 className="main-title">Purchase Plan</h1>
          <div className="sub-title mt-2 mb-2">Current Plan</div>
          <div className="plan-box">
            {userLevel?.level_text}
            {userLevel?.level_id > 1 && (
              <div className="plan-description">
                Expired date:{" "}
                {convertToExpirationDate(userMetaData?.subscription_expired, 0)}
              </div>
            )}
          </div>

          {userLevel?.level_id < 3 && (
            <h2 className="sub-title mt-2 mb-2">Recommended Plans</h2>
          )}
          <ul className="plan-list">
            {planList.map((item, index) => (
              <div key={index}>
                {item.level > userLevel?.level_id && (
                  <li className="plan-item">
                    <div onClick={handleNavigate} className="plan-box">
                      <div className="plan-box-content">
                        <div className="plan-box-left">
                          <div className="plan-title">
                            <div className="plan-text">
                              {item.sub_title}
                              <span className="__text-active">
                                {item.title}
                              </span>
                            </div>
                            <div className="plan-price">
                              from ${item.price}/
                              {item.isMonth ? "month" : "year"}
                            </div>
                          </div>
                          <div className="plan-description">
                            {item.description}
                          </div>
                        </div>
                        <div className="plan-box-right">
                          <Link to="/subscription/promote">
                            <button className="btn btn-active">
                              {userLevel.level_id > 1
                                ? "Upgrade"
                                : "More Details"}
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                )}
              </div>
            ))}
          </ul>
          {userLevel?.level_id > 2 && (
            <>
              <h3 className="sub-title mt-2 mb-2">Action Plans</h3>
              <div className="plan-box">
                <div className="plan-box-content">
                  <div className="plan-box-left">
                    <div className="plan-title">Unsubscribe Plan</div>
                    <div className="plan-description">
                      You can use premium until the end of your current
                      subscription period.
                    </div>
                  </div>
                  <div className="plan-box-right">
                    <Link to="/subscription/promote">
                      <button className="btn">Unsubscribe</button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Subscription;
