import barIcon from "../../../../assets/images/icons/hamburger.svg";

const BarsIcon = () => {
  return (
    <svg
      aria-label=""
      aria-hidden="true"
      width="100%"
      height="100%"
      role="img"
      focusable="false"
    >
      <use xlinkHref={`${barIcon}#svg-bars`}></use>
    </svg>
  );
};

export default BarsIcon;
