import searchIcon from "../../../../assets/images/icons/feature/search.svg";

const SearchIcon = () => {
  return (
    <svg
      aria-label=""
      aria-hidden="true"
      width="100%"
      height="100%"
      role="img"
      focusable="false"
    >
      <use xlinkHref={`${searchIcon}#svg-search`}></use>
    </svg>
  );
};

export default SearchIcon;
