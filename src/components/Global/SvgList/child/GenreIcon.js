import genreIcon from "../../../../assets/images/icons/feature/genre.svg";

const GenreIcon = () => {
  return (
    <svg
      aria-label=""
      aria-hidden="true"
      width="100%"
      height="100%"
      role="img"
      focusable="false"
    >
      <use xlinkHref={`${genreIcon}#svg-genre`}></use>
    </svg>
  );
};

export default GenreIcon;
