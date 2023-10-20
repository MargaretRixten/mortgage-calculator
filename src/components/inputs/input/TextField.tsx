import { ChangeEvent, InputHTMLAttributes, PropsWithRef, useId } from 'react';
import clsx from 'clsx';
import { Icon } from '../../icon/Icon';
import { Error } from '../../error/Error';
import { EIcons } from '../../../enums/icons.enum';
import { divisionByRank } from '../../../utils/divisionByRank';

export type TTextFieldParams = {
	className?: string;
	label?: string;
	error?: string;
	iconName?: EIcons;
	onChangeTextField: (value: ChangeEvent<HTMLInputElement>) => void;
	inputProps?: PropsWithRef<InputHTMLAttributes<HTMLInputElement>>;
};

export const TextField = ({ className, label, error, inputProps, iconName, onChangeTextField }: TTextFieldParams) => {
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
					onChange={onChangeTextField}
					value={divisionByRank(inputProps?.value) || ''}
					className={clsx(inputProps?.className, 'input-field', { '!border-baseError': error })}
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
