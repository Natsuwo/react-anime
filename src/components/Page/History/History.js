import React from "react";
import Breadcumb from "../../Global/Breadcrumb/Breadcumb";
import CardListEpsiode from "../../Global/CardListEpisode/CardListEpisode";

const History = () => {
  return (
    <main className="page-main">
      <div className="page-container">
        <Breadcumb />
        <h1 className="main-title mb-2">History</h1>
        <div className="episode-list-wrapper">
          <div className="episode-list-container">
            <ul className="episode-list">
              <CardListEpsiode showDesc={false} showSupplements={false} />
              <CardListEpsiode showDesc={false} showSupplements={false} />
              <CardListEpsiode showDesc={false} showSupplements={false} />
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default History;
