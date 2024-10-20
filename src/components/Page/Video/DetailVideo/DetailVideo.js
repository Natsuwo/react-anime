import React, { useEffect, useRef, useState } from "react";
import "./DetailVideo.css";
import UseIconList from "../../../Global/SvgList/UseIconList";
import EpisodeList from "./EpisodeList";
import Breadcumb from "../../../Global/Breadcrumb/Breadcumb";
import Recommend from "../../../Global/Recommend/Recommend";
import ActionButton from "../../../Global/ActionButton/ActionButton";
import SuggestedBar from "../../../Global/SuggestedBar/SuggestedBar";

const DetailVideo = () => {
  const descRef = useRef(null);
  const [isShow, setIsShow] = useState(false);
  const [oriHeight, setOriHeight] = useState(0);

  useEffect(() => {
    if (descRef.current) {
      setOriHeight(descRef.current.scrollHeight);
    }
  }, []);
  return (
    <main className="page-main">
      <div className="page-container">
        <Breadcumb />
        <div className="detail-wrapper">
          <div className="detail-container">
            <div className="detail-thumbnail">
              <div className="detail-thumbnail-container">
                <img
                  src="https://image.p-c2-x.abema-tv.com/image/series/472-155/portrait.png?height=727&quality=75&version=1726633543&width=512"
                  alt=""
                />
              </div>
            </div>
            <div className="detail-infomation">
              <div className="detail-infomation-wrapper">
                <h1 className="detail-main-title">誘惑</h1>
                <div className="detail-tag">Korean</div>
                <div
                  ref={descRef}
                  className={`detail-description${isShow ? " expanded" : ""}`}
                  style={{ maxHeight: isShow ? oriHeight : null }}
                >
                  韓国から香港に向かう飛行機に4人の男女が偶然乗り合わせていた。企業グループ代表のユ・セヨン(チェ・ジウ)は、香港のホテルの買収を検討するために搭乗。近くの座席でひとりはしゃぐ旧知の会社社長、カン・ミヌ(イ・ジョンジン)を見つけ、うんざりした顔をする。ミヌは、男の子の跡取りができないことを責める母親と、4人目の出産は身体上無理だという妻との板挟みになり、現実逃避の香港“出張”を決め込んでいた。一方、エコノミークラスには、10億ウォンの負債を抱えるチャ・ソックン(クォン・サンウ)と妻のナ・ホンジュ(パク・ハソン)の姿が。共同経営者の先輩に会社の金を横領され窮地に陥っていたところ、その先輩が香港にいることが分かったのだ。だが、香港に着き先輩の自殺を知る。途方にくれるソックンだったが、因縁のあるセヨンに再会し、彼女から「あなたの3日間を10億ウォンで買い取る」という条件付きの提案を受ける。
                </div>
                <button
                  onClick={() => setIsShow(!isShow)}
                  className="detail-toggle btn-default"
                >
                  <span className="detail-toggle-icon">
                    <UseIconList
                      icon={isShow ? "dropup" : "dropdown"}
                    ></UseIconList>
                  </span>
                  <span className="detail-toggle-text">More Detail</span>
                </button>
                <div className="detail-actions mb-md">
                  <ActionButton />
                </div>
                <SuggestedBar />
              </div>
            </div>
          </div>
        </div>
        <EpisodeList />
        <div className="mt">
          <Recommend title={"Recent Category"} />
          <Recommend title={"Most Popular"} />
        </div>
      </div>
    </main>
  );
};

export default DetailVideo;
