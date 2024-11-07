import React, { useEffect, useState } from "react";
import "./Promote.css";
import Banner from "../../../../assets/images/png/banner-yurei.png";
import PricingPlan from "../../../Global/Promote/PricingPlan";
import PlanOption from "../../../Global/Promote/PlanOption";
import ToggleButton from "../../../Global/Promote/ToggleButton";
import PromoteThumb from "../../../../assets/images/png/promote-thumb.png";
import { GetAllSort } from "../../../../features/useFetch";

const Promote = () => {
  const fullAccessList = [
    { option: "Full Access", check: true },
    { option: "Unlimited contents", check: true },
    { option: "No Ads", check: true },
    { option: "Play from start livestream stuffs", check: true },
    { option: "Downloadble Videos", check: true },
  ];

  const premiumList = [
    { option: "Full Access", check: true },
    { option: "Unlimited contents", check: false },
    { option: "No Ads", check: true },
    { option: "Play from start livestream stuffs", check: false },
    { option: "Downloadble Videos", check: false },
  ];
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await GetAllSort("Plan", "amount", "asc", 2);
      if (data.success) {
        setPlans(data.doc);
      }
    })();
  }, []);
  return (
    <>
      <div className="promote-container">
        <div className="promote-banner">
          <img src={Banner} alt="" />
        </div>
        <div className="promote-plan-wrapper">
          <div className="promote-plan-main-title">Choose one of both</div>
          <div className="promote-plan-container mt-2">
            <div className="promote-plan-left">
              <PlanOption title={"Unlimited"} lists={fullAccessList} />
              <div className="mt-2">
                <PricingPlan url={plans[1]?.id} price={"9.99"} month={"1"} />
              </div>
            </div>
            <div className="promote-plan-right mb-2">
              <PlanOption title={"Premium"} lists={premiumList} />
              <div className="mt-2">
                <PricingPlan
                  url={plans[0]?.id}
                  recommend={true}
                  price={"4.99"}
                  month={"1"}
                />
              </div>
            </div>
          </div>
          <ToggleButton />
        </div>
        <div className="promote-wrapper">
          <h2 className="promote-title mt">
            Enjoy unlimited contents only $4.99/month.
          </h2>
          <p className="promote-description">
            Enjoy all livestream content from start (Content will be added from
            time to time)
          </p>
        </div>
        <div className="promote-wrapper">
          <div className="promote-content">
            <div className="promote-thumb">
              <img src={PromoteThumb} alt="" />
            </div>
          </div>

          <h2 className="promote-title mt">
            A new plan is now available, allowing you to enjoy content at an
            affordable price
          </h2>
        </div>
        <div className="promote-plan-wrapper">
          <div className="promote-plan-main-title">Choose one of both</div>
          <div className="promote-plan-container mt-2">
            <div className="promote-plan-left">
              <PlanOption title={"Unlimited"} lists={fullAccessList} />
              <div className="mt-2">
                <PricingPlan url={plans[1]?.id} price={"9.99"} month={"1"} />
              </div>
            </div>
            <div className="promote-plan-right mb-2">
              <PlanOption title={"Premium"} lists={premiumList} />
              <div className="mt-2">
                <PricingPlan
                  url={plans[0]?.id}
                  recommend={true}
                  price={"4.99"}
                  month={"1"}
                />
              </div>
            </div>
          </div>
          <ToggleButton />
        </div>
        <div className="promote-wrapper">
          <h2 className="promote-title mt">FAQ</h2>
          <div className="faq-container">
            <ToggleButton title={"What is YUREI PREMIUM"}>
              You can watch all contents without ads just $4.99 per month.
            </ToggleButton>
            <ToggleButton title={"What is YUREI Full Access"}>
              You can access all limited contents.
            </ToggleButton>
            <ToggleButton title={"How do I Cancel?"}>
              To cancel your subscription, please do so from the "Subscription
              Plan" screen by the cancellation deadline. Paid subscription plans
              will automatically renew unless canceled. Even after canceling,
              you can continue to use the plan until the expiration date
            </ToggleButton>
            <ToggleButton title={"How do I Pay"}>
              We support Credit Card, Paypal, Google Pay and Momo
            </ToggleButton>
            <ToggleButton title={"When do I pay?"}>
              You will be charged when you sign up for a plan listed on this
              page. At the next renewal, you will be charged for the next period
              starting 24 hours before the expiration date. You can check the
              expiration date on the "Viewing Plan" screen.
            </ToggleButton>
            <ToggleButton title={"What additional items require purchase?"}>
              You will be charged when you sign up for a plan listed on this
              page. At the next renewal, you will be charged for the next period
              starting 24 hours before the expiration date. You can check the
              expiration date on the "Viewing Plan" screen.
            </ToggleButton>
          </div>
        </div>
      </div>
      <div className="mt"></div>
    </>
  );
};

export default Promote;
