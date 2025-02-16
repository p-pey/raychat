import attachIcon from "../assets/icons/Attach 1.svg";
import sendIcon from "../assets/icons/Send message 3.svg";
import voiceIcon from "../assets/icons/Voice 1.svg";
const ICONS = {
  send: sendIcon,
  voice: voiceIcon,
  attach: attachIcon,
} as const;

interface IconProps {
  name: keyof typeof ICONS;
  width?: string | number;
  height?: string | number;
  className?: string;
}

export default function Icon(props: IconProps) {
  return (
    <img
      src={ICONS[props.name]}
      width={props.width}
      height={props.height}
      className={props.className}
    />
  );
}
