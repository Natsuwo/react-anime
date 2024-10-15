import checkIcon from "../../../../assets/images/icons/action/done.svg";

const CheckIcon = () => {
  return (
    <svg
      aria-label=""
      aria-hidden="true"
      width="100%"
      height="100%"
      role="img"
      focusable="false"
    >
      <use xlinkHref={`${checkIcon}#svg-check`}></use>
    </svg>
  );
};

export default CheckIcon;
