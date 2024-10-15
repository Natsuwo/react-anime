import volumeOffIcon from "../../../../assets/images/icons/condition/volume_off.svg";

const VolumeOffIcon = () => {
  return (
    <svg
      aria-label=""
      aria-hidden="true"
      width="100%"
      height="100%"
      role="img"
      focusable="false"
    >
      <use xlinkHref={`${volumeOffIcon}#svg-volume-off`}></use>
    </svg>
  );
};

export default VolumeOffIcon;
