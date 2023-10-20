import { ChangeEvent, InputHTMLAttributes, PropsWithRef, useId, useState } from 'react';
import clsx from 'clsx';

import './RangeField.scss';
import { divisionByRank } from '../../../utils/divisionByRank.ts';
import { Icon } from '../../icon/Icon.tsx';
import { EIcons } from '../../../enums/icons.enum.ts';
import { getRangeProgressBar } from '../../../utils/getRangeProgressBar.tsx';
import { getDeclination } from '../../../utils/getDeclination.ts';

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

export type TTextFieldParams = {
	className?: string;
	label?: string;
	error?: string;
	info?: string;
	onChangeTermValue: (option: number) => void;
	iconName?: EIcons;
	inputProps: IInputProps;
	rangeArray?: string[];
};

export const RangeField = ({
	className,
	label,
	error,
	inputProps,
	info,
	iconName,
	onChangeTermValue,
	rangeArray,
}: TTextFieldParams) => {
	const id = useId();

	const [termValue, setTermValue] = useState<string | number>(inputProps.min || '');

	const progressWidth = getRangeProgressBar(inputProps.value, inputProps.min, inputProps.max);

	const handleTermValue = (event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value.split(',').join('');

		switch (true) {
			case +newValue < (inputProps.min || 0): {
				onChangeTermValue(inputProps.min || 0);
				break;
			}

			case +newValue > inputProps!.max!: {
				onChangeTermValue(inputProps.max);
				break;
			}
			default: {
				onChangeTermValue(+newValue);
				break;
			}
		}
		setTermValue(newValue);
	};

	const handleRangeTitle = () => {
		switch (true) {
			case !!rangeArray?.length: {
				return getDeclination(inputProps?.min, rangeArray!);
			}
			case !!iconName: {
				return (
					<Icon
						size={10}
						name={iconName!}
						className="text-white top-2/4 right-[-20px] absolute -translate-y-2/4"
					/>
				);
			}
			default:
				return null;
		}
	};

	console.log('getDeclination', getDeclination(inputProps?.min, ['год', 'года', 'лет']));

	return (
		<div className={clsx(className, 'text-field')}>
			{label && (
				<label htmlFor={id} className="block text-label">
					{label}
				</label>
			)}
			<div className="relative">
				<input
					className="input-field"
					value={divisionByRank(termValue) || ''}
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
					value={inputProps?.value || inputProps?.min}
					onChange={(event) => {
						inputProps!.onChange!(event);
						setTermValue(event.target.value);
					}}
					className={clsx(inputProps?.className, 'range')}
				/>
				<div className="progress" style={{ width: `${progressWidth}%` }} />
			</div>
			<div className="range-interval">
				<span className="relative">
					{divisionByRank(inputProps?.min)} {handleRangeTitle()}
				</span>
				<span className="relative">
					{divisionByRank(inputProps?.max)} {handleRangeTitle()}
				</span>
			</div>
			{info && (
				<div className="tooltip">
					<Icon className="text-accentPrimary" size={16} name={EIcons.Tooltip} />
					{info}
				</div>
			)}
			{error && <div className="text-rose-400 text-sm">{error}</div>}
		</div>
	);
};
