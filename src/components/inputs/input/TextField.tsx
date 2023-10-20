import { InputHTMLAttributes, PropsWithRef, useId } from 'react';
import clsx from 'clsx';
import { EIcons } from '../../enums/icons.enum.ts';
import { Icon } from '../icon/Icon.tsx';
import { divisionByRank } from '../../utils/divisionByRank.ts';
import { Error } from '../error/Error.tsx';

export type TTextFieldParams = {
	className?: string;
	label?: string;
	error?: string;
	iconName?: EIcons;
	inputProps?: PropsWithRef<InputHTMLAttributes<HTMLInputElement>>;
};

export const TextField = ({ className, label, error, inputProps, iconName }: TTextFieldParams) => {
	const id = useId();
	return (
		<div className={clsx(className, 'text-field')}>
			{label && (
				<label htmlFor={id} className="block text-label">
					{label}
				</label>
			)}
			<div className="relative">
				<input
					{...inputProps}
					id={id}
					value={divisionByRank(inputProps?.value) || ''}
					className={clsx(inputProps?.className, 'input-field')}
				/>
				{iconName && (
					<Icon
						size={20}
						name={iconName}
						className="text-white top-2/4 md:right-[24px] right-[48px] absolute -translate-y-2/4"
					/>
				)}
			</div>
			{error && <Error error={error} />}
		</div>
	);
};
