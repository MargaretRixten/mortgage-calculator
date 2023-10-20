import { iconList } from "./IconList.tsx";
import { EIcons } from "../../enums/icons.enum.ts";

interface IconProps {
  size: number;
  color?: string;
  name: EIcons;
}

export const Icon = ({ size = 16, color = "none", name }: IconProps) => {
  if (!iconList[name]) return null;

  const { viewBox, data } = iconList[name];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox || "0 0 512 512"}
      height={size}
      width={size}
      fill={color}
    >
      {data}
    </svg>
  );
};
