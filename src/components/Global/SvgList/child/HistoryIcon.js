import historyIcon from "../../../../assets/images/icons/condition/history.svg";

const HistoryIcon = () => {
  return (
    <svg
      aria-label=""
      aria-hidden="true"
      width="100%"
      height="100%"
      role="img"
      focusable="false"
    >
      <use xlinkHref={`${historyIcon}#svg-history`}></use>
    </svg>
  );
};

export default HistoryIcon;
