import homeIcon from "../../../../assets/images/icons/feature/home.svg";

const HomeIcon = () => {
  return (
    <svg
      aria-label=""
      aria-hidden="true"
      width="100%"
      height="100%"
      role="img"
      focusable="false"
    >
      <use xlinkHref={`${homeIcon}#svg-home`}></use>
    </svg>
  );
};

export default HomeIcon;
