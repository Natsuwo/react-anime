import volumeIcon from "../../../../assets/images/icons/condition/volume.svg";

const VolumeIcon = () => {
  return (
    <svg
      aria-label=""
      aria-hidden="true"
      width="100%"
      height="100%"
      role="img"
      focusable="false"
    >
      <use xlinkHref={`${volumeIcon}#svg-volume`}></use>
    </svg>
  );
};

export default VolumeIcon;
