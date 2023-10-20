import { ReactNode } from 'react';
import { Icon } from '../icon/Icon';
import { EIcons } from '../../enums/icons.enum';
import './Error.scss';

interface IErrorParams {
	error: string | ReactNode;
}

export const Error = ({ error }: IErrorParams) => {
	return (
		<div className="error-block text-option !text-xs">
			<div>
				<Icon size={16} name={EIcons.Error} />
			</div>
			<p>{error}</p>
		</div>
	);
};
