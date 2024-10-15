import chevronRight from "../../../../assets/images/icons/navigation/chevron-right.svg";

const ChevronRight = () => {
  return (
    <svg
      aria-label=""
      aria-hidden="true"
      width="100%"
      height="100%"
      role="img"
      focusable="false"
    >
      <use xlinkHref={`${chevronRight}#svg-chevron-right`}></use>
    </svg>
  );
};

export default ChevronRight;
