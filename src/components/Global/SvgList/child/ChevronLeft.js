import chevronLeft from "../../../../assets/images/icons/navigation/chevron-left.svg";

const ChevronLeft = () => {
  return (
    <svg
      aria-label=""
      aria-hidden="true"
      width="100%"
      height="100%"
      role="img"
      focusable="false"
    >
      <use xlinkHref={`${chevronLeft}#svg-chevron-left`}></use>
    </svg>
  );
};

export default ChevronLeft;
