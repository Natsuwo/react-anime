import contentPreviewIcon from "../../../../assets/images/icons/condition/content_preview.svg";

const ContentPreviewIcon = () => {
  return (
    <svg
      aria-label=""
      aria-hidden="true"
      width="100%"
      height="100%"
      role="img"
      focusable="false"
    >
      <use xlinkHref={`${contentPreviewIcon}#svg-content-preview`}></use>
    </svg>
  );
};

export default ContentPreviewIcon;
