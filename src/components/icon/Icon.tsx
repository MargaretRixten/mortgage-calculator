import { iconList } from './IconList';
import { EIcons } from '../../enums/icons.enum';

interface IconProps {
	size: number;
	className?: string;
	name: EIcons;
}

export const Icon = ({ size = 16, name, className }: IconProps) => {
	if (!iconList[name]) return null;

	const { viewBox, data } = iconList[name];

	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			viewBox={viewBox || '0 0 512 512'}
			height={size}
			width={size}
		>
			{data}
		</svg>
	);
};
