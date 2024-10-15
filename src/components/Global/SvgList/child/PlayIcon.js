import playIcon from "../../../../assets/images/icons/player/play.svg";

const PlayIcon = () => {
  return (
    <svg
      aria-label=""
      aria-hidden="true"
      width="100%"
      height="100%"
      role="img"
      focusable="false"
    >
      <use xlinkHref={`${playIcon}#svg-play`}></use>
    </svg>
  );
};

export default PlayIcon;
