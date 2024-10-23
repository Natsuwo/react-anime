import React, { useEffect, useRef, useState } from "react";
import "./EpisodeVideo.css";
import Breadcumb from "../../../Global/Breadcrumb/Breadcumb";
import ActionButton from "../../../Global/ActionButton/ActionButton";
import UseIconList from "../../../Global/SvgList/UseIconList";
import CardListEpsiode from "../../../Global/CardListEpisode/CardListEpisode";
import EpisodeList from "../DetailVideo/EpisodeList";
import Recommend from "../../../Global/Recommend/Recommend";
import Player from "../../../Global/Player/Player";
import { UsePlayerWide } from "../../../../context/PlayerWideContext";

const EpisodeVideo = () => {
  const descRef = useRef(null);
  const [isShow, setIsShow] = useState(false);
  const [oriHeight, setOriHeight] = useState(0);
  const { wideMode } = UsePlayerWide();

  useEffect(() => {
    if (descRef.current) {
      setOriHeight(descRef.current.scrollHeight);
    }
  }, []);
  const items = Array.from({ length: 12 }, (_, i) => ({ id: i + 1 }));
  return (
    <main className="page-main">
      <div className="page-container">
        <Breadcumb />
        <div className="episode-wrapper">
          <div className="episode-inner">
            <div className="player-wrapper">
              <Player />
            </div>

            <h1 className="episode-main-title">
              <span
                className="season-title clamp-text"
                style={{ WebkitLineClamp: 1 }}
              >
                吸血鬼すぐ死ぬ
              </span>
              <span
                className="episode-title clamp-text"
                style={{ WebkitLineClamp: 1 }}
              >
                第1話 『退治人（ハンター）来たりて空を跳ぶ 前編』ほか２本
              </span>
            </h1>
            <div className="episode-supplement">
              <div className="supplement-item">24 minutes</div>
              <div className="supplement-item">2021年</div>
              <div className="supplement-item">397k views</div>
            </div>
            <div className="episode-tag">
              <div className="video-label">
                <span className="label-text free">Free</span>
              </div>
            </div>
            <div className="episode-desc-wrapper">
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
            </div>
            <div className="episode-action">
              <ActionButton />
            </div>
            <div className="recent-episode-wrapper mt">
              <EpisodeList />
            </div>
          </div>
          {!wideMode && (
            <div className="episode-sidebar">
              <div className="episode-sidebar-inner">
                <h2 className="episode-sidebar-title mb-md">Popular Stuffs</h2>
                <ul className="episode-sidebar-ep-list">
                  {items.map((item, index) => (
                    <CardListEpsiode key={index} sidebar={true} />
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="mt">
          <Recommend title={"Recent Category"} />
          <Recommend title={"Most Popular"} />
        </div>
      </div>
    </main>
  );
};

export default EpisodeVideo;
