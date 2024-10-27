import React, { useEffect, useRef, useState } from "react";
import "./DetailVideo.css";
import UseIconList from "../../../Global/SvgList/UseIconList";
import EpisodeList from "./EpisodeList";
import Breadcumb from "../../../Global/Breadcrumb/Breadcumb";
import Recommend from "../../../Global/Recommend/Recommend";
import ActionButton from "../../../Global/ActionButton/ActionButton";
import SuggestedBar from "../../../Global/SuggestedBar/SuggestedBar";
import { UseResponsiveContext } from "../../../../context/ResponsiveContext";

const DetailVideo = () => {
  const descRef = useRef(null);
  const [isShow, setIsShow] = useState(false);
  const [oriHeight, setOriHeight] = useState(0);
  const { size } = UseResponsiveContext();

  useEffect(() => {
    if (descRef.current) {
      setOriHeight(descRef.current.scrollHeight);
    }
  }, []);
  return (
    <main className="page-main">
      <div className="page-container">
        <div className="container__mobile">
          <Breadcumb />
        </div>
        <div className="detail-wrapper">
          {size.width > 991 ? (
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
          ) : (
            <div className="detail-wrapper__mobile">
              <div className="detail-background-overlay__mobile">
                <div
                  className="detail-thumbnail-background__mobile"
                  style={{
                    backgroundImage: `url(https://image.p-c2-x.abema-tv.com/image/series/472-155/portrait.png?height=727&quality=75&version=1726633543&width=512)`,
                  }}
                />
              </div>

              <div className="detail-content__mobile">
                <div className="detail-thumbnail__mobile">
                  <img
                    src="https://image.p-c2-x.abema-tv.com/image/series/472-155/portrait.png?height=727&quality=75&version=1726633543&width=512"
                    alt="Thumbnail"
                  />
                </div>
                <div className="detail-information__mobile">
                  <h1 className="detail-main-title__mobile">誘惑</h1>
                  <div
                    className={`detail-description__mobile${
                      isShow ? " show" : ""
                    }`}
                  >
                    韓国から香港に向かう飛行機に4人の男女が偶然乗り合わせていた。企業グループ代表のユ・セヨン(チェ・ジウ)は、香港のホテルの買収を検討するために搭乗。
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Veritatis architecto voluptatum dignissimos sed rem
                    repudiandae nihil consectetur aperiam reiciendis! Doloribus,
                    non? Sunt in natus libero rerum adipisci dignissimos,
                    consequuntur saepe.
                  </div>
                  <div className="detail-view-more__mobile">
                    <div
                      onClick={() => setIsShow(!isShow)}
                      className="view-more__mobile __text-active"
                    >
                      {isShow ? "View less" : "View more"}
                    </div>
                  </div>
                  <button className="btn btn-white __rarius-3 btn-icon-left my-auto">
                    <span className="btn-icon">
                      <UseIconList icon="play" />
                    </span>
                    <span className="btn-text">Watch now</span>
                  </button>
                  <div className="add-to-list-wrapper__mobile">
                    <span className="add-to-list-icon__mobile">
                      <UseIconList icon={"add"} />
                    </span>
                    <span className="add-to-list-text__mobile">MyList</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <EpisodeList />
        <div className="container__mobile">
          <div className="mt">
            <Recommend title={"Recent Category"} />
            <Recommend title={"Most Popular"} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailVideo;
