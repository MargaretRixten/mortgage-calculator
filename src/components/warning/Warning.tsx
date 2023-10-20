import { ReactNode } from 'react';
import { Icon } from '../icon/Icon';
import { EIcons } from '../../enums/icons.enum';
import './Warning.scss';

interface IWarningParams {
	warning: string | ReactNode;
}

export const Warning = ({ warning }: IWarningParams) => {
	return (
		<div className="warning-block text-option !text-xs">
			<Icon className="text-accentPrimary" size={16} name={EIcons.Warning} />
			{warning}
		</div>
	);
};
