import { ChangeEvent, InputHTMLAttributes, PropsWithRef, useEffect, useId, useState } from 'react';
import clsx from 'clsx';

import { divisionByRank } from '../../../utils/divisionByRank';
import { Icon } from '../../icon/Icon';
import { EIcons } from '../../../enums/icons.enum';
import { getRangeProgressBar } from '../../../utils/getRangeProgressBar';
import './ContributionField.scss';
import { InfoContribution } from '../../infoContribution/InfoContribution';
import { Error } from '../../error/Error';
import { Warning } from '../../warning/Warning';
import { getValueDivisionByPercent } from '../../../utils/getValueDivisionByPercent';
import { findPercentage } from '../../../utils/findPercentage';

export interface IInputProps extends PropsWithRef<InputHTMLAttributes<HTMLInputElement>> {
	type: string;
	placeholder: string;
	name: string;
	value: number;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	min: number;
	max: number;
	step: number;
}

export type TContributionFieldParams = {
	price: number;
	className?: string;
	label?: string;
	error?: string;
	onChangeTermValue: (option: number) => void;
	iconName?: EIcons;
	inputProps: IInputProps;
};

export const ContributionField = ({
	className,
	label,
	error,
	inputProps,
	iconName,
	onChangeTermValue,
	price,
}: TContributionFieldParams) => {
	const id = useId();

	const [termValue, setTermValue] = useState<string | number>('');

	useEffect(() => {
		if (price < +termValue) {
			onChangeTermValue(inputProps.max);
			setTermValue(getValueDivisionByPercent(price, inputProps.max));
			return;
		}
		setTermValue(getValueDivisionByPercent(price, inputProps.value));
	}, [price, inputProps.max]);

	const progressWidth = getRangeProgressBar(
		inputProps.value > inputProps.max ? inputProps.max : inputProps.value,
		inputProps.min,
		inputProps.max,
	);

	const handleTermValue = (event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value.split(',').join('');

		onChangeTermValue(findPercentage(price, +newValue));
		setTermValue(newValue);
	};

	return (
		<div className={clsx(className, 'text-field')}>
			{label && (
				<label htmlFor={id} className="flex items-center gap-1.5 text-label">
					{label}
					<InfoContribution />
				</label>
			)}
			<div className="relative">
				<input
					className={clsx('input-field', { '!border-baseError': error })}
					value={divisionByRank(termValue)}
					type="text"
					onChange={handleTermValue}
				/>
				{iconName && (
					<Icon
						size={20}
						name={iconName}
						className="text-white top-2/4 md:right-[24px] right-[48px] absolute -translate-y-2/4"
					/>
				)}
			</div>
			<div className="range-slider">
				<input
					id={id}
					{...inputProps}
					value={inputProps?.value || inputProps.min}
					onChange={(event) => {
						inputProps.onChange(event);
						setTermValue(getValueDivisionByPercent(price, +event.target.value));
					}}
					className={clsx(inputProps?.className, 'range')}
				/>
				<div className="progress" style={{ width: `${progressWidth}%` }} />
			</div>

			<Warning
				warning={
					<p>
						Cумма финансирования:<strong>{divisionByRank(termValue)}</strong> ₪ <br /> Процент
						финансирования:
						<strong>{inputProps.value}%</strong>
					</p>
				}
			/>
			{error && <Error error={error} />}
		</div>
	);
};
