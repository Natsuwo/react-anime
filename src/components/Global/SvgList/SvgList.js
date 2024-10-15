import BarsIcon from "./child/BarsIcon";
import HomeIcon from "./child/HomeIcon";
import SearchIcon from "./child/SearchIcon";
import CheckIcon from "./child/CheckIcon";
import HistoryIcon from "./child/HistoryIcon";
import Volume from "./child/VolumeIcon";
import VolumeOff from "./child/VolumeOffIcon";
import PlayIcon from "./child/PlayIcon";
import ChevronLeft from "./child/ChevronLeft";
import ChevronRight from "./child/ChevronRight";
import GenreIcon from "./child/GenreIcon";
import ContentPreviewIcon from "./child/ContentPreviewIcon";

const svgList = {
  bars: BarsIcon,
  home: HomeIcon,
  search: SearchIcon,
  check: CheckIcon,
  history: HistoryIcon,
  volume: Volume,
  volume_off: VolumeOff,
  play: PlayIcon,
  left_arrow: ChevronLeft,
  right_arrow: ChevronRight,
  content_preview: ContentPreviewIcon,
  genre: GenreIcon,
};

export default function SvgList(props) {
  const SvgList = svgList[props.icon];
  return <SvgList width={24} height={24} />;
}
